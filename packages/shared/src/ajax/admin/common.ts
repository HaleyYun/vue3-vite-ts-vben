import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { CommonApi } from '../api'

export default class Common extends VoHttp {
  constructor(props) {
    super(props)
  }

  // 根据地区父级code获取所有子级
  public sixHotAreaSub(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].sixHotAreaSub,
    })
  }
}
