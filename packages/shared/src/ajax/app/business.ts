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

  // 一级品牌列表
  public businessVehicleBrandSelectOne(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.brand.selectOne,
    })
  }

  // 品牌参数获取
  public businessVehicleBrandSelectParameters(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.brand.selectParameters,
    })
  }

  // 车型列表-树形
  public businessVehicleBrandSelectMode(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.brand.selectMode,
    })
  }
  // 根据品牌ID找车系列表
  public businessVehicleBrandSelectSeries(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.brand.selectSeries,
    })
  }
}
