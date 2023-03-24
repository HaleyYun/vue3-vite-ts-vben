// luch-request 版本 3.x
// 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
// 参考文档 https://www.quanzhan.co/luch-request/guide/3.x/

import Request from '@/common/luchRequest/index' // 下载的插件
import devConf from '@/common/env'
import { encrypt, storage, VoHttp } from './unifyGlobalReg'
import store from '@/store'
import helperUtil, { appSource } from "@/common/helper";
// #ifdef APP-PLUS
const vocenJpush = uni.requireNativePlugin('vocen-jpush')
// #endif
const httpRequest = new Request()

const getToken = () => {
  return storage.get('access_token')
}

// 生成32位uuid
const  getUuidFn=()=>{
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  let uuid = s.join("")+new Date().getTime();
  return uuid;
}

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
let  isToastLogin=false

// 默认配置
httpRequest.setConfig((config) => {
  config.baseURL = devConf.apiBaseUrl
  config.custom.loading = false
  return config
})

// 在请求之前拦截
// 可使用async await 做异步操作
httpRequest.interceptors.request.use(
  (config) => {
    const token = getToken()
    // // 本地联调user信息
    // config.header['user'] = JSON.stringify({
    //   id:'1539076709099352066',
    //   platformCode:"supplier",
    //   companyId:'139724763881930752',
    //   accountId:'139724763705769984',
    //   licenseId:'133960256299597825'
    // });

    // 自定义 token 传入 header中
    if (token) {
      config.header.Authorization = 'Bearer ' + token
      config.header['Access-Control-Allow-Private-Network'] = true
    }
    //接口报非法获取情况下 添加sign-debug=1
    config.header['sign-debug'] = 1
    config.header['seqNo'] = getUuidFn()
    config.header['terminalSource'] = appSource()
    // console.log(config,"11111111");

    if (!config.custom.noLoading) {
      uni.showLoading({ mask: true, title: config.params.loading||'加载中' })
    }
    if (!config.custom.noPrefix) {
      config.baseURL += devConf.apiPrefix
    }

    return config
  },
  (config) => {
    // 可使用async await 做异步操作
    return Promise.reject(config)
  },
)

// 在请求之后拦截  自定义处理结果 可根据前后端定义的
/* 对响应成功做点什么 可使用async await 做异步操作*/
httpRequest.interceptors.response.use(
  ({ data, config }) => {
    const code = String(data.code)
    if (!config.custom.noLoading) {
      uni.hideLoading()
    }
    switch (code) {
      case '20001':
        // 正常返回
        return data
        break

      // 游客模式请求需要companyId的接口
      case 'U0312':
        // 正常返回
        return data
        break

      case 'U0231':
        //用户ACCESS_TOKEN已过期
        if (!isRefreshing) {
          //没有换token
          isRefreshing = true
          const userInfo = storage.get('userInfo')

          if (userInfo&&userInfo.roleCode) {
            storage.set('last_role', userInfo.roleCode)
          }

          const refreshToken = storage.get('refresh_token')

          if (!refreshToken) {
            store.dispatch('user/setUseInfo', {})
            // uni.navigateTo({
            //   url: '/pages/SelectRole/SelectRole',
            // })
            uni.reLaunch({
              url: '/pages/CommonLogin/UserLogin',
            })
            return Promise.reject(data)
          }

          let param = {
            clientId: devConf.clientId,
            clientSecret: encrypt.encrypt(devConf.clientSecret),
            grantType: 'refresh_token',
            licenseId: devConf.licenseId,
            refreshToken,
            terminalSource: helperUtil.appSource(),
          }
          return VoHttp.login(param, { noPrefix: true })
            .then((res) => {
              isRefreshing = false
              if (res && res.data) {
                store.dispatch('user/setUseInfo', res.data)
                // 已经刷新了token，将所有队列中的请求进行重试
                requests.forEach((cb) => cb(refreshToken))
                // 重试完了别忘了清空这个队列（掘金评论区同学指点）
                requests = []

                //重新请求
                return httpRequest.request(config)
              } else {
                store.dispatch('user/setUseInfo', {})
                // uni.navigateTo({
                //   url: '/pages/SelectRole/SelectRole',
                // })
                if(isToastLogin){
                  return Promise.reject(data)
                }
                uni.reLaunch({
                  url: '/pages/CommonLogin/UserLogin',
                })
                return Promise.reject(data)
              }
            })
            .catch((err) => {
              isRefreshing = false
              store.dispatch('user/setUseInfo', {})
              console.log(err)
              if (err.code === 'U0230') {
                data.message = '此账号已在其他设备登录，请重新登录。'
              }
              store.dispatch('user/setUseInfo', {})
              uni.reLaunch({
                url: '/pages/CommonLogin/UserLogin',
              })
              return Promise.reject(data)
            })
            .finally(() => {
              isRefreshing = false
            })
        } else {
          // 正在刷新token，返回一个未执行resolve的promise
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token) => {
              resolve(httpRequest.request(config))
            })
          })
        }
        break
      case 'U0230':
        // #ifdef APP-PLUS
        const userInfo = storage.get('userInfo')
        const alias = userInfo.accountId
        let userId = 'user_' + alias
        console.log('推送别名', userId)
        vocenJpush.voJPushDeleteAlias(
          {
            alias: userId,
          },
          (res) => {
            console.log(res)
          },
        )
        // #endif

        // console.log("'asd'", 'asd')
        //用户登录已过期
        let imCtx = store.getters['im/GET_IMCTX']
        //取消心跳的定时器
        if (imCtx) {
          imCtx.clearIntervalFn()
          imCtx.close()
          imCtx = null
        }
        if(isToastLogin){
          return Promise.reject(data)
        }
        isToastLogin=true
        uni.showToast({
          title:'此账号已在其他设备登录，请重新登录。',
          icon:'none'
        })
        setTimeout(()=>{
          store.dispatch('user/setUseInfo', {})
          uni.reLaunch({
            url: '/pages/CommonLogin/UserLogin',
          })
          isToastLogin=false
        },1500)
        return Promise.reject(data)
        break
      default:
        return Promise.reject(data)
        break
    }
  },
  ({response,config}) => {
    if(!config.custom.noError){
      uni.getNetworkType({
        success: function (res) {
          if(res.networkType=='none'){
            uni.showToast({
              title:'网络未开启，请检查您的网络设置并开启',
              icon:'none'
            })
          }else{
            uni.showToast({
              title:'系统正在升级，请稍后再试',
              icon:'none'
            })
          }
        },
        fail:()=>{
          uni.showToast({
            title:'请打开数据流量',
            icon:'none'
          })
        }
      });

    }

    return Promise.reject(response)
  },
)
httpRequest.apiGet = (options) => {
  options.data.licenseId = devConf.licenseId
  return httpRequest.get(options?.url, {
    params: options.data,
    custom: {...options},
  })
}
httpRequest.apiPost = (options) => {
  options.data.licenseId = devConf.licenseId
  return httpRequest.post(options?.url, options.data, { custom: {...options} })
}
httpRequest.apiPut = (options) => {
  options.data.licenseId = devConf.licenseId
  return httpRequest.put(options?.url, options.data, { custom: {...options} })
}

httpRequest.apiRequest = (options) => {
  return httpRequest.request({
    url,
    method: 'GET',
    ...options,
  })
}
httpRequest.apiDelete = (options) => {
  options.data.licenseId = devConf.licenseId
  // query 传参
  let str = ''
  for (let j in options.data) {
    //j是属性名
    str += j + '=' + options.data[j] + '&' //json[i][j]是属性值
  }
  let query = '?' + str.substring(0, str.length - 1)

  return httpRequest.delete(options?.url + query, options.data,{ custom: {...options} })
}

export default httpRequest
