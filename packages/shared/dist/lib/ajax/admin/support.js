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
// 安装服务订单模块
var Support = /** @class */ (function (_super) {
    __extends(Support, _super);
    function Support(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 安装服务订单-安装订单列表查询-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23540
     * @param data
     * @param option
     */
    Support.prototype.supportInstallQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].support.supportInstallQueryList }));
    };
    /**
   * 安装服务订单-页签-Get
   * api: http://10.0.2.42:11122/project/104/interface/api/23540
   * @param data
   * @param option
   */
    Support.prototype.supportInstallListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].support.supportInstallListCount }));
    };
    /**
     * 安装服务订单-查看详情-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23549
     * @param data
     * @param option
     */
    Support.prototype.supportInstallDetailBy$id = function (data, option) {
        if (data === void 0) { data = { id: "" }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].support.supportInstallDetailBy$id + data.id }));
    };
    /**
     * 安装服务订单-修改安装服务单-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23936
     * @param data
     * @param option
     */
    Support.prototype.supportInstallUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].support.supportInstallUpdate }));
    };
    /**
     * 安装服务订单-确认安装完成-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23945
     * @param data
     * @param option
     */
    Support.prototype.supportInstallConfirm = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].support.supportInstallConfirm }));
    };
    /**
     * 安装服务订单-订单处理结果-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23954
     * @param data
     * @param option
     */
    Support.prototype.supportInstallHandel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].support.supportInstallHandel }));
    };
    return Support;
}(ajax_1.default));
exports.default = Support;
//# sourceMappingURL=support.js.map