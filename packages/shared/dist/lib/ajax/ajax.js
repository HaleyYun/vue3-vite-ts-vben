"use strict";
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
// 定义 通用request请求
// 包含公用的接口
// 初始化config配置
var helpers_1 = require("./helpers");
var api_1 = require("./api");
var objects_1 = require("../utils/objects");
var VoHttp = /** @class */ (function () {
    // 初始化服务
    function VoHttp(config) {
        (0, helpers_1.transformConfig)(config);
        this.$config = config;
        if (!(0, objects_1.hasOwn)(config, 'requestInstance')) {
            throw new Error('请传入requestInstance实例化对象');
        }
        this.$service = config === null || config === void 0 ? void 0 : config.requestInstance;
    }
    /**
     * 用于快捷获取对应的url
     * @param path community/content/idea/release
     * @param channel
     * @param version
     */
    VoHttp.prototype.getFullUrlByAdmin = function (path, channel, version) {
        if (channel === void 0) { channel = 'admin'; }
        if (version === void 0) { version = 'v1'; }
        if (channel === 'admin')
            return (0, helpers_1.getTreeConfig)(api_1.AdminApi[version], path.split('/'));
        if (channel === 'app')
            return (0, helpers_1.getTreeConfig)(api_1.AppApi[version], path.split('/'));
    };
    // 判断是PC环境
    VoHttp.prototype.isPc = function () {
        return this.$config['device'] === 'PC';
    };
    // 判断是否是 uni-app
    VoHttp.prototype.isUni = function () {
        return this.$config['device'] === 'UNI';
    };
    // 测试案例
    VoHttp.prototype.testList = function (option) {
        var localOptions = this.mergeRequest(option);
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].home.es.test }));
    };
    // 登录接口
    VoHttp.prototype.login = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].login }));
    };
    // 退出接口
    VoHttp.prototype.logoff = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].logoff }));
    };
    // 退出接口
    VoHttp.prototype.register = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].register }));
    };
    // 登录短信验证码
    VoHttp.prototype.smsSend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].smsSend }));
    };
    // 登录接口
    VoHttp.prototype.test = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].test }));
    };
    // 获取角色列表
    VoHttp.prototype.role = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].role }));
    };
    // 切换角色
    VoHttp.prototype.switchRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].switchRole }));
    };
    // 设置密码
    VoHttp.prototype.password = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].password }));
    };
    // 设置密码
    VoHttp.prototype.smsVerify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].smsVerify }));
    };
    // 获取腾讯云 临时凭证
    VoHttp.prototype.apiCreatedCosGet = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].apiCreatedCosGet }));
    };
    // 微信签名
    VoHttp.prototype.wxSignature = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].wxSignature }));
    };
    // 初始化参数-处理
    VoHttp.prototype.mergeRequest = function (config) {
        if (!(0, objects_1.isPlainObject)(config)) {
            config = {};
        }
        if (!(0, objects_1.hasOwn)(config, 'data')) {
            config['data'] = {};
        }
        if ((0, objects_1.hasOwn)(config, 'version') && !helpers_1.version.includes(config.version)) {
            console.warn('version must be v1 or v2, version default v1');
            config.version = helpers_1.defaultVersion;
        }
        if (!(0, objects_1.hasOwn)(config, 'version')) {
            config.version = helpers_1.defaultVersion;
        }
        return config;
    };
    return VoHttp;
}());
exports.default = VoHttp;
//# sourceMappingURL=ajax.js.map