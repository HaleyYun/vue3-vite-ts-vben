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
var CustomerHttp = /** @class */ (function (_super) {
    __extends(CustomerHttp, _super);
    function CustomerHttp(props) {
        return _super.call(this, props) || this;
    }
    //验证该手机号是否已存在供应商
    CustomerHttp.prototype.apiCompanyLegalSupplierMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.CompanyLegalSupplierMobile }));
    };
    //验证该手机号是否已存在服务商
    CustomerHttp.prototype.apiCompanyLegalAgentMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.CompanyLegalAgentMobile }));
    };
    // 图片上传包含ocr识别
    CustomerHttp.prototype.apiFileOcr = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiRequest({
            url: api_1.AdminApi["".concat(localOptions.version)].api.FileOcr,
            method: 'POST',
            params: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }, {
            urlPrefix: '/vocen-wolverine', // 兼容李义广特殊接口使用
        });
    };
    // 图片上传包含ocr识别
    CustomerHttp.prototype.apiInvoiceFileOcr = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiRequest({
            url: api_1.AdminApi["".concat(localOptions.version)].api.FileInvoiceOcr,
            method: 'POST',
            params: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }, {
            urlPrefix: '/vocen-wolverine', // 兼容李义广特殊接口使用
        });
    };
    //新增供应商
    CustomerHttp.prototype.apiCompanyLegalSupplier = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.CompanyLegalSupplier }));
    };
    //新增服务商
    CustomerHttp.prototype.apiCompanyLegalAgent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.CompanyLegalAgent }));
    };
    //根据银行名称模糊查询支行信息
    CustomerHttp.prototype.apiExtraBankFuzzy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.ExtraBankFuzzy }));
    };
    //根据银行名称查询开户行信息
    CustomerHttp.prototype.apiExtraBankInfoFuzzy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.ExtraBankInfoFuzzy }));
    };
    // 分页查询企业信息列表
    CustomerHttp.prototype.companyInfoPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.page }));
    };
    // 获取代理商
    CustomerHttp.prototype.companyInfoAgentTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.agent.tab }));
    };
    // 审核tabvocen-jarvis/v1/company/info/audit
    CustomerHttp.prototype.companyInfoAudit$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.audit.$Post }));
    };
    // 获取供应商tab
    CustomerHttp.prototype.companyInfoSupplierTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.supplier.tab }));
    };
    // 供应商 -加入黑名单
    CustomerHttp.prototype.companyInfoChangeBlack = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.change.black }));
    };
    // 供应商 -获取审核链路
    CustomerHttp.prototype.companyInfoAuditLink = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.audit.link }));
    };
    // 供应商 -获取审核链路
    CustomerHttp.prototype.companyInfoManage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.manage }));
    };
    // 供应商仓库列表/v1/company/info/list/storehouse
    CustomerHttp.prototype.companyInfoListStorehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.list.storehouse }));
    };
    // 企业信息管理 -  供应商 || 服务商 - 员工信息分页查询
    CustomerHttp.prototype.companyInfoStaffPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.staff.page }));
    };
    // 供应商 || 服务商 - 改变店铺状态
    CustomerHttp.prototype.companyInfoChangeStoreStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.change.store.status }));
    };
    // change: {
    //   black: `${$merchant}info/change/black`,
    //   user: `${$merchant}info/change/user/status`,
    //   store: {
    //     status: `${$merchant}info/change/store/status`,
    //   }
    // 供应商 || 服务商 - 删除员工账号
    CustomerHttp.prototype.useInfoAccountItem = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].users.info.account + data.id }));
    };
    //角色筛选-仅负责人
    CustomerHttp.prototype.companyInfoSelectPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.selectPage }));
    };
    //  //角色筛选-包含员工
    CustomerHttp.prototype.companyInfoSelectAllPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].user.info.SelectAllPage }));
    };
    // 供应商 || 服务商 -- 解除角色
    CustomerHttp.prototype.companyInfoUnbindRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.unbind.role }));
    };
    // 自营服务商
    CustomerHttp.prototype.companyInfoAgentPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.companyInfoAgentPage }));
    };
    // 添加服务商
    CustomerHttp.prototype.memberCompanyBindingInviteePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.memberCompanyBindingInviteePage }));
    };
    // 绑定服务商
    CustomerHttp.prototype.memberCompanyBindingOperation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.memberCompanyBindingOperation }));
    };
    // 供应商 || 服务商 - 新增员工账号
    CustomerHttp.prototype.useInfoAddAccount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].users.info.create }));
    };
    // 企业信息管理___员工启用状态变更
    CustomerHttp.prototype.companyInfoChangeUserStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.change.user.status }));
    };
    CustomerHttp.prototype.apiSixHotAreaSub = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].area.sub }));
    };
    // 公共接口 __ 公司按角色统计账号数量
    CustomerHttp.prototype.apiRoleNum = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].area.sub }));
    };
    // 企业信息管理__汽修厂分页查询
    CustomerHttp.prototype.companyInfoGaragePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.garage.page }));
    };
    // 企业信息管理__获取汽修厂详情
    CustomerHttp.prototype.companyInfoGarageGet = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.garage.get + '/' + data.id }));
    };
    // 企业信息管理__获取汽修厂tab /v1/company/info/asset/page
    CustomerHttp.prototype.companyInfoAssetPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.asset.page }));
    };
    CustomerHttp.prototype.companyInfoGarageTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.garage.tab }));
    };
    // 企业信息管理__汽修厂注销 company/info/asset/page
    CustomerHttp.prototype.companyInfoLogoffPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.logoff.page }));
    };
    // 企业信息管理__资产分页查询（汽修厂） /v1/company/info/garage/asset/page
    CustomerHttp.prototype.companyInfoGarageAssetPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.garage.asset.page }));
    };
    CustomerHttp.prototype.companyInfoAssetPages = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].merchant.info.asset.page }));
    };
    // 企业法体信息管理__ 证该手机号是否已存在修理厂 v1/api/company/legal/garage/moblie
    CustomerHttp.prototype.companyLegalGarageMoblie = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.company.legal.garage.moblie }));
    };
    // 产品列表 -- list
    CustomerHttp.prototype.goodsTypeList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.list }));
    };
    // 产品列表 -- 禁用启用
    CustomerHttp.prototype.goodsTypeStatusUpdates = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.statusUpdate }));
    };
    // 产品列表 -- 添加产品类型
    CustomerHttp.prototype.goodsTypeSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.save }));
    };
    // 产品列表 -- 删除
    CustomerHttp.prototype.goodsTypeDeleteName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.save }));
    };
    CustomerHttp.prototype.apiCompanyLegalGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.company.legal.garageCreate }));
    };
    CustomerHttp.prototype.goodsBrandApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goodsBrand.apply.list }));
    };
    CustomerHttp.prototype.goodsBrandApplyPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goodsBrand.apply.page }));
    };
    CustomerHttp.prototype.goodsBrandApplyAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goodsBrand.apply.audit }));
    };
    CustomerHttp.prototype.customerRoleCompany = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].customer.customerRoleCompany }));
    };
    CustomerHttp.prototype.GoodsCertificationBrandInfo = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goodsCertificationBrandInfo + '/' + data.id }));
    };
    return CustomerHttp;
}(ajax_1.default));
exports.default = CustomerHttp;
//# sourceMappingURL=customer.js.map