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
// 管理后台api接口列表
var UserHttp = /** @class */ (function (_super) {
    __extends(UserHttp, _super);
    function UserHttp(props) {
        return _super.call(this, props) || this;
    }
    // 获取用户投诉类型
    UserHttp.prototype.userInfoComplaintDic = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoComplaintDic }));
    };
    // 用户详情(运营平台用户)
    UserHttp.prototype.userInfoOpDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpDetail }));
    };
    //修改密码(运营平台用户)
    UserHttp.prototype.userInfoOpUpdatePassword = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpUpdatePassword }));
    };
    // 用户列表（带分页）
    UserHttp.prototype.userInfoPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.page }));
    };
    // 用户投诉/v1/user/info/update/reason
    UserHttp.prototype.userInfoUpdateReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.update.reason }));
    };
    // 用户投诉列表（带分页）/v1/user/info/user/page
    UserHttp.prototype.userInfoUserPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.user.page }));
    };
    // 修改启用禁用状态（身份信息页）
    UserHttp.prototype.userCompanyStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPatch(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.company.status }));
    };
    // 删除用户身份
    UserHttp.prototype.userCompanyDelete$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.company.delete + data.id }));
    };
    // 重置密码
    UserHttp.prototype.userInfoPassword = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.password }));
    };
    // 用户详情
    UserHttp.prototype.userInfoDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.detail }));
    };
    // 修改启用禁用状态（用户列表页）
    UserHttp.prototype.userInfoStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPatch(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.userStatus }));
    };
    // 获取用户平台角色
    // 修改启用禁用状态（用户列表页）
    UserHttp.prototype.userInfoPlatformCode = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.platformCode }));
    };
    /**
     * 修改账号(运营平台用户)-PUT
     * @param data
     * @param option
     */
    UserHttp.prototype.userInfoOpAccount$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpAccount$PUT }));
    };
    /**
     * 重置密码(运营平台用户)-put
     * @param data
     * @param option
     */
    UserHttp.prototype.userInfoOpPasswordBy$userId = function (data, option) {
        if (data === void 0) { data = { userId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpPasswordBy$userId + data.userId }));
    };
    /**
     * 新增账号(运营平台用户)-PUT
     * @param data
     * @param option
     */
    UserHttp.prototype.userInfoOpAccount$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpAccount$POST }));
    };
    /**
     * 用户列表(运营平台用户)-POST
     * @param data
     * @param option
     */
    UserHttp.prototype.userInfoOpPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpPage }));
    };
    /**
     * 用户列表(运营平台用户 模糊查询)-POST
     * @param data
     * @param option
     */
    UserHttp.prototype.userInfoOpRealName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.userInfoOpRealName }));
    };
    // changeInfo
    UserHttp.prototype.userInfoPut = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.changeInfo }));
    };
    return UserHttp;
}(ajax_1.default));
exports.default = UserHttp;
//# sourceMappingURL=user.js.map