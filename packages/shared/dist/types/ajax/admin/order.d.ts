import { httpRequest } from '../../types';
import VoHttp from '../ajax';
/**
 * 管理后台-订单
 */
export default class OrderHttp extends VoHttp {
    constructor(props: any);
    /**
     * 订单 投资单列表
     * @param data
     * @param option
     */
    orderInvestQueryList(data?: {}, option?: httpRequest): any;
    /**
     * 订单 取消列表/v1/order/cancel/cause/save
     * @param data
     * @param option
     */
    orderCancelCauseSave(data?: {}, option?: httpRequest): any;
    /**
     * 订单 取消列表/v1/order/cancel/cause/save
     * @param data
     * @param option
     */
    orderCancelCauseDetails(data?: {}, option?: httpRequest): any;
    /**
     * 订单 设置order/setting//
     * @param data
     * @param option
     */
    orderSettingList(data?: {}, option?: httpRequest): any;
    /**
     * 订单 取消列表/v1/order/setting/list
     * @param data
     * @param option
     */
    orderCancelCausePage(data?: {}, option?: httpRequest): any;
    /**
     * 订单 取消列表/order/cancel/cause/update/sort
     * @param data
     * @param option
     */
    orderCancelCauseUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 订单 设置order////v1/order/setting/update/batch
     * @param data
     * @param option
     */
    orderSettingUpdateBatch(data?: {}, option?: httpRequest): any;
    /**
     * 订单 排序列表/order/cancel/cause/update/sort
     * @param data
     * @param option
     */
    orderCancelCauseUpdateSort(data?: {}, option?: httpRequest): any;
    /**
     * 取消订单 删除列表v1/order/cancel/cause/batch/delete
     * @param data
     * @param option
     */
    orderCancelCauseBatchDelete(data?: {}, option?: httpRequest): any;
    /**
     * 订单 仓库/v1/order/house/company/ids
     * @param data
     * @param option
     */
    orderHouseCompanyIds(data?: {}, option?: httpRequest): any;
    /**
     * 订单详情/v1/order/refund/detail
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    orderRefundDetail(data?: {}, option?: httpRequest): any;
    /**
     * 订单审核//v1/order/refund/audit
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    orderRefundQueryOperatelog(data?: {}, option?: httpRequest): any;
    /**
     * 订单审核/v1/order/refund/calculate/amount
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    orderRefundAudit(data?: {}, option?: httpRequest): any;
    /**
     * 订单数量回显/v1/order/refund/calculate/amount
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    orderRefundCalculateAmount(data?: {}, option?: httpRequest): any;
    orderRefundCauseQueryList(data?: {}, option?: httpRequest): any;
    orderRefundGetRefundEngineCode(data?: {}, option?: httpRequest): any;
    orderRefundCreateDelivery(data?: {}, option?: httpRequest): any;
    orderRefundUpdateDelivery(data?: {}, option?: httpRequest): any;
    orderRefundUpdateApply(data?: {}, option?: httpRequest): any;
    orderRefundCreateFeFundApply(data?: {}, option?: httpRequest): any;
    /**
     * 运营平台-退换货 ---数量
     * api: http://10.0.2.42:11122/mock/52/v1/order/invest/enum/status
     * @param data
     * @param option
     */
    orderRefundQueryAmount(data?: {}, option?: httpRequest): any;
    /**
     * 订单仓库/v1/order/refund/query/warehouses
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    orderRefundQueryWarehouses(data?: {}, option?: httpRequest): any;
    /**
     * 订单 分页查询退款订单列表
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    orderRefundQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 运营平台-投资订单 -- 投资订单状态枚举orderRefundQueryAmount
     * api: http://10.0.2.42:11122/mock/52/v1/order/invest/enum/status
     * @param data
     * @param option
     */
    investEnumStatus(data?: {}, option?: httpRequest): any;
    /**
     * 是否到货-POST
     *
     * @param data
     * @param option
     */
    orderRefundReceipt(data?: {}, option?: httpRequest): any;
    /**
    * 手动退货-POST
    *
    * @param data
    * @param option
    */
    orderRefundRefund(data?: {}, option?: httpRequest): any;
    /**
     * 服务订单指派技术工-查询空闲可指派技术工列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/22739
     * @param data
     * @param option
     */
    orderAssignTechnicians(data?: {}, option?: httpRequest): any;
    /**
     * 服务订单指派技术工-派技术工/改派-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/22748
     * @param data
     * @param option
     */
    orderAssignAssign(data?: {}, option?: httpRequest): any;
    /**
     * 售后订单-售后单详情-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23396
     * @param data
     * @param option
     */
    orderAfterSaleBy$id(data: any, option?: httpRequest): any;
    /**
     * 售后订单-售后单列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23405
     * @param data
     * @param option
     */
    orderAfterSaleQueryList(data?: {}, option?: httpRequest): any;
    /**
     * 售后订单-售后单审核-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23414
     * @param data
     * @param option
     */
    orderAfterSaleAudit(data?: {}, option?: httpRequest): any;
    /**
     * 售后订单-售后单订单类型统计-GET
     * api: http://10.0.2.42:11122/project/128/interface/api/24620
     * @param data
     * @param option
     */
    orderAfterSaleTypeCount(data?: {}, option?: httpRequest): any;
    /**
     * 售后订单-售后订单状态枚举-GET
     * api: http://10.0.2.42:11122/project/128/interface/api/24620
     * @param data
     * @param option
     */
    orderAfterSaleEnumStatus(data?: {}, option?: httpRequest): any;
    /**
     * 回收服务订单-回收服务订单分页列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23774
     * @param data
     * @param option
     */
    orderRecyclePage(data?: {}, option?: httpRequest): any;
    /**
     * 回收服务订单-修改订单-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23774
     * @param data
     * @param option
     */
    orderRecycleUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 回收服务订单-页签
     * api: http://10.0.2.42:11122/project/104/interface/api/23774
     * @param data
     * @param option
     */
    orderRecycleListCount(data?: {}, option?: httpRequest): any;
    /**
     * 回收服务订单-操作记录
     * api: http://10.0.2.42:11122/project/104/interface/api/25673
     * @param data
     * @param option
     */
    orderRecycleOperateList(data?: {}, option?: httpRequest): any;
    /**
     * 回收服务订单-详情-GET /vocen-jarvis/v1/order/recycle/update
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    orderRecycleDetailBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 旧机订单-列表-GET/
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    orderOldQueryList(data?: {}, option?: httpRequest): any;
    /**
     * 旧机订单-详情-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    orderOldBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 旧机订单-获取订单状态-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    orderOldEnumStatus(data?: {}, option?: httpRequest): any;
    /**
     * 旧机订单-提醒发货记录-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    orderOldWarnLogBy$OrderId(data?: {
        orderId: string;
    }, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单取消-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleCancel(data?: {}, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单生成-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleSave(data?: {}, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单更新-PUT
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单列表-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单详情-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleDetailBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单生成-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleEnumStatus(data?: {}, option?: httpRequest): any;
    /**
     * 售后上门-售后上门单订单状态统计-GET
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    orderSupportAfterSaleCount(data?: {}, option?: httpRequest): any;
    /**
     * 售后服务订单确认-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/26087
     * @param data
     * @param option
     */
    orderSupportAfterSaleConfirm(data?: {}, option?: httpRequest): any;
    /**
     * 安装/回收服务评价详情-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/26060
     * @param data
     * @param option
     */
    orderEvaluateServiceDetail(data?: {}, option?: httpRequest): any;
    /**
     * 安装/回收服务评价分页列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/26060
     * @param data
     * @param option
     */
    orderEvaluateServicePage(data?: {}, option?: httpRequest): any;
    /**
     * 安装/回收服务评价页签-POSTorder/evaluate/service/list/count
     * api: http://10.0.2.42:11122/project/104/interface/api/26114
     * @param data
     * @param option
     */
    orderEvaluateServiceListCount(data?: {}, option?: httpRequest): any;
    /**
     * 违约订单列表
     * api: http://10.0.2.42:11122/project/104/interface/api/26213
     * @param data
     * @param option
     */
    orderAssignQueryList(data?: {}, option?: httpRequest): any;
    /**
     * 违约订单页签
     * api: http://10.0.2.42:11122/project/104/interface/api/26411
     * @param data
     * @param option
     */
    orderAssignQueryStatist(data?: {}, option?: httpRequest): any;
    /**
     * 售后服务评价分页列表
     * api: http://10.0.2.42:11122/project/104/interface/api/26321
     * @param data
     * @param option
     */
    orderEvaluateAfterSalePage(data?: {}, option?: httpRequest): any;
    /**
     * 售后服务评价页签数量初始化统计
     * api: http://10.0.2.42:11122/project/104/interface/api/26330
     * @param data
     * @param option
     */
    orderEvaluateAfterSaleCount(data?: {}, option?: httpRequest): any;
    /**
     * 违约订单明细
     * api: http://10.0.2.42:11122/project/104/interface/api/26393
     * @param data
     * @param option
     */
    orderAssignQueryDetail(data?: {}, option?: httpRequest): any;
    /**
     * 客户统计-客户进货排名
     * api: http://10.0.2.42:11122/project/132/interface/api/27302
     * @param data
     * @param option
     * @method POST
     */
    orderCountCustomerPurchaseRanking(data?: {}, option?: httpRequest): any;
    /**
     * 客户统计-客户销货排名
     * api: http://10.0.2.42:11122/project/132/interface/api/27311
     * @param data
     * @param option
     * @method POST
     */
    orderCountCustomerSalesRanking(data?: {}, option?: httpRequest): any;
    /**
     * /订单统计-投资订单统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27203
     * @param data
     * @param option
     * @method POST
     */
    orderCountInvestCount(data?: {}, option?: httpRequest): any;
    /**
     * 订单统计-订单统计-销售订单统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27311
     * @param data
     * @param option
     * @method POST
     */
    orderCountSellCount(data?: {}, option?: httpRequest): any;
    /**
     * 订单统计-投资统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27248
     * @param data
     * @param option
     * @method POST
     */
    orderCountInvestBrandCount(data?: {}, option?: httpRequest): any;
    /**
     * 订单统计-投资订单退货退款
     * api: http://10.0.2.42:11122/project/132/interface/api/27257
     * @param data
     * @param option
     * @method POST
     *
     */
    orderCountInvestRefundCount(data?: {}, option?: httpRequest): any;
    /**
     * 订单统计-销货统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27266
     * @param data
     * @param option
     * @method POST
     */
    orderCountSellBrandCount(data?: {}, option?: httpRequest): any;
    /**
     * 订单统计-销售订单明细统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27275
     * @param data
     * @param option
     * @method POST
     */
    orderCountSellItemCount(data?: {}, option?: httpRequest): any;
    /**
     * 订单统计-销售退货统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27284
     * @param data
     * @param option
     * @method POST
     */
    orderCountSellRefundBrandCount(data?: {}, option?: httpRequest): any;
    /**
     * 进货订单 orderSellWarnLog
     */
    orderSellWarnLog(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 订单统计-超时未付款销售订单统计
     */
    orderCountSellOverTimeCount(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * orderCountCustomerInvestCountRanking 客户统计-客户投资次数排名
     */
    orderCountCustomerInvestCountRanking(data?: {}, option?: httpRequest): any;
    /**
     * orderRefundCheckOrder 校验订单那
     */
    orderRefundCheckOrder(data?: {}, option?: httpRequest): any;
    /**
     * orderCountAccountPayableList 订单统计-应付账款
     */
    orderCountAccountPayableList(data?: {}, option?: httpRequest): any;
    /**
     *
     orderCountAccountReceivableList // 订单统计-应收账款
     */
    orderCountAccountReceivableList(data?: {}, option?: httpRequest): any;
    orderCountSellRefundCount(data?: {}, option?: httpRequest): any;
    orderRefundQueryList(data?: {}, option?: httpRequest): any;
}
