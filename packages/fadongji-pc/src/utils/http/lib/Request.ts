import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { RequestOptions, Result, UploadFileParams } from '/#/axios'
import { CreateAxiosOptions } from '/@/utils/http/types'
import axios from 'axios'
import qs from 'qs'
import { AxiosCanceler } from '../src/axiosCancel'
import { isFunction } from '/@/utils/is'
import { cloneDeep } from 'lodash-es'
import { ContentTypeEnum } from '/@/enums/httpEnum'
import { RequestEnum } from '/@/enums/httpEnum'

/**
 * @description:  Request module
 */
export default class Request {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    // this.setupInterceptors()
    this.EraSetupInterceptors()
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }

    //cos考虑file需要放在最后面
    //https://cloud.tencent.com/document/product/436/14690
    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    return axios.request<T>({
      method: 'POST',
      data: formData,
      headers: {
        'content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        // ignoreCancelToken: true,
      },
      ...config,
    })
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  // Get Function
  apiGet<T = any>(options: any): Promise<T> {
    return this.apiRequest(
      { url: options.url, params: options.data, method: 'GET' },
      options.options,
    )
  }

  apiPatch<T = any>(options: any): Promise<T> {
    return this.apiRequest(
      { url: options.url, params: options.data, method: 'PATCH' },
      options.options,
    )
  }

  // get Post Function
  apiPost<T = any>(options: any): Promise<T> {
    return this.apiRequest(
      { url: options.url, params: options.data, method: 'POST' },
      options.options,
    )
  }

  // get Put Function
  apiPut<T = any>(options: any): Promise<T> {
    return this.apiRequest(
      { url: options.url, params: options.data, method: 'PUT' },
      options.options,
    )
  }

  // get Delete Function
  apiDelete<T = any>(options: any): Promise<T> {
    return this.apiRequest(
      { url: options.url, params: options.data, method: 'DELETE' },
      options.options,
    )
  }

  apiRequest<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)

    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { VoBeforeRequestHook, VorequestCatchHook, VoTransformRequestHook } = transform || {}

    if (VoBeforeRequestHook && isFunction(VoBeforeRequestHook)) {
      conf = VoBeforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt
    conf = this.supportFormData(conf)
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (VoTransformRequestHook && isFunction(VoTransformRequestHook)) {
            try {
              const ret = VoTransformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (VorequestCatchHook && isFunction(VorequestCatchHook)) {
            reject(VorequestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }

  /**
   * @description: Interceptor configuration
   */
  private EraSetupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      VoRequestInterceptors,
      VoResponseInterceptors,
      VoRequestInterceptorsCatch,
      VoResponseInterceptorsCatch,
      // requestInterceptorsCatch,
      // responseInterceptors,
      // responseInterceptorsCatch,
    } = transform

    const axiosCanceler = new AxiosCanceler()

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const {
        // @ts-ignore
        headers: { ignoreCancelToken },
      } = config

      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && axiosCanceler.addPending(config)
      if (VoRequestInterceptors && isFunction(VoRequestInterceptors)) {
        config = VoRequestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    // Request interceptor error capture
    VoRequestInterceptorsCatch &&
      isFunction(VoRequestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, VoRequestInterceptorsCatch)

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (VoResponseInterceptors && isFunction(VoResponseInterceptors)) {
        res = VoResponseInterceptors(res)
      }
      return res
    }, undefined)

    // Response result interceptor error capture
    VoResponseInterceptorsCatch &&
      isFunction(VoResponseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, VoResponseInterceptorsCatch)
  }

  /**
   * @description: Interceptor configuration
   */
  // private setupInterceptors() {
  //   const transform = this.getTransform()
  //   if (!transform) {
  //     return
  //   }
  //   const {
  //     requestInterceptors,
  //     requestInterceptorsCatch,
  //     responseInterceptors,
  //     responseInterceptorsCatch,
  //   } = transform
  //
  //   const axiosCanceler = new AxiosCanceler()
  //
  //   // Request interceptor configuration processing
  //   this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  //     // If cancel repeat request is turned on, then cancel repeat request is prohibited
  //     const {
  //       // @ts-ignore
  //       headers: { ignoreCancelToken },
  //     } = config
  //
  //     const ignoreCancel =
  //       ignoreCancelToken !== undefined
  //         ? ignoreCancelToken
  //         : this.options.requestOptions?.ignoreCancelToken
  //
  //     !ignoreCancel && axiosCanceler.addPending(config)
  //     if (requestInterceptors && isFunction(requestInterceptors)) {
  //       config = requestInterceptors(config, this.options)
  //     }
  //     return config
  //   }, undefined)
  //
  //   // Request interceptor error capture
  //   requestInterceptorsCatch &&
  //     isFunction(requestInterceptorsCatch) &&
  //     this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)
  //
  //   // Response result interceptor processing
  //   this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
  //     res && axiosCanceler.removePending(res.config)
  //     if (responseInterceptors && isFunction(responseInterceptors)) {
  //       res = responseInterceptors(res)
  //     }
  //     return res
  //   }, undefined)
  //
  //   // Response result interceptor error capture
  //   responseInterceptorsCatch &&
  //     isFunction(responseInterceptorsCatch) &&
  //     this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  // }

  // get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  //   return this.request({ ...config, method: 'GET' }, options)
  // }
  //
  // post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  //   return this.request({ ...config, method: 'POST' }, options)
  // }
  //
  // put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  //   return this.request({ ...config, method: 'PUT' }, options)
  // }
  //
  // delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  //   return this.request({ ...config, method: 'DELETE' }, options)
  // }

  // request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
  //   let conf: CreateAxiosOptions = cloneDeep(config)
  //   const transform = this.getTransform()
  //
  //   const { requestOptions } = this.options
  //
  //   const opt: RequestOptions = Object.assign({}, requestOptions, options)
  //
  //   const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
  //   if (beforeRequestHook && isFunction(beforeRequestHook)) {
  //     conf = beforeRequestHook(conf, opt)
  //   }
  //   conf.requestOptions = opt
  //
  //   conf = this.supportFormData(conf)
  //
  //   return new Promise((resolve, reject) => {
  //     this.axiosInstance
  //       .request<any, AxiosResponse<Result>>(conf)
  //       .then((res: AxiosResponse<Result>) => {
  //         if (transformRequestHook && isFunction(transformRequestHook)) {
  //           try {
  //             const ret = transformRequestHook(res, opt)
  //             resolve(ret)
  //           } catch (err) {
  //             reject(err || new Error('request error!'))
  //           }
  //           return
  //         }
  //         resolve(res as unknown as Promise<T>)
  //       })
  //       .catch((e: Error | AxiosError) => {
  //         if (requestCatchHook && isFunction(requestCatchHook)) {
  //           reject(requestCatchHook(e, opt))
  //           return
  //         }
  //         if (axios.isAxiosError(e)) {
  //           // rewrite error message from axios in here
  //         }
  //         reject(e)
  //       })
  //   })
  // }
}
