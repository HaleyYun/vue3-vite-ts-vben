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
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company(props) {
        return _super.call(this, props) || this;
    }
    //  汽修厂-变更绑定关系
    Company.prototype.companyInfoChangeRelation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoChangeRelation }));
    };
    // 汽修厂-解除绑定关系
    Company.prototype.companyInfoRemoveRelation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoRemoveRelation }));
    };
    // 后台-下拉框获取企业店铺信息列表
    Company.prototype.companyInfoManageList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoManageList }));
    };
    // 用户详情
    Company.prototype.CompanyLegalSupplierMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.detail }));
    };
    //根据（平台角色code、店铺名称）模糊查询企业信息
    Company.prototype.CompanyInfoPlatformStoreName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyInfoPlatformStoreName }));
    };
    //根据（平台角色code、店铺名称）获取企业下拉列表
    Company.prototype.CompanyInfoSelectPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyInfoSelectPage }));
    };
    // 渠道/招商经理-管辖企业分页查询列表
    Company.prototype.CompanyInfoManagerRelationPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyInfoManagerRelationPage }));
    };
    // 渠道/招商经理-解除管辖企业绑定关系
    Company.prototype.CompanyInfoManagerUnbind = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyInfoManagerUnbind }));
    };
    // 验证该手机号是否已存在渠道经理
    Company.prototype.CompanyLegalChannelMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyLegalChannelMobile }));
    };
    // 新增渠道经理
    Company.prototype.CompanyLegalChannelAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyLegalChannelAdd }));
    };
    // 新增招商经理
    Company.prototype.CompanyLegalAttractAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyLegalAttractAdd }));
    };
    // 验证该手机号是否已存在招商经理
    Company.prototype.CompanyLegalAttractMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyLegalAttractMobile }));
    };
    // 渠道/招商经理-分页查询列表
    Company.prototype.CompanyInfoManagerPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.CompanyInfoManagerPage }));
    };
    /**
     * 企业合同信息管理-获取合同详情信息-GET
     * @param data
     * @param option
     */
    Company.prototype.companyContractGetBy$id = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyContractGetBy$id + data.companyId }));
    };
    /**
     * 企业合同信息管理-获取企业合同信息-GET
     * @param data
     * @param option
     */
    Company.prototype.companyContractListBy$CompanyId = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyContractListBy$CompanyId +
                data.companyId }));
    };
    /**
     * 企业合同信息管理-修改合同信息-POST
     * @param data
     * @param option
     * @constructor
     */
    Company.prototype.companyContractUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyContractUpdate }));
    };
    /**
     * 企业合同信息管理-新增合同信息-POST
     * @param data
     * @param option
     */
    Company.prototype.companyContractAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyContractAdd }));
    };
    /**
     * 验证该手机号是否已存在旧机买家-GET
     * @param data
     * @param option
     */
    Company.prototype.companyLegalOldMachineMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalOldMachineMobile }));
    };
    /**
     * 获取旧机买家详细 （修改接口专用
     * @param data
     * @param option
     */
    Company.prototype.companyLegalAuthInfo = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalAuthInfo }));
    };
    /**
     * 更新旧机买家信息
     * @param data
     * @param option
     */
    Company.prototype.companyLegalOldMachineUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalOldMachineUpdate }));
    };
    /**
     * 身份证重新认证 旧机买家
     * @param data
     * @param option
     */
    Company.prototype.companyLegalAnewIdentity = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalAnewIdentity }));
    };
    /**
     * 营业执照重新认证 旧机买家
     * @param data
     * @param option
     */
    Company.prototype.companyLegalWnewLicense = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalWnewLicense }));
    };
    /**
     * 营业执照身份证重新认证 旧机买家
     * @param data
     * @param option
     */
    Company.prototype.companyLegalAnewAll = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalAnewAll }));
    };
    /**
     * 验证该手机号是否已存在技术工-GET
     * @param data
     * @param option
     */
    Company.prototype.companyLegalSkilledWorkerMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalSkilledWorkerMobile }));
    };
    /**
     * 新增技术工-POST
     * @param data
     * @param option
     */
    Company.prototype.companyLegalSkilledWorkerAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalSkilledWorkerAdd }));
    };
    /**
     * 新增旧机买家-POST
     * @param data
     * @param option
     */
    Company.prototype.companyLegalOldMachineAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyLegalOldMachineAdd }));
    };
    /**
     * 术工邀请技术工分页列表-POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoSkilledWorkerAssociatedPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerAssociatedPage }));
    };
    /**
     * 技术工详情-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoSkilledWorkerDetailsBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerDetailsBy$id + data.id }));
    };
    /**
     * 技术工邀请汽修厂分页列表-POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoSkilledWorkerAssociatedGaragePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerAssociatedGaragePage }));
    };
    /**
     * 旧机买家详情-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoOldMachineGetBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoOldMachineGetBy$id + data.id }));
    };
    /**
     * 技术工分页列表-POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoSkilledWorkerPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerPage }));
    };
    /**
   * 技术工扩客
   * @param data
   * @param option
   */
    Company.prototype.companyInfoShowStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoShowStatus }));
    };
    /**
     * 技术工tab页签 - GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoSkilledWorkerTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerTab }));
    };
    /**
     * 旧机买家tab页签-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoOldMachineTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoOldMachineTab }));
    };
    /**
     * 旧机买家审核链路-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoOldMachineAuditLinkBy$id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoOldMachineAuditLinkBy$id }));
    };
    /**
     * 旧机买家分页列表-POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoOldMachinePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoOldMachinePage }));
    };
    /**
     * 获取企业店铺信息-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoStoreInfoBy$CompanyId = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoStoreInfoBy$CompanyId +
                data.companyId }));
    };
    /**
     * 客户财务信息-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoFinancialBy$CompanyId = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoFinancialBy$CompanyId +
                data.companyId }));
    };
    /**
     * 企业法人银行卡信息列表-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoBankCardListBy$CompanyId = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoBankCardListBy$CompanyId +
                data.companyId }));
    };
    // companyInfoManageUpdate
    /**
     * 修改店铺详情  后台修改-patch
     * @param data
     * @param option
     */
    Company.prototype.companyInfoManageUpdate = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPatch(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoManageUpdate }));
    };
    /**
     * 获取地址信息 列表
     * receiverAddressList
     */
    Company.prototype.receiverAddressList = function (data, option) {
        if (data === void 0) { data = { companyId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.receiverAddressList }));
    };
    /**
     * 绑定企业-POST
     * @param data
     * @param option
     * companyInfoBind
     */
    Company.prototype.companyInfoBind = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoBind }));
    };
    /**
     * 获取未被绑定的客户信息-POST
     * @param data
     * @param option
     * companyInfoGarageNotBindPage
     */
    Company.prototype.companyInfoGarageNotBindPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoGarageNotBindPage }));
    };
    /*
     *技术工解除绑定管辖关系-PUT
     *@param data
     * @param option
     */
    Company.prototype.companyInfoSkilledWorkerUnbind = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerUnbind }));
    };
    /*
       *获取服务商关联的汽修厂信息分页列表
       companyInfoAgentAssociatedGaragePage
       */
    Company.prototype.companyInfoAgentAssociatedGaragePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoAgentAssociatedGaragePage }));
    };
    //修改角色渠道经理和招商经理
    Company.prototype.companyInfoChangeManager = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoChangeManager }));
    };
    /**
     * 关联汽修厂排名-获取汽修厂列表-GET
     * @param data
     * @param option
     */
    Company.prototype.companyInfoGarageList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoGarageList }));
    };
    /**
     *  关联汽修厂排名-关联汽修厂排名-POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoGarageCountPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoGarageCountPage }));
    };
    /**
     * 平台客户数（身份分组）- POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoCustomerCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoCustomerCount }));
    };
    /**
     * 平台客户总数-POST
     * @param data
     * @param option
     */
    Company.prototype.companyInfoCustomerTotal = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoCustomerTotal }));
    };
    /**
     * @title 分页查询服务商账户信息 - POST
     * @api http://10.0.2.42:11122/project/132/interface/api/27509
     * @param data
     * @param option
     * @method POST
     */
    Company.prototype.companyStatisticsAgentAccountInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyStatisticsAgentAccountInfo }));
    };
    /**
     * @title 查询账户实时余额 - GET
     * @api http://10.0.2.42:11122/project/132/interface/api/28544
     * @param data
     * @param option
     * @method POST
     */
    Company.prototype.companyStatisticsAgentAccountAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyStatisticsAgentAccountAmount }));
    };
    /**
     * 分页查询服务商账户明细接口
     *  @api http://10.0.2.42:11122/project/132/interface/api/27527
     * @param data
     * @param option
     * @method POST
     */
    Company.prototype.companyStatisticsAgentAccountDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyStatisticsAgentAccountDetail }));
    };
    /**
     * 技术工接单资格开通
     * @api http://10.0.2.42:11122/project/106/interface/api/28013
     * @param data
     * @param option
     * @method POST
     */
    Company.prototype.companyInfoSkilledWorkerOpenqualify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoSkilledWorkerOpenqualify }));
    };
    /**
     * 获取修理厂服务项目字典值
     * @api http://10.0.2.42:11122/project/106/interface/api/28148
     * @param data
     * @param option
     * @method get
     */
    Company.prototype.companyInfoServiceProject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoServiceProject }));
    };
    /**
     * 账户台账/vocen-jarvis/v1/company/statistics/account/withdraw/apply
     * @api http://10.0.2.42:11122/project/106/interface/api/28148
     * @param data
     * @param option
     * @method get
     */
    Company.prototype.companyStatisticsAccountWithdrawApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyStatisticsAccountWithdrawApply }));
    };
    /**
   * 更新修理厂基本信息/vocen-jarvis/v1/company/info/garage/base/update
   * @api http://10.0.2.42:11122/project/106/interface/api/29489
   * @param data
   * @param option
   * @method POST
   */
    Company.prototype.companyInfoGarageBaseUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoGarageBaseUpdate }));
    };
    /**
     * 获取修理厂车系字典值
     * @api http://10.0.2.42:11122/project/106/interface/api/28157
     * @param data
     * @param option
     * @method get
     */
    Company.prototype.companyInfoCarSeries = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoCarSeries }));
    };
    return Company;
}(ajax_1.default));
exports.default = Company;
//# sourceMappingURL=company.js.map