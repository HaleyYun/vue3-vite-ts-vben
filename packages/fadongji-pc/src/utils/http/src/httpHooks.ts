import { AxiosTransform as AxiosTransformType } from '/@/utils/http/types'
import { AxiosResponse } from 'axios'
import { RequestOptions, Result } from '/#/axios'
import { useI18n } from '/@/hooks/web/useI18n'
import { RequestEnum, ResultEnum } from '/@/enums/httpEnum'
import { useUserStoreWithOut } from '/@/store/modules/user'
import { isString } from '/@/utils/is'
import { formatRequestDate, joinTimestamp } from '/@/utils/http/src/helper'
import { setObjToUrlParams } from '/@/utils'
import { getToken } from '/@/utils/auth'
import { useErrorLogStoreWithOut } from '/@/store/modules/errorLog'
import { checkStatus } from '/@/utils/http/src/checkStatus'
import { useMessage } from '/@/hooks/web/useMessage'
import { usePermissionStore, usePermissionStoreWithOut } from '/@/store/modules/permission'
import { buildUUID } from '/@/utils/uuid'

const { createMessage, createErrorModal } = useMessage()
import { getVoToken } from '/@/utils/http/src/helper'
import { PageEnum } from '/@/enums/pageEnum'
import { router } from '/@/router'
import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '/@/enums/VoCacheEnum'
import { encrypt } from '/@/components/VoGlobalRegister/VoGlobalRegister'
import { defHttp } from '/@/utils/http'

// (Vo-PC) isRefreshing--设置开关,作为是否刷新的判断依据
// const isRefreshing = false
// (Vo-PC) 重试队列，每一项将是一个待执行的函数形式
// let requests = []
/**
 * @description: 数据处理，方便区分多种处理方式
 */

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
const HttpHooks: AxiosTransformType = {
  // 以下是Vocen的axios的hook封装，目的是不影响原来的hook，并依据原来的hook做本地化处理
  VoBeforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
      urlPrefix,
      noAutoAddDomain = false,
    } = options

    const headers: any = options?.headers
    if (headers) {
      config.headers = headers
    }

    if (!config.headers) {
      config.headers = {
        'Access-Control-Allow-Private-Network': 'true',
      }
    } else {
      config.headers['Access-Control-Allow-Private-Network'] = 'true'
    }
    config.headers['seqNo'] = buildUUID()

    if (!noAutoAddDomain && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (!noAutoAddDomain && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @name:  (Vocen--) VoTransformRequestHook
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  VoTransformRequestHook: (res: AxiosResponse<Result>) => {
    // , options: RequestOptions
    return res

    // const code = String(res.data.code)
    // const data = res.data
    // switch (code) {
    //   case '20001':
    //     return data
    //     break
    //   case 'U0231':
    //     const refreshToken = getVoRefreshToKen()
    //     console.log('refreshToken===', refreshToken)
    //     // 过期失效
    //     if (!isRefreshing) {
    //       // const globInstance = proxy?.$.appContext.config.globalProperties
    //
    //       const param = {
    //         clientId: 'login-client',
    //         grantType: 'refresh_token',
    //         clientSecret: encrypt('login-client-admin'),
    //         licenseId: 1,
    //         refreshToken,
    //       }
    //       return AdminHttp.login(param).then((res: { data: any }) => {
    //         const data = res.data
    //         console.log('7773333===', data)
    //         if (data) {
    //           storage.set(ACCESS_TOKEN_KEY, data.access_token)
    //           storage.set(REFRESH_TOKEN_KEY, data.refresh_token)
    //         }
    //         // 已经刷新了token，将所有队列中的请求进行重试
    //         requests.forEach((cb: any) => cb(refreshToken))
    //         // 重试完了别忘了清空这个队列（掘金评论区同学指点）
    //         requests = []
    //         //重新请求
    //         return defHttp.ApiRequest(res)
    //       })
    //     } else {
    //       // 正在刷新token，返回一个未执行resolve的promise
    //       return new Promise((resolve) => {
    //         // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    //         // @ts-ignore
    //         requests.push(() => {
    //           resolve(defHttp.ApiRequest(res))
    //         })
    //       })
    //     }
    //     break
    //   case 'U0230':
    //     // 用户登录已过期
    //     break
    //   default:
    //     return res
    //     break
    // }
  },
  /**
   * @name: Vocen --- VoRequestInterceptors
   * @description: 请求拦截器处理
   */
  VoRequestInterceptors: (config) => {
    // , options
    // 请求之前处理config
    // console.log('options===', options)
    const token = getVoToken()
    // let ceshineir = 'Bearer ' + token
    // storage.get()
    ;(config as Recordable).headers.Authorization = token
      ? 'Bearer ' + token.replaceAll('"', '')
      : ''
    return config
  },
  /**
   * @description: 响应拦截器处理
   */
  VoResponseInterceptors: async (res: AxiosResponse<any>) => {
    // return res
    if (res.status !== 200) throw Error('服务器去旅行了')
    const code = String(res.data.code)
    switch (code) {
      case '20001':
        return res.data
      case 'U0231':
        try {
          if (!isRefreshing) {
            isRefreshing = true
            console.log('重新登录，', res.config.url)
            console.log(router)
            const userStore = useUserStoreWithOut()

            const refreshToken = storage.get(REFRESH_TOKEN_KEY)
            if (!refreshToken) {
              userStore.logout().then(() => {
                storage.remove(ACCESS_TOKEN_KEY)
                storage.remove(REFRESH_TOKEN_KEY)
                router.replace(PageEnum.BASE_LOGIN)
              })
            }
            const param = {
              clientId: 'engine-op',
              clientSecret: encrypt.encrypt('engine-op-Secret'),
              grantType: 'refresh_token',
              terminalSource: 4,
              roleCode: 'op',
              licenseId: '133960256299597825',
              mode: 'none',
              goHome: false,
              refreshToken: JSON.parse(refreshToken),
            }

            const userInfo = await userStore.login(param)
            const permissionStore = usePermissionStoreWithOut()
            permissionStore.setDynamicAddedRoute(false)

            try {
              if (userInfo) {
                // 已经刷新了token，将所有队列中的请求进行重试
                // window.location.reload()
                // console.log(requests)
                requests.forEach((cb: any) => cb(refreshToken))
                // 重试完了别忘了清空这个队列（掘金评论区同学指点）
                requests = []
                //重新请求
                // {noAutoAddDomain:true}
                return defHttp.apiRequest(res.config, { noAutoAddDomain: true })
              } else {
                userStore.logout().then((res) => {
                  storage.remove(ACCESS_TOKEN_KEY)
                  storage.remove(REFRESH_TOKEN_KEY)
                  router.replace(PageEnum.BASE_LOGIN)
                })
              }
            } catch (e) {
              userStore.logout().then((res) => {
                storage.remove(ACCESS_TOKEN_KEY)
                storage.remove(REFRESH_TOKEN_KEY)
                router.replace(PageEnum.BASE_LOGIN)
              })
            } finally {
              isRefreshing = false
            }
          } else {
            // 正在刷新token，返回一个未执行resolve的promise
            return new Promise((resolve) => {
              // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
              requests.push((token) => {
                resolve(defHttp.apiRequest(res.config, { noAutoAddDomain: true }))
              })
              console.log(requests)
            })
          }
        } catch (err) {
          console.log(err)
        }

        // const refreshToken = getVoRefreshToKen()
        // 过期失效
        // as ComponetInternalInstance表示类型断言，ts时使用。否则报错，proxy为null
        // if (!isRefreshing) {
        // const { proxy } = getCurrentInstance() as ComponentInternalInstance
        // const globInstance = proxy?.$.appContext.config.globalProperties
        // const param = {
        //   clientId: 'login-client',
        //   grantType: 'refresh_token',
        //   clientSecret: encrypt('login-client-admin'),
        //   licenseId: 1,
        //   refreshToken,
        // }
        // const res =  AdminHttp.login(param)
        // const refreshData = res.data
        // if (refreshData) {
        //             storage.set(ACCESS_TOKEN_KEY, data.access_token)
        //             storage.set(REFRESH_TOKEN_KEY, data.refresh_token)
        // }
        // requests.forEach((cb: any) => cb(refreshToken))
        //  // 重试完了别忘了清空这个队列（掘金评论区同学指点）
        // requests = []
        //重新请求
        //        return defHttp.ApiRequest(res)
        // } else {
        // 正在刷新token，返回一个未执行resolve的promise
        // return new Promise((resolve) => {
        //   // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        //   // @ts-ignore
        //   requests.push(() => {
        //     // resolve(defHttp.ApiRequest(res))
        //   })
        // })
        // }
        // try {
        //   storage.remove(ACCESS_TOKEN_KEY)
        //   storage.remove(REFRESH_TOKEN_KEY)
        //   router.replace(PageEnum.BASE_LOGIN)
        // } catch (err) {
        // }
        break
      case 'U0230':
        // 用户登录已过期
        createMessage.error('用户登录已过期,请重新登录')
        try {
          const userStore = useUserStoreWithOut()
          userStore.logout().then(() => {
            storage.remove(ACCESS_TOKEN_KEY)
            storage.remove(REFRESH_TOKEN_KEY)
            router.replace(PageEnum.BASE_LOGIN)
          })
        } catch (err) {
          console.log(err)
        }
        break
      default:
        // 暂时注释掉-报错信息全局model的展示
        createMessage.error(
          res.data?.errors && res.data.errors.length ? res.data.errors[0] : res.data.message,
        )
        const errorMessage =
          res.data?.errors && res.data.errors.length ? res.data.errors[0] : res.data.message
        console.warn(errorMessage, 'http-result')
        return res.data
    }
  },

  /**
   * @description: 响应错误处理
   */
  VoResponseInterceptorsCatch: (error: any) => {
    // console.log('ErrorError===', error)
    // if (error =='Error: Network Error') {
    //   console.log('333333')
    //   storage.remove(ACCESS_TOKEN_KEY)
    //   storage.remove(REFRESH_TOKEN_KEY)
    //   router.replace(PageEnum.BASE_LOGIN)
    // }
    // console.log('error===', error)
    return Promise.reject(error)
  },
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n()
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回

    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'))
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return result
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage')
        const userStore = useUserStoreWithOut()
        userStore.setToken(undefined)
        userStore.logout(true)
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg })
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = getToken()
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      ;(config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    const code = String(res.data.code)
    const data = res.data

    switch (code) {
      case '20001':
        return data
        break
      case 'U0231':
        break
      case 'U0230':
        break
    }
    return res
    // const code = String(res.data.code)
    // const data = res.data
    // switch (code) {
    //   case '20001':
    //     return data
    //     break
    //   case 'U0231':
    //     const refreshToken = getVoRefreshToKen()
    //     // 过期失效
    //     // as ComponetInternalInstance表示类型断言，ts时使用。否则报错，proxy为null
    //     if (!isRefreshing) {
    //       // const { proxy } = getCurrentInstance() as ComponentInternalInstance
    //       // const globInstance = proxy?.$.appContext.config.globalProperties
    //
    //
    //       const param = {
    //         clientId: 'login-client',
    //         grantType: 'refresh_token',
    //         clientSecret: encrypt('login-client-admin'),
    //         licenseId: 1,
    //         refreshToken,
    //       }
    //        let resultData =  AdminHttp.login(param)
    //        const refreshData = resultData.data
    //        if (refreshData) {
    //          storage.set(ACCESS_TOKEN_KEY, data.access_token)
    //          storage.set(REFRESH_TOKEN_KEY, data.refresh_token)
    //        }
    //         // 已经刷新了token，将所有队列中的请求进行重试
    //         requests.forEach((cb: any) => cb(refreshToken))
    //         // 重试完了别忘了清空这个队列（掘金评论区同学指点）
    //         requests = []
    //         //重新请求
    //         return defHttp.ApiRequest(res)
    //
    //     } else {
    //       // 正在刷新token，返回一个未执行resolve的promise
    //       return new Promise((resolve) => {
    //         // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    //         // @ts-ignore
    //         requests.push(() => {
    //           resolve(defHttp.ApiRequest(res))
    //         })
    //       })
    //     }
    //     break
    //   case 'U0230':
    //     // 用户登录已过期
    //     break
    //   default:
    //     return res
    //     break
    // }
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n()
    const errorLogStore = useErrorLogStoreWithOut()
    errorLogStore.addAjaxErrorInfo(error)
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage')
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg')
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)
    return Promise.reject(error)
  },
}
export default HttpHooks
