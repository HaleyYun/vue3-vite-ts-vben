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
// 商品模块
var createHttp = /** @class */ (function (_super) {
    __extends(createHttp, _super);
    function createHttp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 模板列表
    createHttp.prototype.apiGoodsTemplateQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.template.query.list }));
    };
    // 品牌列表
    createHttp.prototype.apiGoodsBrandQueryApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.brand.query.apply.list }));
    };
    // 品牌申请
    createHttp.prototype.apiGoodsBrandQueryApplySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.brand.query.apply.save }));
    };
    // 品牌校验
    createHttp.prototype.apiGoodsBrandQueryApplyCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.brand.query.apply.check }));
    };
    // 型号列表
    createHttp.prototype.apiGoodsSkuQueryApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.sku.property.apply.list }));
    };
    // 参数属性
    createHttp.prototype.apiGoodsParamsPropertyQueryApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.params.property.apply.list }));
    };
    // 上货
    createHttp.prototype.apiGoodsSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.save }));
    };
    // 商品详情
    createHttp.prototype.apiGoodsDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.detail }));
    };
    // 销售区域
    createHttp.prototype.apiGoodsSealAreaQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.seal.area.query.list }));
    };
    // 商品类型
    createHttp.prototype.apiGoodsTypeQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.type.query.list }));
    };
    // 商品类别
    createHttp.prototype.apiGoodsCategoryQueryCategoryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.category.query.category.list }));
    };
    // 模板详情
    createHttp.prototype.apiGoodsTemplateDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.template.detail }));
    };
    // 申请上架
    createHttp.prototype.apiGoodsProjectInvestmentApplyStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.apply.status }));
    };
    // 添加
    createHttp.prototype.apiGoodsProjectInvestmentSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.save }));
    };
    // 修改
    createHttp.prototype.apiGoodsProjectInvestmentUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.update }));
    };
    // 查看原因
    createHttp.prototype.apiGoodsProjectInvestmentReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.reason }));
    };
    // 检查是否可以申请上架
    createHttp.prototype.apiGoodsProjectInvestmentWhetherApplyListing = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.whetherApplyListing }));
    };
    // 修改状态
    createHttp.prototype.apiGoodsProjectInvestmentUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.updateStatus }));
    };
    // 投资详情
    createHttp.prototype.apiGoodsProjectInvestmentDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.detail }));
    };
    //  获取商品列表
    createHttp.prototype.apiGoodsQueryMyGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.query.myGoods }));
    };
    // 项目投资列表
    createHttp.prototype.apiGoodsProjectInvestmentList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.list }));
    };
    // 卖家视角预览
    createHttp.prototype.apiGoodsProjectInvestmentSellerPreview = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.sellerPreview }));
    };
    // 买家视角预览
    createHttp.prototype.apiGoodsProjectInvestmentBuyerPreview = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.project.investment.buyerPreview }));
    };
    // 价格指导查询列表
    createHttp.prototype.apiGoodsQueryPriceGuideList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.query.priceGuideList }));
    };
    // 服务商-投资列表
    createHttp.prototype.apiGoodsProjectInvestmentSpList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsProjectInvestmentSpList }));
    };
    // 热门品牌列表
    createHttp.prototype.apiGoodsBrandQueryListHot = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandQueryListHot }));
    };
    // 商品查询列表-代客下单/修理厂列表
    createHttp.prototype.apiGoodsQueryWarehousesGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsQueryWarehousesGoodsList }));
    };
    // 商品查询列表-代客下单/修理厂列表
    createHttp.prototype.apiGoodsQueryWarehousesGoodsList$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsQueryWarehousesGoodsList$Post }));
    };
    // 修理厂商品详情
    createHttp.prototype.apiGoodsGarageDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsGarageDetail }));
    };
    // 修理厂商品详情
    createHttp.prototype.apiGoodsApplyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsApplyUpdate }));
    };
    // 修理厂商品详情
    createHttp.prototype.apiGoodsDistributionApplyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsDistributionApplyUpdate }));
    };
    // 代客下单
    createHttp.prototype.apiCompanyInfoGaragePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoGaragePage }));
    };
    createHttp.prototype.apiGoodsQueryGoodsOnSale = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsQueryGoodsOnSale }));
    };
    // 服务商选择商品-非自由仓
    createHttp.prototype.apiGoodsQueryChooseGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsQueryChooseGoods }));
    };
    // 商品收藏列表
    createHttp.prototype.apiGoodsCollectionCollectionList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCollectionList }));
    };
    // 商品收藏
    createHttp.prototype.apiGoodsCollectionCollection = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCollection }));
    };
    // 取消收藏
    createHttp.prototype.apiGoodsCollectionCancel$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCancel$Id + '/' + data.id }));
    };
    // 取消收藏批量操作
    createHttp.prototype.apiGoodsCollectionCancelBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCancelBatch }));
    };
    // 我的收藏数量
    createHttp.prototype.apiGoodsCollectionCollectionCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCollectionCount }));
    };
    // 店铺收藏列表
    createHttp.prototype.apiGoodsCollectionStoreCollectionList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionStoreCollectionList }));
    };
    // 店铺收藏
    createHttp.prototype.apiGoodsCollectionCollectionStore = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCollectionStore }));
    };
    // 店铺取消收藏
    createHttp.prototype.apiGoodsCollectionCancelStore$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCancelStore$Id + '/' + data.id }));
    };
    // 店铺取消收藏批量
    createHttp.prototype.apiGoodsCollectionCancelStoreBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsCollectionCancelStoreBatch }));
    };
    // 商品流量统计 apiGoodsVisitRecordStatistic
    createHttp.prototype.apiGoodsVisitRecordStatistic = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsVisitRecordStatistic }));
    };
    // 商品人气分页列表 apiGoodsVisitRecordQuery
    createHttp.prototype.apiGoodsVisitRecordQuery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsVisitRecordQuery }));
    };
    // 商品收藏量排序 apiGoodsCollectionGoodsCollectionSorted
    createHttp.prototype.apiGoodsCollectionGoodsCollectionSorted = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCollectionGoodsCollectionSorted }));
    };
    // apiGoodsVisitRecordAdd 插入浏览量（修理厂查看、分享）
    createHttp.prototype.apiGoodsVisitRecordAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsVisitRecordAdd }));
    };
    // 根据项目id获取项目服务费-GET
    createHttp.prototype.apiGoodsProjectInvestmentGetProjectServeFee = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsProjectInvestmentGetProjectServeFee }));
    };
    // 根据项目id获取项目服务费-GET
    createHttp.prototype.apiGoodsGetGoodsServeFee = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsGetGoodsServeFee }));
    };
    // 服务商一键上架供应商商品
    createHttp.prototype.apiGoodsShelves = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsShelves }));
    };
    // 服务商一键上架供应商商品
    createHttp.prototype.apiGoodsShelfBulk = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsShelfBulk }));
    };
    return createHttp;
}(ajax_1.default));
exports.default = createHttp;
//# sourceMappingURL=goods.js.map