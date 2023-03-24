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
var imHttp = /** @class */ (function (_super) {
    __extends(imHttp, _super);
    function imHttp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // apiImAttentionMeList: `${$v1Api}im/attention/me/list`, // 关注我的列表
    /**
     * 关注我的列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImAttentionMeList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImAttentionMeList }));
    };
    /**
     * 我的好友列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImAttentionMeMyFriend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImAttentionMeMyFriend }));
    };
    // apiImMyAttentionNotSeeIt: `${$v1Api}im/my/attention/notSeeIt`, // 不看TA的
    /**
     * 我的关注列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMyAttentionNotSeeIt = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionNotSeeIt }));
    };
    // apiImMyAttentionAdd: `${$v1Api}im/my/attention/add`, // 不让TA看
    /**
     * 我的关注列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMyAttentionAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionAdd }));
    };
    // apiImMyAttentionList: `${$v1Api}im/my/attention/list`, // 我的关注列表
    /**
     * 我的关注列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMyAttentionList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionList }));
    };
    // apiGoodsQueryGoodsByUser: `${$v1Api}goods/query/goodsByUser`, // 获取商品列表-即时通讯聊天发送使用
    /**
     * 获取商品列表-即时通讯聊天发送使用
     * @param data
     * @param option
     */
    imHttp.prototype.apiGoodsQueryGoodsByUser = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiGoodsQueryGoodsByUser }));
    };
    // apiImAttentionMeDontSeeMe: `${$v1Api}im/attention/me/dontSeeMe`, // 不让TA看
    /**
     * 不让TA看
     * @param data
     * @param option
     */
    imHttp.prototype.apiImAttentionMeDontSeeMe = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImAttentionMeDontSeeMe }));
    };
    // apiImAttentionMePower: `${$v1Api}im/attention/me/power`, // 好友权限
    /**
     * 好友权限
     * @param data
     * @param option
     */
    imHttp.prototype.apiImAttentionMePower = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImAttentionMePower }));
    };
    // apiImFriendBlackList: `${$v1Api}im/friend/black/list`, // 黑名单列表
    /**
     * 黑名单列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImFriendBlackList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImFriendBlackList }));
    };
    // apiImFriendBlackRelieve: `${$v1Api}im/friend/black/relieve`, // 解除黑名单
    /**
     * 解除黑名单
     * @param data
     * @param option
     */
    imHttp.prototype.apiImFriendBlackRelieve = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImFriendBlackRelieve }));
    };
    // apiImFriendBlackSave: `${$v1Api}im/friend/black/save`, // 加入黑名单
    /**
     * 加入黑名单
     * @param data
     * @param option
     */
    imHttp.prototype.apiImFriendBlackSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImFriendBlackSave }));
    };
    // apiImNoticeConfigDetail: `${$v1Api}im/notice/config/detail`, // 服务配置详情
    /**
     * 服务配置详情
     * @param data
     * @param option
     */
    imHttp.prototype.apiImNoticeConfigDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImNoticeConfigDetail }));
    };
    // apiImNoticeConfigSaveOrUpdate: `${$v1Api}im/notice/config/saveOrUpdate`, // 添加服务配置
    /**
     * 添加服务配置
     * @param data
     * @param option
     */
    imHttp.prototype.apiImNoticeConfigSaveOrUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImNoticeConfigSaveOrUpdate }));
    };
    // apiImMessageListUdateTop: `${$v1Api}im/message/list/update/top`, // 置顶聊天/取消置顶
    /**
     * 置顶聊天/取消置顶
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMessageListUdateTop = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListUdateTop }));
    };
    // apiImMessageListUpdateDisturb: `${$v1Api}im/message/list/update/disturb`, // 修改免打扰
    /**
     * 修改免打扰
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMessageListUpdateDisturb = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListUpdateDisturb }));
    };
    // apiImMessageListSave: `${$v1Api}im/message/list/save`, // 添加聊天列表
    /**
     * 添加聊天列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMessageListSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListSave }));
    };
    // apiImMessageListSelectMessageList: `${$v1Api}im/message/list/select/messagelist`, // 查询本用户的消息列表
    /**
     * 查询本用户的消息列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMessageListSelectMessageList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListSelectMessageList }));
    };
    // apiImMessageListSelectNotReadNum: `${$v1Api}im/message/list/select/notReadNum`, // 查询本用户未读消息数量
    /**
     * 查询本用户的消息列表
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMessageListSelectNotReadNum = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListSelectNotReadNum }));
    };
    // apiMessageRecordGetMessage: `${$v1Api}message/record/getMessage`, // 取聊天记录
    /**
     * 取聊天记录
     * @param data
     * @param option
     */
    imHttp.prototype.apiMessageRecordGetMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordGetMessage }));
    };
    // apiMessageList$Id: `${$v1Api}im/message/list`, // 从列表中删除
    /**
     * 从列表中删除
     * @param id
     * @param option
     */
    imHttp.prototype.apiMessageList$Id = function (id, option) {
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageList$Id + "/".concat(id) }));
    };
    // apiMessageRecordReadMessage: `${$v1Api}message/record/readMessage`, // 读聊天记录
    /**
     * 读聊天记录
     * @param data
     * @param option
     */
    imHttp.prototype.apiMessageRecordReadMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordReadMessage }));
    };
    // apiMessageRecordAudioText: `${$v1Api}message/record/audioToText`, // 语音转文字
    /**
     * 语音转文字
     * @param data
     * @param option
     */
    imHttp.prototype.apiMessageRecordAudioText = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordAudioText }));
    };
    // 语音转文字路径 apiMessageRecordAudioToTextFromUrl
    imHttp.prototype.apiMessageRecordAudioToTextFromUrl = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordAudioToTextFromUrl }));
    };
    // 模糊查询
    imHttp.prototype.apiImMessageListSearch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListSearch }));
    };
    // apiMessageRecordRecordSendMessage: `${$v1Api}message/record/sendMessage`, // 发送消息存储
    /**
     * 发送消息存储
     * @param data
     * @param option
     */
    imHttp.prototype.apiMessageRecordRecordSendMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordRecordSendMessage }));
    };
    // apiOrderSellQueryListByUser: `${$v1Api}order/sell/query/listByUser`, // 销售订单列表，即时通讯发送订单使用
    /**
     * 销售订单列表，即时通讯发送订单使用
     * @param data
     * @param option
     */
    imHttp.prototype.apiOrderSellQueryListByUser = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiOrderSellQueryListByUser }));
    };
    // apiImMessageListMessageUserInfo
    /**
     * 聊天设置回显 回显聊天对方用户设置
     * @param data
     * @param option
     */
    imHttp.prototype.apiImMessageListMessageUserInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMessageListMessageUserInfo }));
    };
    /**
     * 取消关注 imMyAttentionDelete
     */
    imHttp.prototype.apiImMyAttentionDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionDelete }));
    };
    /**
     * 通讯录数量
     */
    imHttp.prototype.apiImMyAttentionCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionCount }));
    };
    /**
     * 修改备注
     */
    imHttp.prototype.apiImMyAttentionUpdateNickName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionUpdateNickName }));
    };
    /**
     * 好友详情 apiImMyAttentionUserInfo
     */
    imHttp.prototype.apiImMyAttentionUserInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionUserInfo }));
    };
    /**
     * apiMessageRecordClearMessage 清除聊天记录
     */
    imHttp.prototype.apiMessageRecordClearMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordClearMessage }));
    };
    /**
     * apiMessageRecordUpdateMessage 清除聊天记录
     */
    imHttp.prototype.apiMessageRecordUpdateMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordUpdateMessage }));
    };
    imHttp.prototype.apiImMyAttentionAgentShop = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiImMyAttentionAgentShop }));
    };
    // 获取店铺详情  apiCompanyInfoImStore
    imHttp.prototype.apiCompanyInfoImStore = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiCompanyInfoImStore }));
    };
    //给店铺发送消息
    imHttp.prototype.apiMessageRecordCompanySendMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordCompanySendMessage }));
    };
    // 根据店铺id获取userId
    imHttp.prototype.apiMessageRecordCompanyChangeUser = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].im.apiMessageRecordCompanyChangeUser }));
    };
    return imHttp;
}(ajax_1.default));
exports.default = imHttp;
//# sourceMappingURL=im.js.map