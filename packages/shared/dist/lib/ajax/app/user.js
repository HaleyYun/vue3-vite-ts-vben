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
var userHttp = /** @class */ (function (_super) {
    __extends(userHttp, _super);
    function userHttp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 用户详情
    userHttp.prototype.getUserProfileInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        console.log({
            localOptions: localOptions,
        });
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.getUserProfile }));
    };
    // 获取用户自己的默认地址
    userHttp.prototype.apiReceiverAddressDefault = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].defaultAddress }));
    };
    // 修改手机号
    userHttp.prototype.apiUserInfoMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoMobile }));
    };
    // 修改手机号
    userHttp.prototype.apiUserInfoCheckMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoCheckMobile }));
    };
    // 申请绑卡（绑卡页面发送短信验证码接口）
    userHttp.prototype.apiExtraBankApplyBankcard = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiExtraBankApplyBankcard }));
    };
    // 确认绑卡
    userHttp.prototype.apiExtraBankBindBankcard = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiExtraBankBindBankcard }));
    };
    // 银行卡解绑
    userHttp.prototype.apiExtraBankUnBankcard = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiExtraBankUnBankcard }));
    };
    // 查询银行卡信息
    userHttp.prototype.apiExtraBankList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiExtraBankList }));
    };
    // 获取账户明细分页列表
    userHttp.prototype.apiAccountDetailsPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiAccountDetailsPage }));
    };
    // APP-添加账户明细
    userHttp.prototype.apiAccountDetailsAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiAccountDetailsAdd }));
    };
    // APP-提现记录
    userHttp.prototype.apiAccountDetailsWithdrawPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiAccountDetailsWithdrawPage }));
    };
    userHttp.prototype.apiReceiverAddressHelpDefault = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddressHelpDefault }));
    };
    // APP-我的账户
    userHttp.prototype.apiAccountDetailsMain = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiAccountDetailsMain }));
    };
    return userHttp;
}(ajax_1.default));
exports.default = userHttp;
//# sourceMappingURL=user.js.map