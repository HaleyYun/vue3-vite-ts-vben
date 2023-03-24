// app端 接口列表 继承VoHttp
import { httpRequest, httpResponse } from '../../types'
import VoHttp from './../ajax'
import { AppApi, CommonApi } from './../api'
import create from './create'
import business from './business'
import goods from './goods'
import user from './user'
import im from './im'
import warehouse from './warehouse'

// tslint:disable-next-line:class-name
export default class appHttp extends VoHttp {
  // 创建模块
  public CREATE_MODEL: any = null
  public BUSINESS: any = null
  public GOODS: goods
  public IM: any = null
  public USER: any = null
  public WAREHOUSE: any = null

  constructor(props) {
    super(props)
    this.CREATE_MODEL = new create(props)
    this.USER = new user(props)
    this.BUSINESS = new business(props)
    this.GOODS = new goods(props)
    this.IM = new im(props)
    this.WAREHOUSE = new warehouse(props)
  }

  // app通用支付
  public appPay(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].pay,
    })
  }

  // 测试案例
  public appTestList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].home.es.test,
    })
  }

  // 栏目列表
  public apiCreateColumnList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateColumnList,
    })
  }

  // 发视频
  public apiCreateVideoSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateVideoSave,
    })
  }

  // 根据id获取视频详情
  public apiCreateVideo$Id(
    data = {
      id: '',
    },
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateVideo$Id + `/` + data.id,
    })
  }

  // 发想法
  public apiCreateIdeasSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateIdeasSave,
    })
  }

  // 获取车系字典
  public apiCompanyInfoSerialDic(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoSerialDic,
    })
  }

  public apiCompanyInfoAdminPhoneNumber(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoAdminPhoneNumber,
    })
  }

  public apiCompanyLegalSkillGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalSkillGarage,
    })
  }

  public apiCompanyBindingInviterExist(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyBindingInviterExist,
    })
  }

  // 根据id获取想法详情
  public apiCreateIdeas$Id(
    data = {
      id: '',
    },
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateIdeas$Id + `/` + data.id,
    })
  }

  // 问答举报
  public apiCreateQuestionsQuestionTipoff(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionTipoff,
    })
  }

  // 问答点赞
  public apiCreateQuestionsQuestionLike(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionLike,
    })
  }

  // 问答取消点赞
  public apiCreateQuestionsQuestionCancelLike(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionCancelLike,
    })
  }

  // 问答收藏
  public apiCreateQuestionsQuestionCollect(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionCollect,
    })
  }

  // 问答取消收藏
  public apiCreateQuestionsQuestionCancelCollect(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionCancelCollect,
    })
  }

  // 写回答
  public apiCreateQuestionsAnswerSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsAnswerSave,
    })
  }

  // 发问题
  public apiCreateQuestionsQuestionSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionSave,
    })
  }

  // 问题列表
  public apiCreateQuestionsQuestionList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionList,
    })
  }

  // 问答详情
  public apiCreateQuestionsQuestion$Id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestion$Id,
    })
  }

  // 查看内容
  public apiCreateQuestionsQuestionView$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionView$Id + '/' + data.id,
    })
  }

  // 根据id获取回答详情
  public apiCreateQuestionsAnswer$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsAnswer$Id + '/' + data.id,
    })
  }

  // 评论取消点赞
  public apiCreateQuestionsCommentCancelLike(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsCommentCancelLike,
    })
  }

  // 评论点赞
  public apiCreateQuestionsCommentLike(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsCommentLike,
    })
  }

  // 评论列表
  public apiCreateQuestionsCommentList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsCommentList,
    })
  }

  // 发评论
  public apiCreateQuestionsCommentSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsCommentSave,
    })
  }

  // 评论回复
  public apiCreateQuestionsCommentReplay(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsCommentReplay,
    })
  }

  // 评论举报
  public apiCreateQuestionsCommentTipoff(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsCommentTipoff,
    })
  }

  // 修改问题
  public apiCreateQuestionsQuestionUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsQuestionUpdate,
    })
  }

  // 修改回答
  public apiCreateQuestionsAnswerUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsAnswerUpdate,
    })
  }

  // 回答列表
  public apiCreateQuestionsAnswerList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsAnswerList,
    })
  }

  // 个人基本信息
  public apiCreateQuestionsHomeGetUserInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetUserInfo,
    })
  }

  // 修改个人基本信息
  public apiCreateQuestionsHomeUpdateUserInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeUpdateUserInfo,
    })
  }

  // 根据userid获取个人主页数量
  public apiCreateQuestionsHomeGetUserInfoById(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetUserInfoById +
        '/' +
        data.id,
    })
  }

  // 根据userid获取个人主页数量
  public apiCreateQuestionsHomeGetInfoById(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetInfoById + '/' + data.id,
    })
  }

  // 根据id获取是否关注
  public apiCreateQuestionsHomeGetFollowTypeById$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetFollowTypeById$Id +
        '/' +
        data.id,
    })
  }

  // 关注
  public apiCreateQuestionsHomeUpdateFollow(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeUpdateFollow,
    })
  }

  // 取消关注
  public apiCreateQuestionsHomeCancelFollow(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeCancelFollow,
    })
  }

  // 取消关注
  public apiCreateQuestionsHomeGetFans(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetFans,
    })
  }

  // 取消关注
  public apiCreateQuestionsHomeGetAttention(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetAttention,
    })
  }

  // 我的收藏列表
  public apiCreateQuestionsHomeGetCollection(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeGetCollection,
    })
  }

  // 取消收藏
  public apiCreateQuestionsHomeCancelCollect(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeCancelCollect,
    })
  }

  //检查是否可以发表评论
  public apiCreateQuestionsHomeCheckEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeCheckEnable,
    })
  }
  public apiCreateQuestionsHomeCollectTotalCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].create.apiCreateQuestionsHomeCollectTotalCount,
    })
  }

  // 易券大厅---易券大厅列表分页查询
  public apiCouponTradePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.page,
    })
  }

  // 易券大厅---优惠券交换设置,可交换的优惠券列表
  public apiCouponTradeMy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.my,
    })
  }

  // 易券大厅---正在交换的优惠券，我上架到易券大厅的优惠券
  public apiCouponTradeTrading(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.trading,
    })
  }

  // 易券大厅---我的优惠券上架到易券大厅的
  public apiCouponTradeShelf(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.shelf,
    })
  }

  // 易券大厅---想跟我换,被申请方待处理列表
  public apiCouponTradeResponderPending(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.respondent.pending,
    })
  }

  // 易券大厅---想跟我换,被申请方已同意列表
  public apiCouponTradeResponderApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.respondent.approved,
    })
  }

  // 易券大厅---想跟我换,被申请方已同意列表
  public apiCouponTradeResponderRejected(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.respondent.rejected,
    })
  }

  // 易券大厅---我想换的,申请方已申请列表
  public apiCouponTradeApplicantPending(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.applicant.pending,
    })
  }

  // 易券大厅---申请方交换成功列表
  public apiCouponTradeApplicantApproved(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.applicant.approved,
    })
  }

  // 易券大厅---我想换的,已拒绝列表
  public apiCouponTradeApplicantRejected(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.applicant.rejected,
    })
  }

  // 易券大厅---我想换的,已拒绝列表
  public apiCouponTradeApplicantCancel$id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.applicant.cancel$id,
    })
  }

  // 易券大厅---想和我换 同意申请
  public apiCouponTradeResponderAgree$id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.respondent.agree$id,
    })
  }

  // 易券大厅---想和我换 拒绝申请
  public apiCouponTradeResponderReject$id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.trade.respondent.reject$id,
    })
  }

  // 易券大厅---设置想要的优惠券
  public apiCouponWantConfig(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.want.config,
    })
  }

  // 易券大厅---获取我想要的优惠券配置
  public apiCouponWantConfig$userId(
    data = {
      userId: '',
    },
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].coupon.want.config$userId + `${data.userId}`,
    })
  }

  // 获取认证信息
  public apiCompanyLegalInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalInfo,
    })
  }

  // 获取认证信息
  public apiCompanyLegalAuthAnewIdentity(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthAnewIdentity,
    })
  }

  // 获取认证信息
  public apiCompanyLegalAuthAnewLicense(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthAnewLicense,
    })
  }

  // 获取认证信息
  public apiCompanyLegalAuthAnewAll(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthAnewAll,
    })
  }

  public apiCompanyInfoInvoiceTitle(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoInvoiceTitle,
    })
  }

  public apiCompanyLegalAddressGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAddressGarage,
    })
  }

  public apiCompanyInfoMapAllStatistical(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoMapAllStatistical,
    })
  }

  public apiCompanyLegalGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalGarage,
    })
  }

  public apiCompanyLegalRealNameInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalRealNameInfo,
    })
  }

  // 企业认证（企业信息页）
  public apiCompanyLegalAuthCompany(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthCompany,
    })
  }

  // 企业认证（个人身份页）
  public apiCompanyLegalAuthIdentity(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthIdentity,
    })
  }

  // 企业认证（个人身份页）
  public fileOcr(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.fileOcr,
    })
  }

  public apiCompanyLegalAuthAccount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthAccount,
    })
  }

  public apiCompanyLegalAuthGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthGarage,
    })
  }

  public apiCompanyInfoDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoDetail,
    })
  }

  public apiCompanyInfoPhoto(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoPhoto,
    })
  }

  public apiCompanyInfoSroreName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoSroreName,
    })
  }

  public apiCompanyInfoSms(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoSms,
    })
  }

  public apiCompanyInfoGarageAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoGarageAudit,
    })
  }

  public apiCompanyInfoBindMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoBindMobile,
    })
  }

  // 获取店铺信息
  public apiCompanyInfoStore(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoStore,
    })
  }
  //供应商平台客户数据统计
  public apiCompanyInfoSupplierStatistical(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoSupplierStatistical,
    })
  }

  // 获取店铺信息
  public apiCompanyLegalRealName$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalRealName$PUT,
    })
  }

  // 获取店铺信息
  public apiCompanyLegalRealName$GET(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalRealName$GET,
    })
  }

  public apiExtraBankFuzzy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraBankFuzzy,
    })
  }

  public apiExtraBankInfoFuzzy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraBankInfoFuzzy,
    })
  }

  // 查询提现协议
  public apiExtraWithdrawQuerySign$GET(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraWithdrawQuerySign$GET,
    })
  }

  // 签约电子协议
  public apiExtraWithdrawSign$PUT(data = { type: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraWithdrawSign$PUT + '?type=' + data.type,
    })
  }

  // 提现申请
  public apiExtraWithdrawApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraWithdrawApply,
    })
  }

  // 登录图标
  public apiExtraCustomerShow(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraCustomerShow,
    })
  }

  public apiExtraCustomerMoor(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraCustomerMoor,
    })
  }

  // 根据角色id查询用户列表
  public apiUserInfoAccountList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfoAccountList,
    })
  }
  // 根据角色id查询用户列表
  public apiUserInfoCustomerService(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfoCustomerService,
    })
  }

  //  根据accountId删除账号信息
  public apiUserInfoAccount$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfoAccount$Id + '/' + data.id,
    })
  }

  // 查询角色和员工信息
  public apiUserInfoAccountRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfoAccountRole,
    })
  }

  // 新增账号
  public apiUserInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfo,
    })
  }

  public apiUserInfo$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfo$PUT,
    })
  }

  // 账号角色关系分页查询
  public apiAccountRolePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountRolePage,
    })
  }

  // 新增账号角色关系
  public apiAccountRole$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountRole$Post,
    })
  }

  // 修改账号角色关系
  public apiAccountRole$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountRole$Put,
    })
  }

  // 通过账号 ID 获取用户角色
  public apiAccountRole$Post$Id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountRole$Post$Id,
    })
  }

  // 逻辑删除账号与角色关系
  public apiAccountRoleBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountRoleBatch,
    })
  }

  // 批量逻辑删除账号与角色关系
  public apiAccountRole$Delete$Id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountRole$Delete$Id,
    })
  }

  // 修改角色权限信息
  public apiRolePerms(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].role.apiRolePerms,
    })
  }

  // 新增角色
  public apiRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].role.apiRole,
    })
  }

  // 修改角色
  public apiRole$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].role.apiRole$Put,
    })
  }

  // 逻辑删除角色
  public apiRole$Delete(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].role.apiRole$Delete + '/' + data.id,
    })
  }

  // 根据用户信息获取菜单树
  public apiMenuTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].menu.apiMenuTree,
    })
  }

  public apiMenuList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].menu.apiMenuList,
    })
  }

  // 角色 id 获取权限列表
  public apiMenuRoleTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].menu.apiMenuRoleTree,
    })
  }

  // 组织 id 获取权限列表
  public apiMenuOrgTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].menu.apiMenuOrgTree,
    })
  }

  // 根据地区父级code获取所有子级
  public apiSixhotAreaSub(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].sixhot.area.sub,
    })
  }

  // 根据经纬度获取省市区
  public apiSixhotAreaTertiaryInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].sixhot.area.info,
    })
  }

  // post地区
  public apiAreaProvinceSub(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].sixhot.area.provinceSub,
    })
  }

  // get地区
  public apiAreaProvinceTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].sixhot.area.tree,
    })
  }

  // 获取所有区域编码
  public appSixhotAreaList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].sixhot.area.list,
    })
  }

  // App 仓库管理分页列表
  public apiWarehousePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehousePage,
    })
  }

  public apiWarehousePlat(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehousePlat,
    })
  }

  // 商品 id 集合，获取供应商在平台库中库存信息
  public apiWarehousePageGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehousePageGoods,
    })
  }

  // id 获取仓库详情
  public apiWarehouse$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouse$Id + '/' + data.id,
    })
  }

  // 新增仓库
  public apiWarehouse$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouse$Post,
    })
  }

  // 修改仓库
  public apiWarehouse$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouse$Put,
    })
  }

  // 批量删除数据
  public apiWarehouseBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseBatch,
    })
  }

  // 按仓库 id 删除仓库信息
  public apiWarehouse$Delete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouse$Delete,
    })
  }

  // 供应商补库存-平台库
  public apiWarehouseOperSupplierRefill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierRefill,
    })
  }

  // 供应商补库存-自有库
  public apiWarehouseOperSupplierSelfRefill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierSelfRefill,
    })
  }

  // 供应商批量补库存-自有库
  public apiWarehouseOperSupplierSelfRefillBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierSelfRefillBatch,
    })
  }

  // 供应商批量补库存-apiWarehouseOperSupplierSelfRefillMultiter
  public apiWarehouseOperSupplierSelfRefillMultiter(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierSelfRefillMultiter,
    })
  }

  // 供应商-调拨库存
  public apiWarehouseOperSupplierTransfer(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierTransfer,
    })
  }
  // 库存界面-供应商补库存-自有库
  public apiWarehouseOperSupplierStockSelfRefill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierStockSelfRefill,
    })
  }

  // 批量删除数据
  public apiWarehouseOperBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperBatch,
    })
  }

  // 按 id 删除数据
  public apiWarehouseOper(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOper,
    })
  }

  // id 获取到货时效
  public apiWarehouseArrival$Id(data = { id: undefined }, option?: httpRequest) {
    const id = data.id
    data.id = undefined
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrival$Id + '/' + id,
    })
  }

  // 仓库 id 获取到货时效列表
  public apiWarehouseArrivalWarehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrivalWarehouse,
    })
  }

  // 添加到货时效
  public apiWarehouseArrival$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrival$Post,
    })
  }

  // 更新到货时效
  public apiWarehouseArrival$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrival$Put,
    })
  }

  // 批量删除数据
  public apiWarehouseArrivalBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrivalBatch,
    })
  }

  // 按 id 删除数据
  public apiWarehouseArrival$Delete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrival$Delete,
    })
  }

  public apiWarehouseArrivalPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseArrivalPage,
    })
  }

  public apiWarehouseGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseGoodsList,
    })
  }

  public apiWarehouseStockAppPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockAppPage,
    })
  }

  public apiWarehouseOperSupplierInout(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierInout,
    })
  }

  public apiWarehouseStatisRecyclingInout(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStatisRecyclingInout,
    })
  }

  public apiWarehouseStockWarnSetting(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockWarnSetting,
    })
  }

  public apiWarehouseStatisSupplierRefill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStatisSupplierRefill,
    })
  }

  public apiWarehouseStatisSupplierTransfer(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStatisSupplierTransfer,
    })
  }

  // 分页查询发货时效规则
  public apiWarehouseDeliveryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDeliveryPage,
    })
  }

  // id 获取发货时效
  public apiWarehouseDelivery$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDelivery$Id + '/' + data.id,
    })
  }

  // 增加发货时效
  public apiWarehouseDelivery$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDelivery$Post,
    })
  }

  // 修改发货时效
  public apiWarehouseDelivery$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDelivery$Put,
    })
  }

  // 批量删除数据
  public apiWarehouseDeliveryBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDeliveryBatch,
    })
  }

  // 按 id 删除数据
  public apiWarehouseDelivery$Delete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDelivery$Delete,
    })
  }

  // 商品 id 获取商品各个仓库库存信息
  public apiWarehouseStockGoodsWarehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockGoodsWarehouse,
    })
  }

  //服务商购买全国投资时,根据商品收货区域，获取可收货仓库列表及商品周转率
  public apiWarehouseStockAgentInvestAreaGoodsWarehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse
        .apiWarehouseStockAgentInvestAreaGoodsWarehouse,
    })
  }

  // 商品 id 获取商品各个仓库库存信息
  public apiWarehouseStockCompanyGoodsWarehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockCompanyGoodsWarehouse,
    })
  }

  public apiWarehouseStockGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockGoodsList,
    })
  }

  public apiWarehouseStockPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockPage,
    })
  }

  public apiWarehouseStock$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStock$Id + '/' + data.id,
    })
  }

  public apiWarehouseStockGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockGoods,
    })
  }

  public apiWarehouseStockGoodsArival(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockGoodsArival,
    })
  }

  public apiWarehouseStock$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStock$Post,
    })
  }

  public apiWarehouseStock$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStock$Put,
    })
  }

  public apiWarehouseStockBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStockBatch,
    })
  }

  public apiWarehouseStock$Delete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseStock$Delete,
    })
  }

  public apiMessageRecordSendMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiMessageRecordSendMessage,
    })
  }

  public apiMessageRecordReadMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiMessageRecordReadMessage,
    })
  }

  public apiMessageRecordGetMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiMessageRecordGetMessage,
    })
  }

  public apiMessageRecordRollbackMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].message.apiMessageRecordRollbackMessage,
    })
  }

  public apiOrderSellDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellDelivery,
    })
  }

  // 招商经理\渠道经理
  // 供应商 售后单列表
  public apiOrderAfterSaleQueryListSupplier(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleQueryListSupplier,
    })
  }

  // 服务商 订单列表
  public apiOrderInvestQueryListAgent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestQueryListAgent,
    })
  }

  // 修理厂 订单列表
  public apiOrderSellQueryListGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellQueryListGarage,
    })
  }

  // 技术工 推广单列表
  public apiOrderSellQueryListInviter(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellQueryListInviter,
    })
  }

  // 技术工 推广单个数
  public apiOrderSellQueryInviterCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellQueryInviterCount,
    })
  }

  // 招商经理app-供应商详情-账款信息
  // 渠道经理app-服务商详情-账款信息
  // 渠道经理app-修理厂详情-账款信息
  // 服务商app-拓客-修理厂详情-账款信息
  public apiAccountperiodList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiAccountperiodList,
    })
  }

  public apiOrderSellQueryListPromote(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellQueryListPromote,
    })
  }

  // 待结算列表
  public apiOrderProfitQueryUnsettleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderProfitQueryUnsettleList,
    })
  }

  // 待结算金额
  public apiOrderProfitQueryUnsettleAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderProfitQueryUnsettleAmount,
    })
  }

  public apiOrderSellAddressEdit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellAddressEdit,
    })
  }

  public apiOrderSellCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellCancel,
    })
  }

  public apiOrderSellRemarkAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellRemarkAdd,
    })
  }

  public apiOrderSell$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSell$Id + '/' + data.id,
    })
  }

  public apiOrderSellQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellQueryList,
    })
  }

  public apiOrderSellReceive(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellReceive,
    })
  }

  public apiOrderSellEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellEnumStatus,
    })
  }

  public apiOrderSellSend$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellSend$Id + '/' + data.id,
    })
  }

  public apiOrderSellStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellStatus,
    })
  }

  public apiOrderSellWarn(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellWarn,
    })
  }

  // 退货退款申请
  public apiOrderSellQueryListRefundEnabled(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSellQueryListRefundEnabled,
    })
  }

  // 投资单统计
  public apiOrderInvestStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestStatus,
    })
  }

  // 投资单地址修改
  public apiOrderInvestAddressEdit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestAddressEdit,
    })
  }

  // 投资订单收货
  public apiOrderInvestReceipt(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestReceipt,
    })
  }

  // 投资单增加备注
  public apiOrderInvestRemarkAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestRemarkAdd,
    })
  }

  // 投资单详情
  public apiOrderInvest$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvest$Id + '/' + data.id,
    })
  }

  // 投资订单提醒发货
  public apiOrderInvestWarn(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestWarn,
    })
  }

  // 投资订单发货
  public apiOrderInvestDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestDelivery,
    })
  }

  // 取消订单
  public apiOrderInvestCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestCancel,
    })
  }

  // 发货详情
  public apiOrderInvestSend$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestSend$Id + '/' + data.id,
    })
  }

  // 投资订单状态枚举
  public apiOrderInvestEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestEnumStatus,
    })
  }

  // 投资单列表
  public apiOrderInvestQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestQueryList,
    })
  }

  // 退货退款申请
  public apiOrderInvestQueryListRefundEnabled(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestQueryListRefundEnabled,
    })
  }

  // 服务商投资(全国投资)
  public apiOrderPlaceSpNational(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderPlaceSpNational,
    })
  }

  // 修理厂统一下单
  public apiOrderPlaceGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderPlaceGarage,
    })
  }

  // 服务商投资(本地投资)
  public apiOrderPlaceSpLocal(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderPlaceSpLocal,
    })
  }

  // 计算可退金额
  public apiRefundCalculateAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundCalculateAmount,
    })
  }

  // 发起退货单
  public apiRefundCreateDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundCreateDelivery,
    })
  }

  // 发起退款申请
  public apiRefundCreateFefundApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundCreateFefundApply,
    })
  }

  // 取消申请
  public apiRefundCancelApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundCancelApply,
    })
  }

  // 更新退款单
  public apiRefundUpdateApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundUpdateApply,
    })
  }

  // 收货
  public apiRefundReceipt(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundReceipt,
    })
  }

  // 详情
  public apiRefundDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundDetail,
    })
  }

  // 运营后台 - 退款原因
  public apiOrderRefundCauseQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRefundCauseQueryList,
    })
  }

  // 订单退货列表
  public apiRefundQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundQueryList,
    })
  }

  // 校验订单
  public apiRefundCheckOrder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundCheckOrder,
    })
  }

  // 校验极速退款
  public apiRefundCheckFastRefund(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundCheckFastRefund,
    })
  }

  // 获取可退的发动机识别码
  public apiRefundGetRefundEngineCode(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiRefundGetRefundEngineCode,
    })
  }

  // 应还订单列表，应还账款使用
  public apiOrderRepaymentQueryRepayableList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRepaymentQueryRepayableList,
    })
  }

  // 应还日历
  public apiOrderRepaymentQueryRepayableCalendar(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRepaymentQueryRepayableCalendar,
    })
  }

  // 应还总金额，应还账款使用
  public apiOrderRepaymentQueryRepayableAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRepaymentQueryRepayableAmount,
    })
  }

  // 应收订单列表，应收账款使用
  public apiOrderRepaymentQueryReceivableList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRepaymentQueryReceivableList,
    })
  }

  // 应收日历
  public apiOrderRepaymentQueryReceivableCalendar(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRepaymentQueryReceivableCalendar,
    })
  }

  // 应收总金额，应收账款使用
  public apiOrderRepaymentQueryReceivableAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRepaymentQueryReceivableAmount,
    })
  }

  //应收账款-列表
  public apiOrderAccountPeriodReceivableList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodReceivableList,
    })
  }

  // 应收账款-统计
  public apiOrderAccountPeriodReceivableStatistics(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodReceivableStatistics,
    })
  }

  // 还款订单-统计
  public apiOrderAccountPeriodPayableStatistics(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodPayableStatistics,
    })
  }

  // 还款订单-统计
  public apiOrderAccountPeriodGetByCurrentUser(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodGetByCurrentUser,
    })
  }

  // 应收日历
  public apiOrderAccountPeriodQueryReceivableCalendar(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodQueryReceivableCalendar,
    })
  }

  // 应付日历
  public apiOrderAccountPeriodQueryRepayableCalendar(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodQueryRepayableCalendar,
    })
  }

  // 我的评价-待评价
  public apiOrderEvaluateGetUnEvaluateOrderList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderEvaluateGetUnEvaluateOrderList,
    })
  }

  // 我的评价-评价详情
  public apiOrderEvaluateGetEvaluateOrderDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderEvaluateGetEvaluateOrderDetail,
    })
  }

  // 我的评价-已评价
  public apiOrderEvaluateGetEvaluateOrderList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderEvaluateGetEvaluateOrderList,
    })
  }

  // 修理厂-分页查询服务订单列表
  public apiOrderRecycleRepairQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleRepairQueryPage,
    })
  }

  // 修理厂-校验取消单是否绑定销售单
  public apiOrderRecycleCheckCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleCheckCancel,
    })
  }

  // 新增回收订单信息
  public apiOrderRecycleSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleSave,
    })
  }

  // 修理厂-修改订单
  public apiOrderRecycleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleUpdate,
    })
  }

  // 查看回收服务详情
  public apiOrderRecycleDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleDetail,
    })
  }

  // 修理厂-不等待-不需要
  public apiOrderRecycleNotNeed(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleNotNeed,
    })
  }

  // 修理厂-不等待-需要指派
  public apiOrderRecycleNeedAssign(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleNeedAssign,
    })
  }

  // 修理厂-继续等待
  public apiOrderRecycleContinueWait(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleContinueWait,
    })
  }

  // 修理厂-确认回收完成
  public apiOrderRecycleConfirmRecycle(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleConfirmRecycle,
    })
  }

  // 随机问题
  public apiOrderNoninductiveEvaluateQuestion(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderNoninductiveEvaluateQuestion,
    })
  }

  // 问题提交
  public apiOrderNoninductiveEvaluateSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderNoninductiveEvaluateSave,
    })
  }

  // 新增回收评价
  public apiOrderRecycleSaveEvaluate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleSaveEvaluate,
    })
  }
  //集师傅-取消订单-待接单
  public apiOrderRecycleMasterCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleMasterCancel,
    })
  }

  // 技术工-上传物流信息
  public apiOrderRecycleSaveLogistics(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleSaveLogistics,
    })
  }

  // 技术工-提交验收凭证
  public apiOrderRecycleCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleCheck,
    })
  }

  // 技术工-查看物流信息
  public apiOrderRecycleQueryLogistics(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleQueryLogistics,
    })
  }

  // 技术工-查看服务单详情
  public apiOrderRecycleOrderDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleOrderDetail$Id + '/' + data.id,
    })
  }

  // 回收服务订单列表查询
  public apiOrderRecycleQueryPageList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleQueryPageList,
    })
  }

  // 回收公司-查验
  public apiOrderRecycleQuality(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleQuality,
    })
  }

  // 回收公司-确定收货
  public apiOrderRecycleReceiptGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleReceiptGoods,
    })
  }

  // 安装服务订单-修理厂app
  // 安装服务单列表查询
  public apiOrderInstallQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallQueryList,
    })
  }

  // 修改订单
  public apiOrderInstallUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallUpdate,
    })
  }

  // 订单支付
  public apiOrderInstallPay(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallPay,
    })
  }

  // 取消订单
  public apiOrderInstallCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallCancel,
    })
  }

  // 取消订单提交
  public apiOrderInstallPayRefund(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallPayRefund,
    })
  }

  // 确认完成安装
  public apiOrderInstallConfirm(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallConfirm,
    })
  }

  // 评价
  public apiOrderInstallEvaluation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallEvaluation,
    })
  }

  // 修理厂-不等待-需要指派
  public apiOrderInstallNeedAssign(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallNeedAssign,
    })
  }

  // 修理厂-不等待-不需要
  public apiOrderInstallUnwanted(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallUnwanted,
    })
  }

  // 修理厂继续等待
  public apiOrderInstallContinueWait(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallContinueWait,
    })
  }

  // 投诉
  public apiOrderInstallCommitComplaint(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallCommitComplaint,
    })
  }

  // 提交订单
  public apiOrderInstallSubmitOrder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallSubmitOrder,
    })
  }

  // 安装服务单详情
  public apiOrderInstallDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallDetail$Id + '/' + data.id,
    })
  }

  // 服务订单-技术工
  // 技术工-查询可接单列表
  public apiGraborderQuerycantakeorders(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiGraborderQuerycantakeorders,
    })
  }

  // 技术工-抢单
  public apiGraborderGraborders(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiGraborderGraborders,
    })
  }

  // 技术工-取消订单
  public apiGraborderSaveordercancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiGraborderSaveordercancel,
    })
  }

  // 技术工查询最新订单信息
  public apiGraborderLastorder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiGraborderLastorder,
    })
  }

  // 技术工-根据id查询订单详情
  public apiGraborderGetorderdetailbyid$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].order.apiGraborderGetorderdetailbyid$Id + '/' + data.id,
    })
  }

  // 技术工-判断是否当前登陆人接单
  public apiGraborderIsUndertaker(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiGraborderIsUndertaker + '/' + data.id,
    })
  }

  // 技术工接单设置
  // 技术工修改接单设置
  public apiOrdertakesettingUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrdertakesettingUpdate,
    })
  }

  // 技术工接单设置详情
  public apiOrdertakesettingDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrdertakesettingDetail,
    })
  }

  //获取回收公司id
  public apiCompanyInfoRecycling(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiCompanyInfoRecycling,
    })
  }

  // 旧机订单-旧机买家
  //   获取订单状态
  public apiOrderOldEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldEnumStatus,
    })
  }

  // 旧机下单
  public apiOrderPlaceOld(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderPlaceOld,
    })
  }

  // 取消订单
  public apiOrderOldCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldCancel,
    })
  }

  // 提醒发货
  public apiOrderOldWarn(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldWarn,
    })
  }

  // 旧机列表
  public apiOrderOldQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldQueryList,
    })
  }

  // 旧机详情
  public apiOrderOld$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOld$Id + '/' + data.id,
    })
  }

  // 添加备注
  public apiOrderOldRemarkAdd$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldRemarkAdd$Id + '/' + data.id,
    })
  }

  // 发货详情
  public apiOrderOldSend$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldSend$Id + '/' + data.id,
    })
  }

  // 物流发货
  public apiOrderOldDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldDelivery,
    })
  }

  // 添加备注
  public apiOrderOldRemarkAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldRemarkAdd,
    })
  }

  // 修改地址
  public apiOrderOldAddressEdit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldAddressEdit,
    })
  }

  // 确认收获
  public apiOrderOldReceive(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderOldReceive,
    })
  }

  // 服务单列表查询
  public apiOrderTechnicianQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderTechnicianQueryList,
    })
  }

  // 安装订单详情
  public apiOrderTechnicianInstallDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].order.apiOrderTechnicianInstallDetail$Id + '/' + data.id,
    })
  }

  // 开始安装
  public apiOrderTechnicianInstallStart$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].order.apiOrderTechnicianInstallStart$Id + '/' + data.id,
    })
  }

  // 提交安装凭证
  public apiOrderTechnicianInstallSubmit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderTechnicianInstallSubmit,
    })
  }

  // 售后服务订单详情
  public apiOrderSupportAfterSaleDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleDetail$Id + '/' + data.id,
    })
  }

  // 售后服务订单确认
  public apiOrderSupportAfterSaleConfirm(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleConfirm,
    })
  }

  //售后服务订单更新上门时间
  public apiOrderSupportAfterSaleTimeUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleTimeUpdate,
    })
  }

  //售后服务订单取消
  public apiOrderSupportAfterSaleCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleCancel,
    })
  }

  //售后服务订单提交上门结果
  public apiOrderSupportAfterSaleResultCommit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleResultCommit,
    })
  }

  //售后上门订单
  public apiOrderSupportAfterSaleVisit(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleVisit + '?id=' + data.id,
    })
  }

  //售后订单状态枚举
  public apiOrderSupportAfterSaleEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderSupportAfterSaleEnumStatus,
    })
  }

  //   售后列表
  public apiOrderAfterSaleQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleQueryList,
    })
  }

  //   售后详情
  public apiOrderAfterSale(id, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSale + id,
    })
  }

  //   新增售后单
  public apiOrderAfterSalePlace(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSalePlace,
    })
  }

  //   检查发动机识别号
  public apiOrderAfterSaleCheck(id, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleCheck + id,
    })
  }

  //   售后订单状态枚举
  public apiOrderAfterSaleEnumStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleEnumStatus,
    })
  }

  //   售后单旧机签收
  public apiOrderAfterSaleReceipt(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleReceipt,
    })
  }

  //   售后单取消
  public apiOrderAfterSaleCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleCancel,
    })
  }

  //   售后单旧机发货
  public apiOrderAfterSaleDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleDelivery,
    })
  }

  //   技术工-位置marker
  public apiOrderRecycleTechnologyMapLocation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleTechnologyMapLocation,
    })
  }

  //   修理厂、回收公司-位置marker
  public apiOrderRecycleRepairMapLocation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleRepairMapLocation,
    })
  }

  //   售后单评价
  public apiOrderAfterSaleComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleComment,
    })
  }

  //   物流编辑
  public apiOrderAfterSaleDeliveryEdit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAfterSaleDeliveryEdit,
    })
  }

  //   服务订单统计
  public apiOrderInstallCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInstallCount,
    })
  }

  public apiOrderAccountPeriodPayableList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderAccountPeriodPayableList,
    })
  }

  public apiOrderCancelCauseQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderCancelCauseQueryList,
    })
  }

  public apiOrderStatisticsStatisticBoard(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsStatisticBoard,
    })
  }

  public apiOrderStatisticsStatisticCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsStatisticCount,
    })
  }

  public apiContentUniversityDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityDetail$Id + '/' + data.id,
    })
  }

  public apiContentUniversityNewCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityNewCourse,
    })
  }

  public apiContentUniversityMyCollection(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityMyCollection,
    })
  }

  public apiContentUniversityBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityBatchDelete,
    })
  }

  public apiContentUniversityCancelCollectionCourse$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentUniversityCancelCollectionCourse$Id +
        '/' +
        data.id,
    })
  }

  public apiContentUniversityRelevantCourse(data = { categoryId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityRelevantCourse,
    })
  }

  public apiContentUniversityBrowseRecord$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentUniversityBrowseRecord$Id +
        '/' +
        data.id,
    })
  }

  public apiContentUniversityCollectionCourse$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentUniversityCollectionCourse$Id +
        '/' +
        data.id,
    })
  }

  public apiContentUniversityStudyCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityStudyCourse,
    })
  }

  public apiContentUniversityRecommendCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityRecommendCourse,
    })
  }

  public apiContentUniversityHotCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityHotCourse,
    })
  }

  public apiContentUniversitySearch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversitySearch,
    })
  }

  public apiContentUniversitySelectCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversitySelectCourse,
    })
  }

  public apiContentUniversitySelectCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversitySelectCategory,
    })
  }

  // 帮助中心分类详情查询
  public apiContentUniversityQueryHelpDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityQueryHelpDetail,
    })
  }

  // 查询帮助中心分类列表
  public apiContentUniversityQueryHelpTypeList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentUniversityQueryHelpTypeList,
    })
  }

  // 新增评价
  public apiContentEvaluateSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentEvaluateSave,
    })
  }

  // 根据ID查询评价信息
  public apiContentEvaluateQueryEvaluateById(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentEvaluateQueryEvaluateById,
    })
  }

  // 查询商品好评度
  public apiContentEvaluateQueryProductFavorableComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentEvaluateQueryProductFavorableComment,
    })
  }

  // 查询商品评价信息
  public apiContentEvaluateQueryProductEvaluateInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentEvaluateQueryProductEvaluateInfo,
    })
  }

  // 提交投诉内容
  public apiContentComplaintCommitContent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentComplaintCommitContent,
    })
  }

  // 投诉详情
  public apiContentComplaintDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentComplaintDetail$Id + '/' + data.id,
    })
  }

  // 我发起的投诉-按处理状态查询
  public apiContentComplaintQueryListByDealStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentComplaintQueryListByDealStatus,
    })
  }

  // 撤销投诉
  public apiContentComplaintRevocationComplaint$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentComplaintRevocationComplaint$Id +
        '/' +
        data.id,
    })
  }

  // 修改投诉状态为已处理
  public apiContentComplaintUpdateComplaint(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentComplaintUpdateComplaint,
    })
  }

  //获取字典中的投诉类型code
  public apiContentComplaintType(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentComplaintType,
    })
  }

  // 查询商品评价信息分页
  public apiContentEvaluateQueryProductEvaluatePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentEvaluateQueryProductEvaluatePage,
    })
  }

  // 商品评价详情-好评度/标签数量
  public apiOrderEvaluateFavorableComment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiOrderEvaluateFavorableComment,
    })
  }

  // 刚进学习任务页面初始化添加课程
  public apiContentLearningTasksInitialize(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningTasksInitialize,
    })
  }

  // 课程列表
  public apiContentLearningTasksCourseList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningTasksCourseList,
    })
  }

  // 学习记录
  public apiContentLearningTasksLearningHistory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningTasksLearningHistory,
    })
  }

  // 学习进度
  public apiContentLearningTasksProgress(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningTasksProgress,
    })
  }

  // 更新课程进度记录
  public apiContentLearningUpdateProgress(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningUpdateProgress,
    })
  }

  // 相关课程
  public apiContentLearningRelatedCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningRelatedCourse,
    })
  }

  // 课程详情查询
  public apiContentLearningCourseDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentLearningCourseDetail,
    })
  }

  //技术指导-最近在学
  public apiContentTechnicalGuidanceStudyCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceStudyCourse,
    })
  }

  //APP-商品型号管理
  public apiGoodsModelContentModelList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiGoodsModelContentModelList,
    })
  }

  //获取修理厂服务项目字典值
  public apiCompanyInfoServiceProject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiCompanyInfoServiceProject,
    })
  }
  //技术指导-精选课程
  public apiContentTechnicalGuidanceRecommendCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceRecommendCourse,
    })
  }

  //技术指导-热门课程
  public apiContentTechnicalGuidanceHotCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceHotCourse,
    })
  }

  // 技术指导-取消收藏
  public apiContentTechnicalGuidanceCancelCollectionCourse$Id(
    data = { id: '' },
    option?: httpRequest
  ) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content
          .apiContentTechnicalGuidanceCancelCollectionCourse$Id +
        '/' +
        data.id,
    })
  }

  // 技术指导-我的收藏
  public apiContentTechnicalGuidanceMyCollection(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceMyCollection,
    })
  }

  // apiContentTechnicalGuidanceBatchDelete: `${$v1Api}content/technical/guidance/batch/delete`, // 技术指导-批量删除收藏
  public apiContentTechnicalGuidanceBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceBatchDelete,
    })
  }

  // 技术指导-查看详情
  public apiContentTechnicalGuidanceDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceDetail$Id +
        '/' +
        data.id,
    })
  }

  // 技术指导-相关课程
  public apiContentTechnicalGuidanceRelevantCourse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceRelevantCourse,
    })
  }

  // 技术指导-用户浏览记录
  public apiContentTechnicalGuidanceBrowseRecord$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceBrowseRecord$Id +
        '/' +
        data.id,
    })
  }

  // 技术指导-收藏
  public apiContentTechnicalGuidanceCollectionCourse$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceCollectionCourse$Id +
        '/' +
        data.id,
    })
  }

  // 技术指导-搜索
  public apiContentTechnicalGuidanceSearch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceSearch,
    })
  }

  // 技术指导-分类列表查询
  public apiContentTechnicalGuidanceSelectCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentTechnicalGuidanceSelectCategory,
    })
  }

  // 公告列表
  public apiContentMessageLogAnnouncementList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogAnnouncementList,
    })
  }

  // 查询系统通知设置
  public apiContentMessageUserSettingSelect(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageUserSettingSelect,
    })
  }

  // 系统通知设置
  public apiContentMessageUserSettingSet(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageUserSettingSet,
    })
  }

  // 轮播
  public apiContentSwiperList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentSwiperList,
    })
  }

  // 未读消息数量
  public apiContentMessageLogCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogCount,
    })
  }

  // 服务通知列表
  public apiContentMessageLogNoticeList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogNoticeList,
    })
  }

  // 交易物流列表
  public apiContentMessageLogLogisticsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogLogisticsList,
    })
  }

  // 消息点赞收藏列表
  public apiContentMessageLogCollectList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogCollectList,
    })
  }

  // 消息评论列表
  public apiContentMessageLogCommentList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogCommentList,
    })
  }

  // 更新消息为已读
  public apiContentMessageLogMessageRead(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogMessageRead,
    })
  }

  // 新增关注列表
  public apiContentMessageLogAttentionList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentMessageLogAttentionList,
    })
  }

  // 获取地址信息 列表
  public apiContentFunctionRouteRoute(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].content.apiContentFunctionRouteRoute,
    })
  }
  // 根据名称获取对应的路由  修理厂语音识别
  public apiAclSearchEntrance(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    const urlPrefix = '/brains'
    return this.$service.apiPost({
      ...localOptions,
      url: urlPrefix + AppApi[`${localOptions.version}`].content.apiAclSearchEntrance,
    })
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
  }

  // 获取地址信息 列表
  public apiReceiverAddressList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddressList,
    })
  }

  // 修改
  public apiReceiverAddress$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddress$Put,
    })
  }

  // 新增
  public apiReceiverAddress$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddress$Post,
    })
  }

  // 删除
  public apiReceiverAddress$Delete(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddress$Delete + '/' + data.id,
    })
  }

  // 改为默认地址
  public apiReceiverAddress$Patch(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPatch({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddress$Patch + '/' + data.id,
    })
  }

  // 获取详情
  public apiReceiverAddress$Get(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddress$Get + '/' + data.id,
    })
  }

  // 获取详情
  public apiReceiverAddressRegister(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddressRegister,
    })
  }

  // 获取商品列表
  public apiGoodsQueryMyGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsQueryMyGoods,
    })
  }
   // 获取商品列表数据统计
   public apiGoodsQueryMyGoodsCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsQueryMyGoodsCount,
    })
  }

  // 商品查询列表-补货
  public apiGoodsQueryReplenishList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsQueryReplenishList,
    })
  }

  // 模板列表
  public apiGoodsTemplateQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsTemplateQueryList,
    })
  }

  // 品牌列表
  public apiGoodsBrandQueryApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandQueryApplyList,
    })
  }

  // 型号列表
  public apiGoodsSkuPropertyApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsSkuPropertyApplyList,
    })
  }

  // 参数属性
  public apiGoodsParamsPropertyApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsParamsPropertyApplyList,
    })
  }

  // 上货
  public apiGoodsSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsSave,
    })
  }

  // 商品详情
  public apiGoodsDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsDetail,
    })
  }

  // 销售区域
  public apiGoodsSealAreaQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsSealAreaQueryList,
    })
  }

  // 商品类型
  public apiGoodsTypeQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsTypeQueryList,
    })
  }

  // 商品类别
  public apiGoodsCategoryQueryCategoryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCategoryQueryCategoryList,
    })
  }

  // 模板详情
  public apiGoodsTemplateDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsTemplateDetail,
    })
  }

  // 修改商品
  public apiGoodsUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsUpdate,
    })
  }

  // 服务商商品详情
  public apiGoodsDetailAgent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsDetailAgent,
    })
  }

  // 查看原因
  public apiGoodsQueryReason(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsQueryReason,
    })
  }

  // 商品上下架
  public apiGoodsStatusUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsStatusUpdate,
    })
  }

  // 服务商修改商品
  public apiGoodsUpdateAgent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsUpdateAgent,
    })
  }

  // 申请上架
  public apiGoodsApplyUpdatePut(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsApplyUpdatePut,
    })
  }

  // 查询供应商商品列表--服务商发布商品页面
  public apiGoodsQueryAgentGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsQueryAgentGoodsList,
    })
  }

  // 品牌申请
  public apiGoodsBrandApplySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandApplySave,
    })
  }

  // 申请记录列表
  public apiGoodsBrandApplyLogList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandApplyLogList,
    })
  }

  // 品牌认证校验
  public apiGoodsBrandApplyCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandApplyCheck,
    })
  }

  // 认证记录详情
  public apiGoodsBrandApply$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandApply$Id + '/' + data.id,
    })
  }

  // 我的品牌
  public apiGoodsBrandQueryMyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandQueryMyList,
    })
  }

  // 已认证商品类目列表
  public apiGoodsCategoryApplyCertificationList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCategoryApplyCertificationList,
    })
  }

  // 认证和认证中商品列表
  public apiGoodsCategoryApplyCertificationCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCategoryApplyCertificationCategory,
    })
  }

  // 商品类目详情
  public apiGoodsCategoryApplyDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCategoryApplyDetail,
    })
  }

  // 分页商品类目
  public apiGoodsCategoryApplyQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCategoryApplyQueryList,
    })
  }

  // 添加
  public apiGoodsCategoryApplySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCategoryApplySave,
    })
  }

  // 关键词
  public apiGoodsKeywordQueryGetKeyWord(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsKeywordQueryGetKeyWord,
    })
  }

  // deleteBatch
  public apiCartBasisDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisDeleteBatch,
    })
  }

  // 删除商品
  public apiCartResaleDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartResaleDeleteBatch,
    })
  }

  // 获取购物车详情
  public apiCartBasisDetailst(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisDetailst,
    })
  }

  // 获取购物车详情
  public apiCartResaleDetailst(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartResaleDetailst,
    })
  }

  // 添加购物车
  public apiCartBasisSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisSave,
    })
  }

  // 添加购物车
  public apiCartBasisReduceNum(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisReduceNum,
    })
  }

  // 添加购物车
  public apiCartResaleSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartResaleSave,
    })
  }

  // 减少数量
  public apiCartResaleReduceNum(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartResaleReduceNum,
    })
  }

  public apiCartBasisUpdateGoodscount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisUpdateGoodscount,
    })
  }

  // 修改数量
  public apiCartResaleUpdateGoodscount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartResaleUpdateGoodscount,
    })
  }

  // 查询购物车数量
  public apiCartBasisQueryNum(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisQueryNum,
    })
  }

  // 移入收藏夹
  public apiCartBasisSaveCollection(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartBasisSaveCollection,
    })
  }

  // 移入收藏夹
  public apiCartResaleSaveCollection(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].cart.apiCartResaleSaveCollection,
    })
  }

  public payPayResult(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].pay.payPayResult,
    })
  }

  public payType(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].pay.payType,
    })
  }

  public payRepaymentPay(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].pay.payRepaymentPay,
    })
  }

  // 还款记录
  public apiRepaymentLogList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].repayment.apiRepaymentLogList,
    })
  }

  // 还款记录详情
  public apiRepaymentLogInfoList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].repayment.apiRepaymentLogInfoList,
    })
  }

  // 开票列表查询
  public apiInvoiceSelectList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceSelectList,
    })
  }

  // 开票详情页
  public apiInvoiceDetail$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceDetail$Id + '/' + data.id,
    })
  }

  // 确认开票
  public apiInvoiceConfirmInvoice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceConfirmInvoice,
    })
  }

  // 申请发票
  public apiInvoiceSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceSave,
    })
  }

  // 开票记录列表
  public apiInvoiceRecord(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceRecord,
    })
  }

  // 开票记录详情页
  public apiInvoiceDetailBuyer$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceDetailBuyer$Id + '/' + data.id,
    })
  }

  // APP-发票
  public apiInvoiceOrderListEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceOrderListEnable,
    })
  }

  // 查询发票下订单信息
  public apiInvoiceQueryOrderList$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].invoice.apiInvoiceQueryOrderList$Id + '/' + data.id,
    })
  }

  // 二期拓客相关

  public apiCompanyInfoRemoveBind$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].company.apiCompanyInfoRemoveBind$Id +
        '/?inviteeId=' +
        data.id,
    })
  }

  public apiCompanyInfoRemoveBinder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoRemoveBinder,
    })
  }

  public apiCompanyInvitationSms(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationSms,
    })
  }

  public apiCompanyInvitationH5Sms(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Sms,
    })
  }

  public apiCompanyInvitationH5CheckGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5CheckGarage,
    })
  }

  public apiCompanyInvitationH5TertiaryInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5TertiaryInfo,
    })
  }

  public apiCompanyInfoAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoAudit,
    })
  }

  public apiCompanyInvitationH5Common(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Common,
    })
  }

  public apiCompanyInvitationH5Garage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Garage,
    })
  }

  public apiCompanyInvitationH5BindMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5BindMobile,
    })
  }

  // 获取供应商或服务商详情（修改供应商或服务商接口专用）
  public apiCompanyInvitationAuthInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAuthInfo,
    })
  }

  // 身份证重新认证 拓客
  public apiCompanyInvitationAnewIdentity(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAnewIdentity,
    })
  }

  // 营业执照重新认证 拓客
  public apiCompanyInvitationAnewLicense(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAnewLicense,
    })
  }

  // 营业执照和身份证重新认证 拓客
  public apiCompanyInvitationAnewAll(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAnewAll,
    })
  }

  // 建立绑定关系
  public apiCompanyInvitationH5BindInvitation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5BindInvitation,
    })
  }

  public apiCompanyInvitationCheckSupplier(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationCheckSupplier,
    })
  }

  public apiCompanyInvitationSupplier$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationSupplier$POST,
    })
  }

  public apiCompanyInvitationSupplier$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationSupplier$PUT,
    })
  }

  public apiCompanyInvitationH5CheckSupplier(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5CheckSupplier,
    })
  }

  public apiCompanyInvitationH5Supplier$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Supplier$POST,
    })
  }

  public apiCompanyInvitationH5Supplier$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Supplier$PUT,
    })
  }

  public apiCompanyInvitationH5CheckAgent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5CheckAgent,
    })
  }

  public apiCompanyInvitationH5Agent$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Agent$POST,
    })
  }

  public apiCompanyInvitationH5Agent$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationH5Agent$PUT,
    })
  }

  public apiCompanyInvitationCheckAgent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationCheckAgent,
    })
  }

  public apiCompanyInvitationAgent$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAgent$POST,
    })
  }

  public apiCompanyInvitationAgent$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAgent$PUT,
    })
  }

  public apiCompanyInvitationCheckGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationCheckGarage,
    })
  }

  public apiCompanyInvitationGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationGarage,
    })
  }

  public apiCompanyInfoManagerGarageTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageTab,
    })
  }

  public apiCompanyInfoManagerTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerTab,
    })
  }

  public apiCompanyInfoManagerGaragePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGaragePage,
    })
  }

  public apiCompanyInfoManagerGarageInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageInfo,
    })
  }

  // 渠道/招商经理-管辖企业（供应商/服务商）详情
  public apiCompanyInfoManagerInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerInfo,
    })
  }

  // 渠道/招商经理-管辖企业（供应商/服务商）详情
  public apiCompanyInfoManagerPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerPage,
    })
  }

  // marker地图数据统计
  public apiCompanyInfoManagerGarageMapStatistical(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageMapStatistical,
    })
  }

  // marker地图信息详情
  public apiCompanyInfoManagerGarageMapDetails(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageMapDetails +
        '/' +
        data.id,
    })
  }
  // marker地图标签保存
  public apiCompanyInfoManagerGarageLabelSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageLabelSave,
    })
  }

  // marker地图tab列表
  public apiCompanyInfoManagerGarageMapTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageMapTab,
    })
  }

  // marker地图信息列表
  public apiCompanyInfoManagerGarageMapList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoManagerGarageMapList,
    })
  }

  // 技术工邀请列表统计数
  public apiCompanyInfoTechnicianRelationCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoTechnicianRelationCount,
    })
  }

  // 技术工邀请技术工分页查询列表
  public apiCompanyInfoTechnicianRelationPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoTechnicianRelationPage,
    })
  }

  // 技术工邀请汽修厂分页查询列表
  public apiCompanyInfoTechnicianGaragePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoTechnicianGaragePage,
    })
  }

  // 注销记录查询分页
  public apiCompanyCancellationPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyCancellationPage,
    })
  }

  // 撤销注销申请
  public apiCompanyCancellation$Delete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyCancellation$Delete,
    })
  }

  // 获取注销缘由
  public apiCompanyCancellationType(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyCancellationType,
    })
  }

  // 主体注销
  public apiCompanyCancellation$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyCancellation$Post,
    })
  }

  // 获取待审核注销信息
  public apiCompanyCancellationWait(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyCancellationWait,
    })
  }

  // 员工注销
  public apiCompanyCancellationStaff(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyCancellationStaff,
    })
  }

  // 获取技术工收益工作天数信息
  public apiCompanyInfoSkillInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoSkillInfo,
    })
  }

  // 获取汽修厂绑定的服务商信息
  public apiCompanyInvitationAgentByGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInvitationAgentByGarage,
    })
  }

  // 获取渠道经理或招商经理信息
  public apiCompanyInfoInviterInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoInviterInfo,
    })
  }

  public apiCompanyLegalAuthSkill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyLegalAuthSkill,
    })
  }

  // 取消订单
  public apiOrderRecycleCancel(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleCancel,
    })
  }

  // 修理厂-不等待-校验是否绑定销售单
  public apiOrderRecycleNotWaitCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleNotWaitCheck,
    })
  }

  // 修理厂-不等待-我知道了(待指派)
  public apiOrderRecycleWaitingAssign(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderRecycleWaitingAssign,
    })
  }

  // 旧机器用型号列表
  public apiGoodsModelRecycleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelRecycleList,
    })
  }

  //   根据缸里号查询型号
  public apiGoodsModeQueryByCylinderNo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModeQueryByCylinderNo,
    })
  }

  // 型号列表
  public apiGoodsModelList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelList,
    })
  }

  // 供应商上货 + 铺货
  public apiGoodsDistributionSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsDistributionSave,
    })
  }

  // 供应商上货 + 铺货 + 修改商品
  public apiGoodsDistributionUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsDistributionUpdate,
    })
  }

  // 获取服务商最新购买的商品
  public apiGoodsAgentGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsAgentGoods,
    })
  }

  // 新机启用型号列表
  public apiGoodsModelSaleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelSaleList,
    })
  }

  public apiGoodsRecylePreSaleSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecylePreSaleSave,
    })
  }

  // 商品型号申请-修改
  public apiGoodsApplyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsApplyUpdate,
    })
  }

  // 商品型号申请-新增
  public apiGoodsApplySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsApplySave,
    })
  }

  // 商品型号申请-校验型号名称
  public apiGoodsApplyCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsApplyCheck,
    })
  }

  // 商品型号申请-详情
  public apiGoodsApplyView(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsApplyView,
    })
  }

  // 商品型号申请-列表
  public apiGoodsApplyQuery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsApplyQuery,
    })
  }

  // 回收商品-新增
  public apiGoodsRecyleModelSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleModelSave,
    })
  }

  // 回收商品-修改
  public apiGoodsRecyleModelUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleModelUpdate,
    })
  }

  // 回收商品-分页查询
  public apiGoodsRecyleModelQuery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleModelQuery,
    })
  }

  // 回收商品-启动/暂停
  public apiGoodsRecyleModelUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleModelUpdateStatus,
    })
  }

  // 回收商品-改价
  public apiGoodsRecyleModelUpdatePrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleModelUpdatePrice,
    })
  }

  // 回收商品-详情
  public apiGoodsRecyleModelView(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleModelView,
    })
  }

  // 回收再销售商品-发布
  public apiGoodsRecyleResalePublish(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResalePublish,
    })
  }

  // 回收再销售商品-修改
  public apiGoodsRecyleResaleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleUpdate,
    })
  }

  // 回收再销售商品-改价
  public apiGoodsRecyleResaleUpdatePrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleUpdatePrice,
    })
  }

  // 回收再销售商品-上架/下架
  public apiGoodsRecyleResaleUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleUpdateStatus,
    })
  }

  // 旧机再销售校验是否存在
  public apiGoodsRecyleResaleCheckIsExist(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleCheckIsExist,
    })
  }

  // 旧机再销售校验是否存在
  public apiGoodsRecyleResaleQueryByModelId(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleQueryByModelId,
    })
  }

  // 回收再销售商品-列表
  public apiGoodsRecyleResaleMyGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleMyGoodsList,
    })
  }

  // 回收再销售商品-在售/待售列表
  public apiGoodsRecyleResaleForSaleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleForSaleList,
    })
  }

  // 查看买家预售活动详情
  public apiGoodsRecylePreSaleQueryBuyerInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecylePreSaleQueryBuyerInfo,
    })
  }

  // 旧机买家商品-详情
  public apiGoodsRecyleResaleBuyerInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleBuyerInfo,
    })
  }

  // 旧机买家销售商品-列表
  public apiGoodsRecyleResaleBuyerSaleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleBuyerSaleList,
    })
  }

  // 旧机买家预售商品-列表
  public apiGoodsRecyleResaleBuyerPreSaleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyleResaleBuyerPreSaleList,
    })
  }

  // 旧机买家-回收商品管理
  // 商品型号申请-修改
  public apiGoodsModelApplyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelApplyUpdate,
    })
  }

  // 商品型号申请-新增
  public apiGoodsModelApplySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelApplySave,
    })
  }

  // 商品型号申请-列表
  public apiGoodsModelApplyQuery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelApplyQuery,
    })
  }

  // 商品型号申请-校验
  public apiGoodsModelApplyCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelApplyCheck,
    })
  }

  // 商品型号申请-详情
  public apiGoodsModelApplyView(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelApplyView,
    })
  }

  // 回收商品-修改
  public apiGoodsRecycleModelUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelUpdate,
    })
  }

  // 回收商品-改价
  public apiGoodsRecycleModelUpdatePrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelUpdatePrice,
    })
  }

  // 回收商品-新增
  public apiGoodsRecycleModelSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelSave,
    })
  }

  // 回收商品-列表
  public apiGoodsRecycleModelQuery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelQuery,
    })
  }

  // 回收商品-列表
  public apiGoodsRecycleModelQueryByModelId(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelQueryByModelId,
    })
  }

  // 回收商品-改价
  public apiGoodsRecycleModelPrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelPrice,
    })
  }

  // 回收商品-启动/暂停
  public apiGoodsRecycleModelUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelUpdateStatus,
    })
  }

  // 回收商品-校验回收价格
  public apiGoodsRecycleModelCheckPrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelCheckPrice,
    })
  }

  // 买家预览
  public apiGoodsProjectInvestmentBuyerPreview(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsProjectInvestmentBuyerPreview,
    })
  }

  // 商品型号申请-详情
  public apiGoodsRecycleModelView(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelView,
    })
  }

  // 旧机买家-回收再销售
  // 回收再销售商品-发布
  public apiGoodsRecycleResalePublish(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResalePublish,
    })
  }

  // 回收再销售商品-修改
  public apiGoodsRecycleResaleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleUpdate,
    })
  }

  // 回收再销售商品-改价
  public apiGoodsRecycleResaleUpdatePrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleUpdatePrice,
    })
  }

  // 回收再销售商品-修改状态
  public apiGoodsRecycleResaleUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleUpdateStatus,
    })
  }

  // 回收再销售商品-列表
  public apiGoodsRecycleResaleMyGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleMyGoodsList,
    })
  }

  // 旧机买家预售商品-列表
  public apiGoodsRecycleResaleBuyerPreSaleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleBuyerPreSaleList,
    })
  }

  public apiGoodsRecyclePreSaleSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleSave,
    })
  }

  public apiGoodsRecyclePreSaleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleUpdate,
    })
  }

  public apiGoodsRecyclePreSaleQueryMyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleQueryMyList,
    })
  }

  public apiGoodsRecyclePreSaleQueryInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleQueryInfo,
    })
  }

  public apiGoodsRecyclePreSaleQueryReason(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleQueryReason,
    })
  }

  public apiGoodsRecyclePreSaleUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleUpdateStatus,
    })
  }

  public apiGoodsRecycleResaleForSaleList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleForSaleList,
    })
  }

  //查询商品车型列表
  public apiGoodsqueryVehicleModelList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsqueryVehicleModelList,
    })
  }
  //查询商品型号列表
  public apiGoodsqueryModelList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsqueryModelList,
    })
  }
  //查询商品品牌列表
  public apiGoodsqueryBrandList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsqueryBrandList,
    })
  }
  //查询商品类型列表
  public apiGoodsqueryGoodsTypeList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsqueryGoodsTypeList,
    })
  }

  // 商品型号申请-详情
  public apiGoodsRecycleResaleQueryInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleQueryInfo,
    })
  }

  public apiGoodsRecycleModelView$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleModelView$Id + '/' + data.id,
    })
  }

  public apiGoodsRecycleResaleBuyerInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResaleBuyerInfo,
    })
  }

  public apiGoodsRecyclePreSaleQueryBuyerInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecyclePreSaleQueryBuyerInfo,
    })
  }

  public apiGoodsRecycleResalePreviewInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsRecycleResalePreviewInfo,
    })
  }

  public apiGoodsModelCompensateUnitList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelCompensateUnitList,
    })
  }

  public apiGoodsModelCompensateDetailCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsModelCompensateDetailCondition,
    })
  }

  public apiWarehouseOperRecyclingSelfRefillBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperRecyclingSelfRefillBatch,
    })
  }

  public apiWarehouseDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseDelivery,
    })
  }

  public apiWarehouseAddDelivery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseAddDelivery,
    })
  }

  public apiWarehouseOperRecyclingSelfOutBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperRecyclingSelfOutBatch,
    })
  }

  // 回收公司修改库存
  public apiWarehouseOperRecyclingSelfModifyBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperRecyclingSelfModifyBatch,
    })
  }
  //供应商退货入库单
  public apiWarehouseOperSupplierQuerySalesReturn(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseOperSupplierQuerySalesReturn,
    })
  }

  public apiWarehouseRecycling(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].warehouse.apiWarehouseRecycling,
    })
  }

  public apiTencentSignSign(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].tencent.apiTencentSignSign,
    })
  }
  public apiImportGarageMapTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].imports.apiImportGarageMapTab,
    })
  }
  public apiVersionCurrent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].app.apiVersionCurrent,
    })
  }

  public apiImportGarageMap(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].imports.apiImportGarageMap,
    })
  }

  public apiImportGarageDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].imports.apiImportGarageDetail,
    })
  }

  public apiImportGarageMapByAreaCode(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].imports.apiImportGarageMapByAreaCode,
    })
  }

  public apiTencentSignH5Sign(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].tencent.apiTencentSignH5Sign,
    })
  }

  public apiGrantRecordList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].grant.apiGrantRecordList,
    })
  }

  // 账号角色关系分页查询
  public apiAccountWorkbench$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountWorkbench$POST,
    })
  }

  // 账号角色关系分页查询
  public apiAccountWorkbench$GET(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountWorkbench$GET,
    })
  }

  // 账号角色关系分页查询
  public apiFinanceBillManagePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].finance.apiFinanceBillManagePage,
    })
  }

  // 账号角色关系分页查询
  public apiFinanceBillManageDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].finance.apiFinanceBillManageDetail,
    })
  }

  // 保证金总额
  public apiFinanceMarginTotal(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].finance.apiFinanceMarginTotal,
    })
  }

  // 销售订单统计 apiOrderStatisticsSalesPage
  public apiOrderStatisticsSalesPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsSalesPage,
    })
  }

  // apiOrderStatisticsOrderPaymentApi 统计分析_流量_订单支付情况
  public apiOrderStatisticsOrderPayment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsOrderPayment,
    })
  }

  // apiOrderStatisticsSalesRanking 统计分析_同省销量排名
  public apiOrderStatisticsSalesRanking(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsSalesRanking,
    })
  }

  // apiOrderStatisticsInvestApi 统计分析_进货、批发
  public apiOrderStatisticsInvest(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsInvest,
    })
  }

  //  apiOrderStatisticsInvestTotal 统计分析_进货、批发总数
  public apiOrderStatisticsInvestTotal(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsInvestTotal,
    })
  }

  // apiOrderStatisticsOrderPaymentDetail 统计分析_流量_支付明细
  public apiOrderStatisticsOrderPaymentDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsOrderPaymentDetail,
    })
  }

  //  apiOrderStatisticsCompanyInvitation 首页_拓客区(企业邀请)
  public apiOrderStatisticsCompanyInvitation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsCompanyInvitation,
    })
  }

  //  apiOrderStatisticsWholesaleDistrict 首页_批发区
  public apiOrderStatisticsWholesaleDistrict(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsWholesaleDistrict,
    })
  }

  //  apiOrderStatisticsWarehouseDistrict 首页_仓储区
  public apiOrderStatisticsWarehouseDistrict(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsWarehouseDistrict,
    })
  }

  //  apiOrderStatisticsWarehouseDistrict 统计-供应商数据看板
  public apiOrderStatisticsSupplierBoard(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsSupplierBoard,
    })
  }
  //获取进货价
  public apiOrderInvestQueryFinallyPrice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderInvestQueryFinallyPrice,
    })
  }

  //  apiOrderStatisticsRevenueColumn 首页_收益栏
  public apiOrderStatisticsRevenueColumn(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    console.log(localOptions, 'xx')
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsRevenueColumn,
    })
  }

  // apiOrderStatisticsCustomerOrderStatistic 统计-客户订单购买量统计
  public apiOrderStatisticsCustomerOrderStatistic(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsCustomerOrderStatistic,
    })
  }

  // apiOrderStatisticsCustomerOrderRanking 统计-客户订单购买量排名
  public apiOrderStatisticsCustomerOrderRanking(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderStatisticsCustomerOrderRanking,
    })
  }

  public apiHomeSupplier(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].home.apiHomeSupplier,
    })
  }
  /**
   * ocr识别-返单据
   * @param data
   * @param option
   */
  public apiBusinessVehicleBrandOcrGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.brand.ocrGoods,
    })
  }
  /**
   * VIN查询车型商品信息
   * @param data
   * @param option
   */
  public apiBusinessVehicleScanGetgoodsbyvin(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.getgoodsbyvin,
    })
  }

  // 筛选车型
  public apiBusinessVehicleFilter(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.apiBusinessVehicleFilter,
    })
  }

  public apiBusinessVehicleQueryVehicleDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.apiBusinessVehicleQueryVehicleDetail,
    })
  }

  /**
   * 查询绑定车型
   * @param data
   * @param option
   */
  public apiBusinessVehicleQueryBindVehicle(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.apiBusinessVehicleQueryBindVehicle,
    })
  }
  /**
   * 缸体号查询售后信息
   * @param data
   * @param option
   */
  public apiBusinessVehicleScanGetgoodsbyno(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.getorderbyeno,
    })
  }

  /**
   * 手动数据发动集码入库
   * @param data
   * @param option
   */
  public apiBusinessVehicleHandloseWarehousing(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.handlose.warehousing,
    })
  }

  public apiBusinessVehicleVehicleByVin(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].business.vehicle.vehicle,
    })
  }

  /**
   * 分享、邀请  新增数据，获取标识
   * @param data
   * @param option
   */
  public apiShareLinkAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].share.apiShareLinkAdd,
    })
  }

  /**
   * 分享、邀请  根据标识，获取数据
   * @param data
   * @param option
   */
  public apiShareLinkDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].share.apiShareLinkDetail,
    })
  }

  // 根据账户类型获取总金额
  public apiAccountDetailsBalance(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].account.apiAccountDetailsBalance,
    })
  }

  //  服务商-铺货订单列表
  public apiOrderDistributionPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderDistributionPage,
    })
  }
  //  服务商-铺货订单详情
  public apiOrderDistributionDetail(data = {id:''}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderDistributionDetail+'/'+data.id,
    })
  }
  //  服务商-发货
  public apiOrderDistributionDeliver(data = {id:''}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].order.apiOrderDistributionDeliver,
    })
  }
  //  检查当前用户是否可以提现权限
  public apiExtraWithdrawCheckApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].extra.apiExtraWithdrawCheckApply,
    })
  }
}
