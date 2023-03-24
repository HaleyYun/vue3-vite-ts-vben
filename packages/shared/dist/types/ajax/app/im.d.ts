import { httpRequest } from '../../types';
import VoHttp from './../ajax';
export default class imHttp extends VoHttp {
    /**
     * 关注我的列表
     * @param data
     * @param option
     */
    apiImAttentionMeList(data?: {}, option?: httpRequest): any;
    /**
     * 我的好友列表
     * @param data
     * @param option
     */
    apiImAttentionMeMyFriend(data?: {}, option?: httpRequest): any;
    /**
     * 我的关注列表
     * @param data
     * @param option
     */
    apiImMyAttentionNotSeeIt(data?: {}, option?: httpRequest): any;
    /**
     * 我的关注列表
     * @param data
     * @param option
     */
    apiImMyAttentionAdd(data?: {}, option?: httpRequest): any;
    /**
     * 我的关注列表
     * @param data
     * @param option
     */
    apiImMyAttentionList(data?: {}, option?: httpRequest): any;
    /**
     * 获取商品列表-即时通讯聊天发送使用
     * @param data
     * @param option
     */
    apiGoodsQueryGoodsByUser(data?: {}, option?: httpRequest): any;
    /**
     * 不让TA看
     * @param data
     * @param option
     */
    apiImAttentionMeDontSeeMe(data?: {}, option?: httpRequest): any;
    /**
     * 好友权限
     * @param data
     * @param option
     */
    apiImAttentionMePower(data?: {}, option?: httpRequest): any;
    /**
     * 黑名单列表
     * @param data
     * @param option
     */
    apiImFriendBlackList(data?: {}, option?: httpRequest): any;
    /**
     * 解除黑名单
     * @param data
     * @param option
     */
    apiImFriendBlackRelieve(data?: {}, option?: httpRequest): any;
    /**
     * 加入黑名单
     * @param data
     * @param option
     */
    apiImFriendBlackSave(data?: {}, option?: httpRequest): any;
    /**
     * 服务配置详情
     * @param data
     * @param option
     */
    apiImNoticeConfigDetail(data?: {}, option?: httpRequest): any;
    /**
     * 添加服务配置
     * @param data
     * @param option
     */
    apiImNoticeConfigSaveOrUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 置顶聊天/取消置顶
     * @param data
     * @param option
     */
    apiImMessageListUdateTop(data?: {}, option?: httpRequest): any;
    /**
     * 修改免打扰
     * @param data
     * @param option
     */
    apiImMessageListUpdateDisturb(data?: {}, option?: httpRequest): any;
    /**
     * 添加聊天列表
     * @param data
     * @param option
     */
    apiImMessageListSave(data?: {}, option?: httpRequest): any;
    /**
     * 查询本用户的消息列表
     * @param data
     * @param option
     */
    apiImMessageListSelectMessageList(data?: {}, option?: httpRequest): any;
    /**
     * 查询本用户的消息列表
     * @param data
     * @param option
     */
    apiImMessageListSelectNotReadNum(data?: {}, option?: httpRequest): any;
    /**
     * 取聊天记录
     * @param data
     * @param option
     */
    apiMessageRecordGetMessage(data?: {}, option?: httpRequest): any;
    /**
     * 从列表中删除
     * @param id
     * @param option
     */
    apiMessageList$Id(id: any, option?: httpRequest): any;
    /**
     * 读聊天记录
     * @param data
     * @param option
     */
    apiMessageRecordReadMessage(data?: {}, option?: httpRequest): any;
    /**
     * 语音转文字
     * @param data
     * @param option
     */
    apiMessageRecordAudioText(data?: {}, option?: httpRequest): any;
    apiMessageRecordAudioToTextFromUrl(data?: {}, option?: httpRequest): any;
    apiImMessageListSearch(data?: {}, option?: httpRequest): any;
    /**
     * 发送消息存储
     * @param data
     * @param option
     */
    apiMessageRecordRecordSendMessage(data?: {}, option?: httpRequest): any;
    /**
     * 销售订单列表，即时通讯发送订单使用
     * @param data
     * @param option
     */
    apiOrderSellQueryListByUser(data?: {}, option?: httpRequest): any;
    /**
     * 聊天设置回显 回显聊天对方用户设置
     * @param data
     * @param option
     */
    apiImMessageListMessageUserInfo(data?: {}, option?: httpRequest): any;
    /**
     * 取消关注 imMyAttentionDelete
     */
    apiImMyAttentionDelete(data?: {}, option?: httpRequest): any;
    /**
     * 通讯录数量
     */
    apiImMyAttentionCount(data?: {}, option?: httpRequest): any;
    /**
     * 修改备注
     */
    apiImMyAttentionUpdateNickName(data?: {}, option?: httpRequest): any;
    /**
     * 好友详情 apiImMyAttentionUserInfo
     */
    apiImMyAttentionUserInfo(data?: {}, option?: httpRequest): any;
    /**
     * apiMessageRecordClearMessage 清除聊天记录
     */
    apiMessageRecordClearMessage(data?: {}, option?: httpRequest): any;
    /**
     * apiMessageRecordUpdateMessage 清除聊天记录
     */
    apiMessageRecordUpdateMessage(data?: {}, option?: httpRequest): any;
    apiImMyAttentionAgentShop(data?: {}, option?: httpRequest): any;
    apiCompanyInfoImStore(data?: {}, option?: httpRequest): any;
    apiMessageRecordCompanySendMessage(data?: {}, option?: httpRequest): any;
    apiMessageRecordCompanyChangeUser(data?: {}, option?: httpRequest): any;
}
