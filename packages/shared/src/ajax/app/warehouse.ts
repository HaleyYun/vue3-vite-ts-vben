// app端 接口列表 继承VoHttp
import { httpRequest } from '../../types'
import VoHttp from './../ajax'
import { AppApi } from './../api'

export default class createHttp extends VoHttp {
  // 供应商-我的仓库
  public apiWarehouseSupplierMy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseSupplierMy,
    })
  }

  // 服务商-我的仓库
  public apiWarehouseMyWarehouses(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseMyWarehouses,
    })
  }
  // 统计-所有仓库
  public apiWarehouseAgentStatisMy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseAgentStatisMy,
    })
  }

  // 服务商-我的仓库
  public apiWarehouseGoodsAgentInvest(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseGoodsAgentInvest,
    })
  }
  // apiWarehouseStatisAgentStockChange App-服务商统计-库存
  public apiWarehouseStatisAgentStockChange(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStatisAgentStockChange,
    })
  }
  // 检验商品识别码是否存在
  public apiWarehouseOperFacilitatorSelfRefillCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperFacilitatorSelfRefillCheck,
    })
  }
  // 服务商批量出库-自有库
  public apiWarehouseOperFacilitatorSelfOutBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperFacilitatorSelfOutBatch,
    })
  }
  // 服务商批量补库存-自有库
  public apiWarehouseOperFacilitatorSelfRefillBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperFacilitatorSelfRefillBatch,
    })
  }
  // 仓储商品识别码分页条件查询
  public apiWarehouseOperAgentGoodsVinPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperAgentGoodsVinPage,
    })
  }
  // 库存日志记录详情
  public apiWarehouseOper$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOper$Id + '/' + data.id,
    })
  }

  // 当前用户-出入库记录按月显示-物流状态可筛选
  public apiWarehouseOperSupplierLogisticsInout(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierLogisticsInout,
    })
  }

  // 服务商-调拨记录-确认入库
  public apiWarehouseOperConfirmStock(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperConfirmStock,
    })
  }
}
