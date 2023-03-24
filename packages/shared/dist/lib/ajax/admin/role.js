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
//设置模块
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role(props) {
        return _super.call(this, props) || this;
    }
    /**
     * pc 角色分页查询-POST /vocen-jarvis/v1/role/page
     * api:http://10.0.2.42:11122/project/108/interface/api/22766
     * @param data
     * @param option
     */
    Role.prototype.rolePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.rolePage }));
    };
    /**
   * pc 新增角色-POST /vocen-jarvis/v1/role/page
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
    Role.prototype.role = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.role }));
    };
    /**
   * pc 修改角色-POST /vocen-jarvis/v1/role/page
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
    Role.prototype.modifyRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.modifyRole }));
    };
    /**
 * pc 修改角色权限-PuT /vocen-jarvis/v1/role/page
 * api:http://10.0.2.42:11122/project/108/interface/api/22766
 * @param data
 * @param option
 */
    Role.prototype.rolePerms = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.rolePerms }));
    };
    /**
  * pc 获取角色-Get
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.roleCompany = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.roleCompany }));
    };
    /**
  * pc 主键角色获取角色信息-Get
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.roleGet$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.roleGet$Id + data.id }));
    };
    /**
  * pc 逻辑删除角色-Delet
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.role$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.role$Id + data.id }));
    };
    /**
  * pc 脱敏条件分页查询-post
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskPage }));
    };
    /**
  * pc 脱敏删除-Delet
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMask$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMask$Id + data.id }));
    };
    /**
  * pc 脱敏新增-Post
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskAdd }));
    };
    /**
   * pc 脱敏编辑-edit
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
    Role.prototype.accountMaskEdit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskEdit }));
    };
    /**
  * pc 脱敏 获取单条数据GET
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskGET = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskGET }));
    };
    /**
  * pc获取所有启用状态脱敏字段list
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskList }));
    };
    /**
  * 角色 id 获取角色数据脱敏规则
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskRole }));
    };
    /**
  * 新增角色与脱敏字段关系
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskRole$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskRole$Post }));
    };
    /**
 * 获取app版本
 * api:/vocen-jarvis/v1/version/currentVersion
 * @param data
 * @param option
 */
    Role.prototype.versionCurrentVersion = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.versionCurrentVersion }));
    };
    /**
 * 设置app版本
 * api:/vocen-jarvis/v1/version/save
 * @param data
 * @param option
 */
    Role.prototype.versionSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.versionSave }));
    };
    /**
  * 修改角色脱敏字段是否脱敏
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    Role.prototype.accountMaskRole$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].role.accountMaskRole$Put }));
    };
    return Role;
}(ajax_1.default));
exports.default = Role;
//# sourceMappingURL=role.js.map