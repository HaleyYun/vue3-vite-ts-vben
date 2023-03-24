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
var create_1 = require("./create");
var business_1 = require("./business");
var goods_1 = require("./goods");
var user_1 = require("./user");
var im_1 = require("./im");
var warehouse_1 = require("./warehouse");
// tslint:disable-next-line:class-name
var appHttp = /** @class */ (function (_super) {
    __extends(appHttp, _super);
    function appHttp(props) {
        var _this = _super.call(this, props) || this;
        // 创建模块
        _this.CREATE_MODEL = null;
        _this.BUSINESS = null;
        _this.IM = null;
        _this.USER = null;
        _this.WAREHOUSE = null;
        _this.CREATE_MODEL = new create_1.default(props);
        _this.USER = new user_1.default(props);
        _this.BUSINESS = new business_1.default(props);
        _this.GOODS = new goods_1.default(props);
        _this.IM = new im_1.default(props);
        _this.WAREHOUSE = new warehouse_1.default(props);
        return _this;
    }
    // app通用支付
    appHttp.prototype.appPay = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.CommonApi["".concat(localOptions.version)].pay }));
    };
    // 测试案例
    appHttp.prototype.appTestList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].home.es.test }));
    };
    // 栏目列表
    appHttp.prototype.apiCreateColumnList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateColumnList }));
    };
    // 发视频
    appHttp.prototype.apiCreateVideoSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateVideoSave }));
    };
    // 根据id获取视频详情
    appHttp.prototype.apiCreateVideo$Id = function (data, option) {
        if (data === void 0) { data = {
            id: '',
        }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateVideo$Id + "/" + data.id }));
    };
    // 发想法
    appHttp.prototype.apiCreateIdeasSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateIdeasSave }));
    };
    // 获取车系字典
    appHttp.prototype.apiCompanyInfoSerialDic = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoSerialDic }));
    };
    appHttp.prototype.apiCompanyInfoAdminPhoneNumber = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoAdminPhoneNumber }));
    };
    appHttp.prototype.apiCompanyLegalSkillGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalSkillGarage }));
    };
    appHttp.prototype.apiCompanyBindingInviterExist = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyBindingInviterExist }));
    };
    // 根据id获取想法详情
    appHttp.prototype.apiCreateIdeas$Id = function (data, option) {
        if (data === void 0) { data = {
            id: '',
        }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateIdeas$Id + "/" + data.id }));
    };
    // 问答举报
    appHttp.prototype.apiCreateQuestionsQuestionTipoff = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionTipoff }));
    };
    // 问答点赞
    appHttp.prototype.apiCreateQuestionsQuestionLike = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionLike }));
    };
    // 问答取消点赞
    appHttp.prototype.apiCreateQuestionsQuestionCancelLike = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionCancelLike }));
    };
    // 问答收藏
    appHttp.prototype.apiCreateQuestionsQuestionCollect = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionCollect }));
    };
    // 问答取消收藏
    appHttp.prototype.apiCreateQuestionsQuestionCancelCollect = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionCancelCollect }));
    };
    // 写回答
    appHttp.prototype.apiCreateQuestionsAnswerSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsAnswerSave }));
    };
    // 发问题
    appHttp.prototype.apiCreateQuestionsQuestionSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionSave }));
    };
    // 问题列表
    appHttp.prototype.apiCreateQuestionsQuestionList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionList }));
    };
    // 问答详情
    appHttp.prototype.apiCreateQuestionsQuestion$Id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestion$Id }));
    };
    // 查看内容
    appHttp.prototype.apiCreateQuestionsQuestionView$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionView$Id + '/' + data.id }));
    };
    // 根据id获取回答详情
    appHttp.prototype.apiCreateQuestionsAnswer$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsAnswer$Id + '/' + data.id }));
    };
    // 评论取消点赞
    appHttp.prototype.apiCreateQuestionsCommentCancelLike = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsCommentCancelLike }));
    };
    // 评论点赞
    appHttp.prototype.apiCreateQuestionsCommentLike = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsCommentLike }));
    };
    // 评论列表
    appHttp.prototype.apiCreateQuestionsCommentList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsCommentList }));
    };
    // 发评论
    appHttp.prototype.apiCreateQuestionsCommentSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsCommentSave }));
    };
    // 评论回复
    appHttp.prototype.apiCreateQuestionsCommentReplay = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsCommentReplay }));
    };
    // 评论举报
    appHttp.prototype.apiCreateQuestionsCommentTipoff = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsCommentTipoff }));
    };
    // 修改问题
    appHttp.prototype.apiCreateQuestionsQuestionUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsQuestionUpdate }));
    };
    // 修改回答
    appHttp.prototype.apiCreateQuestionsAnswerUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsAnswerUpdate }));
    };
    // 回答列表
    appHttp.prototype.apiCreateQuestionsAnswerList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsAnswerList }));
    };
    // 个人基本信息
    appHttp.prototype.apiCreateQuestionsHomeGetUserInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetUserInfo }));
    };
    // 修改个人基本信息
    appHttp.prototype.apiCreateQuestionsHomeUpdateUserInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeUpdateUserInfo }));
    };
    // 根据userid获取个人主页数量
    appHttp.prototype.apiCreateQuestionsHomeGetUserInfoById = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetUserInfoById +
                '/' +
                data.id }));
    };
    // 根据userid获取个人主页数量
    appHttp.prototype.apiCreateQuestionsHomeGetInfoById = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetInfoById + '/' + data.id }));
    };
    // 根据id获取是否关注
    appHttp.prototype.apiCreateQuestionsHomeGetFollowTypeById$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetFollowTypeById$Id +
                '/' +
                data.id }));
    };
    // 关注
    appHttp.prototype.apiCreateQuestionsHomeUpdateFollow = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeUpdateFollow }));
    };
    // 取消关注
    appHttp.prototype.apiCreateQuestionsHomeCancelFollow = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeCancelFollow }));
    };
    // 取消关注
    appHttp.prototype.apiCreateQuestionsHomeGetFans = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetFans }));
    };
    // 取消关注
    appHttp.prototype.apiCreateQuestionsHomeGetAttention = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetAttention }));
    };
    // 我的收藏列表
    appHttp.prototype.apiCreateQuestionsHomeGetCollection = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeGetCollection }));
    };
    // 取消收藏
    appHttp.prototype.apiCreateQuestionsHomeCancelCollect = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeCancelCollect }));
    };
    //检查是否可以发表评论
    appHttp.prototype.apiCreateQuestionsHomeCheckEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeCheckEnable }));
    };
    appHttp.prototype.apiCreateQuestionsHomeCollectTotalCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].create.apiCreateQuestionsHomeCollectTotalCount }));
    };
    // 易券大厅---易券大厅列表分页查询
    appHttp.prototype.apiCouponTradePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.page }));
    };
    // 易券大厅---优惠券交换设置,可交换的优惠券列表
    appHttp.prototype.apiCouponTradeMy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.my }));
    };
    // 易券大厅---正在交换的优惠券，我上架到易券大厅的优惠券
    appHttp.prototype.apiCouponTradeTrading = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.trading }));
    };
    // 易券大厅---我的优惠券上架到易券大厅的
    appHttp.prototype.apiCouponTradeShelf = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.shelf }));
    };
    // 易券大厅---想跟我换,被申请方待处理列表
    appHttp.prototype.apiCouponTradeResponderPending = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.respondent.pending }));
    };
    // 易券大厅---想跟我换,被申请方已同意列表
    appHttp.prototype.apiCouponTradeResponderApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.respondent.approved }));
    };
    // 易券大厅---想跟我换,被申请方已同意列表
    appHttp.prototype.apiCouponTradeResponderRejected = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.respondent.rejected }));
    };
    // 易券大厅---我想换的,申请方已申请列表
    appHttp.prototype.apiCouponTradeApplicantPending = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.applicant.pending }));
    };
    // 易券大厅---申请方交换成功列表
    appHttp.prototype.apiCouponTradeApplicantApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.applicant.approved }));
    };
    // 易券大厅---我想换的,已拒绝列表
    appHttp.prototype.apiCouponTradeApplicantRejected = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.applicant.rejected }));
    };
    // 易券大厅---我想换的,已拒绝列表
    appHttp.prototype.apiCouponTradeApplicantCancel$id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.applicant.cancel$id }));
    };
    // 易券大厅---想和我换 同意申请
    appHttp.prototype.apiCouponTradeResponderAgree$id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.respondent.agree$id }));
    };
    // 易券大厅---想和我换 拒绝申请
    appHttp.prototype.apiCouponTradeResponderReject$id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.trade.respondent.reject$id }));
    };
    // 易券大厅---设置想要的优惠券
    appHttp.prototype.apiCouponWantConfig = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.want.config }));
    };
    // 易券大厅---获取我想要的优惠券配置
    appHttp.prototype.apiCouponWantConfig$userId = function (data, option) {
        if (data === void 0) { data = {
            userId: '',
        }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].coupon.want.config$userId + "".concat(data.userId) }));
    };
    // 获取认证信息
    appHttp.prototype.apiCompanyLegalInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalInfo }));
    };
    // 获取认证信息
    appHttp.prototype.apiCompanyLegalAuthAnewIdentity = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthAnewIdentity }));
    };
    // 获取认证信息
    appHttp.prototype.apiCompanyLegalAuthAnewLicense = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthAnewLicense }));
    };
    // 获取认证信息
    appHttp.prototype.apiCompanyLegalAuthAnewAll = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthAnewAll }));
    };
    appHttp.prototype.apiCompanyInfoInvoiceTitle = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoInvoiceTitle }));
    };
    appHttp.prototype.apiCompanyLegalAddressGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAddressGarage }));
    };
    appHttp.prototype.apiCompanyInfoMapAllStatistical = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoMapAllStatistical }));
    };
    appHttp.prototype.apiCompanyLegalGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalGarage }));
    };
    appHttp.prototype.apiCompanyLegalRealNameInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalRealNameInfo }));
    };
    // 企业认证（企业信息页）
    appHttp.prototype.apiCompanyLegalAuthCompany = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthCompany }));
    };
    // 企业认证（个人身份页）
    appHttp.prototype.apiCompanyLegalAuthIdentity = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthIdentity }));
    };
    // 企业认证（个人身份页）
    appHttp.prototype.fileOcr = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.fileOcr }));
    };
    appHttp.prototype.apiCompanyLegalAuthAccount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthAccount }));
    };
    appHttp.prototype.apiCompanyLegalAuthGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthGarage }));
    };
    appHttp.prototype.apiCompanyInfoDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoDetail }));
    };
    appHttp.prototype.apiCompanyInfoPhoto = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoPhoto }));
    };
    appHttp.prototype.apiCompanyInfoSroreName = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoSroreName }));
    };
    appHttp.prototype.apiCompanyInfoSms = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoSms }));
    };
    appHttp.prototype.apiCompanyInfoGarageAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoGarageAudit }));
    };
    appHttp.prototype.apiCompanyInfoBindMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoBindMobile }));
    };
    // 获取店铺信息
    appHttp.prototype.apiCompanyInfoStore = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoStore }));
    };
    //供应商平台客户数据统计
    appHttp.prototype.apiCompanyInfoSupplierStatistical = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoSupplierStatistical }));
    };
    // 获取店铺信息
    appHttp.prototype.apiCompanyLegalRealName$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalRealName$PUT }));
    };
    // 获取店铺信息
    appHttp.prototype.apiCompanyLegalRealName$GET = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalRealName$GET }));
    };
    appHttp.prototype.apiExtraBankFuzzy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraBankFuzzy }));
    };
    appHttp.prototype.apiExtraBankInfoFuzzy = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraBankInfoFuzzy }));
    };
    // 查询提现协议
    appHttp.prototype.apiExtraWithdrawQuerySign$GET = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraWithdrawQuerySign$GET }));
    };
    // 签约电子协议
    appHttp.prototype.apiExtraWithdrawSign$PUT = function (data, option) {
        if (data === void 0) { data = { type: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraWithdrawSign$PUT + '?type=' + data.type }));
    };
    // 提现申请
    appHttp.prototype.apiExtraWithdrawApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraWithdrawApply }));
    };
    // 登录图标
    appHttp.prototype.apiExtraCustomerShow = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraCustomerShow }));
    };
    appHttp.prototype.apiExtraCustomerMoor = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraCustomerMoor }));
    };
    // 根据角色id查询用户列表
    appHttp.prototype.apiUserInfoAccountList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoAccountList }));
    };
    // 根据角色id查询用户列表
    appHttp.prototype.apiUserInfoCustomerService = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoCustomerService }));
    };
    appHttp.prototype.apiUserInfoCustomer$GET = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoCustomer$GET + '/' + data.id }));
    };
    //  根据accountId删除账号信息
    appHttp.prototype.apiUserInfoAccount$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoAccount$Id + '/' + data.id }));
    };
    // 查询角色和员工信息
    appHttp.prototype.apiUserInfoAccountRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfoAccountRole }));
    };
    // 新增账号
    appHttp.prototype.apiUserInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfo }));
    };
    appHttp.prototype.apiUserInfo$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].user.apiUserInfo$PUT }));
    };
    // 账号角色关系分页查询
    appHttp.prototype.apiAccountRolePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountRolePage }));
    };
    // 新增账号角色关系
    appHttp.prototype.apiAccountRole$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountRole$Post }));
    };
    // 修改账号角色关系
    appHttp.prototype.apiAccountRole$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountRole$Put }));
    };
    // 通过账号 ID 获取用户角色
    appHttp.prototype.apiAccountRole$Post$Id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountRole$Post$Id }));
    };
    // 逻辑删除账号与角色关系
    appHttp.prototype.apiAccountRoleBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountRoleBatch }));
    };
    // 批量逻辑删除账号与角色关系
    appHttp.prototype.apiAccountRole$Delete$Id = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountRole$Delete$Id }));
    };
    // 修改角色权限信息
    appHttp.prototype.apiRolePerms = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].role.apiRolePerms }));
    };
    // 新增角色
    appHttp.prototype.apiRole = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].role.apiRole }));
    };
    // 修改角色
    appHttp.prototype.apiRole$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].role.apiRole$Put }));
    };
    // 逻辑删除角色
    appHttp.prototype.apiRole$Delete = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].role.apiRole$Delete + '/' + data.id }));
    };
    // 根据用户信息获取菜单树
    appHttp.prototype.apiMenuTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].menu.apiMenuTree }));
    };
    appHttp.prototype.apiMenuList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].menu.apiMenuList }));
    };
    // 角色 id 获取权限列表
    appHttp.prototype.apiMenuRoleTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].menu.apiMenuRoleTree }));
    };
    // 组织 id 获取权限列表
    appHttp.prototype.apiMenuOrgTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].menu.apiMenuOrgTree }));
    };
    // 根据地区父级code获取所有子级
    appHttp.prototype.apiSixhotAreaSub = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].sixhot.area.sub }));
    };
    // 根据经纬度获取省市区
    appHttp.prototype.apiSixhotAreaTertiaryInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].sixhot.area.info }));
    };
    // post地区
    appHttp.prototype.apiAreaProvinceSub = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].sixhot.area.provinceSub }));
    };
    // get地区
    appHttp.prototype.apiAreaProvinceTree = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].sixhot.area.tree }));
    };
    // 获取所有区域编码
    appHttp.prototype.appSixhotAreaList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].sixhot.area.list }));
    };
    // App 仓库管理分页列表
    appHttp.prototype.apiWarehousePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehousePage }));
    };
    appHttp.prototype.apiWarehousePlat = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehousePlat }));
    };
    // 商品 id 集合，获取供应商在平台库中库存信息
    appHttp.prototype.apiWarehousePageGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehousePageGoods }));
    };
    // id 获取仓库详情
    appHttp.prototype.apiWarehouse$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouse$Id + '/' + data.id }));
    };
    // 新增仓库
    appHttp.prototype.apiWarehouse$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouse$Post }));
    };
    // 修改仓库
    appHttp.prototype.apiWarehouse$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouse$Put }));
    };
    // 批量删除数据
    appHttp.prototype.apiWarehouseBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseBatch }));
    };
    // 按仓库 id 删除仓库信息
    appHttp.prototype.apiWarehouse$Delete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouse$Delete }));
    };
    // 供应商补库存-平台库
    appHttp.prototype.apiWarehouseOperSupplierRefill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierRefill }));
    };
    // 供应商补库存-自有库
    appHttp.prototype.apiWarehouseOperSupplierSelfRefill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierSelfRefill }));
    };
    // 供应商批量补库存-自有库
    appHttp.prototype.apiWarehouseOperSupplierSelfRefillBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierSelfRefillBatch }));
    };
    // 供应商批量补库存-apiWarehouseOperSupplierSelfRefillMultiter
    appHttp.prototype.apiWarehouseOperSupplierSelfRefillMultiter = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierSelfRefillMultiter }));
    };
    // 供应商-调拨库存
    appHttp.prototype.apiWarehouseOperSupplierTransfer = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierTransfer }));
    };
    // 库存界面-供应商补库存-自有库
    appHttp.prototype.apiWarehouseOperSupplierStockSelfRefill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierStockSelfRefill }));
    };
    // 批量删除数据
    appHttp.prototype.apiWarehouseOperBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperBatch }));
    };
    // 按 id 删除数据
    appHttp.prototype.apiWarehouseOper = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOper }));
    };
    // id 获取到货时效
    appHttp.prototype.apiWarehouseArrival$Id = function (data, option) {
        if (data === void 0) { data = { id: undefined }; }
        var id = data.id;
        data.id = undefined;
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrival$Id + '/' + id }));
    };
    // 仓库 id 获取到货时效列表
    appHttp.prototype.apiWarehouseArrivalWarehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrivalWarehouse }));
    };
    // 添加到货时效
    appHttp.prototype.apiWarehouseArrival$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrival$Post }));
    };
    // 更新到货时效
    appHttp.prototype.apiWarehouseArrival$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrival$Put }));
    };
    // 批量删除数据
    appHttp.prototype.apiWarehouseArrivalBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrivalBatch }));
    };
    // 按 id 删除数据
    appHttp.prototype.apiWarehouseArrival$Delete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrival$Delete }));
    };
    appHttp.prototype.apiWarehouseArrivalPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseArrivalPage }));
    };
    appHttp.prototype.apiWarehouseGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseGoodsList }));
    };
    appHttp.prototype.apiWarehouseStockAppPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockAppPage }));
    };
    appHttp.prototype.apiWarehouseOperSupplierInout = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierInout }));
    };
    appHttp.prototype.apiWarehouseStatisRecyclingInout = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStatisRecyclingInout }));
    };
    appHttp.prototype.apiWarehouseStockWarnSetting = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockWarnSetting }));
    };
    appHttp.prototype.apiWarehouseStatisSupplierRefill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStatisSupplierRefill }));
    };
    appHttp.prototype.apiWarehouseStatisSupplierTransfer = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStatisSupplierTransfer }));
    };
    // 分页查询发货时效规则
    appHttp.prototype.apiWarehouseDeliveryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDeliveryPage }));
    };
    // id 获取发货时效
    appHttp.prototype.apiWarehouseDelivery$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDelivery$Id + '/' + data.id }));
    };
    // 增加发货时效
    appHttp.prototype.apiWarehouseDelivery$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDelivery$Post }));
    };
    // 修改发货时效
    appHttp.prototype.apiWarehouseDelivery$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDelivery$Put }));
    };
    // 批量删除数据
    appHttp.prototype.apiWarehouseDeliveryBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDeliveryBatch }));
    };
    // 按 id 删除数据
    appHttp.prototype.apiWarehouseDelivery$Delete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDelivery$Delete }));
    };
    // 商品 id 获取商品各个仓库库存信息
    appHttp.prototype.apiWarehouseStockGoodsWarehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockGoodsWarehouse }));
    };
    //服务商购买全国投资时,根据商品收货区域，获取可收货仓库列表及商品周转率
    appHttp.prototype.apiWarehouseStockAgentInvestAreaGoodsWarehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse
                .apiWarehouseStockAgentInvestAreaGoodsWarehouse }));
    };
    // 商品 id 获取商品各个仓库库存信息
    appHttp.prototype.apiWarehouseStockCompanyGoodsWarehouse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockCompanyGoodsWarehouse }));
    };
    appHttp.prototype.apiWarehouseStockGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockGoodsList }));
    };
    appHttp.prototype.apiWarehouseStockPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockPage }));
    };
    appHttp.prototype.apiWarehouseStock$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStock$Id + '/' + data.id }));
    };
    appHttp.prototype.apiWarehouseStockGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockGoods }));
    };
    appHttp.prototype.apiWarehouseStockGoodsArival = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockGoodsArival }));
    };
    appHttp.prototype.apiWarehouseStock$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStock$Post }));
    };
    appHttp.prototype.apiWarehouseStock$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStock$Put }));
    };
    appHttp.prototype.apiWarehouseStockBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStockBatch }));
    };
    appHttp.prototype.apiWarehouseStock$Delete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseStock$Delete }));
    };
    appHttp.prototype.apiMessageRecordSendMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiMessageRecordSendMessage }));
    };
    appHttp.prototype.apiMessageRecordReadMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiMessageRecordReadMessage }));
    };
    appHttp.prototype.apiMessageRecordGetMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiMessageRecordGetMessage }));
    };
    appHttp.prototype.apiMessageRecordRollbackMessage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].message.apiMessageRecordRollbackMessage }));
    };
    appHttp.prototype.apiOrderSellDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellDelivery }));
    };
    // 招商经理\渠道经理
    // 供应商 售后单列表
    appHttp.prototype.apiOrderAfterSaleQueryListSupplier = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleQueryListSupplier }));
    };
    // 服务商 订单列表
    appHttp.prototype.apiOrderInvestQueryListAgent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestQueryListAgent }));
    };
    // 修理厂 订单列表
    appHttp.prototype.apiOrderSellQueryListGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellQueryListGarage }));
    };
    // 技术工 推广单列表
    appHttp.prototype.apiOrderSellQueryListInviter = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellQueryListInviter }));
    };
    // 技术工 推广单个数
    appHttp.prototype.apiOrderSellQueryInviterCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellQueryInviterCount }));
    };
    // 招商经理app-供应商详情-账款信息
    // 渠道经理app-服务商详情-账款信息
    // 渠道经理app-修理厂详情-账款信息
    // 服务商app-拓客-修理厂详情-账款信息
    appHttp.prototype.apiAccountperiodList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiAccountperiodList }));
    };
    appHttp.prototype.apiOrderSellQueryListPromote = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellQueryListPromote }));
    };
    // 待结算列表
    appHttp.prototype.apiOrderProfitQueryUnsettleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderProfitQueryUnsettleList }));
    };
    // 待结算金额
    appHttp.prototype.apiOrderProfitQueryUnsettleAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderProfitQueryUnsettleAmount }));
    };
    appHttp.prototype.apiOrderSellAddressEdit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellAddressEdit }));
    };
    appHttp.prototype.apiOrderSellCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellCancel }));
    };
    appHttp.prototype.apiOrderSellRemarkAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellRemarkAdd }));
    };
    appHttp.prototype.apiOrderSell$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSell$Id + '/' + data.id }));
    };
    appHttp.prototype.apiOrderSellQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellQueryList }));
    };
    appHttp.prototype.apiOrderSellReceive = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellReceive }));
    };
    appHttp.prototype.apiOrderSellEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellEnumStatus }));
    };
    appHttp.prototype.apiOrderSellSend$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellSend$Id + '/' + data.id }));
    };
    appHttp.prototype.apiOrderSellStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellStatus }));
    };
    appHttp.prototype.apiOrderSellWarn = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellWarn }));
    };
    // 退货退款申请
    appHttp.prototype.apiOrderSellQueryListRefundEnabled = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSellQueryListRefundEnabled }));
    };
    // 投资单统计
    appHttp.prototype.apiOrderInvestStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestStatus }));
    };
    // 投资单地址修改
    appHttp.prototype.apiOrderInvestAddressEdit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestAddressEdit }));
    };
    // 投资订单收货
    appHttp.prototype.apiOrderInvestReceipt = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestReceipt }));
    };
    // 投资单增加备注
    appHttp.prototype.apiOrderInvestRemarkAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestRemarkAdd }));
    };
    // 投资单详情
    appHttp.prototype.apiOrderInvest$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvest$Id + '/' + data.id }));
    };
    // 投资订单提醒发货
    appHttp.prototype.apiOrderInvestWarn = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestWarn }));
    };
    // 投资订单发货
    appHttp.prototype.apiOrderInvestDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestDelivery }));
    };
    // 取消订单
    appHttp.prototype.apiOrderInvestCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestCancel }));
    };
    // 发货详情
    appHttp.prototype.apiOrderInvestSend$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestSend$Id + '/' + data.id }));
    };
    // 投资订单状态枚举
    appHttp.prototype.apiOrderInvestEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestEnumStatus }));
    };
    // 投资单列表
    appHttp.prototype.apiOrderInvestQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestQueryList }));
    };
    // 退货退款申请
    appHttp.prototype.apiOrderInvestQueryListRefundEnabled = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestQueryListRefundEnabled }));
    };
    // 服务商投资(全国投资)
    appHttp.prototype.apiOrderPlaceSpNational = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderPlaceSpNational }));
    };
    // 修理厂统一下单
    appHttp.prototype.apiOrderPlaceGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderPlaceGarage }));
    };
    // 服务商投资(本地投资)
    appHttp.prototype.apiOrderPlaceSpLocal = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderPlaceSpLocal }));
    };
    // 计算可退金额
    appHttp.prototype.apiRefundCalculateAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundCalculateAmount }));
    };
    // 发起退货单
    appHttp.prototype.apiRefundCreateDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundCreateDelivery }));
    };
    // 发起退款申请
    appHttp.prototype.apiRefundCreateFefundApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundCreateFefundApply }));
    };
    // 取消申请
    appHttp.prototype.apiRefundCancelApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundCancelApply }));
    };
    // 更新退款单
    appHttp.prototype.apiRefundUpdateApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundUpdateApply }));
    };
    // 收货
    appHttp.prototype.apiRefundReceipt = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundReceipt }));
    };
    // 详情
    appHttp.prototype.apiRefundDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundDetail }));
    };
    // 运营后台 - 退款原因
    appHttp.prototype.apiOrderRefundCauseQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRefundCauseQueryList }));
    };
    // 订单退货列表
    appHttp.prototype.apiRefundQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundQueryList }));
    };
    // 校验订单
    appHttp.prototype.apiRefundCheckOrder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundCheckOrder }));
    };
    // 校验极速退款
    appHttp.prototype.apiRefundCheckFastRefund = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundCheckFastRefund }));
    };
    // 获取可退的发动机识别码
    appHttp.prototype.apiRefundGetRefundEngineCode = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiRefundGetRefundEngineCode }));
    };
    // 应还订单列表，应还账款使用
    appHttp.prototype.apiOrderRepaymentQueryRepayableList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRepaymentQueryRepayableList }));
    };
    // 应还日历
    appHttp.prototype.apiOrderRepaymentQueryRepayableCalendar = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRepaymentQueryRepayableCalendar }));
    };
    // 应还总金额，应还账款使用
    appHttp.prototype.apiOrderRepaymentQueryRepayableAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRepaymentQueryRepayableAmount }));
    };
    // 应收订单列表，应收账款使用
    appHttp.prototype.apiOrderRepaymentQueryReceivableList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRepaymentQueryReceivableList }));
    };
    // 应收日历
    appHttp.prototype.apiOrderRepaymentQueryReceivableCalendar = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRepaymentQueryReceivableCalendar }));
    };
    // 应收总金额，应收账款使用
    appHttp.prototype.apiOrderRepaymentQueryReceivableAmount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRepaymentQueryReceivableAmount }));
    };
    //应收账款-列表
    appHttp.prototype.apiOrderAccountPeriodReceivableList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodReceivableList }));
    };
    // 应收账款-统计
    appHttp.prototype.apiOrderAccountPeriodReceivableStatistics = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodReceivableStatistics }));
    };
    // 还款订单-统计
    appHttp.prototype.apiOrderAccountPeriodPayableStatistics = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodPayableStatistics }));
    };
    // 还款订单-统计
    appHttp.prototype.apiOrderAccountPeriodGetByCurrentUser = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodGetByCurrentUser }));
    };
    // 应收日历
    appHttp.prototype.apiOrderAccountPeriodQueryReceivableCalendar = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodQueryReceivableCalendar }));
    };
    // 应付日历
    appHttp.prototype.apiOrderAccountPeriodQueryRepayableCalendar = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodQueryRepayableCalendar }));
    };
    // 我的评价-待评价
    appHttp.prototype.apiOrderEvaluateGetUnEvaluateOrderList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderEvaluateGetUnEvaluateOrderList }));
    };
    // 我的评价-评价详情
    appHttp.prototype.apiOrderEvaluateGetEvaluateOrderDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderEvaluateGetEvaluateOrderDetail }));
    };
    // 我的评价-已评价
    appHttp.prototype.apiOrderEvaluateGetEvaluateOrderList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderEvaluateGetEvaluateOrderList }));
    };
    // 修理厂-分页查询服务订单列表
    appHttp.prototype.apiOrderRecycleRepairQueryPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleRepairQueryPage }));
    };
    // 修理厂-校验取消单是否绑定销售单
    appHttp.prototype.apiOrderRecycleCheckCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleCheckCancel }));
    };
    // 新增回收订单信息
    appHttp.prototype.apiOrderRecycleSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleSave }));
    };
    // 修理厂-修改订单
    appHttp.prototype.apiOrderRecycleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleUpdate }));
    };
    // 查看回收服务详情
    appHttp.prototype.apiOrderRecycleDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleDetail }));
    };
    // 修理厂-不等待-不需要
    appHttp.prototype.apiOrderRecycleNotNeed = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleNotNeed }));
    };
    // 修理厂-不等待-需要指派
    appHttp.prototype.apiOrderRecycleNeedAssign = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleNeedAssign }));
    };
    // 修理厂-继续等待
    appHttp.prototype.apiOrderRecycleContinueWait = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleContinueWait }));
    };
    // 修理厂-确认回收完成
    appHttp.prototype.apiOrderRecycleConfirmRecycle = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleConfirmRecycle }));
    };
    // 随机问题
    appHttp.prototype.apiOrderNoninductiveEvaluateQuestion = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderNoninductiveEvaluateQuestion }));
    };
    // 问题提交
    appHttp.prototype.apiOrderNoninductiveEvaluateSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderNoninductiveEvaluateSave }));
    };
    // 新增回收评价
    appHttp.prototype.apiOrderRecycleSaveEvaluate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleSaveEvaluate }));
    };
    //集师傅-取消订单-待接单
    appHttp.prototype.apiOrderRecycleMasterCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleMasterCancel }));
    };
    // 技术工-上传物流信息
    appHttp.prototype.apiOrderRecycleSaveLogistics = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleSaveLogistics }));
    };
    // 技术工-提交验收凭证
    appHttp.prototype.apiOrderRecycleCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleCheck }));
    };
    // 技术工-查看物流信息
    appHttp.prototype.apiOrderRecycleQueryLogistics = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleQueryLogistics }));
    };
    // 技术工-查看服务单详情
    appHttp.prototype.apiOrderRecycleOrderDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleOrderDetail$Id + '/' + data.id }));
    };
    // 回收服务订单列表查询
    appHttp.prototype.apiOrderRecycleQueryPageList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleQueryPageList }));
    };
    // 回收公司-查验
    appHttp.prototype.apiOrderRecycleQuality = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleQuality }));
    };
    // 回收公司-确定收货
    appHttp.prototype.apiOrderRecycleReceiptGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleReceiptGoods }));
    };
    // 安装服务订单-修理厂app
    // 安装服务单列表查询
    appHttp.prototype.apiOrderInstallQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallQueryList }));
    };
    // 修改订单
    appHttp.prototype.apiOrderInstallUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallUpdate }));
    };
    // 订单支付
    appHttp.prototype.apiOrderInstallPay = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallPay }));
    };
    // 取消订单
    appHttp.prototype.apiOrderInstallCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallCancel }));
    };
    // 取消订单提交
    appHttp.prototype.apiOrderInstallPayRefund = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallPayRefund }));
    };
    // 确认完成安装
    appHttp.prototype.apiOrderInstallConfirm = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallConfirm }));
    };
    // 评价
    appHttp.prototype.apiOrderInstallEvaluation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallEvaluation }));
    };
    // 修理厂-不等待-需要指派
    appHttp.prototype.apiOrderInstallNeedAssign = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallNeedAssign }));
    };
    // 修理厂-不等待-不需要
    appHttp.prototype.apiOrderInstallUnwanted = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallUnwanted }));
    };
    // 修理厂继续等待
    appHttp.prototype.apiOrderInstallContinueWait = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallContinueWait }));
    };
    // 投诉
    appHttp.prototype.apiOrderInstallCommitComplaint = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallCommitComplaint }));
    };
    // 提交订单
    appHttp.prototype.apiOrderInstallSubmitOrder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallSubmitOrder }));
    };
    // 安装服务单详情
    appHttp.prototype.apiOrderInstallDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallDetail$Id + '/' + data.id }));
    };
    // 服务订单-技术工
    // 技术工-查询可接单列表
    appHttp.prototype.apiGraborderQuerycantakeorders = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiGraborderQuerycantakeorders }));
    };
    // 技术工-抢单
    appHttp.prototype.apiGraborderGraborders = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiGraborderGraborders }));
    };
    // 技术工-取消订单
    appHttp.prototype.apiGraborderSaveordercancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiGraborderSaveordercancel }));
    };
    // 技术工查询最新订单信息
    appHttp.prototype.apiGraborderLastorder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiGraborderLastorder }));
    };
    // 技术工-根据id查询订单详情
    appHttp.prototype.apiGraborderGetorderdetailbyid$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiGraborderGetorderdetailbyid$Id + '/' + data.id }));
    };
    // 技术工-判断是否当前登陆人接单
    appHttp.prototype.apiGraborderIsUndertaker = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiGraborderIsUndertaker + '/' + data.id }));
    };
    // 技术工接单设置
    // 技术工修改接单设置
    appHttp.prototype.apiOrdertakesettingUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrdertakesettingUpdate }));
    };
    // 技术工接单设置详情
    appHttp.prototype.apiOrdertakesettingDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrdertakesettingDetail }));
    };
    //获取回收公司id
    appHttp.prototype.apiCompanyInfoRecycling = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiCompanyInfoRecycling }));
    };
    // 旧机订单-旧机买家
    //   获取订单状态
    appHttp.prototype.apiOrderOldEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldEnumStatus }));
    };
    // 旧机下单
    appHttp.prototype.apiOrderPlaceOld = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderPlaceOld }));
    };
    // 取消订单
    appHttp.prototype.apiOrderOldCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldCancel }));
    };
    // 提醒发货
    appHttp.prototype.apiOrderOldWarn = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldWarn }));
    };
    // 旧机列表
    appHttp.prototype.apiOrderOldQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldQueryList }));
    };
    // 旧机详情
    appHttp.prototype.apiOrderOld$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOld$Id + '/' + data.id }));
    };
    // 添加备注
    appHttp.prototype.apiOrderOldRemarkAdd$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldRemarkAdd$Id + '/' + data.id }));
    };
    // 发货详情
    appHttp.prototype.apiOrderOldSend$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldSend$Id + '/' + data.id }));
    };
    // 物流发货
    appHttp.prototype.apiOrderOldDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldDelivery }));
    };
    // 添加备注
    appHttp.prototype.apiOrderOldRemarkAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldRemarkAdd }));
    };
    // 修改地址
    appHttp.prototype.apiOrderOldAddressEdit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldAddressEdit }));
    };
    // 确认收获
    appHttp.prototype.apiOrderOldReceive = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderOldReceive }));
    };
    // 服务单列表查询
    appHttp.prototype.apiOrderTechnicianQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderTechnicianQueryList }));
    };
    // 安装订单详情
    appHttp.prototype.apiOrderTechnicianInstallDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderTechnicianInstallDetail$Id + '/' + data.id }));
    };
    // 开始安装
    appHttp.prototype.apiOrderTechnicianInstallStart$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderTechnicianInstallStart$Id + '/' + data.id }));
    };
    // 提交安装凭证
    appHttp.prototype.apiOrderTechnicianInstallSubmit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderTechnicianInstallSubmit }));
    };
    // 售后服务订单详情
    appHttp.prototype.apiOrderSupportAfterSaleDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleDetail$Id + '/' + data.id }));
    };
    // 售后服务订单确认
    appHttp.prototype.apiOrderSupportAfterSaleConfirm = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleConfirm }));
    };
    //售后服务订单更新上门时间
    appHttp.prototype.apiOrderSupportAfterSaleTimeUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleTimeUpdate }));
    };
    //售后服务订单取消
    appHttp.prototype.apiOrderSupportAfterSaleCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleCancel }));
    };
    //售后服务订单提交上门结果
    appHttp.prototype.apiOrderSupportAfterSaleResultCommit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleResultCommit }));
    };
    //售后上门订单
    appHttp.prototype.apiOrderSupportAfterSaleVisit = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleVisit + '?id=' + data.id }));
    };
    //售后订单状态枚举
    appHttp.prototype.apiOrderSupportAfterSaleEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderSupportAfterSaleEnumStatus }));
    };
    //   售后列表
    appHttp.prototype.apiOrderAfterSaleQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleQueryList }));
    };
    //   售后详情
    appHttp.prototype.apiOrderAfterSale = function (id, option) {
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSale + id }));
    };
    //   新增售后单
    appHttp.prototype.apiOrderAfterSalePlace = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSalePlace }));
    };
    //   检查发动机识别号
    appHttp.prototype.apiOrderAfterSaleCheck = function (id, option) {
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleCheck + id }));
    };
    //   售后订单状态枚举
    appHttp.prototype.apiOrderAfterSaleEnumStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleEnumStatus }));
    };
    //   售后单旧机签收
    appHttp.prototype.apiOrderAfterSaleReceipt = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleReceipt }));
    };
    //   售后单取消
    appHttp.prototype.apiOrderAfterSaleCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleCancel }));
    };
    //   售后单旧机发货
    appHttp.prototype.apiOrderAfterSaleDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleDelivery }));
    };
    //   技术工-位置marker
    appHttp.prototype.apiOrderRecycleTechnologyMapLocation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleTechnologyMapLocation }));
    };
    //   修理厂、回收公司-位置marker
    appHttp.prototype.apiOrderRecycleRepairMapLocation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleRepairMapLocation }));
    };
    //   售后单评价
    appHttp.prototype.apiOrderAfterSaleComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleComment }));
    };
    //   物流编辑
    appHttp.prototype.apiOrderAfterSaleDeliveryEdit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAfterSaleDeliveryEdit }));
    };
    //   服务订单统计
    appHttp.prototype.apiOrderInstallCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInstallCount }));
    };
    appHttp.prototype.apiOrderAccountPeriodPayableList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderAccountPeriodPayableList }));
    };
    appHttp.prototype.apiOrderCancelCauseQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderCancelCauseQueryList }));
    };
    appHttp.prototype.apiOrderStatisticsStatisticBoard = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsStatisticBoard }));
    };
    appHttp.prototype.apiOrderStatisticsStatisticCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsStatisticCount }));
    };
    appHttp.prototype.apiContentUniversityDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityDetail$Id + '/' + data.id }));
    };
    appHttp.prototype.apiContentUniversityNewCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityNewCourse }));
    };
    appHttp.prototype.apiContentUniversityMyCollection = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityMyCollection }));
    };
    appHttp.prototype.apiContentUniversityBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityBatchDelete }));
    };
    appHttp.prototype.apiContentUniversityCancelCollectionCourse$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityCancelCollectionCourse$Id +
                '/' +
                data.id }));
    };
    appHttp.prototype.apiContentUniversityRelevantCourse = function (data, option) {
        if (data === void 0) { data = { categoryId: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityRelevantCourse }));
    };
    appHttp.prototype.apiContentUniversityBrowseRecord$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityBrowseRecord$Id +
                '/' +
                data.id }));
    };
    appHttp.prototype.apiContentUniversityCollectionCourse$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityCollectionCourse$Id +
                '/' +
                data.id }));
    };
    appHttp.prototype.apiContentUniversityStudyCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityStudyCourse }));
    };
    appHttp.prototype.apiContentUniversityRecommendCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityRecommendCourse }));
    };
    appHttp.prototype.apiContentUniversityHotCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityHotCourse }));
    };
    appHttp.prototype.apiContentUniversitySearch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversitySearch }));
    };
    appHttp.prototype.apiContentUniversitySelectCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversitySelectCourse }));
    };
    appHttp.prototype.apiContentUniversitySelectCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversitySelectCategory }));
    };
    // 帮助中心分类详情查询
    appHttp.prototype.apiContentUniversityQueryHelpDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityQueryHelpDetail }));
    };
    // 查询帮助中心分类列表
    appHttp.prototype.apiContentUniversityQueryHelpTypeList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentUniversityQueryHelpTypeList }));
    };
    // 新增评价
    appHttp.prototype.apiContentEvaluateSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentEvaluateSave }));
    };
    // 根据ID查询评价信息
    appHttp.prototype.apiContentEvaluateQueryEvaluateById = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentEvaluateQueryEvaluateById }));
    };
    // 查询商品好评度
    appHttp.prototype.apiContentEvaluateQueryProductFavorableComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentEvaluateQueryProductFavorableComment }));
    };
    // 查询商品评价信息
    appHttp.prototype.apiContentEvaluateQueryProductEvaluateInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentEvaluateQueryProductEvaluateInfo }));
    };
    // 提交投诉内容
    appHttp.prototype.apiContentComplaintCommitContent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentComplaintCommitContent }));
    };
    // 投诉详情
    appHttp.prototype.apiContentComplaintDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentComplaintDetail$Id + '/' + data.id }));
    };
    // 我发起的投诉-按处理状态查询
    appHttp.prototype.apiContentComplaintQueryListByDealStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentComplaintQueryListByDealStatus }));
    };
    // 撤销投诉
    appHttp.prototype.apiContentComplaintRevocationComplaint$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentComplaintRevocationComplaint$Id +
                '/' +
                data.id }));
    };
    // 修改投诉状态为已处理
    appHttp.prototype.apiContentComplaintUpdateComplaint = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentComplaintUpdateComplaint }));
    };
    //获取字典中的投诉类型code
    appHttp.prototype.apiContentComplaintType = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentComplaintType }));
    };
    // 查询商品评价信息分页
    appHttp.prototype.apiContentEvaluateQueryProductEvaluatePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentEvaluateQueryProductEvaluatePage }));
    };
    // 商品评价详情-好评度/标签数量
    appHttp.prototype.apiOrderEvaluateFavorableComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiOrderEvaluateFavorableComment }));
    };
    // 刚进学习任务页面初始化添加课程
    appHttp.prototype.apiContentLearningTasksInitialize = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningTasksInitialize }));
    };
    // 课程列表
    appHttp.prototype.apiContentLearningTasksCourseList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningTasksCourseList }));
    };
    // 学习记录
    appHttp.prototype.apiContentLearningTasksLearningHistory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningTasksLearningHistory }));
    };
    // 学习进度
    appHttp.prototype.apiContentLearningTasksProgress = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningTasksProgress }));
    };
    // 更新课程进度记录
    appHttp.prototype.apiContentLearningUpdateProgress = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningUpdateProgress }));
    };
    // 相关课程
    appHttp.prototype.apiContentLearningRelatedCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningRelatedCourse }));
    };
    // 课程详情查询
    appHttp.prototype.apiContentLearningCourseDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentLearningCourseDetail }));
    };
    //技术指导-最近在学
    appHttp.prototype.apiContentTechnicalGuidanceStudyCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceStudyCourse }));
    };
    //APP-商品型号管理
    appHttp.prototype.apiGoodsModelContentModelList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiGoodsModelContentModelList }));
    };
    //获取修理厂服务项目字典值
    appHttp.prototype.apiCompanyInfoServiceProject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiCompanyInfoServiceProject }));
    };
    //技术指导-精选课程
    appHttp.prototype.apiContentTechnicalGuidanceRecommendCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceRecommendCourse }));
    };
    //技术指导-热门课程
    appHttp.prototype.apiContentTechnicalGuidanceHotCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceHotCourse }));
    };
    // 技术指导-取消收藏
    appHttp.prototype.apiContentTechnicalGuidanceCancelCollectionCourse$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content
                .apiContentTechnicalGuidanceCancelCollectionCourse$Id +
                '/' +
                data.id }));
    };
    // 技术指导-我的收藏
    appHttp.prototype.apiContentTechnicalGuidanceMyCollection = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceMyCollection }));
    };
    // apiContentTechnicalGuidanceBatchDelete: `${$v1Api}content/technical/guidance/batch/delete`, // 技术指导-批量删除收藏
    appHttp.prototype.apiContentTechnicalGuidanceBatchDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceBatchDelete }));
    };
    // 技术指导-查看详情
    appHttp.prototype.apiContentTechnicalGuidanceDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceDetail$Id +
                '/' +
                data.id }));
    };
    // 技术指导-相关课程
    appHttp.prototype.apiContentTechnicalGuidanceRelevantCourse = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceRelevantCourse }));
    };
    // 技术指导-用户浏览记录
    appHttp.prototype.apiContentTechnicalGuidanceBrowseRecord$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceBrowseRecord$Id +
                '/' +
                data.id }));
    };
    // 技术指导-收藏
    appHttp.prototype.apiContentTechnicalGuidanceCollectionCourse$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceCollectionCourse$Id +
                '/' +
                data.id }));
    };
    // 技术指导-搜索
    appHttp.prototype.apiContentTechnicalGuidanceSearch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceSearch }));
    };
    // 技术指导-分类列表查询
    appHttp.prototype.apiContentTechnicalGuidanceSelectCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentTechnicalGuidanceSelectCategory }));
    };
    // 公告列表
    appHttp.prototype.apiContentMessageLogAnnouncementList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogAnnouncementList }));
    };
    // 查询系统通知设置
    appHttp.prototype.apiContentMessageUserSettingSelect = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageUserSettingSelect }));
    };
    // 系统通知设置
    appHttp.prototype.apiContentMessageUserSettingSet = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageUserSettingSet }));
    };
    // 轮播
    appHttp.prototype.apiContentSwiperList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentSwiperList }));
    };
    // 未读消息数量
    appHttp.prototype.apiContentMessageLogCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogCount }));
    };
    // 服务通知列表
    appHttp.prototype.apiContentMessageLogNoticeList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogNoticeList }));
    };
    // 交易物流列表
    appHttp.prototype.apiContentMessageLogLogisticsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogLogisticsList }));
    };
    // 消息点赞收藏列表
    appHttp.prototype.apiContentMessageLogCollectList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogCollectList }));
    };
    // 消息评论列表
    appHttp.prototype.apiContentMessageLogCommentList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogCommentList }));
    };
    // 更新消息为已读
    appHttp.prototype.apiContentMessageLogMessageRead = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogMessageRead }));
    };
    // 新增关注列表
    appHttp.prototype.apiContentMessageLogAttentionList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentMessageLogAttentionList }));
    };
    // 获取地址信息 列表
    appHttp.prototype.apiContentFunctionRouteRoute = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].content.apiContentFunctionRouteRoute }));
    };
    // 根据名称获取对应的路由  修理厂语音识别
    appHttp.prototype.apiAclSearchEntrance = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        var urlPrefix = '/brains';
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: urlPrefix + api_1.AppApi["".concat(localOptions.version)].content.apiAclSearchEntrance }));
        // return this.$service.request(
        //   {
        //     url: urlPrefix + AppApi[`${localOptions.version}`].content.apiAclSearchEntrance,
        //     method: 'POST',
        //     data,
        //     custom: {
        //       noPrefix: true
        //     }
        //   }
        // )
    };
    // 获取地址信息 列表
    appHttp.prototype.apiReceiverAddressList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddressList }));
    };
    // 修改
    appHttp.prototype.apiReceiverAddress$Put = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddress$Put }));
    };
    // 新增
    appHttp.prototype.apiReceiverAddress$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddress$Post }));
    };
    // 删除
    appHttp.prototype.apiReceiverAddress$Delete = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddress$Delete + '/' + data.id }));
    };
    // 改为默认地址
    appHttp.prototype.apiReceiverAddress$Patch = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPatch(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddress$Patch + '/' + data.id }));
    };
    // 获取详情
    appHttp.prototype.apiReceiverAddress$Get = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddress$Get + '/' + data.id }));
    };
    // 获取详情
    appHttp.prototype.apiReceiverAddressRegister = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].receiver.apiReceiverAddressRegister }));
    };
    // 获取商品列表
    appHttp.prototype.apiGoodsQueryMyGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsQueryMyGoods }));
    };
    // 获取商品列表数据统计
    appHttp.prototype.apiGoodsQueryMyGoodsCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsQueryMyGoodsCount }));
    };
    // 商品查询列表-补货
    appHttp.prototype.apiGoodsQueryReplenishList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsQueryReplenishList }));
    };
    // 模板列表
    appHttp.prototype.apiGoodsTemplateQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsTemplateQueryList }));
    };
    // 品牌列表
    appHttp.prototype.apiGoodsBrandQueryApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandQueryApplyList }));
    };
    // 型号列表
    appHttp.prototype.apiGoodsSkuPropertyApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsSkuPropertyApplyList }));
    };
    // 参数属性
    appHttp.prototype.apiGoodsParamsPropertyApplyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsParamsPropertyApplyList }));
    };
    // 上货
    appHttp.prototype.apiGoodsSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsSave }));
    };
    // 商品详情
    appHttp.prototype.apiGoodsDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsDetail }));
    };
    // 销售区域
    appHttp.prototype.apiGoodsSealAreaQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsSealAreaQueryList }));
    };
    // 商品类型
    appHttp.prototype.apiGoodsTypeQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsTypeQueryList }));
    };
    // 商品类别
    appHttp.prototype.apiGoodsCategoryQueryCategoryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCategoryQueryCategoryList }));
    };
    // 模板详情
    appHttp.prototype.apiGoodsTemplateDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsTemplateDetail }));
    };
    // 修改商品
    appHttp.prototype.apiGoodsUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsUpdate }));
    };
    // 服务商商品详情
    appHttp.prototype.apiGoodsDetailAgent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsDetailAgent }));
    };
    // 查看原因
    appHttp.prototype.apiGoodsQueryReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsQueryReason }));
    };
    // 商品上下架
    appHttp.prototype.apiGoodsStatusUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsStatusUpdate }));
    };
    // 服务商修改商品
    appHttp.prototype.apiGoodsUpdateAgent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsUpdateAgent }));
    };
    // 申请上架
    appHttp.prototype.apiGoodsApplyUpdatePut = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsApplyUpdatePut }));
    };
    // 查询供应商商品列表--服务商发布商品页面
    appHttp.prototype.apiGoodsQueryAgentGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsQueryAgentGoodsList }));
    };
    // 品牌申请
    appHttp.prototype.apiGoodsBrandApplySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandApplySave }));
    };
    // 申请记录列表
    appHttp.prototype.apiGoodsBrandApplyLogList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandApplyLogList }));
    };
    // 品牌认证校验
    appHttp.prototype.apiGoodsBrandApplyCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandApplyCheck }));
    };
    // 认证记录详情
    appHttp.prototype.apiGoodsBrandApply$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandApply$Id + '/' + data.id }));
    };
    // 我的品牌
    appHttp.prototype.apiGoodsBrandQueryMyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsBrandQueryMyList }));
    };
    // 已认证商品类目列表
    appHttp.prototype.apiGoodsCategoryApplyCertificationList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCategoryApplyCertificationList }));
    };
    // 认证和认证中商品列表
    appHttp.prototype.apiGoodsCategoryApplyCertificationCategory = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCategoryApplyCertificationCategory }));
    };
    // 商品类目详情
    appHttp.prototype.apiGoodsCategoryApplyDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCategoryApplyDetail }));
    };
    // 分页商品类目
    appHttp.prototype.apiGoodsCategoryApplyQueryList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCategoryApplyQueryList }));
    };
    // 添加
    appHttp.prototype.apiGoodsCategoryApplySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsCategoryApplySave }));
    };
    // 关键词
    appHttp.prototype.apiGoodsKeywordQueryGetKeyWord = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goodsList.apiGoodsKeywordQueryGetKeyWord }));
    };
    // deleteBatch
    appHttp.prototype.apiCartBasisDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisDeleteBatch }));
    };
    // 删除商品
    appHttp.prototype.apiCartResaleDeleteBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartResaleDeleteBatch }));
    };
    // 获取购物车详情
    appHttp.prototype.apiCartBasisDetailst = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisDetailst }));
    };
    // 获取购物车详情
    appHttp.prototype.apiCartResaleDetailst = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartResaleDetailst }));
    };
    // 添加购物车
    appHttp.prototype.apiCartBasisSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisSave }));
    };
    // 添加购物车
    appHttp.prototype.apiCartBasisReduceNum = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisReduceNum }));
    };
    // 添加购物车
    appHttp.prototype.apiCartResaleSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartResaleSave }));
    };
    // 减少数量
    appHttp.prototype.apiCartResaleReduceNum = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartResaleReduceNum }));
    };
    appHttp.prototype.apiCartBasisUpdateGoodscount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisUpdateGoodscount }));
    };
    // 修改数量
    appHttp.prototype.apiCartResaleUpdateGoodscount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartResaleUpdateGoodscount }));
    };
    // 查询购物车数量
    appHttp.prototype.apiCartBasisQueryNum = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisQueryNum }));
    };
    // 移入收藏夹
    appHttp.prototype.apiCartBasisSaveCollection = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartBasisSaveCollection }));
    };
    // 移入收藏夹
    appHttp.prototype.apiCartResaleSaveCollection = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].cart.apiCartResaleSaveCollection }));
    };
    appHttp.prototype.payPayResult = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].pay.payPayResult }));
    };
    appHttp.prototype.payType = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].pay.payType }));
    };
    appHttp.prototype.payRepaymentPay = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].pay.payRepaymentPay }));
    };
    // 还款记录
    appHttp.prototype.apiRepaymentLogList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].repayment.apiRepaymentLogList }));
    };
    // 还款记录详情
    appHttp.prototype.apiRepaymentLogInfoList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].repayment.apiRepaymentLogInfoList }));
    };
    // 开票列表查询
    appHttp.prototype.apiInvoiceSelectList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceSelectList }));
    };
    // 开票详情页
    appHttp.prototype.apiInvoiceDetail$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceDetail$Id + '/' + data.id }));
    };
    // 确认开票
    appHttp.prototype.apiInvoiceConfirmInvoice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceConfirmInvoice }));
    };
    // 申请发票
    appHttp.prototype.apiInvoiceSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceSave }));
    };
    // 开票记录列表
    appHttp.prototype.apiInvoiceRecord = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceRecord }));
    };
    // 开票记录详情页
    appHttp.prototype.apiInvoiceDetailBuyer$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceDetailBuyer$Id + '/' + data.id }));
    };
    // APP-发票
    appHttp.prototype.apiInvoiceOrderListEnable = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceOrderListEnable }));
    };
    // 查询发票下订单信息
    appHttp.prototype.apiInvoiceQueryOrderList$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].invoice.apiInvoiceQueryOrderList$Id + '/' + data.id }));
    };
    // 二期拓客相关
    appHttp.prototype.apiCompanyInfoRemoveBind$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoRemoveBind$Id +
                '/?inviteeId=' +
                data.id }));
    };
    appHttp.prototype.apiCompanyInfoRemoveBinder = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoRemoveBinder }));
    };
    appHttp.prototype.apiCompanyInvitationSms = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationSms }));
    };
    appHttp.prototype.apiCompanyInvitationH5Sms = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Sms }));
    };
    appHttp.prototype.apiCompanyInvitationH5CheckGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5CheckGarage }));
    };
    appHttp.prototype.apiCompanyInvitationH5TertiaryInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5TertiaryInfo }));
    };
    appHttp.prototype.apiCompanyInfoAudit = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoAudit }));
    };
    appHttp.prototype.apiCompanyInvitationH5Common = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Common }));
    };
    appHttp.prototype.apiCompanyInvitationH5Garage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Garage }));
    };
    appHttp.prototype.apiCompanyInvitationH5BindMobile = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5BindMobile }));
    };
    // 获取供应商或服务商详情（修改供应商或服务商接口专用）
    appHttp.prototype.apiCompanyInvitationAuthInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAuthInfo }));
    };
    // 身份证重新认证 拓客
    appHttp.prototype.apiCompanyInvitationAnewIdentity = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAnewIdentity }));
    };
    // 营业执照重新认证 拓客
    appHttp.prototype.apiCompanyInvitationAnewLicense = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAnewLicense }));
    };
    // 营业执照和身份证重新认证 拓客
    appHttp.prototype.apiCompanyInvitationAnewAll = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAnewAll }));
    };
    // 建立绑定关系
    appHttp.prototype.apiCompanyInvitationH5BindInvitation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5BindInvitation }));
    };
    appHttp.prototype.apiCompanyInvitationCheckSupplier = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationCheckSupplier }));
    };
    appHttp.prototype.apiCompanyInvitationSupplier$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationSupplier$POST }));
    };
    appHttp.prototype.apiCompanyInvitationSupplier$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationSupplier$PUT }));
    };
    appHttp.prototype.apiCompanyInvitationH5CheckSupplier = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5CheckSupplier }));
    };
    appHttp.prototype.apiCompanyInvitationH5Supplier$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Supplier$POST }));
    };
    appHttp.prototype.apiCompanyInvitationH5Supplier$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Supplier$PUT }));
    };
    appHttp.prototype.apiCompanyInvitationH5CheckAgent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5CheckAgent }));
    };
    appHttp.prototype.apiCompanyInvitationH5Agent$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Agent$POST }));
    };
    appHttp.prototype.apiCompanyInvitationH5Agent$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationH5Agent$PUT }));
    };
    appHttp.prototype.apiCompanyInvitationCheckAgent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationCheckAgent }));
    };
    appHttp.prototype.apiCompanyInvitationAgent$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAgent$POST }));
    };
    appHttp.prototype.apiCompanyInvitationAgent$PUT = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAgent$PUT }));
    };
    appHttp.prototype.apiCompanyInvitationCheckGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationCheckGarage }));
    };
    appHttp.prototype.apiCompanyInvitationGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationGarage }));
    };
    appHttp.prototype.apiCompanyInfoManagerGarageTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageTab }));
    };
    appHttp.prototype.apiCompanyInfoManagerTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerTab }));
    };
    appHttp.prototype.apiCompanyInfoManagerGaragePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGaragePage }));
    };
    appHttp.prototype.apiCompanyInfoManagerGarageInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageInfo }));
    };
    // 渠道/招商经理-管辖企业（供应商/服务商）详情
    appHttp.prototype.apiCompanyInfoManagerInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerInfo }));
    };
    // 渠道/招商经理-管辖企业（供应商/服务商）详情
    appHttp.prototype.apiCompanyInfoManagerPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerPage }));
    };
    // marker地图数据统计
    appHttp.prototype.apiCompanyInfoManagerGarageMapStatistical = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageMapStatistical }));
    };
    // marker地图信息详情
    appHttp.prototype.apiCompanyInfoManagerGarageMapDetails = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageMapDetails +
                '/' +
                data.id }));
    };
    // marker地图标签保存
    appHttp.prototype.apiCompanyInfoManagerGarageLabelSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageLabelSave }));
    };
    // marker地图tab列表
    appHttp.prototype.apiCompanyInfoManagerGarageMapTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageMapTab }));
    };
    // marker地图信息列表
    appHttp.prototype.apiCompanyInfoManagerGarageMapList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoManagerGarageMapList }));
    };
    // 技术工邀请列表统计数
    appHttp.prototype.apiCompanyInfoTechnicianRelationCount = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoTechnicianRelationCount }));
    };
    // 技术工邀请技术工分页查询列表
    appHttp.prototype.apiCompanyInfoTechnicianRelationPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoTechnicianRelationPage }));
    };
    // 技术工邀请汽修厂分页查询列表
    appHttp.prototype.apiCompanyInfoTechnicianGaragePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoTechnicianGaragePage }));
    };
    // 注销记录查询分页
    appHttp.prototype.apiCompanyCancellationPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyCancellationPage }));
    };
    // 撤销注销申请
    appHttp.prototype.apiCompanyCancellation$Delete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiDelete(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyCancellation$Delete }));
    };
    // 获取注销缘由
    appHttp.prototype.apiCompanyCancellationType = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyCancellationType }));
    };
    // 主体注销
    appHttp.prototype.apiCompanyCancellation$Post = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyCancellation$Post }));
    };
    // 获取待审核注销信息
    appHttp.prototype.apiCompanyCancellationWait = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyCancellationWait }));
    };
    // 员工注销
    appHttp.prototype.apiCompanyCancellationStaff = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyCancellationStaff }));
    };
    // 获取技术工收益工作天数信息
    appHttp.prototype.apiCompanyInfoSkillInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoSkillInfo }));
    };
    // 获取汽修厂绑定的服务商信息
    appHttp.prototype.apiCompanyInvitationAgentByGarage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInvitationAgentByGarage }));
    };
    // 获取渠道经理或招商经理信息
    appHttp.prototype.apiCompanyInfoInviterInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyInfoInviterInfo }));
    };
    appHttp.prototype.apiCompanyLegalAuthSkill = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].company.apiCompanyLegalAuthSkill }));
    };
    // 取消订单
    appHttp.prototype.apiOrderRecycleCancel = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleCancel }));
    };
    // 修理厂-不等待-校验是否绑定销售单
    appHttp.prototype.apiOrderRecycleNotWaitCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleNotWaitCheck }));
    };
    // 修理厂-不等待-我知道了(待指派)
    appHttp.prototype.apiOrderRecycleWaitingAssign = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderRecycleWaitingAssign }));
    };
    // 旧机器用型号列表
    appHttp.prototype.apiGoodsModelRecycleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelRecycleList }));
    };
    //   根据缸里号查询型号
    appHttp.prototype.apiGoodsModeQueryByCylinderNo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModeQueryByCylinderNo }));
    };
    // 型号列表
    appHttp.prototype.apiGoodsModelList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelList }));
    };
    // 供应商上货 + 铺货
    appHttp.prototype.apiGoodsDistributionSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsDistributionSave }));
    };
    // 供应商上货 + 铺货 + 修改商品
    appHttp.prototype.apiGoodsDistributionUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsDistributionUpdate }));
    };
    // 获取服务商最新购买的商品
    appHttp.prototype.apiGoodsAgentGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsAgentGoods }));
    };
    // 新机启用型号列表
    appHttp.prototype.apiGoodsModelSaleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelSaleList }));
    };
    appHttp.prototype.apiGoodsRecylePreSaleSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecylePreSaleSave }));
    };
    // 商品型号申请-修改
    appHttp.prototype.apiGoodsApplyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsApplyUpdate }));
    };
    // 商品型号申请-新增
    appHttp.prototype.apiGoodsApplySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsApplySave }));
    };
    // 商品型号申请-校验型号名称
    appHttp.prototype.apiGoodsApplyCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsApplyCheck }));
    };
    // 商品型号申请-详情
    appHttp.prototype.apiGoodsApplyView = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsApplyView }));
    };
    // 商品型号申请-列表
    appHttp.prototype.apiGoodsApplyQuery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsApplyQuery }));
    };
    // 回收商品-新增
    appHttp.prototype.apiGoodsRecyleModelSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleModelSave }));
    };
    // 回收商品-修改
    appHttp.prototype.apiGoodsRecyleModelUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleModelUpdate }));
    };
    // 回收商品-分页查询
    appHttp.prototype.apiGoodsRecyleModelQuery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleModelQuery }));
    };
    // 回收商品-启动/暂停
    appHttp.prototype.apiGoodsRecyleModelUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleModelUpdateStatus }));
    };
    // 回收商品-改价
    appHttp.prototype.apiGoodsRecyleModelUpdatePrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleModelUpdatePrice }));
    };
    // 回收商品-详情
    appHttp.prototype.apiGoodsRecyleModelView = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleModelView }));
    };
    // 回收再销售商品-发布
    appHttp.prototype.apiGoodsRecyleResalePublish = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResalePublish }));
    };
    // 回收再销售商品-修改
    appHttp.prototype.apiGoodsRecyleResaleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleUpdate }));
    };
    // 回收再销售商品-改价
    appHttp.prototype.apiGoodsRecyleResaleUpdatePrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleUpdatePrice }));
    };
    // 回收再销售商品-上架/下架
    appHttp.prototype.apiGoodsRecyleResaleUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleUpdateStatus }));
    };
    // 旧机再销售校验是否存在
    appHttp.prototype.apiGoodsRecyleResaleCheckIsExist = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleCheckIsExist }));
    };
    // 旧机再销售校验是否存在
    appHttp.prototype.apiGoodsRecyleResaleQueryByModelId = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleQueryByModelId }));
    };
    // 回收再销售商品-列表
    appHttp.prototype.apiGoodsRecyleResaleMyGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleMyGoodsList }));
    };
    // 回收再销售商品-在售/待售列表
    appHttp.prototype.apiGoodsRecyleResaleForSaleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleForSaleList }));
    };
    // 查看买家预售活动详情
    appHttp.prototype.apiGoodsRecylePreSaleQueryBuyerInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecylePreSaleQueryBuyerInfo }));
    };
    // 旧机买家商品-详情
    appHttp.prototype.apiGoodsRecyleResaleBuyerInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleBuyerInfo }));
    };
    // 旧机买家销售商品-列表
    appHttp.prototype.apiGoodsRecyleResaleBuyerSaleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleBuyerSaleList }));
    };
    // 旧机买家预售商品-列表
    appHttp.prototype.apiGoodsRecyleResaleBuyerPreSaleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyleResaleBuyerPreSaleList }));
    };
    // 旧机买家-回收商品管理
    // 商品型号申请-修改
    appHttp.prototype.apiGoodsModelApplyUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelApplyUpdate }));
    };
    // 商品型号申请-新增
    appHttp.prototype.apiGoodsModelApplySave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelApplySave }));
    };
    // 商品型号申请-列表
    appHttp.prototype.apiGoodsModelApplyQuery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelApplyQuery }));
    };
    // 商品型号申请-校验
    appHttp.prototype.apiGoodsModelApplyCheck = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelApplyCheck }));
    };
    // 商品型号申请-详情
    appHttp.prototype.apiGoodsModelApplyView = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelApplyView }));
    };
    // 回收商品-修改
    appHttp.prototype.apiGoodsRecycleModelUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelUpdate }));
    };
    // 回收商品-改价
    appHttp.prototype.apiGoodsRecycleModelUpdatePrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelUpdatePrice }));
    };
    // 回收商品-新增
    appHttp.prototype.apiGoodsRecycleModelSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelSave }));
    };
    // 回收商品-列表
    appHttp.prototype.apiGoodsRecycleModelQuery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelQuery }));
    };
    // 回收商品-列表
    appHttp.prototype.apiGoodsRecycleModelQueryByModelId = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelQueryByModelId }));
    };
    // 回收商品-改价
    appHttp.prototype.apiGoodsRecycleModelPrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelPrice }));
    };
    // 回收商品-启动/暂停
    appHttp.prototype.apiGoodsRecycleModelUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelUpdateStatus }));
    };
    // 回收商品-校验回收价格
    appHttp.prototype.apiGoodsRecycleModelCheckPrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelCheckPrice }));
    };
    // 买家预览
    appHttp.prototype.apiGoodsProjectInvestmentBuyerPreview = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsProjectInvestmentBuyerPreview }));
    };
    // 商品型号申请-详情
    appHttp.prototype.apiGoodsRecycleModelView = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelView }));
    };
    // 旧机买家-回收再销售
    // 回收再销售商品-发布
    appHttp.prototype.apiGoodsRecycleResalePublish = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResalePublish }));
    };
    // 回收再销售商品-修改
    appHttp.prototype.apiGoodsRecycleResaleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleUpdate }));
    };
    // 回收再销售商品-改价
    appHttp.prototype.apiGoodsRecycleResaleUpdatePrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleUpdatePrice }));
    };
    // 回收再销售商品-修改状态
    appHttp.prototype.apiGoodsRecycleResaleUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleUpdateStatus }));
    };
    // 回收再销售商品-列表
    appHttp.prototype.apiGoodsRecycleResaleMyGoodsList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleMyGoodsList }));
    };
    // 旧机买家预售商品-列表
    appHttp.prototype.apiGoodsRecycleResaleBuyerPreSaleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleBuyerPreSaleList }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleSave }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleUpdate = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleUpdate }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleQueryMyList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleQueryMyList }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleQueryInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleQueryInfo }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleQueryReason = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleQueryReason }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleUpdateStatus = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleUpdateStatus }));
    };
    appHttp.prototype.apiGoodsRecycleResaleForSaleList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleForSaleList }));
    };
    //查询商品车型列表
    appHttp.prototype.apiGoodsqueryVehicleModelList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsqueryVehicleModelList }));
    };
    //查询商品型号列表
    appHttp.prototype.apiGoodsqueryModelList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsqueryModelList }));
    };
    //查询商品品牌列表
    appHttp.prototype.apiGoodsqueryBrandList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsqueryBrandList }));
    };
    //查询商品类型列表
    appHttp.prototype.apiGoodsqueryGoodsTypeList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsqueryGoodsTypeList }));
    };
    // 商品型号申请-详情
    appHttp.prototype.apiGoodsRecycleResaleQueryInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleQueryInfo }));
    };
    appHttp.prototype.apiGoodsRecycleModelView$Id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleModelView$Id + '/' + data.id }));
    };
    appHttp.prototype.apiGoodsRecycleResaleBuyerInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResaleBuyerInfo }));
    };
    appHttp.prototype.apiGoodsRecyclePreSaleQueryBuyerInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecyclePreSaleQueryBuyerInfo }));
    };
    appHttp.prototype.apiGoodsRecycleResalePreviewInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsRecycleResalePreviewInfo }));
    };
    appHttp.prototype.apiGoodsModelCompensateUnitList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelCompensateUnitList }));
    };
    appHttp.prototype.apiGoodsModelCompensateDetailCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].goods.apiGoodsModelCompensateDetailCondition }));
    };
    appHttp.prototype.apiWarehouseOperRecyclingSelfRefillBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperRecyclingSelfRefillBatch }));
    };
    appHttp.prototype.apiWarehouseDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseDelivery }));
    };
    appHttp.prototype.apiWarehouseAddDelivery = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseAddDelivery }));
    };
    appHttp.prototype.apiWarehouseOperRecyclingSelfOutBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperRecyclingSelfOutBatch }));
    };
    // 回收公司修改库存
    appHttp.prototype.apiWarehouseOperRecyclingSelfModifyBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperRecyclingSelfModifyBatch }));
    };
    //供应商退货入库单
    appHttp.prototype.apiWarehouseOperSupplierQuerySalesReturn = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseOperSupplierQuerySalesReturn }));
    };
    appHttp.prototype.apiWarehouseRecycling = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].warehouse.apiWarehouseRecycling }));
    };
    appHttp.prototype.apiTencentSignSign = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].tencent.apiTencentSignSign }));
    };
    appHttp.prototype.apiImportGarageMapTab = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].imports.apiImportGarageMapTab }));
    };
    appHttp.prototype.apiVersionCurrent = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].app.apiVersionCurrent }));
    };
    appHttp.prototype.apiImportGarageMap = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].imports.apiImportGarageMap }));
    };
    appHttp.prototype.apiImportGarageDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].imports.apiImportGarageDetail }));
    };
    appHttp.prototype.apiImportGarageMapByAreaCode = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].imports.apiImportGarageMapByAreaCode }));
    };
    appHttp.prototype.apiTencentSignH5Sign = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].tencent.apiTencentSignH5Sign }));
    };
    appHttp.prototype.apiGrantRecordList = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].grant.apiGrantRecordList }));
    };
    // 账号角色关系分页查询
    appHttp.prototype.apiAccountWorkbench$POST = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountWorkbench$POST }));
    };
    // 账号角色关系分页查询
    appHttp.prototype.apiAccountWorkbench$GET = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountWorkbench$GET }));
    };
    // 账号角色关系分页查询
    appHttp.prototype.apiFinanceBillManagePage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].finance.apiFinanceBillManagePage }));
    };
    // 账号角色关系分页查询
    appHttp.prototype.apiFinanceBillManageDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].finance.apiFinanceBillManageDetail }));
    };
    // 保证金总额
    appHttp.prototype.apiFinanceMarginTotal = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].finance.apiFinanceMarginTotal }));
    };
    // 销售订单统计 apiOrderStatisticsSalesPage
    appHttp.prototype.apiOrderStatisticsSalesPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsSalesPage }));
    };
    // apiOrderStatisticsOrderPaymentApi 统计分析_流量_订单支付情况
    appHttp.prototype.apiOrderStatisticsOrderPayment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsOrderPayment }));
    };
    // apiOrderStatisticsSalesRanking 统计分析_同省销量排名
    appHttp.prototype.apiOrderStatisticsSalesRanking = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsSalesRanking }));
    };
    // apiOrderStatisticsInvestApi 统计分析_进货、批发
    appHttp.prototype.apiOrderStatisticsInvest = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsInvest }));
    };
    //  apiOrderStatisticsInvestTotal 统计分析_进货、批发总数
    appHttp.prototype.apiOrderStatisticsInvestTotal = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsInvestTotal }));
    };
    // apiOrderStatisticsOrderPaymentDetail 统计分析_流量_支付明细
    appHttp.prototype.apiOrderStatisticsOrderPaymentDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsOrderPaymentDetail }));
    };
    //  apiOrderStatisticsCompanyInvitation 首页_拓客区(企业邀请)
    appHttp.prototype.apiOrderStatisticsCompanyInvitation = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsCompanyInvitation }));
    };
    //  apiOrderStatisticsWholesaleDistrict 首页_批发区
    appHttp.prototype.apiOrderStatisticsWholesaleDistrict = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsWholesaleDistrict }));
    };
    //  apiOrderStatisticsWarehouseDistrict 首页_仓储区
    appHttp.prototype.apiOrderStatisticsWarehouseDistrict = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsWarehouseDistrict }));
    };
    //  apiOrderStatisticsWarehouseDistrict 统计-供应商数据看板
    appHttp.prototype.apiOrderStatisticsSupplierBoard = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsSupplierBoard }));
    };
    //获取进货价
    appHttp.prototype.apiOrderInvestQueryFinallyPrice = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderInvestQueryFinallyPrice }));
    };
    //  apiOrderStatisticsRevenueColumn 首页_收益栏
    appHttp.prototype.apiOrderStatisticsRevenueColumn = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        console.log(localOptions, 'xx');
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsRevenueColumn }));
    };
    // apiOrderStatisticsCustomerOrderStatistic 统计-客户订单购买量统计
    appHttp.prototype.apiOrderStatisticsCustomerOrderStatistic = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsCustomerOrderStatistic }));
    };
    // apiOrderStatisticsCustomerOrderRanking 统计-客户订单购买量排名
    appHttp.prototype.apiOrderStatisticsCustomerOrderRanking = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderStatisticsCustomerOrderRanking }));
    };
    appHttp.prototype.apiHomeSupplier = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].home.apiHomeSupplier }));
    };
    /**
     * ocr识别-返单据
     * @param data
     * @param option
     */
    appHttp.prototype.apiBusinessVehicleBrandOcrGoods = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.brand.ocrGoods }));
    };
    /**
     * VIN查询车型商品信息
     * @param data
     * @param option
     */
    appHttp.prototype.apiBusinessVehicleScanGetgoodsbyvin = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.getgoodsbyvin }));
    };
    // 筛选车型
    appHttp.prototype.apiBusinessVehicleFilter = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.apiBusinessVehicleFilter }));
    };
    appHttp.prototype.apiBusinessVehicleQueryVehicleDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.apiBusinessVehicleQueryVehicleDetail }));
    };
    /**
     * 查询绑定车型
     * @param data
     * @param option
     */
    appHttp.prototype.apiBusinessVehicleQueryBindVehicle = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.apiBusinessVehicleQueryBindVehicle }));
    };
    /**
     * 缸体号查询售后信息
     * @param data
     * @param option
     */
    appHttp.prototype.apiBusinessVehicleScanGetgoodsbyno = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.getorderbyeno }));
    };
    /**
     * 手动数据发动集码入库
     * @param data
     * @param option
     */
    appHttp.prototype.apiBusinessVehicleHandloseWarehousing = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.handlose.warehousing }));
    };
    appHttp.prototype.apiBusinessVehicleVehicleByVin = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].business.vehicle.vehicle }));
    };
    /**
     * 分享、邀请  新增数据，获取标识
     * @param data
     * @param option
     */
    appHttp.prototype.apiShareLinkAdd = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].share.apiShareLinkAdd }));
    };
    /**
     * 分享、邀请  根据标识，获取数据
     * @param data
     * @param option
     */
    appHttp.prototype.apiShareLinkDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].share.apiShareLinkDetail }));
    };
    // 根据账户类型获取总金额
    appHttp.prototype.apiAccountDetailsBalance = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].account.apiAccountDetailsBalance }));
    };
    //  服务商-铺货订单列表
    appHttp.prototype.apiOrderDistributionPage = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderDistributionPage }));
    };
    //  服务商-铺货订单详情
    appHttp.prototype.apiOrderDistributionDetail = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderDistributionDetail + '/' + data.id }));
    };
    //  服务商-发货
    appHttp.prototype.apiOrderDistributionDeliver = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].order.apiOrderDistributionDeliver }));
    };
    //  检查当前用户是否可以提现权限
    appHttp.prototype.apiExtraWithdrawCheckApply = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AppApi["".concat(localOptions.version)].extra.apiExtraWithdrawCheckApply }));
    };
    return appHttp;
}(ajax_1.default));
exports.default = appHttp;
//# sourceMappingURL=app.js.map