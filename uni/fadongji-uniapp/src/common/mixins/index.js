import prompt, {
  checkIsApproveFn,
  linkToWebView,
  linkTowebView,
  transferCosUrl,
  buildSharePath,
  transformShotUrl, cellCustomerPhone,
} from '@/common/helper.js'
import { mapGetters } from 'vuex'
import devConf from '@/common/env'
import helpUtil from '@/common/helper'
import { storage, vocenApi, VoHttp } from '@/common/unifyGlobalReg'
// #ifdef H5
import wx from 'weixin-js-sdk'
import { androidEnvVersion, iosEnvVersion } from "@/common/envVersion";

// #endif
const innerAudioContext = uni.createInnerAudioContext()
function setWxConfig(config) {
  wx.config(config)
}

export const WX_JSSDK_INIT = (vm, jsApiListList) =>
  new Promise((resolve, reject) => {
    if (!helpUtil.isWeiXin()) reject(new Error('请在微信中打开'))

    if (vm.JSSDK_READY) {
      resolve(wx)
      return
    }

    // let {origin,pathname} = location
    // `${origin}${pathname}`,//
    VoHttp.wxSignature(
      {
        url: location.href.split('#')[0],
        // debug : process.env.NODE_ENV === 'production' ? false : true
      },
      { noPrefix: true },
    )
      .then((res) => {
        const config = res.data
        // 线上环境，听服务器的，本地的一律调试
        const debug = !!res.data.debug // process.env.NODE_ENV === 'production'?config.debug?true:false:true
        const jsApiList = jsApiListList || [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'openLocation',
          'getLocation',
          'scanQRCode',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'chooseWXPay',
        ]
        // ['chooseImage', 'previewImage', 'uploadImage', 'openLocation','getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'];
        if (debug) {
          storage.set('jssdk_debug', 1)
        } else {
          storage.set('jssdk_debug', 0)
        }
        const { nonceStr, timestamp, appId, signature } = config

        setWxConfig({
          debug,
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList,
          openTagList: ['wx-open-launch-weapp'],
        })

        wx.ready(function () {
          vm.JSSDK_READY = true
          // 将微信这个变量传进去，所以在页面就不需要传了
          resolve(wx)
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        })
      })
      .catch((res) => {
        reject(res.msg || 'jssdk签名失败')
      })
  })

export const pageMixin = {
  mixins: [], // 启用统计
  data() {
    return {
      // #ifdef H5
      JSSDK_READY: false,
      JSSDK_INIT: true, // 是否需要微信签名
      // #endif
      systemConfigInfo: {},
      systemInfo: {
        // 获取系统信息同步接口
        statusBarHeight: 0, // 状态栏的高度
        windowHeight: 0, // 可使用窗口高度
      },
      diyHeadHeight: 0, // 胶囊的高度
      diyHeadRight: 0, // 胶囊的宽度
      menuButtonInfo: {
        // 用于获取小程序下该菜单按钮的布局位置信息，方便开发者布局顶部内容时避开该按钮
        height: 0, // 高度
      },
      // 播放进度
      playProgress: 0,
      playStatus: false,
      loadingAudio: false,
    }
  },
  computed: {
    // 辅助函数
    ...mapGetters({
      userInfo: 'user/userInfoGetter',
      appTheme: 'theme/appThemeGetter',
    }),
  },
  methods: {
    $versionFn(){
      let platform = uni.getSystemInfoSync().platform
      if (platform == 'android') {
        return  'V'+androidEnvVersion
      } else if(platform=='ios') {
        return  'V'+iosEnvVersion
      }
    },
    // 监听
    innerAudioContextEvent() {
      // 播放进度
      innerAudioContext.onTimeUpdate(() => {
        let totalDate = innerAudioContext.duration
        let nowTime = innerAudioContext.currentTime
        let surplus = totalDate - nowTime
        // console.log((surplus / totalDate) * 100)
        this.playProgress = (surplus / totalDate) * 100

        // let _min = Math.floor(surplus / 60)
        // if (_min < 10) _min = '0' + _min
        // let _sec = Math.floor(surplus % 60)
        // if (_sec < 10) _sec = '0' + _sec
        // this.reDate = _min + ':' + _sec
        //
        // this.recordTime = parseInt(_min) * 60 + parseInt(_sec)
      })
      // 播放开始
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
        // this.playProgress = 100
        this.playStatus = true
      })
      // 播放暂停
      innerAudioContext.onPause(() => {
        console.log('暂停播放')
        // this.playProgress = 100
        this.playStatus = false
      })
      // 播放停止
      innerAudioContext.onStop(() => {
        // this.playProgress = 100
        this.playStatus = false
        console.log('播放停止')
      })
      // 播放结束
      innerAudioContext.onEnded((res) => {
        console.log(res, '播放结束')
        this.playStatus = false
      })
      // 播放失败
      innerAudioContext.offError((err) => {
        console.log(err, '播放失败')
        this.playStatus = false
      })
      // 加载中
      innerAudioContext.offWaiting((res) => {
        console.log(res, '加载中')
        this.loadingAudio = true
        // this.playStatus = false
      })
    },
    /**
     * 播放音频
     * @param val 音频文件路径
     */
    playInnerAudioContext(val) {
      if (innerAudioContext.src === val) {
        if (this.playStatus) {
          innerAudioContext.pause()
          this.playStatus = false
        } else {
          innerAudioContext.play()
          this.playStatus = true
        }
      } else {
        innerAudioContext.src = val
        innerAudioContext.play()
        this.playStatus = true
      }
    },
    closeInnerAudioContext() {
      innerAudioContext.src = ''
      try {
        innerAudioContext.stop()
      } catch (e) {
        console.log(e)
      }
      this.playStatus = false
    },
    /**
     * 加法
     * @param x
     * @param y
     * @returns {*}
     */
    decimalAddFn(x, y) {
      return vocenApi.Decimal.add(x, y).toNumber()
    },
    /**
     * 减法
     * @param x
     * @param y
     * @returns {*}
     */
    decimalSubFn(x, y) {
      return vocenApi.Decimal.sub(x, y).toNumber()
    },
    /**
     * 乘法
     * @param x
     * @param y
     * @returns {*}
     */
    decimalMulFn(x, y) {
      return vocenApi.Decimal.mul(x, y).toNumber()
    },
    /**
     * 除法
     * @param x
     * @param y
     * @returns {*}
     */
    decimalDivFn(x, y) {
      return vocenApi.Decimal.div(x, y).toNumber()
    },
    $transferCosUrl: prompt.transferCosUrl,
    $toast: prompt.toast,
    $success: prompt.toast,
    $fail: prompt.error,
    $alert: prompt.modal,
    getRoleName(role, roleArr) {
      if (roleArr.length <= 0 || String(role) === '') return ''
      let findRole = roleArr.find((element) => element.roleCode === role)
      return findRole?.roleName || ''
    },
    /**
     * 拿vuex里面的角色列表
     * @returns {Promise<void>}
     */
    async initRoleFn() {
      await this.$store.dispatch('role/getRoleArr')
    },
    /**
     * 点击切换主题颜色
     * @param {string} color 切换的颜色
     */
    toggleAppTheme(color = 'blue') {
      this.$store.commit('theme/TOGGLE_APP_THEME', color)
    },
    /**
     * 调原生的方法
     */
    $backNative() {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isAndroid) {
        window.android.goAppBackFn()
        // 安卓的方法名 back  这里是安卓给的他们的方法名
      } else if (isiOS) {
        // showMessage 是ios的方法名  是ios给的
        window.webkit.messageHandlers.goAppBackFn.postMessage({})
      }
    },
    // 打七陌客服电话
    $cellCustomerPhone:cellCustomerPhone,
    // 转换第三方平台url
    $transformShotUrl: transformShotUrl,
    // 判断链接是否带域名
    $getDomain: prompt.getDomain,
    // 使用应用内置地图查看位置
    $openLocation: prompt.openLocation,
    // 拨打电话
    $cellPhone: prompt.cellPhone,
    $noop: () => {},
    // 保留当前页面，跳转到应用内的某个页面，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    $linkToEasy: prompt.linkToEasy,
    // 跳转webView
    $linkToWebView: prompt.linkToWebView,
    // 关闭当前页面，返回上一页面或多级页面
    $backFn: prompt.backFunc,
    // 检测是否登录
    $checkIsLogin: prompt.checkIsLogin,
    // 检测是否认证
    $checkIsApproveFn: prompt.checkIsApproveFn,
    // 访问元素或子组件的实例
    $openPop(name) {
      this.$refs[name].open()
    },
    // 访问元素或子组件的实例
    $closePop(name) {
      this.$refs[name].close()
    },
    // 初始化
    async default_init_func(options) {
      console.log(options)
      // #ifdef H5
      // 页面默认全都是分享出去是首页的
      if (helpUtil.isWeiXin() && this.JSSDK_INIT) {
        WX_JSSDK_INIT(this)
          .then((wxEnv) => {
            let defaultParam = {
              title: '发动集APP-买发动机，上发动集',
              link: window.location.href,
              imgUrl: devConf.shareLogo,
              desc: '品牌多，型号全，价格透明，全站一键比价',
              success: (e) => {
                console.log('分享成功回调', e)
              },
            }
            let params = Object.assign(defaultParam, options)
            console.log(params);
            wxEnv.onMenuShareTimeline({
              title: params.title, // 分享标题
              link: buildSharePath(params.link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: params.imgUrl, // 分享图标
              success: params?.success,
            })

            // 两种方式都可以
            wxEnv.onMenuShareAppMessage({
              title: params.title, // 分享标题
              link: buildSharePath(params.link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: params.imgUrl, // 分享图标
              desc: params.desc,
              // type: 'link', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: params?.success,
            })
          })
          .catch((err) => {
            console.log(err || '签名失败')
          })
      }
      // #endif
    },
    // 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
    getCurrentPageRoute() {
      const pageInstanceList = getCurrentPages()
      if (pageInstanceList.length <= 0) return []
      const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
      return currentPagePath
    },
  },
  onShow() {
    // 这个机制还是要onShow 兼容返回的情况
    this.$storage.set('currentPagePath', this.getCurrentPageRoute()) // 标记当前的页面，这样就不会每个事件都响应了
    this.currentPagePath = this.getCurrentPageRoute()
  },
  onReady() {},
  onLoad(options) {
    const opt = { ...options }
    // 这样简洁多了
    this.default_init_func(opt).then()
    //初始化拿角色列表
    this.initRoleFn()
    this.innerAudioContextEvent()
  },
  onUnload(){
    uni.hideLoading()
  },
  // 分享
  onShareAppMessage() {
    const path = '/pages/home'
    const shareObj = {
      title: this.systemConfigInfo.share_title || '',
      desc: this.systemConfigInfo.share_desc || '',
      imageUrl: this.systemConfigInfo.share_pic || '',
      path: path,
    }
    return shareObj
  },
  async created() {
    // 获取系统信息同步接口
    this.systemInfo = uni.getSystemInfoSync()
    // #ifdef MP
    // 用于获取小程序下该菜单按钮的布局位置信息，方便开发者布局顶部内容时避开该按钮
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { height, top, left, bottom } = this.menuButtonInfo
    this.diyHeadHeight = bottom + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    // #endif
  },
}
