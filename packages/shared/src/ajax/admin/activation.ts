import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

// 激活列表模块

export default class Activation extends VoHttp {
  constructor(props) {
    super(props)
  }
  /**
   * 激活列表-分页查询列表-POST
   * api: http://10.0.2.42:11122/project/124/interface/api/25907
   * @param data
   * @param option
   */
  public activationRecordQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].activation.activationRecordQueryPage,
    })
  }

  /**
   * 激活列表   取消激活 
   * @param data
   * @param option
   *
   */
  public activationRecordBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].activation.activationRecordBy$id + data.id,
    })
  }

}

