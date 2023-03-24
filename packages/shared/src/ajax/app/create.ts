// app端 接口列表 继承VoHttp
import { httpRequest, httpResponse } from '../../types'
import VoHttp from './../ajax'
import { AppApi } from './../api'

export default class createHttp extends VoHttp {
  // 测试案例
  public createTest(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].home.es.test,
    })
  }
}
