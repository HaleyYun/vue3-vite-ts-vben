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
var Quota = /** @class */ (function (_super) {
    __extends(Quota, _super);
    function Quota(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 获取账期额度调整记录列表-GET
     * @param data
     * @param option
     */
    Quota.prototype.quotaRecordPage = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].quota.quotaRecordPage }));
    };
    /**
     * 获取账期额度信息-GET
     * @param data
     * @param option
     */
    Quota.prototype.quotaGetBy$CompanyId = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].quota.quotaGetBy$CompanyId + data.companyId }));
    };
    /**
     * 新增账期额度-GET
     * @param data
     * @param option
     */
    Quota.prototype.quotaAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].quota.quotaAdd }));
    };
    /**
     * 保存账期系数 quotaCoefficientSave
     * @param data
     * @param option
     */
    Quota.prototype.quotaCoefficientSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].quota.quotaCoefficientSave }));
    };
    return Quota;
}(ajax_1.default));
exports.default = Quota;
//# sourceMappingURL=quota.js.map