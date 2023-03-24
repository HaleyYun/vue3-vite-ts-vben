// 定义 通用request请求
// 包含公用的接口
// 初始化config配置
import { defaultVersion, getTreeConfig, transformConfig, version } from './helpers'

import { AdminApi, AppApi, CommonApi } from './api'
import { httpRequest, httpResponse, VoCenRequest } from '../types'
import { hasOwn, isPlainObject } from '../utils/objects'

export default class VoHttp {
  public readonly $service
  protected readonly $config

  // 初始化服务
  constructor(config: VoCenRequest) {
    transformConfig(config)
    this.$config = config
    if (!hasOwn(config, 'requestInstance')) {
      throw new Error('请传入requestInstance实例化对象')
    }
    this.$service = config?.requestInstance
  }

  /**
   * 用于快捷获取对应的url
   * @param path community/content/idea/release
   * @param channel
   * @param version
   */
  public getFullUrlByAdmin(path, channel = 'admin', version = 'v1') {
    if (channel === 'admin') return getTreeConfig(AdminApi[version], path.split('/'))
    if (channel === 'app') return getTreeConfig(AppApi[version], path.split('/'))
  }

  // 判断是PC环境
  protected isPc() {
    return this.$config['device'] === 'PC'
  }

  // 判断是否是 uni-app
  protected isUni() {
    return this.$config['device'] === 'UNI'
  }

  // 测试案例
  public testList(option: httpRequest): httpResponse {
    const localOptions = this.mergeRequest(option)
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].home.es.test,
    })
  }

  // 登录接口
  public login(data = {}, option: httpRequest): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].login,
    })
  }

  // 退出接口
  public logoff(data = {}, option: httpRequest): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].logoff,
    })
  }

  // 退出接口
  public register(data = {}, option: httpRequest): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].register,
    })
  }

  // 登录短信验证码
  public smsSend(data = {}, option: httpRequest): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].smsSend,
    })
  }

  // 登录接口
  public test(data = {}, option: httpRequest): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].test,
    })
  }

  // 获取角色列表
  public role(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].role,
    })
  }

  // 切换角色
  public switchRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].switchRole,
    })
  }

  // 设置密码
  public password(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].password,
    })
  }

  // 设置密码
  public smsVerify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].smsVerify,
    })
  }

  // 获取腾讯云 临时凭证
  public apiCreatedCosGet(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].apiCreatedCosGet,
    })
  }

  // 微信签名
  public wxSignature(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].wxSignature,
    })
  }

  // 初始化参数-处理
  mergeRequest(config: httpRequest) {
    if (!isPlainObject(config)) {
      config = {}
    }
    if (!hasOwn(config, 'data')) {
      config['data'] = {}
    }
    if (hasOwn(config, 'version') && !version.includes(<string>config.version)) {
      console.warn('version must be v1 or v2, version default v1')
      config.version = defaultVersion
    }
    if (!hasOwn(config, 'version')) {
      config.version = defaultVersion
    }
    return config
  }
}
