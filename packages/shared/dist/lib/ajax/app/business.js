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
    // 测试案例
    createHttp.prototype.createTest = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].home.es.test }));
    };
    // 一级品牌列表
    createHttp.prototype.businessVehicleBrandSelectOne = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.brand.selectOne }));
    };
    // 品牌参数获取
    createHttp.prototype.businessVehicleBrandSelectParameters = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.brand.selectParameters }));
    };
    // 车型列表-树形
    createHttp.prototype.businessVehicleBrandSelectMode = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.brand.selectMode }));
    };
    // 根据品牌ID找车系列表
    createHttp.prototype.businessVehicleBrandSelectSeries = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.brand.selectSeries }));
    };
    return createHttp;
}(ajax_1.default));
exports.default = createHttp;
//# sourceMappingURL=business.js.map