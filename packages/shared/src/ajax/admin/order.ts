import { httpRequest, httpResponse } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

/**
 * 管理后台-订单
 */
export default class OrderHttp extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 订单 投资单列表
   * @param data
   * @param option
   */
  public orderInvestQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.invest.query.list,
    })
  }

  /**
   * 订单 取消列表/v1/order/cancel/cause/save
   * @param data
   * @param option
   */
  public orderCancelCauseSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.cancel.cause.save,
    })
  }

  /**
   * 订单 取消列表/v1/order/cancel/cause/save
   * @param data
   * @param option
   */
  public orderCancelCauseDetails(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.cancel.cause.details,
    })
  }

  /**
   * 订单 设置order/setting//
   * @param data
   * @param option
   */
  public orderSettingList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.setting.list,
    })
  }

  /**
   * 订单 取消列表/v1/order/setting/list
   * @param data
   * @param option
   */
  public orderCancelCausePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.cancel.cause.page,
    })
  }

  /**
   * 订单 取消列表/order/cancel/cause/update/sort
   * @param data
   * @param option
   */
  public orderCancelCauseUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.cancel.cause.update,
    })
  }

  /**
   * 订单 设置order////v1/order/setting/update/batch
   * @param data
   * @param option
   */
  public orderSettingUpdateBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.setting.update.batch,
    })
  }

  /**
   * 订单 排序列表/order/cancel/cause/update/sort
   * @param data
   * @param option
   */
  public orderCancelCauseUpdateSort(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.cancel.cause.toUpdate.sort,
    })
  }

  /**
   * 取消订单 删除列表v1/order/cancel/cause/batch/delete
   * @param data
   * @param option
   */
  public orderCancelCauseBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.cancel.cause.batch.delete,
    })
  }

  /**
   * 订单 仓库/v1/order/house/company/ids
   * @param data
   * @param option
   */
  public orderHouseCompanyIds(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.house.company.ids,
    })
  }

  /**
   * 订单详情/v1/order/refund/detail
   * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
   * @param data
   * @param option
   */
  public orderRefundDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.detail,
    })
  }

  /**
   * 订单审核//v1/order/refund/audit
   * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
   * @param data
   * @param option
   */
  public orderRefundQueryOperatelog(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.query.operatelog,
    })
  }

  //订单仓库, /v1/order/refund/query/warehouses
  // public orderRefundQueryWarehouses(data = {}, option?: httpRequest) {
  //   const localOptions = this.mergeRequest({
  //     data,
  //     ...option,
  //   })
  //   return this.$service.apiGet({
  //     ...localOptions,
  //     url: AdminApi[`${localOptions.version}`].order.refund.query.warehouses,
  //   })
  // }
  /**
   * 订单审核/v1/order/refund/calculate/amount
   * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
   * @param data
   * @param option
   */
  public orderRefundAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.audit,
    })
  }

  /**
   * 订单数量回显/v1/order/refund/calculate/amount
   * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
   * @param data
   * @param option
   */
  public orderRefundCalculateAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.calculate.amount,
    })
  }

  //原因/v1/order/refund/cause/query/list
  public orderRefundCauseQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.cause.query.list,
    })
  }
    //获取识别码/v1/order/refund/get/refund/engine/code
    public orderRefundGetRefundEngineCode(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].order.orderRefundGetRefundEngineCode,
      })
    }

  //物流v1/order/refund/create/delivery
  public orderRefundCreateDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.create.delivery,
    })
  }

  //修改物流orderRefundUpdateDelivery
  public orderRefundUpdateDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRefundUpdateDelivery,
    })
  }

  //修改订单/v1/order/refund/update/apply
  public orderRefundUpdateApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.update.apply,
    })
  }

  //发起订单/v1/order/refund/create/fefund/apply
  public orderRefundCreateFeFundApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRefundCreateFeFundApply,
    })
  }

  /**
   * 运营平台-退换货 ---数量
   * api: http://10.0.2.42:11122/mock/52/v1/order/invest/enum/status
   * @param data
   * @param option
   */
  public orderRefundQueryAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRefundQueryAmount,
    })
  }

  /**
   * 订单仓库/v1/order/refund/query/warehouses
   * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
   * @param data
   * @param option
   */
  public orderRefundQueryWarehouses(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.query.warehouses,
    })
  }

  /**
   * 订单 分页查询退款订单列表
   * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
   * @param data
   * @param option
   */
  public orderRefundQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.refund.query.page,
    })
  }

  /**
   * 运营平台-投资订单 -- 投资订单状态枚举orderRefundQueryAmount
   * api: http://10.0.2.42:11122/mock/52/v1/order/invest/enum/status
   * @param data
   * @param option
   */
  public investEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.invest.enum.status,
    })
  }

  /**
   * 是否到货-POST
   *
   * @param data
   * @param option
   */
  public orderRefundReceipt(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRefundReceipt,
    })
  }

   /**
   * 手动退货-POST
   *
   * @param data
   * @param option
   */
    public orderRefundRefund(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].order.orderRefundRefund,
      })
    }


  /**
   * 服务订单指派技术工-查询空闲可指派技术工列表-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/22739
   * @param data
   * @param option
   */
  public orderAssignTechnicians(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAssignTechnicians,
    })
  }

  /**
   * 服务订单指派技术工-派技术工/改派-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/22748
   * @param data
   * @param option
   */
  public orderAssignAssign(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAssignAssign,
    })
  }

  /**
   * 售后订单-售后单详情-GET
   * api: http://10.0.2.42:11122/project/104/interface/api/23396
   * @param data
   * @param option
   */
  public orderAfterSaleBy$id(data: any, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAfterSaleBy$id + data.id,
    })
  }

  /**
   * 售后订单-售后单列表-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23405
   * @param data
   * @param option
   */
  public orderAfterSaleQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAfterSaleQueryList,
    })
  }

  /**
   * 售后订单-售后单审核-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23414
   * @param data
   * @param option
   */
  public orderAfterSaleAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAfterSaleAudit,
    })
  }

  /**
   * 售后订单-售后单订单类型统计-GET
   * api: http://10.0.2.42:11122/project/128/interface/api/24620
   * @param data
   * @param option
   */
  public orderAfterSaleTypeCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAfterSaleTypeCount,
    })
  }

  /**
   * 售后订单-售后订单状态枚举-GET
   * api: http://10.0.2.42:11122/project/128/interface/api/24620
   * @param data
   * @param option
   */
  public orderAfterSaleEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAfterSaleEnumStatus,
    })
  }

  /**
   * 回收服务订单-回收服务订单分页列表-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23774
   * @param data
   * @param option
   */
  public orderRecyclePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRecyclePage,
    })
  }

  /**
   * 回收服务订单-修改订单-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/23774
   * @param data
   * @param option
   */
  public orderRecycleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRecycleUpdate,
    })
  }

  /**
   * 回收服务订单-页签
   * api: http://10.0.2.42:11122/project/104/interface/api/23774
   * @param data
   * @param option
   */
  public orderRecycleListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRecycleListCount,
    })
  }

  /**
   * 回收服务订单-操作记录
   * api: http://10.0.2.42:11122/project/104/interface/api/25673
   * @param data
   * @param option
   */
  public orderRecycleOperateList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRecycleOperateList,
    })
  }

  /**
   * 回收服务订单-详情-GET /vocen-jarvis/v1/order/recycle/update
   * api: http://10.0.2.42:11122/project/104/interface/api/23801
   * @param data
   * @param option
   */
  public orderRecycleDetailBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRecycleDetailBy$id + data.id,
    })
  }

  /**
   * 旧机订单-列表-GET/
   * api: http://10.0.2.42:11122/project/104/interface/api/23801
   * @param data
   * @param option
   */
  public orderOldQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderOldQueryList,
    })
  }

  /**
   * 旧机订单-详情-GET
   * api: http://10.0.2.42:11122/project/104/interface/api/23801
   * @param data
   * @param option
   */
  public orderOldBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderOldBy$id + data.id,
    })
  }

  /**
   * 旧机订单-获取订单状态-GET
   * api: http://10.0.2.42:11122/project/104/interface/api/23801
   * @param data
   * @param option
   */
  public orderOldEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderOldEnumStatus,
    })
  }

  /**
   * 旧机订单-提醒发货记录-GET
   * api: http://10.0.2.42:11122/project/104/interface/api/23801
   * @param data
   * @param option
   */
  public orderOldWarnLogBy$OrderId(data = { orderId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderOldWarnLogBy$OrderId + data.orderId,
    })
  }

  /**
   * 售后上门-售后上门单取消-POST
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleCancel,
    })
  }

  /**
   * 售后上门-售后上门单生成-POST
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleSave,
    })
  }

  /**
   * 售后上门-售后上门单更新-PUT
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleUpdate,
    })
  }

  /**
   * 售后上门-售后上门单列表-POST
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleQueryPage,
    })
  }

  /**
   * 售后上门-售后上门单详情-POST
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleDetailBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleDetailBy$id + data.id,
    })
  }

  /**
   * 售后上门-售后上门单生成-POST
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleEnumStatus,
    })
  }

  /**
   * 售后上门-售后上门单订单状态统计-GET
   * api: http://10.0.2.42:11122/project/128/interface/api/24530
   * @param data
   * @param option
   */
  public orderSupportAfterSaleCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleCount,
    })
  }

  /**
   * 售后服务订单确认-POST
   * api: http://10.0.2.42:11122/project/128/interface/api/26087
   * @param data
   * @param option
   */
  public orderSupportAfterSaleConfirm(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSupportAfterSaleConfirm,
    })
  }

  /**
   * 安装/回收服务评价详情-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/26060
   * @param data
   * @param option
   */
  public orderEvaluateServiceDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderEvaluateServiceDetail,
    })
  }

  /**
   * 安装/回收服务评价分页列表-POST
   * api: http://10.0.2.42:11122/project/104/interface/api/26060
   * @param data
   * @param option
   */
  public orderEvaluateServicePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderEvaluateServicePage,
    })
  }

  /**
   * 安装/回收服务评价页签-POSTorder/evaluate/service/list/count
   * api: http://10.0.2.42:11122/project/104/interface/api/26114
   * @param data
   * @param option
   */
  public orderEvaluateServiceListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderEvaluateServiceListCount,
    })
  }

  /**
   * 违约订单列表
   * api: http://10.0.2.42:11122/project/104/interface/api/26213
   * @param data
   * @param option
   */
  public orderAssignQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAssignQueryList,
    })
  }

  /**
   * 违约订单页签
   * api: http://10.0.2.42:11122/project/104/interface/api/26411
   * @param data
   * @param option
   */
  public orderAssignQueryStatist(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAssignQueryStatist,
    })
  }

  /**
   * 售后服务评价分页列表
   * api: http://10.0.2.42:11122/project/104/interface/api/26321
   * @param data
   * @param option
   */
  public orderEvaluateAfterSalePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderEvaluateAfterSalePage,
    })
  }

  /**
   * 售后服务评价页签数量初始化统计
   * api: http://10.0.2.42:11122/project/104/interface/api/26330
   * @param data
   * @param option
   */
  public orderEvaluateAfterSaleCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderEvaluateAfterSaleCount,
    })
  }

  /**
   * 违约订单明细
   * api: http://10.0.2.42:11122/project/104/interface/api/26393
   * @param data
   * @param option
   */
  public orderAssignQueryDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderAssignQueryDetail,
    })
  }

  /**
   * 客户统计-客户进货排名
   * api: http://10.0.2.42:11122/project/132/interface/api/27302
   * @param data
   * @param option
   * @method POST
   */
  public orderCountCustomerPurchaseRanking(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountCustomerPurchaseRanking,
    })
  }

  /**
   * 客户统计-客户销货排名
   * api: http://10.0.2.42:11122/project/132/interface/api/27311
   * @param data
   * @param option
   * @method POST
   */
  public orderCountCustomerSalesRanking(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountCustomerSalesRanking,
    })
  }

  /**
   * /订单统计-投资订单统计
   * api: http://10.0.2.42:11122/project/132/interface/api/27203
   * @param data
   * @param option
   * @method POST
   */
  public orderCountInvestCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountInvestCount,
    })
  }

  /**
   * 订单统计-订单统计-销售订单统计
   * api: http://10.0.2.42:11122/project/132/interface/api/27311
   * @param data
   * @param option
   * @method POST
   */
  public orderCountSellCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountSellCount,
    })
  }

  /**
   * 订单统计-投资统计
   * api: http://10.0.2.42:11122/project/132/interface/api/27248
   * @param data
   * @param option
   * @method POST
   */
  public orderCountInvestBrandCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountInvestBrandCount,
    })
  }

  /**
   * 订单统计-投资订单退货退款
   * api: http://10.0.2.42:11122/project/132/interface/api/27257
   * @param data
   * @param option
   * @method POST
   *
   */
  public orderCountInvestRefundCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountInvestRefundCount,
    })
  }

  /**
   * 订单统计-销货统计
   * api: http://10.0.2.42:11122/project/132/interface/api/27266
   * @param data
   * @param option
   * @method POST
   */
  public orderCountSellBrandCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountSellBrandCount,
    })
  }

  /**
   * 订单统计-销售订单明细统计
   * api: http://10.0.2.42:11122/project/132/interface/api/27275
   * @param data
   * @param option
   * @method POST
   */
  public orderCountSellItemCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountSellItemCount,
    })
  }

  /**
   * 订单统计-销售退货统计
   * api: http://10.0.2.42:11122/project/132/interface/api/27284
   * @param data
   * @param option
   * @method POST
   */
  public orderCountSellRefundBrandCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountSellRefundBrandCount,
    })
  }

  /**
   * 进货订单 orderSellWarnLog
   */
  public orderSellWarnLog(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSellWarnLog + data.id,
    })
  }

  /**
   * 订单统计-超时未付款销售订单统计
   */
  public orderCountSellOverTimeCount(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountSellOverTimeCount,
    })
  }

  /**
   * orderCountCustomerInvestCountRanking 客户统计-客户投资次数排名
   */
  public orderCountCustomerInvestCountRanking(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountCustomerInvestCountRanking,
    })
  }

  /**
   * orderRefundCheckOrder 校验订单那
   */
  public orderRefundCheckOrder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRefundCheckOrder,
    })
  }

  /**
   * orderCountAccountPayableList 订单统计-应付账款
   */

  public orderCountAccountPayableList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountAccountPayableList,
    })
  }

  /**
   *
   orderCountAccountReceivableList // 订单统计-应收账款
   */
  public orderCountAccountReceivableList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountAccountReceivableList,
    })
  }

  // 订单统计-退货销售订单统计 orderCountSellRefundCount
  public orderCountSellRefundCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderCountSellRefundCount,
    })
  }

  // 查询退款订单 orderRefundQueryList
  public orderRefundQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderRefundQueryList,
    })
  }


  // end
}
