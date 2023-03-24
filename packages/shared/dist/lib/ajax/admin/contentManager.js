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
var ContentManagerHttp = /** @class */ (function (_super) {
    __extends(ContentManagerHttp, _super);
    function ContentManagerHttp(props) {
        return _super.call(this, props) || this;
    }
    /**
     *@description 商家大学内容
     */
    // 商家大学___ 内容-列表查询
    ContentManagerHttp.prototype.contentContentCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.condition }));
    };
    // 商家大学___ 内容-新增内容
    ContentManagerHttp.prototype.contentContentSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.save }));
    };
    // /v1/content/help/content/save
    // 帮助中心___新增内容//v1/content/help/content/modify
    ContentManagerHttp.prototype.contentHelpContentSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.content.save }));
    };
    // 帮助中心___内容-修改内容//v1/content/help/content/modify
    ContentManagerHttp.prototype.contentHelpContentModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.content.modify }));
    };
    // 帮助中心___分类-修改内容/v1/content/help/category/modify
    ContentManagerHttp.prototype.contentHelpCategoryModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.category.modify }));
    };
    // 商家大学___内容-修改内容
    ContentManagerHttp.prototype.contentContentModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.modify }));
    };
    // 商家大学___帮助中心v1/content/help/category/condition
    ContentManagerHttp.prototype.contentHelpContentCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.content.condition }));
    };
    // 商家大学___帮助分类管理content/help/category/save
    ContentManagerHttp.prototype.contentHelpCategoryCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.category.condition }));
    };
    // 商家大学___帮助新增分类管理content/help/category/save
    ContentManagerHttp.prototype.contentHelpCategorySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.category.save }));
    };
    // 帮助中心删除
    ContentManagerHttp.prototype.contentContentDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.delete }));
    };
    // 帮助中心内容删除/v1/content/help/content/delete
    ContentManagerHttp.prototype.contentHelpContentDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.content.delete }));
    };
    // 帮助中心分类删除//v1/content/help/category/delete
    ContentManagerHttp.prototype.contentHelpCategoryDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.category.delete }));
    };
    // 商家大学___内容-批量删除
    ContentManagerHttp.prototype.contentContentUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.batch.update }));
    };
    // 商家大学___内容-启用///v1/content/help/content/enable
    ContentManagerHttp.prototype.contentContentEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.enable }));
    };
    // 帮助中心___内容-启用///v1/content/help/content/enable
    ContentManagerHttp.prototype.contentHelpContentEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.content.enable }));
    };
    // 帮助中心___分类-启用
    ContentManagerHttp.prototype.contentHelpCategoryEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.category.enable }));
    };
    // 商家大学___内容-禁用
    ContentManagerHttp.prototype.contentContentDisable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.disabled }));
    };
    // 商家大学___内容-精选推荐
    ContentManagerHttp.prototype.contentContentRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.recommend }));
    };
    // 商家大学___内容-取消推荐
    ContentManagerHttp.prototype.contentContentCancelRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.content.recommend }));
    };
    /**
     *@description 商家大学分类
     */
    // 商家大学___分类-列表查询
    ContentManagerHttp.prototype.contentCategoryCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.condition }));
    };
    // 商家大学___分类-新增分类
    ContentManagerHttp.prototype.contentCategorySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.save }));
    };
    // 商家大学___分类-修改分类
    ContentManagerHttp.prototype.contentCategoryModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.modify }));
    };
    // 商家大学___分类-删除
    ContentManagerHttp.prototype.contentCategoryDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.delete }));
    };
    // 商家大学___分类-排序
    ContentManagerHttp.prototype.contentCategoryBatchUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.batch.update }));
    };
    // 商家大学___分类-启用
    ContentManagerHttp.prototype.contentCategoryEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.enable }));
    };
    // 商家大学___分类-禁用
    ContentManagerHttp.prototype.contentCategoryDisable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.batch.disabled }));
    };
    // 商家大学___ 是否启用禁用
    ContentManagerHttp.prototype.helpCategoryEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.help.category.enable }));
    };
    // 商家大学___分类-排序
    ContentManagerHttp.prototype.contentCategorySort = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchantUniversity.category.sort }));
    };
    // 写想法  release
    ContentManagerHttp.prototype.communityContentIdeaRelease = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.release }));
    };
    // 发布多选想法  /vocen-jarvis/v1/community/content/idea/release/batch
    ContentManagerHttp.prototype.communityContentIdeaReleaseBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.getOne.batch }));
    };
    // 写问题  release
    ContentManagerHttp.prototype.communityContentQuestionRelease = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.release }));
    };
    return ContentManagerHttp;
}(ajax_1.default));
exports.default = ContentManagerHttp;
//# sourceMappingURL=contentManager.js.map