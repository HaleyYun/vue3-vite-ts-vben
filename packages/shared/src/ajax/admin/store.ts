import { httpRequest, httpResponse } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'
import { $sixhot, $warehouse } from '../helpers/amdin-api-prefix-v1'

// 仓库 --- 仓库管理 ———————— 根据仓库类型查询分页 /v1/warehouse/queryWareHousePage

export default class StoreHttp extends VoHttp {
  constructor(props) {
    super(props)
  }

  // 分页查询企业信息列表
  public warehouseQueryWareHousePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.queryWareHousePage,
    })
  }

  // 保存warehouse/delivery
  public warehouseDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseDelivery,
    })
  }

  public warehouseDelete(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiRequest({
      ...localOptions,
      method: 'DELETE',
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseDelete + '?id=' + data.id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  /**
   * @description 到货时效
   */
  public warehouseArrivalPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.arrival.page,
    })
  }

  /**
   * @description 到货时效Page
   */
  public warehouseArrivalQueryWarehouseArrivalTimePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.arrival.queryWarehouseArrivalTimePage,
    })
  }

  //删除/v1/warehouse/arrival
  public wareHouseArrival(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiRequest({
      ...localOptions,
      method: 'DELETE',
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseArrival + '?id=' + data.id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  //获取到货时效/v1/warehouse/arrival/{id}
  public warehouseArrivalDay(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      data: { ...localOptions.data, id: data.id },
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseArrivalDay,
    })
  }

  //更新到货时效/v1/warehouse/arrival
  public warehouseArrivalTime(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      // data: { ...localOptions.data, id: data.id },
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseArrivalTime,
    })
  }

  /**
   * @description 新增到货时效/v1/warehouse/arrival
   */
  public warehousePrescription(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehousePrescription,
    })
  }

  /**
   * @description 仓储管理 --  禁用（首页列表）
   */
  public warehouseforbidden(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.forbidden,
    })
  }

  /**
   * @description 仓储管理 --  禁用（首页列表）
   */
  public warehouseStartup(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.startup,
    })
  }

  // 分页查询企业信息列表 http://10.0.2.42:11122/mock/85/v1/warehouse
  public warehouseAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseAdd,
    })
  }

  public warehouseChange(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseAdd,
    })
  }

  // 到货时效
  public queryWareHouseDropDown(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.queryWareHouseDropDown,
    })
  }

  // 发货时效warehouse/delivery/page
  public warehouseDeliveryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery.query,
    })
  }

  public warehouseStatisSupplierInout(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.statis.supplier.inout,
    })
  }

  /*
   * 仓储 -- 供应商补库存记录按月统计（/v1/warehouse/statis/supplier/refill）
   * */
  public warehouseStatisticsSupplierRefill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.statis.supplier.refill,
    })
  }

  /*
   * 仓储 -- 供应商调拨记录按月统计
   * */
  public warehouseStatisSupplierTransfe(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.statis.supplier.transfer,
    })
  }

  /*
   * 仓储 -- 分页查询发货时效规则
   * */
  public deliveryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery.page,
    })
  }

  /*
   * 仓储 -- 分页查询发货时效规则
   * */
  public deliveryByIDViewDetails(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.ID,
    })
  }

  /*
   * 仓储 -- 分页查询发货时效规则
   * */
  public batchAddTimeLimit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse,
    })
  }

  /*
   * 仓储 -- 分页查询发货时效规则
   * */
  public AddBatchTimeLimit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery.batchAddTimeLimit,
    })
  }

  /*
   * 仓储 -- 修改发货时效
   * */
  public changeTimeLimit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery,
    })
  }

  /*
   * 仓储 -- 修改发货时效
   * */
  public batchDeleteTimeLimit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery.batchDeleteTimeLimit,
    })
  }

  /*
   * 仓储 -- 按 id 删除数据
   * */
  public deleteTimeLimit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery.deleteTimeLimit,
    })
  }

  // page: `${$warehouse}delivery/page`,
  // ID: `${$warehouse}delivery/`,
  // batchAddTimeLimit: `${$warehouse}delivery`,
  // changeTimeLimit: `${$warehouse}delivery`,
  // batchDeleteTimeLimit: `${$warehouse}delivery/batch`,

  /*
   * 仓储 -- 供应商调拨记录按月统计
   * */
  // public warehouseStatisSupplierTransfe(data = {}, option?: httpRequest) {
  //   const localOptions = this.mergeRequest({
  //     data,
  //     ...option,
  //   })
  //   return this.$service.apiPost({
  //     ...localOptions,
  //     url: AdminApi[`${localOptions.version}`].warehouse.statis.supplier.transfer,
  //   })
  // }

  // end
}
