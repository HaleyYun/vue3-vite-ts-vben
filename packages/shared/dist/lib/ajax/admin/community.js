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
/**
 * 管理后台-社群模块
 */
var CommunityHttp = /** @class */ (function (_super) {
    __extends(CommunityHttp, _super);
    function CommunityHttp(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 社区社群栏目 列表查询
     * @param data
     * @param option
     */
    CommunityHttp.prototype.communityColumnCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.column.condition }));
    };
    /**
     * 社区社群栏目 删除栏目
     * @param data
     * @param option
     */
    CommunityHttp.prototype.communityColumnDelete$id = function (data, option) {
        if (data === void 0) { data = { id: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.column.delete$id + data.id }));
    };
    // 社区社群栏目 编辑
    CommunityHttp.prototype.communityColumnModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.column.modify }));
    };
    // 社区社群栏目 新增栏目
    CommunityHttp.prototype.communityColumnSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.column.save }));
    };
    //新增多选栏目/vocen-jarvis/v1/community/column/save/batch
    CommunityHttp.prototype.communityColumnSaveBatch = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.column.batch }));
    };
    // 社群举报管理 查看详情
    CommunityHttp.prototype.communityContentTipoffGetOne = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.tipoff.getOne }));
    };
    // 社群举报管理 审核通过
    CommunityHttp.prototype.communityContentTipoffApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.tipoff.approved }));
    };
    // 社群举报管理 审核通过
    CommunityHttp.prototype.communityContentTipoffCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.tipoff.condition }));
    };
    // 社群举报管理 驳回
    CommunityHttp.prototype.communityContentTipoffReject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.tipoff.reject }));
    };
    // start
    // 社群回答管理 查看详情
    CommunityHttp.prototype.communityContentAnswerGetOne = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.getOne }));
    };
    // 社群回答管理 审核通过
    CommunityHttp.prototype.communityContentAnswerApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.approved }));
    };
    // 社群回答管理 修改community/content/answer/modify
    CommunityHttp.prototype.communityContentAnswerModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.modify }));
    };
    // 社群回答管理 列表查询
    CommunityHttp.prototype.communityContentAnswerCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.condition }));
    };
    //评论置顶/vocen-jarvis/v1/community/content/answer/top
    CommunityHttp.prototype.communityContentAnswerTop = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.top }));
    };
    //评论再置顶//vocen-jarvis/v1/community/content/answer/reset
    CommunityHttp.prototype.communityContentAnswerReset = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.reset }));
    };
    // 社群回答管理 删除(逻辑删除)
    CommunityHttp.prototype.communityContentAnswerDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.delete }));
    };
    // 社群回答管理 查看详情communityContentAnswerDetail
    CommunityHttp.prototype.communityContentAnswerDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.detail }));
    };
    // 社群回答管理 下架
    CommunityHttp.prototype.communityContentAnswerOffSale = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.offSale }));
    };
    // 社群回答管理 查看详情
    CommunityHttp.prototype.communityContentAnswerCancelRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.cancelRecommend }));
    };
    // 社群回答管理 推荐
    CommunityHttp.prototype.communityContentAnswerRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.recommend }));
    };
    // 社群回答管理 写回答
    CommunityHttp.prototype.communityContentAnswerSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.save }));
    };
    // end
    // start
    // 社群想法管理 查看详情community/content/idea/detail
    CommunityHttp.prototype.communityContentIdeaDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.detail }));
    };
    // 社群想法管理 审核通过
    CommunityHttp.prototype.communityContentIdeaApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.approved }));
    };
    // 社群视频管理 查看评论community/content/video/query/comment
    CommunityHttp.prototype.communityContentVideoQueryComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.query.comment }));
    };
    // 社群回答管理 查看评论community/content/video/query/comment
    CommunityHttp.prototype.communityContentAnswerQueryComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.query.comment }));
    };
    // 社群想法管理 列表查询
    CommunityHttp.prototype.communityContentIdeaCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.condition }));
    };
    // 社群想法管理 删除(逻辑删除)
    CommunityHttp.prototype.communityContentIdeaDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.delete }));
    };
    // 社群想法管理 查看评论/v1/community/content/idea/query/comment
    CommunityHttp.prototype.communityContentIdeaQueryComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.query.comment }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentIdeaModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.modify }));
    };
    // 社群想法管理 下架
    CommunityHttp.prototype.communityContentIdeaOffsale = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.offsale }));
    };
    // 社群想法管理 推荐
    CommunityHttp.prototype.communityContentIdeaRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.recommend }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentIdeaReject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.reject }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentIdeaCancelRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.cancelRecommend }));
    };
    // 社群想法管理 写回答
    CommunityHttp.prototype.communityContentIdeaSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.idea.save }));
    };
    // end
    // start
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentVideoGetOne = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.getOne }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentVideoExist = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.exist }));
    };
    // 社群想法管理 审核通过
    CommunityHttp.prototype.communityContentVideoApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.approved }));
    };
    // 社群想法管理 列表查询
    CommunityHttp.prototype.communityContentVideoCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.condition }));
    };
    // 社群视频管理 删除(逻辑删除)
    CommunityHttp.prototype.communityContentVideoDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.delete }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentVideoModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.modify }));
    };
    // 社群视频管理 下架/v1/community/content/answer/off/sale
    CommunityHttp.prototype.communityContentVideoOffSale = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.offsale }));
    };
    // 社群视频管理 详情/v1/community/content/video/detail
    CommunityHttp.prototype.communityContentVideoDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.detail }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentVideoReject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.reject }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentVideoCancelRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.cancelRecommend }));
    };
    // 社群想法管理 推荐
    CommunityHttp.prototype.communityContentVideoRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.recommend }));
    };
    // 社群想法管理 写回答
    CommunityHttp.prototype.communityContentVideoSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.video.save }));
    };
    // end
    // start/
    // 社群举报管理 查看详情/v1/community/content/tipoff/detail
    CommunityHttp.prototype.communityContentTipoffDetail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.tipoff.detail }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentQuestionExist = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.exist }));
    };
    // 社群想法管理 审核通过//
    CommunityHttp.prototype.communityContentQuestionApproved = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.approved }));
    };
    // 社群想法管理 列表查询
    CommunityHttp.prototype.communityContentQuestionCondition = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.condition }));
    };
    // 社群想法管理 删除(逻辑删除)
    CommunityHttp.prototype.communityContentQuestionDelete = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.delete }));
    };
    // 社群想法管理 删除(逻辑删除)
    CommunityHttp.prototype.communityContentQuestionQueryComment = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.query.comment }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentQuestionModify = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.modify }));
    };
    // 社群想法管理 下架
    CommunityHttp.prototype.communityContentQuestionOffsale = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.offsale }));
    };
    // 社群想法管理 查看详情/v1/community/content/answer/reject
    CommunityHttp.prototype.communityContentQuestionReject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.reject }));
    };
    // 社群回答管理 驳回/v1/community/content/answer/reject
    CommunityHttp.prototype.communityContentAnswerReject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.answer.reject }));
    };
    // 社群想法管理 查看详情
    CommunityHttp.prototype.communityContentQuestionCancelRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.cancelRecommend }));
    };
    // 社群想法管理 推荐
    CommunityHttp.prototype.communityContentQuestionRecommend = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPut(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.recommend }));
    };
    // 社群想法管理 写回答
    CommunityHttp.prototype.communityContentQuestionSave = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].community.content.question.save }));
    };
    return CommunityHttp;
}(ajax_1.default));
exports.default = CommunityHttp;
//# sourceMappingURL=community.js.map