import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

/**
 * 管理后台-社群模块
 */
export default class CommunityHttp extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 社区社群栏目 列表查询
   * @param data
   * @param option
   */
  public communityColumnCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.column.condition,
    })
  }

  /**
   * 社区社群栏目 删除栏目
   * @param data
   * @param option
   */
  public communityColumnDelete$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.column.delete$id + data.id,
    })
  }

  // 社区社群栏目 编辑
  public communityColumnModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.column.modify,
    })
  }

  // 社区社群栏目 新增栏目
  public communityColumnSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.column.save,
    })
  }
//新增多选栏目/vocen-jarvis/v1/community/column/save/batch
  public communityColumnSaveBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.column.batch,
    })
  }

  // 社群举报管理 查看详情
  public communityContentTipoffGetOne(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.tipoff.getOne,
    })
  }

  // 社群举报管理 审核通过
  public communityContentTipoffApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.tipoff.approved,
    })
  }

  // 社群举报管理 审核通过
  public communityContentTipoffCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.tipoff.condition,
    })
  }

  // 社群举报管理 驳回
  public communityContentTipoffReject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.tipoff.reject,
    })
  }

  // start
  // 社群回答管理 查看详情
  public communityContentAnswerGetOne(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.getOne,
    })
  }

  // 社群回答管理 审核通过
  public communityContentAnswerApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.approved,
    })
  }

  // 社群回答管理 修改community/content/answer/modify
  public communityContentAnswerModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.modify,
    })
  }

  // 社群回答管理 列表查询
  public communityContentAnswerCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.condition,
    })
  }
  //评论置顶/vocen-jarvis/v1/community/content/answer/top
  public communityContentAnswerTop(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.top,
    })
  }
//评论再置顶//vocen-jarvis/v1/community/content/answer/reset
public communityContentAnswerReset(data = {}, option?: httpRequest) {
  const localOptions = this.mergeRequest({
    data,
    ...option,
  })
  return this.$service.apiPut({
    ...localOptions,
    url: AdminApi[`${localOptions.version}`].community.content.answer.reset,
  })
}
  // 社群回答管理 删除(逻辑删除)
  public communityContentAnswerDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.delete,
    })
  }

  // 社群回答管理 查看详情communityContentAnswerDetail
  public communityContentAnswerDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.detail,
    })
  }

  // 社群回答管理 下架
  public communityContentAnswerOffSale(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.offSale,
    })
  }

  // 社群回答管理 查看详情
  public communityContentAnswerCancelRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.cancelRecommend,
    })
  }

  // 社群回答管理 推荐
  public communityContentAnswerRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.recommend,
    })
  }

  // 社群回答管理 写回答
  public communityContentAnswerSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.save,
    })
  }

  // end

  // start
  // 社群想法管理 查看详情community/content/idea/detail
  public communityContentIdeaDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.detail,
    })
  }

  // 社群想法管理 审核通过
  public communityContentIdeaApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.approved,
    })
  }

  // 社群视频管理 查看评论community/content/video/query/comment
  public communityContentVideoQueryComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.query.comment,
    })
  }


  // 社群回答管理 查看评论community/content/video/query/comment
  public communityContentAnswerQueryComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.query.comment,
    })
  }

  // 社群想法管理 列表查询
  public communityContentIdeaCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.condition,
    })
  }

  // 社群想法管理 删除(逻辑删除)
  public communityContentIdeaDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.delete,
    })
  }

   // 社群想法管理 查看评论/v1/community/content/idea/query/comment
   public communityContentIdeaQueryComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.query.comment,
    })
  }
  // 社群想法管理 查看详情
  public communityContentIdeaModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.modify,
    })
  }

  // 社群想法管理 下架
  public communityContentIdeaOffsale(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.offsale,
    })
  }

  // 社群想法管理 推荐
  public communityContentIdeaRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.recommend,
    })
  }

  // 社群想法管理 查看详情
  public communityContentIdeaReject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.reject,
    })
  }

  // 社群想法管理 查看详情
  public communityContentIdeaCancelRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.cancelRecommend,
    })
  }

  // 社群想法管理 写回答
  public communityContentIdeaSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.save,
    })
  }

  // end

  // start
  // 社群想法管理 查看详情
  public communityContentVideoGetOne(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.getOne,
    })
  }

  // 社群想法管理 查看详情
  public communityContentVideoExist(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.exist,
    })
  }

  // 社群想法管理 审核通过
  public communityContentVideoApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.approved,
    })
  }

  // 社群想法管理 列表查询
  public communityContentVideoCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.condition,
    })
  }

  // 社群视频管理 删除(逻辑删除)
  public communityContentVideoDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.delete,
    })
  }

  // 社群想法管理 查看详情
  public communityContentVideoModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.modify,
    })
  }

  // 社群视频管理 下架/v1/community/content/answer/off/sale
  public communityContentVideoOffSale(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.offsale,
    })
  }

  // 社群视频管理 详情/v1/community/content/video/detail
  public communityContentVideoDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.detail,
    })
  }

  // 社群想法管理 查看详情
  public communityContentVideoReject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.reject,
    })
  }

  // 社群想法管理 查看详情
  public communityContentVideoCancelRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.cancelRecommend,
    })
  }

  // 社群想法管理 推荐
  public communityContentVideoRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.recommend,
    })
  }

  // 社群想法管理 写回答
  public communityContentVideoSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.video.save,
    })
  }

  // end

  // start/
  // 社群举报管理 查看详情/v1/community/content/tipoff/detail
  public communityContentTipoffDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.tipoff.detail,
    })
  }

  // 社群想法管理 查看详情
  public communityContentQuestionExist(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.exist,
    })
  }

  // 社群想法管理 审核通过//
  public communityContentQuestionApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.approved,
    })
  }

  // 社群想法管理 列表查询
  public communityContentQuestionCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.condition,
    })
  }

  // 社群想法管理 删除(逻辑删除)
  public communityContentQuestionDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.delete,
    })
  }

  // 社群想法管理 删除(逻辑删除)
  public communityContentQuestionQueryComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.query.comment,
    })
  }

  // 社群想法管理 查看详情
  public communityContentQuestionModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.modify,
    })
  }

  // 社群想法管理 下架
  public communityContentQuestionOffsale(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.offsale,
    })
  }

  // 社群想法管理 查看详情/v1/community/content/answer/reject
  public communityContentQuestionReject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.reject,
    })
  }

  // 社群回答管理 驳回/v1/community/content/answer/reject
  public communityContentAnswerReject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.answer.reject,
    })
  }

  // 社群想法管理 查看详情
  public communityContentQuestionCancelRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.cancelRecommend,
    })
  }

  // 社群想法管理 推荐
  public communityContentQuestionRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.recommend,
    })
  }

  // 社群想法管理 写回答
  public communityContentQuestionSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.save,
    })
  }

  // end
}
