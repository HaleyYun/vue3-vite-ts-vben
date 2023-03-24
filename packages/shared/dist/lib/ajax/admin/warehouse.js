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
var Warehouse = /** @class */ (function (_super) {
    __extends(Warehouse, _super);
    function Warehouse(props) {
        return _super.call(this, props) || this;
    }
    // 获取所有仓库列表
    Warehouse.prototype.warehouseListAll = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseListAll }));
    };
    /**
     * 调拨管理-调拨分页查询-POST
     * api: http://10.0.2.42:11122/project/120/interface/api/26150
     * @param data
     * @param option
     */
    Warehouse.prototype.warehouseTransferPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseTransferPage }));
    };
    /**
   * 调拨管理-仓库调拨--get
   * api: http://10.0.2.42:11122/project/85/interface/api/26186
   * @param data
   * @param option
   */
    Warehouse.prototype.warehousePlat = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehousePlat }));
    };
    /**
 * 打码配置--post
 * api: http://10.0.2.42:11122/project/120/interface/api/29228
 * @param data
 * @param option
 */
    Warehouse.prototype.warehouseCodingQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseCodingQueryList }));
    };
    /**
   * 编辑打码服务费
   * api: http://10.0.2.42:11122/project/85/interface/api/26186
   * @param data
   * @param option
   */
    Warehouse.prototype.warehouseCodingUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseCodingUpdate }));
    };
    /**
     * 调拨 id 获取详情
     * api: http://10.0.2.42:11122/project/120/interface/api/26150
     * @param data
     * @param option
     */
    Warehouse.prototype.warehouseTransfer = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseTransfer }));
    };
    /**
     * 商品 id 获取商品各个仓库库存信息
     * warehouseStockGoodsWarehouse
     * api: http://10.0.2.42:11122/project/85/interface/api/18842
     * @param data
     * @param option
     */
    Warehouse.prototype.warehouseStockGoodsWarehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseStockGoodsWarehouse }));
    };
    return Warehouse;
}(ajax_1.default));
exports.default = Warehouse;
//# sourceMappingURL=warehouse.js.map