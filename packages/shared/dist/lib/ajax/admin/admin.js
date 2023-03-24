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
var community_1 = require("./community");
var user_1 = require("./user");
var customer_1 = require("./customer");
var contentManager_1 = require("./contentManager");
var order_1 = require("./order");
var company_1 = require("./company");
var store_1 = require("./store");
var warehouse_1 = require("./warehouse");
var vehicle_1 = require("./vehicle");
var file_1 = require("./file");
var common_1 = require("./common");
var goods_1 = require("./goods");
var content_1 = require("./content");
var quota_1 = require("./quota");
var order_2 = require("./order");
var support_1 = require("./support");
var finance_1 = require("./finance");
var activation_1 = require("./activation");
var role_1 = require("./role");
var menu_1 = require("./menu");
var integral_1 = require("./integral");
var home_1 = require("./home");
// 管理后台api接口列表
var adminHttp = /** @class */ (function (_super) {
    __extends(adminHttp, _super);
    function adminHttp(props) {
        var _this = _super.call(this, props) || this;
        _this.$user = {
            test: function () { },
        };
        _this.COMMUNITY = new community_1.default(props);
        _this.USER = new user_1.default(props);
        _this.CUSTOMER = new customer_1.default(props);
        _this.CONTENTMENT = new contentManager_1.default(props);
        _this.Order = new order_1.default(props);
        _this.Store = new store_1.default(props);
        _this.VEHICLE = new vehicle_1.default(props);
        _this.FILE = new file_1.default(props);
        _this.COMPANY = new company_1.default(props);
        _this.WAREHOUSE = new warehouse_1.default(props);
        _this.COMMON = new common_1.default(props);
        _this.GOODS = new goods_1.default(props);
        _this.CONTENT = new content_1.default(props);
        _this.QUOTA = new quota_1.default(props);
        _this.ORDER = new order_2.default(props);
        _this.SUPPORT = new support_1.default(props);
        _this.FINANCE = new finance_1.default(props);
        _this.ACTIVATION = new activation_1.default(props);
        _this.ROLE = new role_1.default(props);
        _this.MENU = new menu_1.default(props);
        _this.INTEGRAL = new integral_1.default(props);
        _this.HOME = new home_1.default(props);
        return _this;
    }
    // 测试案例
    adminHttp.prototype.adminTestList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].home.es.test }));
    };
    // 投资项目- 查看原因
    adminHttp.prototype.goodsInvestmentQueryReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentQueryReason }));
    };
    // 商品 - 查看原因
    adminHttp.prototype.goodsGoodsQueryReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsQueryReason }));
    };
    // 品牌删除
    adminHttp.prototype.goodsBrandDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.delete }));
    };
    // 商品类目列表 v1/goods/category/apply/query/list
    adminHttp.prototype.goodsCategoryApplyQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.apply.query.list }));
    };
    // 品牌列表
    adminHttp.prototype.goodsBrandList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.list }));
    };
    // 品牌列表-分页
    adminHttp.prototype.goodsBrandPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.page }));
    };
    // 商品品牌模块 - 品牌删除
    adminHttp.prototype.goodsBrandBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.delete.batch }));
    };
    // 商品品牌模块 - 品牌列表,带分页
    adminHttp.prototype.goodsBranchQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.query.page }));
    };
    // 商品评价列表,带分页/v1/order/evaluate/page
    adminHttp.prototype.orderEvaluatePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.evaluate.page }));
    };
    // 商品评价列表，删除/v1/order/evaluate/delete
    adminHttp.prototype.orderEvaluateDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.evaluate.delete }));
    };
    // 商品评价列表，批量删除/v1/order/evaluate/batch/update
    adminHttp.prototype.orderEvaluateBatchUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.evaluate.batch.update }));
    };
    // 商品评价列表，批量隐藏/v1/order/evaluate/batch/modify
    adminHttp.prototype.orderEvaluateBatchModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.evaluate.batch.modify }));
    };
    // 商品评价修改状态/v1/order/evaluate/modify
    adminHttp.prototype.orderEvaluateModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.evaluate.modify }));
    };
    // 商品品牌模块 - 品牌列表 v1/goods/category/apply/query/list
    adminHttp.prototype.goodsBranchQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.query.list }));
    };
    // 商品品号
    adminHttp.prototype.goodsDistributionArticlNumber = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsDistributionArticlNumber }));
    };
    // 品牌添加
    adminHttp.prototype.goodsBrandSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.save }));
    };
    // 更新品牌的启用状态/v1/goods/brand/hot/update
    adminHttp.prototype.goodsBrandStatusUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.status.update }));
    };
    // 品牌的热门状态/v1/goods/brand/hot/update
    adminHttp.prototype.goodsBrandHotUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.hot.update }));
    };
    // 更新品牌的启用状态goods/brand/apply/audit
    adminHttp.prototype.goodsCategoryApplyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.apply.update }));
    };
    // 品牌审核的状态/goods/brand/apply/{id}
    adminHttp.prototype.goodsBrandApplyAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.audit }));
    };
    // 品牌审核的状态/goods/brand/apply/{id}
    adminHttp.prototype.goodsBrandApplyId = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.id + data.id }));
    };
    // 保存商品分润/v1/goods/goods/profit/set
    adminHttp.prototype.goodsGoodsProfitSet = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.profit.set }));
    };
    // 商品投资限投/v1/goods/investment/number/set
    adminHttp.prototype.goodsInvestmentNumberSet = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.investment.number.set }));
    };
    // 评价详情/v1/order/evaluate/evaluate/Detail
    adminHttp.prototype.orderEvaluateEvaluateDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.evaluate.evaluate.Detail }));
    };
    // 品牌修改/v1/user/info/update/reason
    adminHttp.prototype.goodsBrandUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.update }));
    };
    // 投资商品列表/v1/goods/investment/list/count
    adminHttp.prototype.goodsInvestmentQueryListPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.investment.query.list.page }));
    };
    // 投资商品列表角标/v1/goods/investment/list/count
    adminHttp.prototype.goodsInvestmentListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.investment.list.count }));
    };
    // 商品列表goods/investment/query/list/page
    adminHttp.prototype.goodsGoodsQueryListPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.query.list.page }));
    };
    // 寄售商品列表
    adminHttp.prototype.goodsGoodsDistributionPageList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsDistributionPageList }));
    };
    // 寄售商品管理-导出
    adminHttp.prototype.goodsGoodsDistributionExport = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsDistributionExport }));
    };
    // 导入寄售商品
    adminHttp.prototype.goodsGoodsExportConsignment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsExportConsignment }));
    };
    // 寄售价修改
    adminHttp.prototype.goodsGoodsDistributionUpdatePrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsDistributionUpdatePrice }));
    };
    // 商品 - 分润
    adminHttp.prototype.goodsGoodsProfitList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.profit.list }));
    };
    // 商品上下架/v1/goods/goods/status/update
    adminHttp.prototype.goodsGoodsStatusUpdata = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.status.update }));
    };
    // 寄售状态开关
    adminHttp.prototype.goodsGoodsDistributionStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsDistributionStatus }));
    };
    //  投资审核通过/v1/goods / investment / update / status
    adminHttp.prototype.goodsInvestmentUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.investment.update.status }));
    };
    // 审核通过/goods/goods/violation/audit
    adminHttp.prototype.goodsGoodsAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.audit }));
    };
    // 新审核通过/vocen-jarvis/v1/goods/goods/distribution/audit
    adminHttp.prototype.goodsGoodsDistributionAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.distribution.audit }));
    };
    // 审核不通过/goods/goods/violation/audit
    adminHttp.prototype.goodsGoodsViolationAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.violationList.audit }));
    };
    //操作日志 /v1/goods/goods/query/operatelog/page
    adminHttp.prototype.goodsGoodsQueryOperatelogPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsQueryOperatelogPage }));
    };
    // 违规下架 /v1/goods/goods/violation
    adminHttp.prototype.goodsGoodsViolation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.violation }));
    };
    // 保存厂商
    adminHttp.prototype.goodsBrandManufacturerPost = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.post }));
    };
    // 修改厂商
    adminHttp.prototype.goodsBrandManufacturerPut = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.put }));
    };
    // 批量删除厂商
    adminHttp.prototype.goodsBrandManufacturerBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.batch }));
    };
    // ：厂商列表
    adminHttp.prototype.goodsBrandManufacturerList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.list }));
    };
    // 厂商分页
    adminHttp.prototype.goodsBrandManufacturerPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.page }));
    };
    // 更新厂商的启用状态
    adminHttp.prototype.goodsBrandManufacturerStatusUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.status.update }));
    };
    // 根据id获取厂商
    adminHttp.prototype.goodsBrandManufacturer$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.manufacturer.$id + "/".concat(data === null || data === void 0 ? void 0 : data.id) }));
    };
    // 评价关键词 列表
    adminHttp.prototype.goodsKeywordList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.keyword.list }));
    };
    // 产品类型 --- 列表
    adminHttp.prototype.goodsTypeList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.list }));
    };
    // 添加评价关键词
    adminHttp.prototype.goodsKeywordSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.keyword.save }));
    };
    // 评价关键词 禁用启用 - 弃用
    adminHttp.prototype.goodsKeywordStatusUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.keyword.status.update }));
    };
    // 评价关键词 删除关键词
    adminHttp.prototype.goodsKeywordDeleteName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.keyword.delete.name }));
    };
    // 删除商品
    adminHttp.prototype.goodsGoodsDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.delete }));
    };
    // 商品详情
    adminHttp.prototype.goodsGoodsGoodsDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.goodsDetails }));
    };
    // 商品列表
    adminHttp.prototype.goodsGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.list }));
    };
    // 添加商品
    adminHttp.prototype.goodsGoodsSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.save }));
    };
    // 修改商品
    adminHttp.prototype.goodsGoodsUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.update }));
    };
    // 修改商品类目
    adminHttp.prototype.goodsCategoryUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.update }));
    };
    // 商品类目 更新排序
    adminHttp.prototype.goodsCategorySortUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.sortUpdate }));
    };
    // 商品类目 查询获取二级类目
    adminHttp.prototype.goodsCategorySecondCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.secondCategory }));
    };
    // 商品类目 添加商品类目
    adminHttp.prototype.goodsCategorySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.save }));
    };
    // 商品类目 查询商品类目列表
    adminHttp.prototype.goodsCategoryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.list }));
    };
    // 商品类目 更新禁用类型
    adminHttp.prototype.goodsCategoryDisableTypeUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.disabletypeUpdate }));
    };
    // 运营类别更新禁用类型
    adminHttp.prototype.goodsCategoryDisabletypeUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.disabletypeUpdate }));
    };
    // 运营类别中关联商品类别的时候 需要的查询
    adminHttp.prototype.goodsCategoryCategorySelect = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.categorySelect }));
    };
    // 商品类目 批量删除
    adminHttp.prototype.goodsCategoryBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.batchDelete }));
    };
    // 商品属性 sku属性类别列表
    adminHttp.prototype.goodsSkuPropertyCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.category }));
    };
    // 商品属性 sku属性列表/v1/goods/param/property/query/list
    adminHttp.prototype.goodsSkuPropertyQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.query.list }));
    };
    // 商品属性 sku属性类别列表/v1/goods/sku/property/query/category
    adminHttp.prototype.goodsSkuPropertyQueryCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.query.category }));
    };
    // 商品属性 sku属性删除
    adminHttp.prototype.goodsSkuPropertyDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.delete }));
    };
    // 商品属性 sku属性批量删除
    adminHttp.prototype.goodsSkuPropertyDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.deleteBatch }));
    };
    // 商品属性  sku属性详情
    adminHttp.prototype.goodsSkuPropertyDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.detail }));
    };
    // 商品属性 sku属性禁用
    adminHttp.prototype.goodsSkuPropertyForbidden = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.forbidden }));
    };
    // 商品属性 sku属性导入
    adminHttp.prototype.goodsSkuPropertyImport = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.import }));
    };
    // 商品属性 sku属性列表
    adminHttp.prototype.goodsSkuPropertyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.list }));
    };
    // 商品属性 sku属性添加
    adminHttp.prototype.goodsSkuPropertySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.save }));
    };
    // 商品参数属性 参数属性删除/v1/goods/sku/property/{id}
    adminHttp.prototype.goodsSkuProperty$id = function (data, option) {
        if (data === void 0) { data = {
            id: '',
        }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.$id + "/".concat(data.id) }));
    };
    // 商品属性 sku属性排序
    adminHttp.prototype.goodsSkuPropertySort = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.sort }));
    };
    // 商品属性 sku属性修改
    adminHttp.prototype.goodsSkuPropertyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.skuProperty.update }));
    };
    // 商品参数属性 参数属性类别列表
    adminHttp.prototype.goodsParamPropertyCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.category }));
    };
    // 商品参数属性 参数属性批量删除
    adminHttp.prototype.goodsParamPropertyDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.deleteBatch }));
    };
    // 商品参数属性 参数属性详情
    adminHttp.prototype.goodsParamPropertyDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.detail }));
    };
    // 商品参数属性 参数属性禁用/goods/param/property/query/category
    adminHttp.prototype.goodsParamPropertyForbidden = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.forbidden }));
    };
    // 商品参数属性 参数属性禁用/goods/param/property/query/category
    adminHttp.prototype.goodsParamPropertyQueryCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.query.category }));
    };
    // 商品属性 sku属性列表/v1/goods/param/property/query/list
    adminHttp.prototype.goodsParamPropertyQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.query.list }));
    };
    // 商品参数属性 参数属性导入
    adminHttp.prototype.goodsParamPropertyImportant = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.import }));
    };
    // 商品参数属性   参数属性列表
    adminHttp.prototype.goodsParamPropertyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.list }));
    };
    // 商品参数属性
    adminHttp.prototype.goodsParamPropertyRequired = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.required }));
    };
    // 商品参数属性
    adminHttp.prototype.goodsParamPropertySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.save }));
    };
    // 商品参数属性
    adminHttp.prototype.goodsParamPropertySort = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.sort }));
    };
    // 商品参数属性
    adminHttp.prototype.goodsParamPropertyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.update }));
    };
    // 商品参数属性 参数属性删除/v1/goods/sku/property/{id}
    adminHttp.prototype.goodsParamProperty$id = function (data, option) {
        if (data === void 0) { data = {
            id: '',
        }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.paramProperty.delBy$id + "".concat(data.id) }));
    };
    // 商户品牌申请模块   保存品牌申请,返回生成的申请主键
    adminHttp.prototype.goodsBrandApplyPost = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.postApply }));
    };
    // 根据id获取品牌详情
    adminHttp.prototype.goodsBrand$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.$id + data.id }));
    };
    //投资 /v1/order/invest/{id}
    adminHttp.prototype.orderInvest$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.invest.$id + data.id }));
    };
    // 根据id获取品牌详情/v1/orderSell
    adminHttp.prototype.orderSell$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.sell.$id + data.id }));
    };
    // 根据id获取品牌详情/v1/goods/goods/{id}
    adminHttp.prototype.goodsGoods$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goods.$id + data.id }));
    };
    // 商品标签配置查询
    adminHttp.prototype.goodsGoodsQueryLabels = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsQueryLabels }));
    };
    // 商品标签操作
    adminHttp.prototype.goodsGoodsSaveLabel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsSaveLabel }));
    };
    // 根据id获取投资详情v1/goods/investment/{id}
    adminHttp.prototype.goodsInvestment$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.investment.$id + data.id }));
    };
    // 商户品牌申请模块   修改品牌申请
    adminHttp.prototype.goodsBrandApplyPut = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.putApply }));
    };
    // 商户品牌申请模块   批量删除品牌申请,逻辑删除
    adminHttp.prototype.goodsBrandApplyBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.deleteApply }));
    };
    // 商户品牌申请模块   保存品牌申请,返回生成的申请主键
    adminHttp.prototype.goodsBrandApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.list }));
    };
    // 商户品牌申请模块   保存品牌申请,返回生成的申请主键
    adminHttp.prototype.goodsBrandApplyPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.page }));
    };
    // 商户品牌申请模块   根据id获取品牌申请
    adminHttp.prototype.goodsBrandApplyBy$id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.get$id }));
    };
    // 商户品牌申请模块   删除品牌申请
    adminHttp.prototype.goodsBrandApplyDeleteBy$id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.apply.delete$id }));
    };
    // 商品模板列表
    // 商品模板列表   商品模板删除
    adminHttp.prototype.goodsTemplateDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.delete }));
    };
    // 商品模板列表   商品模板批量删除
    adminHttp.prototype.goodsTemplateDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.deleteBatch }));
    };
    // 商品模板列表   商品模板详情
    adminHttp.prototype.goodsTemplateDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.detail }));
    };
    // 商品模板列表   商品模板列表
    adminHttp.prototype.goodsTemplateList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.list }));
    };
    // 商品模板列表   商品模板列表
    adminHttp.prototype.goodsTemplateCategoryRecently = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.recently }));
    };
    // 商品模板列表   获取分润信息
    adminHttp.prototype.goodsTemplateProfitGet = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.profitGet }));
    };
    // 新增商品模板   初始化“属性及价格区间” 和“类别属性”
    adminHttp.prototype.goodsTemplateInfoInit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.info.init }));
    };
    // 商品模板列表   设置分润信息
    adminHttp.prototype.goodsTemplateProfitPost = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.profitPost }));
    };
    //项目操作日志/v1/goods/investment/query/opearatelog/page
    adminHttp.prototype.goodsInvestmentQueryOperatelogPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentQueryOperatelogPage }));
    };
    adminHttp.prototype.goodsTemplateGetProfit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.getProfit }));
    };
    // 仓库发货时效 ///v1/warehouse/delivery/warehouse/{warehouseId}
    adminHttp.prototype.warehouseDeliveryWarehouse$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.delivery.warehouse.$id }));
    };
    // 仓库到货时效/v1/warehouse/arrival/warehouse
    adminHttp.prototype.warehouseArrivalWarehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.arrival.warehouse }));
    };
    // 寄售可用库存修改
    adminHttp.prototype.warehouseStockUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].warehouse.warehouseStockUpdate }));
    };
    // 商品模板列表   商品模板添加
    adminHttp.prototype.goodsTemplateSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.save }));
    };
    // 商品模板列表   模板发布/取消发布
    adminHttp.prototype.goodsTemplateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.status }));
    };
    // 商品模板列表   商品模板删除
    adminHttp.prototype.goodsTemplateUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.update }));
    };
    // 商品模板列表   取消发布
    adminHttp.prototype.goodsTemplateUnPublish = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsTemplateUnPublish }));
    };
    // 商品草稿箱模块   批量删除草稿/单个删除
    adminHttp.prototype.goodsTemplateDraftBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.draft.batchDelete }));
    };
    // 商品草稿箱模块   查询草稿详情
    adminHttp.prototype.goodsTemplateDraftDetails = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.draft.details }));
    };
    // 商品草稿箱模块   批量删除草稿/单个删除
    adminHttp.prototype.goodsTemplateDraftList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.draft.list }));
    };
    // 商品草稿箱模块   批量删除草稿/单个删除
    adminHttp.prototype.goodsTemplateDraftSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.draft.save }));
    };
    // 获取分润信息
    adminHttp.prototype.goodsTemplateProfit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.profitGet }));
    };
    // 模板发布/v1/goods/template/publish
    adminHttp.prototype.goodsTemplatePublish = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.publish }));
    };
    // 商品草稿箱模块   批量删除草稿/单个删除
    adminHttp.prototype.goodsTemplateDraftUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.draft.update }));
    };
    // 商品资源库管理-批量上传文件
    adminHttp.prototype.goodsResourceAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.add }));
    };
    // 商品资源库管理-删除文件
    adminHttp.prototype.goodsResourceDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.delete }));
    };
    // 商品资源库管理-批量删除文件
    adminHttp.prototype.goodsResourceDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.deleteBatch }));
    };
    // 商品资源库管理-当前文件夹下的文件及文件夹
    adminHttp.prototype.goodsResourceList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.list }));
    };
    // 商品资源库管理-移动文件
    adminHttp.prototype.goodsResourceMove = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.move }));
    };
    // 商品资源库管理-批量移动文件
    adminHttp.prototype.goodsResourceMoveBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.moveBatch }));
    };
    // 商品资源库管理-查找文件
    adminHttp.prototype.goodsResourceSearch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.search }));
    };
    // 商品资源库管理-修改文件名称
    adminHttp.prototype.goodsResourceUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.update }));
    };
    // 商品资源库管理-文件夹-创建文件夹
    adminHttp.prototype.goodsResourceLibraryAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.library.add.trim() }));
    };
    // 商品资源库管理-文件夹-修改文件夹名称
    adminHttp.prototype.goodsResourceLibraryUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.library.update.trim() }));
    };
    // 商品资源库管理-文件夹-文件夹-树状图
    adminHttp.prototype.goodsResourceLibraryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.library.list.trim() }));
    };
    // 商品资源库管理-文件夹-移动文件夹
    adminHttp.prototype.goodsResourceLibraryMove = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.library.move.trim() }));
    };
    // 商品资源库管理-文件夹-删除文件夹
    adminHttp.prototype.goodsResourceLibraryDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.library.delete.trim() }));
    };
    // 商品运营类目-查询二级运营类别商品运营类目删除
    adminHttp.prototype.goodsCategoryOperateDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.delete }));
    };
    // 商品运营类目-查询二级运营类别
    adminHttp.prototype.goodsCategoryOperateDisableTypeUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.disabletypeUpdate }));
    };
    // 商品运营类目-查询二级运营类别1
    adminHttp.prototype.goodsCategoryOperateSelectSecondCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.selectSecondCategory }));
    };
    // 商品运营类目-更新商品类别
    adminHttp.prototype.goodsCategoryOperateGoodsCategoryGoodsUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.goodscategorygoodsUpdate }));
    };
    // 商品运营类目-商品运营类目列表
    adminHttp.prototype.goodsCategoryOperateList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.list }));
    };
    // 商品运营类目-商品运营类目添加
    adminHttp.prototype.goodsCategoryOperateSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.save }));
    };
    // 商品运营类目-查询二级运营类别
    adminHttp.prototype.goodsCategoryOperateSortUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.sortUpdate }));
    };
    // 商品运营类目-商品运营类目修改
    adminHttp.prototype.goodsCategoryOperateUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.category.operate.update }));
    };
    // 产品类型-禁用启用
    adminHttp.prototype.goodsTypeStatusUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.statusUpdate }));
    };
    // 产品类型-添加产品类型
    adminHttp.prototype.goodsTypeSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.save }));
    };
    // 产品类型-删除
    adminHttp.prototype.goodsTypeDeleteBy$id = function (data, option) {
        if (data === void 0) { data = {
            id: '',
        }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.delete$id + data.id }));
    };
    // 产品类型-删除评价关键词
    adminHttp.prototype.goodsTypeDeleteName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.delete.name }));
    };
    // 产品类型-列表
    adminHttp.prototype.goodsTypeStatusList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.type.list }));
    };
    // 销售订单v1/order/sell/status/count
    adminHttp.prototype.orderSellQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.sell.query.list }));
    };
    // 销售数值/v1/order/invest/status/count
    adminHttp.prototype.orderSellStatusCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.sell.status.count }));
    };
    //销售订单统计
    adminHttp.prototype.orderSellListStatistics = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderSellListStatistics }));
    };
    //铺货订单
    adminHttp.prototype.orderDistributionPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderDistributionPage }));
    };
    //铺货订单页签
    adminHttp.prototype.orderDistributionCountList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderDistributionCountList }));
    };
    //投资订单统计
    adminHttp.prototype.orderInvestListStatistics = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.orderInvestListStatistics }));
    };
    // 投资数值/v1/order/invest/status/count
    adminHttp.prototype.orderInvestStatusCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].order.invest.status.count }));
    };
    // 商品模板列表 -  商品模板添加
    adminHttp.prototype.goodsTemplateParamProperty = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.param.property }));
    };
    // 获取 县市区
    adminHttp.prototype.findArea = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].sixHotArea }));
    };
    // 获取 省市区/v1/sixhot / area / tree
    adminHttp.prototype.sixHotAreaTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].sixHotAreaTree }));
    };
    adminHttp.prototype.companyInfoRemoveBinder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoRemoveBinder }));
    };
    adminHttp.prototype.companyInfoChangeBinder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].company.companyInfoChangeBinder }));
    };
    adminHttp.prototype.apiRolePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].api.role.page }));
    };
    // 获取员工角色列表
    adminHttp.prototype.apiRoleCompany = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].roleCompany }));
    };
    return adminHttp;
}(ajax_1.default));
exports.default = adminHttp;
//# sourceMappingURL=admin.js.map