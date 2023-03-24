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
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        return _super.call(this, props) || this;
    }
    /**
     * @title 订单数-折线图
     * @API http://10.0.2.42:11122/project/132/interface/api/27482
     * @param data
     * @param option
     * @method POST
     *
     */
    Home.prototype.homePagePcOrderNumberLine = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].home.homePagePcOrderNumberLine }));
    };
    /**
     * @title 平台交易额-折线图- POST
     * @API http://10.0.2.42:11122/project/132/interface/api/27491
     * @param data
     * @param option
     * @method POST
     *
     */
    Home.prototype.homePagePcAmountCountLine = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].home.homePagePcAmountCountLine }));
    };
    /**
     * @title 平台总收入-饼状图
     * @API http://10.0.2.42:11122/project/132/interface/api/27500
     * @param data
     * @param option
     * @method POST
     *
     */
    Home.prototype.homePagePcAmountFeePie = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].home.homePagePcAmountFeePie }));
    };
    return Home;
}(ajax_1.default));
exports.default = Home;
//# sourceMappingURL=home.js.map