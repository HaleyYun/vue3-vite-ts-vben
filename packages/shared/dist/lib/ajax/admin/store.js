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
// 仓库 --- 仓库管理 ———————— 根据仓库类型查询分页 /v1/warehouse/queryWareHousePage
var StoreHttp = /** @class */ (function (_super) {
    __extends(StoreHttp, _super);
    function StoreHttp(props) {
        return _super.call(this, props) || this;
    }
    // 分页查询企业信息列表
    StoreHttp.prototype.warehouseQueryWareHousePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.queryWareHousePage }));
    };
    // 保存warehouse/delivery
    StoreHttp.prototype.warehouseDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseDelivery }));
    };
    StoreHttp.prototype.warehouseDelete = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiRequest(__assign(__assign({}, localOptions), { method: 'DELETE', url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseDelete + '?id=' + data.id, headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            } }));
    };
    /**
     * @description 到货时效
     */
    StoreHttp.prototype.warehouseArrivalPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.arrival.page }));
    };
    /**
     * @description 到货时效Page
     */
    StoreHttp.prototype.warehouseArrivalQueryWarehouseArrivalTimePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.arrival.queryWarehouseArrivalTimePage }));
    };
    //删除/v1/warehouse/arrival
    StoreHttp.prototype.wareHouseArrival = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiRequest(__assign(__assign({}, localOptions), { method: 'DELETE', url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseArrival + '?id=' + data.id, headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            } }));
    };
    //获取到货时效/v1/warehouse/arrival/{id}
    StoreHttp.prototype.warehouseArrivalDay = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { data: __assign(__assign({}, localOptions.data), { id: data.id }), url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseArrivalDay }));
    };
    //更新到货时效/v1/warehouse/arrival
    StoreHttp.prototype.warehouseArrivalTime = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { 
            // data: { ...localOptions.data, id: data.id },
            url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseArrivalTime }));
    };
    /**
     * @description 新增到货时效/v1/warehouse/arrival
     */
    StoreHttp.prototype.warehousePrescription = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehousePrescription }));
    };
    /**
     * @description 仓储管理 --  禁用（首页列表）
     */
    StoreHttp.prototype.warehouseforbidden = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.forbidden }));
    };
    /**
     * @description 仓储管理 --  禁用（首页列表）
     */
    StoreHttp.prototype.warehouseStartup = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.startup }));
    };
    // 分页查询企业信息列表 http://10.0.2.42:11122/mock/85/v1/warehouse
    StoreHttp.prototype.warehouseAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseAdd }));
    };
    StoreHttp.prototype.warehouseChange = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseAdd }));
    };
    // 到货时效
    StoreHttp.prototype.queryWareHouseDropDown = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.queryWareHouseDropDown }));
    };
    // 发货时效warehouse/delivery/page
    StoreHttp.prototype.warehouseDeliveryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery.query }));
    };
    StoreHttp.prototype.warehouseStatisSupplierInout = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.statis.supplier.inout }));
    };
    /*
     * 仓储 -- 供应商补库存记录按月统计（/v1/warehouse/statis/supplier/refill）
     * */
    StoreHttp.prototype.warehouseStatisticsSupplierRefill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.statis.supplier.refill }));
    };
    /*
     * 仓储 -- 供应商调拨记录按月统计
     * */
    StoreHttp.prototype.warehouseStatisSupplierTransfe = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.statis.supplier.transfer }));
    };
    /*
     * 仓储 -- 分页查询发货时效规则
     * */
    StoreHttp.prototype.deliveryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery.page }));
    };
    /*
     * 仓储 -- 分页查询发货时效规则
     * */
    StoreHttp.prototype.deliveryByIDViewDetails = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.ID }));
    };
    /*
     * 仓储 -- 分页查询发货时效规则
     * */
    StoreHttp.prototype.batchAddTimeLimit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse }));
    };
    /*
     * 仓储 -- 分页查询发货时效规则
     * */
    StoreHttp.prototype.AddBatchTimeLimit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery.batchAddTimeLimit }));
    };
    /*
     * 仓储 -- 修改发货时效
     * */
    StoreHttp.prototype.changeTimeLimit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery }));
    };
    /*
     * 仓储 -- 修改发货时效
     * */
    StoreHttp.prototype.batchDeleteTimeLimit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery.batchDeleteTimeLimit }));
    };
    /*
     * 仓储 -- 按 id 删除数据
     * */
    StoreHttp.prototype.deleteTimeLimit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery.deleteTimeLimit }));
    };
    return StoreHttp;
}(ajax_1.default));
exports.default = StoreHttp;
//# sourceMappingURL=store.js.map