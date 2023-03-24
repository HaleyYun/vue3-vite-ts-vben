// app端 接口列表 继承VoHttp
import { httpRequest } from '../../types'
import VoHttp from './../ajax'
import { AppApi } from './../api'

export default class imHttp extends VoHttp {
  // apiImAttentionMeList: `${$v1Api}im/attention/me/list`, // 关注我的列表
  /**
   * 关注我的列表
   * @param data
   * @param option
   */
  public apiImAttentionMeList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImAttentionMeList,
    })
  }

  /**
   * 我的好友列表
   * @param data
   * @param option
   */
  public apiImAttentionMeMyFriend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImAttentionMeMyFriend,
    })
  }

  // apiImMyAttentionNotSeeIt: `${$v1Api}im/my/attention/notSeeIt`, // 不看TA的
  /**
   * 我的关注列表
   * @param data
   * @param option
   */
  public apiImMyAttentionNotSeeIt(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionNotSeeIt,
    })
  }

  // apiImMyAttentionAdd: `${$v1Api}im/my/attention/add`, // 不让TA看
  /**
   * 我的关注列表
   * @param data
   * @param option
   */
  public apiImMyAttentionAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionAdd,
    })
  }

  // apiImMyAttentionList: `${$v1Api}im/my/attention/list`, // 我的关注列表
  /**
   * 我的关注列表
   * @param data
   * @param option
   */
  public apiImMyAttentionList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionList,
    })
  }

  // apiGoodsQueryGoodsByUser: `${$v1Api}goods/query/goodsByUser`, // 获取商品列表-即时通讯聊天发送使用
  /**
   * 获取商品列表-即时通讯聊天发送使用
   * @param data
   * @param option
   */
  public apiGoodsQueryGoodsByUser(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiGoodsQueryGoodsByUser,
    })
  }

  // apiImAttentionMeDontSeeMe: `${$v1Api}im/attention/me/dontSeeMe`, // 不让TA看
  /**
   * 不让TA看
   * @param data
   * @param option
   */
  public apiImAttentionMeDontSeeMe(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImAttentionMeDontSeeMe,
    })
  }

  // apiImAttentionMePower: `${$v1Api}im/attention/me/power`, // 好友权限
  /**
   * 好友权限
   * @param data
   * @param option
   */
  public apiImAttentionMePower(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImAttentionMePower,
    })
  }

  // apiImFriendBlackList: `${$v1Api}im/friend/black/list`, // 黑名单列表
  /**
   * 黑名单列表
   * @param data
   * @param option
   */
  public apiImFriendBlackList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImFriendBlackList,
    })
  }

  // apiImFriendBlackRelieve: `${$v1Api}im/friend/black/relieve`, // 解除黑名单
  /**
   * 解除黑名单
   * @param data
   * @param option
   */
  public apiImFriendBlackRelieve(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImFriendBlackRelieve,
    })
  }

  // apiImFriendBlackSave: `${$v1Api}im/friend/black/save`, // 加入黑名单
  /**
   * 加入黑名单
   * @param data
   * @param option
   */
  public apiImFriendBlackSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImFriendBlackSave,
    })
  }

  // apiImNoticeConfigDetail: `${$v1Api}im/notice/config/detail`, // 服务配置详情
  /**
   * 服务配置详情
   * @param data
   * @param option
   */
  public apiImNoticeConfigDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImNoticeConfigDetail,
    })
  }

  // apiImNoticeConfigSaveOrUpdate: `${$v1Api}im/notice/config/saveOrUpdate`, // 添加服务配置
  /**
   * 添加服务配置
   * @param data
   * @param option
   */
  public apiImNoticeConfigSaveOrUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImNoticeConfigSaveOrUpdate,
    })
  }

  // apiImMessageListUdateTop: `${$v1Api}im/message/list/update/top`, // 置顶聊天/取消置顶
  /**
   * 置顶聊天/取消置顶
   * @param data
   * @param option
   */
  public apiImMessageListUdateTop(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListUdateTop,
    })
  }

  // apiImMessageListUpdateDisturb: `${$v1Api}im/message/list/update/disturb`, // 修改免打扰
  /**
   * 修改免打扰
   * @param data
   * @param option
   */
  public apiImMessageListUpdateDisturb(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListUpdateDisturb,
    })
  }

  // apiImMessageListSave: `${$v1Api}im/message/list/save`, // 添加聊天列表
  /**
   * 添加聊天列表
   * @param data
   * @param option
   */
  public apiImMessageListSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListSave,
    })
  }

  // apiImMessageListSelectMessageList: `${$v1Api}im/message/list/select/messagelist`, // 查询本用户的消息列表
  /**
   * 查询本用户的消息列表
   * @param data
   * @param option
   */
  public apiImMessageListSelectMessageList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListSelectMessageList,
    })
  }

  // apiImMessageListSelectNotReadNum: `${$v1Api}im/message/list/select/notReadNum`, // 查询本用户未读消息数量
  /**
   * 查询本用户的消息列表
   * @param data
   * @param option
   */
  public apiImMessageListSelectNotReadNum(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListSelectNotReadNum,
    })
  }

  // apiMessageRecordGetMessage: `${$v1Api}message/record/getMessage`, // 取聊天记录
  /**
   * 取聊天记录
   * @param data
   * @param option
   */
  public apiMessageRecordGetMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordGetMessage,
    })
  }

  // apiMessageList$Id: `${$v1Api}im/message/list`, // 从列表中删除
  /**
   * 从列表中删除
   * @param id
   * @param option
   */
  public apiMessageList$Id(id, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageList$Id + `/${id}`,
    })
  }

  // apiMessageRecordReadMessage: `${$v1Api}message/record/readMessage`, // 读聊天记录
  /**
   * 读聊天记录
   * @param data
   * @param option
   */
  public apiMessageRecordReadMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordReadMessage,
    })
  }

  // apiMessageRecordAudioText: `${$v1Api}message/record/audioToText`, // 语音转文字
  /**
   * 语音转文字
   * @param data
   * @param option
   */
  public apiMessageRecordAudioText(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordAudioText,
    })
  }

  // 语音转文字路径 apiMessageRecordAudioToTextFromUrl
  public apiMessageRecordAudioToTextFromUrl(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordAudioToTextFromUrl,
    })
  }

  // 模糊查询
  public apiImMessageListSearch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListSearch,
    })
  }

  // apiMessageRecordRecordSendMessage: `${$v1Api}message/record/sendMessage`, // 发送消息存储
  /**
   * 发送消息存储
   * @param data
   * @param option
   */
  public apiMessageRecordRecordSendMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordRecordSendMessage,
    })
  }

  // apiOrderSellQueryListByUser: `${$v1Api}order/sell/query/listByUser`, // 销售订单列表，即时通讯发送订单使用
  /**
   * 销售订单列表，即时通讯发送订单使用
   * @param data
   * @param option
   */
  public apiOrderSellQueryListByUser(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiOrderSellQueryListByUser,
    })
  }

  // apiImMessageListMessageUserInfo
  /**
   * 聊天设置回显 回显聊天对方用户设置
   * @param data
   * @param option
   */
  public apiImMessageListMessageUserInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMessageListMessageUserInfo,
    })
  }

  /**
   * 取消关注 imMyAttentionDelete
   */
  public apiImMyAttentionDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionDelete,
    })
  }

  /**
   * 通讯录数量
   */
  public apiImMyAttentionCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionCount,
    })
  }

  /**
   * 修改备注
   */
  public apiImMyAttentionUpdateNickName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionUpdateNickName,
    })
  }

  /**
   * 好友详情 apiImMyAttentionUserInfo
   */
  public apiImMyAttentionUserInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionUserInfo,
    })
  }

  /**
   * apiMessageRecordClearMessage 清除聊天记录
   */
  public apiMessageRecordClearMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordClearMessage,
    })
  }

  /**
   * apiMessageRecordUpdateMessage 清除聊天记录
   */
  public apiMessageRecordUpdateMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordUpdateMessage,
    })
  }

  public apiImMyAttentionAgentShop(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiImMyAttentionAgentShop,
    })
  }
  // 获取店铺详情  apiCompanyInfoImStore

  public apiCompanyInfoImStore(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiCompanyInfoImStore,
    })
  }
  //给店铺发送消息
  public apiMessageRecordCompanySendMessage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordCompanySendMessage,
    })
  }
  // 根据店铺id获取userId
  public apiMessageRecordCompanyChangeUser(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].im.apiMessageRecordCompanyChangeUser,
    })
  }
}
