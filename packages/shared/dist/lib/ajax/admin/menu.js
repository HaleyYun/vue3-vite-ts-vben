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
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 菜单管理 根据用户信息获取菜单树
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuTree }));
    };
    /**
     * 菜单管理 用户信息获取按钮 perms列表
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuBtnPerms = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuBtnPerms }));
    };
    /**
     * 菜单管理 根据用户信息获取菜单列表
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuList }));
    };
    /**
     * 菜单管理 菜单名获取菜单列表，name 为空返回树形结构，name 有值不拼接树
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuNameTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuNameTree }));
    };
    /**
     * 菜单管理 保存菜单
     * @param data
     * @param option
     *
     */
    Menu.prototype.menu$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menu$POST }));
    };
    /**
     * 菜单管理 更新菜单
     * @param data
     * @param option
     *
     */
    Menu.prototype.menu$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menu$PUT }));
    };
    /**
     * 菜单管理 删除菜单
     * @param data
     * @param option
     *
     */
    Menu.prototype.menu$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menu$Id + data.id }));
    };
    /**
     * 菜单管理 角色 id 获取权限列表
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuRoleTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuRoleTree }));
    };
    /**
     * 菜单管理 用户信息中组织 id 获取组织权限列表
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuOrgTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuOrgTree }));
    };
    /**
     * 当前用户叶子节点 id 集合
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuTreeLeaf = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuTreeLeaf }));
    };
    /**
     * 当前用户叶子节点 id 集合
     * @param data
     * @param option
     *
     */
    Menu.prototype.menuTreeRoleLeaf = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].menu.menuTreeRoleLeaf }));
    };
    return Menu;
}(ajax_1.default));
exports.default = Menu;
//# sourceMappingURL=menu.js.map