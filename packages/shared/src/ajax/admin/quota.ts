import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Quota extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 获取账期额度调整记录列表-GET
   * @param data
   * @param option
   */
  public quotaRecordPage(data = {id:''}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].quota.quotaRecordPage,
    })
  }

  /**
   * 获取账期额度信息-GET
   * @param data
   * @param option
   */
  public quotaGetBy$CompanyId(data = {companyId:''}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].quota.quotaGetBy$CompanyId+data.companyId,
    })
  }

  /**
   * 新增账期额度-GET
   * @param data
   * @param option
   */
  public quotaAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].quota.quotaAdd,
    })
  }


  /**
   * 保存账期系数 quotaCoefficientSave
   * @param data
   * @param option
   */
  public quotaCoefficientSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].quota.quotaCoefficientSave,
    })
  }
}
