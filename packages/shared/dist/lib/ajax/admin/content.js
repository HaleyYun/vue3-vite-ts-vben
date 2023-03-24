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
// 客户 供应商 代理商
var contentHttp = /** @class */ (function (_super) {
    __extends(contentHttp, _super);
    function contentHttp(props) {
        return _super.call(this, props) || this;
    }
    // 分页查询企业信息列表
    contentHttp.prototype.companyInfoPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.page }));
    };
    // 获取代理商tab
    contentHttp.prototype.companyInfoAgentTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.agent.tab }));
    };
    // 获取供应商tab
    contentHttp.prototype.companyInfoSupplierTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.supplier.tab }));
    };
    /**
     * 认证课程管理-列表查询-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentContentCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentContentCondition }));
    };
    /**
     * 认证课程管理-列表查询-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseCondition }));
    };
    /**
     * 认证课程管理-新增内容-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseSave }));
    };
    /**
     * 认证课程管理-修改内容-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseModify }));
    };
    /**
     * 认证课程管理-逻辑删除-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseDelete }));
    };
    /**
     * 认证课程管理-批量删除-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseBatchUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseBatchUpdate }));
    };
    /**
     * 认证课程管理-是否启用-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseEnable }));
    };
    /**
     * 认证课程管理分类-列表查询-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseCategoryCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseCategoryCondition }));
    };
    /**
     * 认证课程管理分类-新增分类-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseCategorySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseCategorySave }));
    };
    /**
     * 认证课程管理分类-列表查询-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseCategoryModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseCategoryModify }));
    };
    /**
     * 认证课程管理分类-是否启用-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseCategoryEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseCategoryEnable }));
    };
    /**
     * 认证课程管理分类-列表查询-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentCertificationCourseCategorySort = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCertificationCourseCategorySort }));
    };
    /**
     * 招商手册-列表查询-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentInvestmentCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentInvestmentCondition }));
    };
    /**
     * 招商手册-修改内容-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentInvestmentModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentInvestmentModify }));
    };
    /**
     * 招商手册-逻辑删除-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentInvestmentDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentInvestmentDelete }));
    };
    /**
     * 招商手册-批量删除-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentInvestmentBatchUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentInvestmentBatchUpdate }));
    };
    /**
     * 修理厂技术指导管理分类-列表查询-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategoryCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategoryCondition }));
    };
    /**
     * 修理厂技术指导管理分类-新增分类-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategorySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategorySave }));
    };
    /**
     * 修理厂技术指导管理分类-修改分类-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategoryModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategoryModify }));
    };
    /**
     * 修理厂技术指导管理分类-删除(逻辑删除)-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategoryDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategoryDelete }));
    };
    /**
     * 修理厂技术指导管理分类-是否启用-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategoryEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategoryEnable }));
    };
    /**
     *  修理厂技术指导管理分类-排序-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategorySort = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategorySort }));
    };
    /**
     *   修理厂技术指导管理分类-列表查询-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCondition }));
    };
    /**
     *  修理厂技术指导管理分类-新增分类-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalSave }));
    };
    /**
     *  修理厂技术指导管理分类-修改分类-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalModify }));
    };
    /**
     *  修理厂技术指导管理分类-删除(逻辑删除)-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalDelete }));
    };
    /**
       *  修理厂技术指导管理-批量删除-PUT
       * @param data
       * @param option
       */
    contentHttp.prototype.contentTechnicalBatchUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalBatchUpdate }));
    };
    /**
     *  修理厂技术指导管理分类-删除(逻辑删除)-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalBatchDelete }));
    };
    /**
     * 修理厂技术指导管理分类-是否启用-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalEnable }));
    };
    /**
     *  修理厂技术指导管理分类-排序-PUT
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalCategoryRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalCategoryRecommend }));
    };
    /**
     *  修理厂技术指导管理-是否精选/vocen-jarvis/v1/content/technical/recommend
     * @param data
     * @param option
     */
    contentHttp.prototype.contentTechnicalRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentTechnicalRecommend }));
    };
    /**
     *  商家大学内容管理-批量新增内容-POST
     * @param data
     * @param option
     */
    contentHttp.prototype.contentContentSaveBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentContentSaveBatch }));
    };
    /**
   *  帮助中心内容管理-批量新增内容-POST/v1/content/help/content/save/batch
   * @param data
   * @param option
   */
    contentHttp.prototype.contentHelpContentSaveBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentHelpContentSaveBatch }));
    };
    /**
  *  帮助中心分类管理-批量新增分类-POST/v1/content/help/category/save/batch
  * @param data
  * @param option
  */
    contentHttp.prototype.contentHelpCategorySaveBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentHelpCategorySaveBatch }));
    };
    /**
   *  商家大学分类管理-批量新增分类-POST
   * @param data
   * @param option
   */
    contentHttp.prototype.contentCategorySaveBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentCategorySaveBatch }));
    };
    /**
  *  语音识别绑定列表-POST
  * @param data
  * @param option
  */
    contentHttp.prototype.contentVoiceRecognizeBindQueryListPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentVoiceRecognizeBindQueryListPage }));
    };
    /**
  *  语音识别绑定列表禁用启用-PUT
  * @param data
  * @param option
  */
    contentHttp.prototype.contentVoiceRecognizeBindStatusUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentVoiceRecognizeBindStatusUpdate }));
    };
    /**
  *  语音识别绑定列表批量删除
  * @param data
  * @param option
  */
    contentHttp.prototype.contentVoiceRecognizeBindDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentVoiceRecognizeBindDeleteBatch }));
    };
    /**
  *  语音识别绑定列表删除
  * @param data
  * @param option
  */
    contentHttp.prototype.contentVoiceRecognizeBindBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentVoiceRecognizeBindBy$id + "/".concat(data.id) }));
    };
    /**
  *  语音识别绑定列表添加/v1/content/voice/recognize/bind/save
  * @param data
  * @param option
  */
    contentHttp.prototype.contentVoiceRecognizeBindSave = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentVoiceRecognizeBindSave }));
    };
    /**
  *  语音识别绑定列表禁用修改-PUT/v1/content/voice/recognize/bind/update
  * @param data
  * @param option
  */
    contentHttp.prototype.contentVoiceRecognizeBindUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentVoiceRecognizeBindUpdate }));
    };
    /**
  *  获取路由列表映射-Get//v1/content/function/route/list
  * @param data
  * @param option
  */
    contentHttp.prototype.contentFunctionRouteList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].content.contentFunctionRouteList }));
    };
    return contentHttp;
}(ajax_1.default));
exports.default = contentHttp;
//# sourceMappingURL=content.js.map