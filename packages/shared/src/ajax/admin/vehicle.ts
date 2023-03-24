import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Vehicle extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   *	车系品牌列表
   * @param data
   * @param option
   */
  public VehicleBrandSelectSeries(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.brand.selectSeries,
    })
  }

  /**
   *	车型-头部参数
   * @param data
   * @param option
   */
  public VehicleBrandSelectParameters(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.brand.selectParameters,
    })
  }

  /**
   *	一级品牌列表
   * @param data
   * @param option
   */
  public VehicleBrandSelectOne(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.brand.selectOne,
    })
  }

  /**
   *	车型列表-树形
   * @param data
   * @param option
   */
  public VehicleBrandSelectMode(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.brand.selectMode,
    })
  }

  /**
   * ocr识别-返单据
   * @param data
   * @param option
   */
  public VehicleBrandOcrGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.brand.ocrGoods,
    })
  }

  /**
   * 分页查询车型库列表
   * @param data
   * @param option
   */
  public communityVehicleModelModelList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.communityVehicleModelModelList,
    })
  }

  /**
 * 车型库详情
 * @param data
 * @param option
 */
  public communityVehicleModelModelDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.communityVehicleModelModelDetail,
    })
  }

  /**
* 绑定车型库详情
* @param data
* @param option
*/
  public communityVehicleModelBindBatchModel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].vehicle.communityVehicleModelBindBatchModel,
    })
  }
    /**
* 车型联动条件查询
* @param data
* @param option
*/
public communityVehicleModelCondition(data = {}, option?: httpRequest) {
  const localOptions = this.mergeRequest({
    data,
    ...option,
  })
  return this.$service.apiPost({
    ...localOptions,
    url: AdminApi[`${localOptions.version}`].vehicle.communityVehicleModelCondition,
  })
}

}
