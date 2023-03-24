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
//财务模块
var Finance = /** @class */ (function (_super) {
    __extends(Finance, _super);
    function Finance(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 保证金查询分页列表查询-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeMarginPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeMarginPage }));
    };
    /**
     * 保证金查看详情-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeMarginDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeMarginDetail }));
    };
    /**
     * 未结算订单分页查询-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeBillOrderPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillOrderPage }));
    };
    /**
     * 添加未结算订单-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeBillOrder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillOrder }));
    };
    /**
     * 批量添加未结算订单-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeBillOrderBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillOrderBatch }));
    };
    /**
     * 分页获取结算单信息-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeBillManagePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillManagePage }));
    };
    /**
     * id 获取结算单详情-GET
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeBillManageBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillManageBy$id }));
    };
    /**
     * 平台垫付(转账)分页列表-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeAdvancesStandingPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeAdvancesStandingPage }));
    };
    /**
     * 平台垫付(转账)查看详情-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    Finance.prototype.financeAdvancesStandingDetailBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeAdvancesStandingDetailBy$id + "/".concat(data.id) }));
    };
    /**
   * 平台垫付(转账)确认收款-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/26546
   * @param data
   * @param option
   */
    Finance.prototype.financeAdvancesStandingConfirmBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeAdvancesStandingConfirmBy$id + "/".concat(data.id) }));
    };
    /**
     * 获取默认结算周期规则-GET
     * api:http://10.0.2.42:11122/project/124/interface/api/26033
     * @param data
     * @param option
     */
    Finance.prototype.financeBillConfigDefault = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillConfigDefault }));
    };
    /**
     * 修改结算配置信息-GET
     * api:http://10.0.2.42:11122/project/124/interface/api/26042
     * @param data
     * @param option
     */
    Finance.prototype.financeBillConfig = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillConfig }));
    };
    /**
     * financeBillManageManualBill
     * 结算单 id，手动结算异常结算单-POST
     *
     * @param data
     * @param option
     */
    Finance.prototype.financeBillManageManualBill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeBillManageManualBill }));
    };
    /**
    *
    * 分页查询支付单列表-POST
    *
    * @param data
    * @param option
    */
    Finance.prototype.financePayPcPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financePayPcPage }));
    };
    /**
    *
    * 根据支付单id获取支付单详情-POST finance/pay/detail
    *
    * @param data
    * @param option
    */
    Finance.prototype.financePayDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financePayDetail }));
    };
    /**
   *
   * 发票分页列表查询-POST
   *
   * @param data
   * @param option
   */
    Finance.prototype.financeInvoiceSelectList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeInvoiceSelectList }));
    };
    /**
  *
  * PC-发票详情-POST
  *
  * @param data
  * @param option
  */
    Finance.prototype.financeInvoiceDetailSellBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeInvoiceDetailSellBy$id + "/".concat(data.id) }));
    };
    /**
  *
  * PC-确认开票-PUT
  *
  * @param data
  * @param option
  */
    Finance.prototype.financeInvoiceConfirmInvoice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeInvoiceConfirmInvoice }));
    };
    /**
  *
  * PC-开票详情页,不包含订单-Get
  *
  * @param data
  * @param option
  */
    Finance.prototype.financeInvoiceDetailBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeInvoiceDetailBy$id + "/".concat(data.id) }));
    };
    /**
  *
  * PC-开票页订单信息-Get
  *
  * @param data
  * @param option
  */
    Finance.prototype.financeInvoiceOrderListBy$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].finance.financeInvoiceOrderListBy$id + "/".concat(data.id) }));
    };
    return Finance;
}(ajax_1.default));
exports.default = Finance;
//# sourceMappingURL=finance.js.map