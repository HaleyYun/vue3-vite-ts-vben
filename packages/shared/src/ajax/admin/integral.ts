import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Integral extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 查询积分成长值规则
   * @param data
   * @param option
   *
   */
  public integralRuleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].integral.integralRuleList,
    })
  }

  /**
   * 查询积分成长值规则
   * @param data
   * @param option
   *
   */
  public integralRuleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].integral.integralRuleUpdate,
    })
  }

  /**
   * 查询等级设置
   * @param data
   * @param option
   *
   */
  public integralUserLevelList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].integral.integralUserLevelList,
    })
  }

  /**
   * 新增等级设置
   * @param data
   * @param option
   *
   */
  public integralUserLevelAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].integral.integralUserLevelAdd,
    })
  }

  /**
   * 修改等级设置
   * @param data
   * @param option
   *
   */
  public integralUserLevelUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].integral.integralUserLevelUpdate,
    })
  }

  /**
   * 查询用户成长值积分明细 grantRecordList
   */
  public grantRecordList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].integral.grantRecordList,
    })
  }




}
