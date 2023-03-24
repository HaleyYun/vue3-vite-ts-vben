"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ajax_1 = require("../ajax");
var api_1 = require("../api");
/**
 * 管理后台-订单
 */
var OrderHttp = /** @class */ (function (_super) {
    __extends(OrderHttp, _super);
    function OrderHttp(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 订单 投资单列表
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderInvestQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.invest.query.list }));
    };
    /**
     * 订单 取消列表/v1/order/cancel/cause/save
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderCancelCauseSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.cancel.cause.save }));
    };
    /**
     * 订单 取消列表/v1/order/cancel/cause/save
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderCancelCauseDetails = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.cancel.cause.details }));
    };
    /**
     * 订单 设置order/setting//
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSettingList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.setting.list }));
    };
    /**
     * 订单 取消列表/v1/order/setting/list
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderCancelCausePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.cancel.cause.page }));
    };
    /**
     * 订单 取消列表/order/cancel/cause/update/sort
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderCancelCauseUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.cancel.cause.update }));
    };
    /**
     * 订单 设置order////v1/order/setting/update/batch
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSettingUpdateBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.setting.update.batch }));
    };
    /**
     * 订单 排序列表/order/cancel/cause/update/sort
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderCancelCauseUpdateSort = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.cancel.cause.toUpdate.sort }));
    };
    /**
     * 取消订单 删除列表v1/order/cancel/cause/batch/delete
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderCancelCauseBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.cancel.cause.batch.delete }));
    };
    /**
     * 订单 仓库/v1/order/house/company/ids
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderHouseCompanyIds = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.house.company.ids }));
    };
    /**
     * 订单详情/v1/order/refund/detail
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.detail }));
    };
    /**
     * 订单审核//v1/order/refund/audit
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundQueryOperatelog = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.query.operatelog }));
    };
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
    OrderHttp.prototype.orderRefundAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.audit }));
    };
    /**
     * 订单数量回显/v1/order/refund/calculate/amount
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundCalculateAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.calculate.amount }));
    };
    //原因/v1/order/refund/cause/query/list
    OrderHttp.prototype.orderRefundCauseQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.cause.query.list }));
    };
    //获取识别码/v1/order/refund/get/refund/engine/code
    OrderHttp.prototype.orderRefundGetRefundEngineCode = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundGetRefundEngineCode }));
    };
    //物流v1/order/refund/create/delivery
    OrderHttp.prototype.orderRefundCreateDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.create.delivery }));
    };
    //修改物流orderRefundUpdateDelivery
    OrderHttp.prototype.orderRefundUpdateDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundUpdateDelivery }));
    };
    //修改订单/v1/order/refund/update/apply
    OrderHttp.prototype.orderRefundUpdateApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.update.apply }));
    };
    //发起订单/v1/order/refund/create/fefund/apply
    OrderHttp.prototype.orderRefundCreateFeFundApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundCreateFeFundApply }));
    };
    /**
     * 运营平台-退换货 ---数量
     * api: http://10.0.2.42:11122/mock/52/v1/order/invest/enum/status
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundQueryAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundQueryAmount }));
    };
    /**
     * 订单仓库/v1/order/refund/query/warehouses
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundQueryWarehouses = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.query.warehouses }));
    };
    /**
     * 订单 分页查询退款订单列表
     * api: http://10.0.2.42:11122/mock/52/v1/order/refund/query/page
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.refund.query.page }));
    };
    /**
     * 运营平台-投资订单 -- 投资订单状态枚举orderRefundQueryAmount
     * api: http://10.0.2.42:11122/mock/52/v1/order/invest/enum/status
     * @param data
     * @param option
     */
    OrderHttp.prototype.investEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.invest.enum.status }));
    };
    /**
     * 是否到货-POST
     *
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRefundReceipt = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundReceipt }));
    };
    /**
    * 手动退货-POST
    *
    * @param data
    * @param option
    */
    OrderHttp.prototype.orderRefundRefund = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundRefund }));
    };
    /**
     * 服务订单指派技术工-查询空闲可指派技术工列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/22739
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAssignTechnicians = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAssignTechnicians }));
    };
    /**
     * 服务订单指派技术工-派技术工/改派-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/22748
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAssignAssign = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAssignAssign }));
    };
    /**
     * 售后订单-售后单详情-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23396
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAfterSaleBy$id = function (data, option) {
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAfterSaleBy$id + data.id }));
    };
    /**
     * 售后订单-售后单列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23405
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAfterSaleQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAfterSaleQueryList }));
    };
    /**
     * 售后订单-售后单审核-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23414
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAfterSaleAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAfterSaleAudit }));
    };
    /**
     * 售后订单-售后单订单类型统计-GET
     * api: http://10.0.2.42:11122/project/128/interface/api/24620
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAfterSaleTypeCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAfterSaleTypeCount }));
    };
    /**
     * 售后订单-售后订单状态枚举-GET
     * api: http://10.0.2.42:11122/project/128/interface/api/24620
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAfterSaleEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAfterSaleEnumStatus }));
    };
    /**
     * 回收服务订单-回收服务订单分页列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23774
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRecyclePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRecyclePage }));
    };
    /**
     * 回收服务订单-修改订单-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23774
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRecycleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRecycleUpdate }));
    };
    /**
     * 回收服务订单-页签
     * api: http://10.0.2.42:11122/project/104/interface/api/23774
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRecycleListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRecycleListCount }));
    };
    /**
     * 回收服务订单-操作记录
     * api: http://10.0.2.42:11122/project/104/interface/api/25673
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRecycleOperateList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRecycleOperateList }));
    };
    /**
     * 回收服务订单-详情-GET /vocen-jarvis/v1/order/recycle/update
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderRecycleDetailBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRecycleDetailBy$id + data.id }));
    };
    /**
     * 旧机订单-列表-GET/
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderOldQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderOldQueryList }));
    };
    /**
     * 旧机订单-详情-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderOldBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderOldBy$id + data.id }));
    };
    /**
     * 旧机订单-获取订单状态-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderOldEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderOldEnumStatus }));
    };
    /**
     * 旧机订单-提醒发货记录-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23801
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderOldWarnLogBy$OrderId = function (data, option) {
        if (data === void 0) { data = { orderId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderOldWarnLogBy$OrderId + data.orderId }));
    };
    /**
     * 售后上门-售后上门单取消-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleCancel }));
    };
    /**
     * 售后上门-售后上门单生成-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleSave }));
    };
    /**
     * 售后上门-售后上门单更新-PUT
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleUpdate }));
    };
    /**
     * 售后上门-售后上门单列表-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleQueryPage }));
    };
    /**
     * 售后上门-售后上门单详情-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleDetailBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleDetailBy$id + data.id }));
    };
    /**
     * 售后上门-售后上门单生成-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleEnumStatus }));
    };
    /**
     * 售后上门-售后上门单订单状态统计-GET
     * api: http://10.0.2.42:11122/project/128/interface/api/24530
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleCount }));
    };
    /**
     * 售后服务订单确认-POST
     * api: http://10.0.2.42:11122/project/128/interface/api/26087
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderSupportAfterSaleConfirm = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSupportAfterSaleConfirm }));
    };
    /**
     * 安装/回收服务评价详情-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/26060
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderEvaluateServiceDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderEvaluateServiceDetail }));
    };
    /**
     * 安装/回收服务评价分页列表-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/26060
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderEvaluateServicePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderEvaluateServicePage }));
    };
    /**
     * 安装/回收服务评价页签-POSTorder/evaluate/service/list/count
     * api: http://10.0.2.42:11122/project/104/interface/api/26114
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderEvaluateServiceListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderEvaluateServiceListCount }));
    };
    /**
     * 违约订单列表
     * api: http://10.0.2.42:11122/project/104/interface/api/26213
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAssignQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAssignQueryList }));
    };
    /**
     * 违约订单页签
     * api: http://10.0.2.42:11122/project/104/interface/api/26411
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAssignQueryStatist = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAssignQueryStatist }));
    };
    /**
     * 售后服务评价分页列表
     * api: http://10.0.2.42:11122/project/104/interface/api/26321
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderEvaluateAfterSalePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderEvaluateAfterSalePage }));
    };
    /**
     * 售后服务评价页签数量初始化统计
     * api: http://10.0.2.42:11122/project/104/interface/api/26330
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderEvaluateAfterSaleCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderEvaluateAfterSaleCount }));
    };
    /**
     * 违约订单明细
     * api: http://10.0.2.42:11122/project/104/interface/api/26393
     * @param data
     * @param option
     */
    OrderHttp.prototype.orderAssignQueryDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderAssignQueryDetail }));
    };
    /**
     * 客户统计-客户进货排名
     * api: http://10.0.2.42:11122/project/132/interface/api/27302
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountCustomerPurchaseRanking = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountCustomerPurchaseRanking }));
    };
    /**
     * 客户统计-客户销货排名
     * api: http://10.0.2.42:11122/project/132/interface/api/27311
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountCustomerSalesRanking = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountCustomerSalesRanking }));
    };
    /**
     * /订单统计-投资订单统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27203
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountInvestCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountInvestCount }));
    };
    /**
     * 订单统计-订单统计-销售订单统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27311
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountSellCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountSellCount }));
    };
    /**
     * 订单统计-投资统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27248
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountInvestBrandCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountInvestBrandCount }));
    };
    /**
     * 订单统计-投资订单退货退款
     * api: http://10.0.2.42:11122/project/132/interface/api/27257
     * @param data
     * @param option
     * @method POST
     *
     */
    OrderHttp.prototype.orderCountInvestRefundCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountInvestRefundCount }));
    };
    /**
     * 订单统计-销货统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27266
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountSellBrandCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountSellBrandCount }));
    };
    /**
     * 订单统计-销售订单明细统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27275
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountSellItemCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountSellItemCount }));
    };
    /**
     * 订单统计-销售退货统计
     * api: http://10.0.2.42:11122/project/132/interface/api/27284
     * @param data
     * @param option
     * @method POST
     */
    OrderHttp.prototype.orderCountSellRefundBrandCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountSellRefundBrandCount }));
    };
    /**
     * 进货订单 orderSellWarnLog
     */
    OrderHttp.prototype.orderSellWarnLog = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSellWarnLog + data.id }));
    };
    /**
     * 订单统计-超时未付款销售订单统计
     */
    OrderHttp.prototype.orderCountSellOverTimeCount = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountSellOverTimeCount }));
    };
    /**
     * orderCountCustomerInvestCountRanking 客户统计-客户投资次数排名
     */
    OrderHttp.prototype.orderCountCustomerInvestCountRanking = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountCustomerInvestCountRanking }));
    };
    /**
     * orderRefundCheckOrder 校验订单那
     */
    OrderHttp.prototype.orderRefundCheckOrder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundCheckOrder }));
    };
    /**
     * orderCountAccountPayableList 订单统计-应付账款
     */
    OrderHttp.prototype.orderCountAccountPayableList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountAccountPayableList }));
    };
    /**
     *
     orderCountAccountReceivableList // 订单统计-应收账款
     */
    OrderHttp.prototype.orderCountAccountReceivableList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountAccountReceivableList }));
    };
    // 订单统计-退货销售订单统计 orderCountSellRefundCount
    OrderHttp.prototype.orderCountSellRefundCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderCountSellRefundCount }));
    };
    // 查询退款订单 orderRefundQueryList
    OrderHttp.prototype.orderRefundQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderRefundQueryList }));
    };
    return OrderHttp;
}(ajax_1.default));
exports.default = OrderHttp;
//# sourceMappingURL=order.js.map