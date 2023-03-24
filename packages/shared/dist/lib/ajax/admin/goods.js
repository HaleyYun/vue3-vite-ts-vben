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
var Goods = /** @class */ (function (_super) {
    __extends(Goods, _super);
    function Goods(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 服务佣金配置 修改
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionUpdate }));
    };
    /**
     * 服务佣金配置 获取已设置省份
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionModelProvince = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionModelProvince }));
    };
    /**
     * 服务佣金配置 导出
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionExport = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionExport }));
    };
    /**
     * 服务佣金配置 分页查询
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionQueryPageList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionQueryPageList }));
    };
    /**
     * 服务佣金配置 删除
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionDelBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionDelBy$id + data.id }));
    };
    /**
     * 服务佣金配置 获取全国34个省份
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionProvince = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionProvince }));
    };
    /**
     * 服务佣金配置 详情
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionDetail }));
    };
    /**
     * 服务佣金配置 添加
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCommissionSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCommissionSave }));
    };
    /**
     * 旧机回收商品-pc 暂停/启动回收
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelStatus }));
    };
    /**
     * // 旧机回收商品-pc 操作历史记录
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelOperate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelOperate }));
    };
    /**
     * // 旧机回收商品-pc 初始化数量统计
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelCount }));
    };
    /**
     * // 旧机回收商品-pc 列表查询（带分页）
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelQueryListPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelQueryListPage }));
    };
    /**
     * // 旧机回收商品-pc 详情
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelDetail }));
    };
    /**
     * 投资项目-操作历史记录-项目-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsInvestmentOperateList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentOperateList }));
    };
    /**
     * 投资项目-操作历史记录-商品-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsGoodsOperateList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsOperateList }));
    };
    /**
     * 投资项目润列表-项目-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsInvestmentProfitList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentProfitList }));
    };
    /**
     * 投资项目-设置分润-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsInvestmentProfit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentProfit }));
    };
    /**
     * 商品型号-新增-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelSave }));
    };
    /**
     * 商品型号-修改-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelUpdate }));
    };
    /**
     * 商品型号-启用/禁用-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelEnableUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelEnableUpdate }));
    };
    /**
     * 商品型号-批量删除-DELETE
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelBatchDelete }));
    };
    /**
     * 商品型号-删除-DELETE
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelDeleteBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelDeleteBy$id + "/".concat(data.id) }));
    };
    /**
     * 商品型号-列表-分页-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelQueryPage }));
    };
    /**
     * 商品型号-型号下拉列表-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelSelectList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelSelectList }));
    };
    /**
     * 售后补偿配置-新增-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCompensateSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCompensateSave }));
    };
    /**
     * 售后补偿配置-修改-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCompensateUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCompensateUpdate }));
    };
    /**
     * 售后补偿配置-零部件列表-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCompensateUnitList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCompensateUnitList }));
    };
    /**
     * 旧件寄回-启用/禁用-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCompensateSendBackUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCompensateSendBackUpdate }));
    };
    /**
     * 售后补偿配置-删除-DELETE
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCompensateDeleteBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCompensateDeleteBy$id + "/".concat(data.id) }));
    };
    /**
     * 售后补偿配置-列表-分页-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelCompensateQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelCompensateQueryPage }));
    };
    /**
     * 预售活动管理-列表分页查询-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecyclePreSaleQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecyclePreSaleQueryList }));
    };
    /**
     * 预售活动管理-初始化数量统计-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecyclePreSaleListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecyclePreSaleListCount }));
    };
    /**
     * 预售活动管理-上架/下架-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecyclePreSaleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecyclePreSaleUpdate }));
    };
    /**
     * 预售活动管理-详情-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecyclePreSaleDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecyclePreSaleDetail }));
    };
    /**
     * 预售活动管理-操作历史记录-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecyclePreSaleOperateList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecyclePreSaleOperateList }));
    };
    /**
     * 商品型号申请-详情-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelApplyView = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelApplyView }));
    };
    /**
     * 商品型号申请-列表-分页-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelViewBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelViewBy$id + data.id }));
    };
    /**
     * 机再销售管理-上架/下架-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelUpdateStatus }));
    };
    /**
     * 旧机再销售管理-修改分润-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelUpdateProfit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelUpdateProfit }));
    };
    /**
     * 旧机再销售管理-审核-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelApproval = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelApproval }));
    };
    /**
     * 旧机再销售管理-操作列表-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelQueryOpLogList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelQueryOpLogList }));
    };
    /**
     * 旧机再销售管理-列表-分页-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsRecycleModelQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsRecycleModelQueryPage }));
    };
    /**
     * 商品型号申请-列表-分页-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelApplyQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelApplyQueryPage }));
    };
    /**
     * 图片视频资源列表
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsResourceFileList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsResourceFileList }));
    };
    /**
     * 商品型号申请-审核-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelApplyApproval = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelApplyApproval }));
    };
    /**
     * 旧机回收商品-暂停/启动回收-PUT
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelRecycleStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelRecycleStatus }));
    };
    /**
     * 旧机回收商品-操作历史记录-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelRecycleOperate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelRecycleOperate }));
    };
    /**
     * 旧机回收商品-初始化数量统计-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelRecycleCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelRecycleCount }));
    };
    /**
     * 商旧机回收商品-列表查询（带分页）-POST
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelRecycleQueryListPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelRecycleQueryListPage }));
    };
    /**
     * 旧机回收商品-详情-GET
     * @param data
     * @param option
     *
     */
    Goods.prototype.goodsModelRecycleDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelRecycleDetail }));
    };
    /*
          获取分润信息-GET
       * @param data
       * @param option
   */
    Goods.prototype.goodsInvestmentProfitRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentProfitRole }));
    };
    // 商品查看原因
    Goods.prototype.goodsGoodsQueryReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsQueryReason }));
    };
    // 获取商家商品 goodsGoodsShop
    Goods.prototype.goodsGoodsShop = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsShop }));
    };
    // 获取商家项目 goodsInvestmentShop
    Goods.prototype.goodsInvestmentShop = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentShop }));
    };
    // 获取商品列表所有的页签的数量统计
    Goods.prototype.goodsGoodsListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsListCount }));
    };
    // 获取商品列表所有的页签的数量统计（服务商）
    Goods.prototype.goodsGoodsAgentListCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsAgentListCount }));
    };
    // 获取提交人商品 goodsGoodsSubmitter
    Goods.prototype.goodsGoodsSubmitter = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsGoodsSubmitter }));
    };
    // 获取提交人项目 goodsInvestmentSubmitter
    Goods.prototype.goodsInvestmentSubmitter = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsInvestmentSubmitter }));
    };
    // 获取商品型号 goodsModelQueryListCatergory
    Goods.prototype.goodsModelQueryListCatergory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsModelQueryListCatergory }));
    };
    // 获取商品销量 goodsStatisticQuerySalesRankingList
    Goods.prototype.goodsStatisticQuerySalesRankingList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsStatisticQuerySalesRankingList }));
    };
    // 获取初始化分润
    Goods.prototype.goodsTemplateGetProfit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsTemplateGetProfit }));
    };
    // 获取同型号商品销量对比
    Goods.prototype.goodsStatisticQuerySalesComparisonList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsStatisticQuerySalesComparisonList }));
    };
    // 获取同型号商品销量对比
    Goods.prototype.goodsStatisticQueryInvestRankingList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsStatisticQueryInvestRankingList }));
    };
    // 商品类别，绑定列表-get
    Goods.prototype.goodsCategoryCategoryAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsCategoryCategoryAdd }));
    };
    // 品牌列表,绑定品牌用-get
    Goods.prototype.goodsBrandBrandAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsBrandBrandAdd }));
    };
    // 绑定类别
    Goods.prototype.goodsCategoryCertificationCategoryAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsCategoryCertificationCategoryAdd }));
    };
    // 绑定品牌-post
    Goods.prototype.goodsCertificationBrandBrandAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsCertificationBrandBrandAdd }));
    };
    // 商品模版数据统计count
    Goods.prototype.goodsTemplateCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.template.count }));
    };
    // 获取屏蔽的品牌 goodsBrandApplyShieldBrandList
    Goods.prototype.goodsBrandApplyShieldBrandList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsBrandApplyShieldBrandList }));
    };
    // 屏蔽品牌 goodsBrandApplyShieldBrand
    Goods.prototype.goodsBrandApplyShieldBrand = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.goodsBrandApplyShieldBrand }));
    };
    // 品牌列表,屏蔽品牌用 按字母排序 shield
    Goods.prototype.goodsBrandBrandShield = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.brand.shield }));
    };
    return Goods;
}(ajax_1.default));
exports.default = Goods;
//# sourceMappingURL=goods.js.map