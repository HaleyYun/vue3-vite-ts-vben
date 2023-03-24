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
var ajax_1 = require("./../ajax");
var api_1 = require("./../api");
var createHttp = /** @class */ (function (_super) {
    __extends(createHttp, _super);
    function createHttp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 供应商-我的仓库
    createHttp.prototype.apiWarehouseSupplierMy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseSupplierMy }));
    };
    // 服务商-我的仓库
    createHttp.prototype.apiWarehouseMyWarehouses = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseMyWarehouses }));
    };
    // 统计-所有仓库
    createHttp.prototype.apiWarehouseAgentStatisMy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseAgentStatisMy }));
    };
    // 服务商-我的仓库
    createHttp.prototype.apiWarehouseGoodsAgentInvest = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseGoodsAgentInvest }));
    };
    // apiWarehouseStatisAgentStockChange App-服务商统计-库存
    createHttp.prototype.apiWarehouseStatisAgentStockChange = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStatisAgentStockChange }));
    };
    // 检验商品识别码是否存在
    createHttp.prototype.apiWarehouseOperFacilitatorSelfRefillCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperFacilitatorSelfRefillCheck }));
    };
    // 服务商批量出库-自有库
    createHttp.prototype.apiWarehouseOperFacilitatorSelfOutBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperFacilitatorSelfOutBatch }));
    };
    // 服务商批量补库存-自有库
    createHttp.prototype.apiWarehouseOperFacilitatorSelfRefillBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperFacilitatorSelfRefillBatch }));
    };
    // 仓储商品识别码分页条件查询
    createHttp.prototype.apiWarehouseOperAgentGoodsVinPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperAgentGoodsVinPage }));
    };
    // 库存日志记录详情
    createHttp.prototype.apiWarehouseOper$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOper$Id + '/' + data.id }));
    };
    // 当前用户-出入库记录按月显示-物流状态可筛选
    createHttp.prototype.apiWarehouseOperSupplierLogisticsInout = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierLogisticsInout }));
    };
    // 服务商-调拨记录-确认入库
    createHttp.prototype.apiWarehouseOperConfirmStock = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperConfirmStock }));
    };
    return createHttp;
}(ajax_1.default));
exports.default = createHttp;
//# sourceMappingURL=warehouse.js.map