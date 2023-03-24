/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '/#/axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
   */
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void

  // 以下是Vocen项目重构问题，目的是不影响原来接口的情况下做本地化修改

  /**
   * @name: Vocen
   *
   * @description: Process configuration before request
   */
  VoBeforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * @description: (vocen) 重构 axios配置
   * */
  VoTransformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   *@name: Vocen--  VorequestCatchHook
   * @description: 请求失败处理
   */
  VorequestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * @description: 请求之后的拦截器错误处理
   */
  VoResponseInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之前的拦截器
   */
  VoRequestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig
  /**
   * @description: 请求之后的拦截器
   */
  VoResponseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  VoRequestInterceptorsCatch?: (error: Error) => void
}
