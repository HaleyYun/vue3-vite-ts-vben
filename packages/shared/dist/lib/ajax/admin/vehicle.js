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
var Vehicle = /** @class */ (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle(props) {
        return _super.call(this, props) || this;
    }
    /**
     *	车系品牌列表
     * @param data
     * @param option
     */
    Vehicle.prototype.VehicleBrandSelectSeries = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.brand.selectSeries }));
    };
    /**
     *	车型-头部参数
     * @param data
     * @param option
     */
    Vehicle.prototype.VehicleBrandSelectParameters = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.brand.selectParameters }));
    };
    /**
     *	一级品牌列表
     * @param data
     * @param option
     */
    Vehicle.prototype.VehicleBrandSelectOne = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.brand.selectOne }));
    };
    /**
     *	车型列表-树形
     * @param data
     * @param option
     */
    Vehicle.prototype.VehicleBrandSelectMode = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.brand.selectMode }));
    };
    /**
     * ocr识别-返单据
     * @param data
     * @param option
     */
    Vehicle.prototype.VehicleBrandOcrGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.brand.ocrGoods }));
    };
    /**
     * 分页查询车型库列表
     * @param data
     * @param option
     */
    Vehicle.prototype.communityVehicleModelModelList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.communityVehicleModelModelList }));
    };
    /**
   * 车型库详情
   * @param data
   * @param option
   */
    Vehicle.prototype.communityVehicleModelModelDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.communityVehicleModelModelDetail }));
    };
    /**
  * 绑定车型库详情
  * @param data
  * @param option
  */
    Vehicle.prototype.communityVehicleModelBindBatchModel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.communityVehicleModelBindBatchModel }));
    };
    /**
* 车型联动条件查询
* @param data
* @param option
*/
    Vehicle.prototype.communityVehicleModelCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].vehicle.communityVehicleModelCondition }));
    };
    return Vehicle;
}(ajax_1.default));
exports.default = Vehicle;
//# sourceMappingURL=vehicle.js.map