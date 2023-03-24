import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

// 安装服务订单模块

export default class Support extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 安装服务订单-安装订单列表查询-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23540
   * @param data
   * @param option
   */
  public supportInstallQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].support.supportInstallQueryList,
    })
  }

  /**
 * 安装服务订单-页签-Get
 * api: http://10.0.2.42:11122/project/104/interface/api/23540
 * @param data
 * @param option
 */
  public supportInstallListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].support.supportInstallListCount,
    })
  }

  /**
   * 安装服务订单-查看详情-GET
   * api: http://10.0.2.42:11122/project/104/interface/api/23549
   * @param data
   * @param option
   */
  public supportInstallDetailBy$id(data = { id: "" }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].support.supportInstallDetailBy$id + data.id,
    })
  }

  /**
   * 安装服务订单-修改安装服务单-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23936
   * @param data
   * @param option
   */
  public supportInstallUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].support.supportInstallUpdate,
    })
  }

  /**
   * 安装服务订单-确认安装完成-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23945
   * @param data
   * @param option
   */
  public supportInstallConfirm(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].support.supportInstallConfirm,
    })
  }

  /**
   * 安装服务订单-订单处理结果-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23954
   * @param data
   * @param option
   */
  public supportInstallHandel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].support.supportInstallHandel,
    })
  }
  
}
