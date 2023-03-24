// app端 接口列表 继承VoHttp
import { httpRequest, httpResponse } from '../../types'
import VoHttp from './../ajax'
import { AppApi, CommonApi } from './../api'

export default class userHttp extends VoHttp {
  // 用户详情
  public getUserProfileInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    console.log({
      localOptions,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.getUserProfile,
    })
  }

  // 获取用户自己的默认地址
  public apiReceiverAddressDefault(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: CommonApi[`${localOptions.version}`].defaultAddress,
    })
  }
  // 修改手机号
  public apiUserInfoMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfoMobile,
    })
  }

  // 修改手机号
  public apiUserInfoCheckMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiUserInfoCheckMobile,
    })
  }

  // 申请绑卡（绑卡页面发送短信验证码接口）
  public apiExtraBankApplyBankcard(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiExtraBankApplyBankcard,
    })
  }
  // 确认绑卡
  public apiExtraBankBindBankcard(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiExtraBankBindBankcard,
    })
  }
  // 银行卡解绑
  public apiExtraBankUnBankcard(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiExtraBankUnBankcard,
    })
  }
  // 查询银行卡信息
  public apiExtraBankList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiExtraBankList,
    })
  }
  // 获取账户明细分页列表
  public apiAccountDetailsPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiAccountDetailsPage,
    })
  }
  // APP-添加账户明细
  public apiAccountDetailsAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiAccountDetailsAdd,
    })
  }
  // APP-提现记录
  public apiAccountDetailsWithdrawPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiAccountDetailsWithdrawPage,
    })
  }
  public apiReceiverAddressHelpDefault(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].receiver.apiReceiverAddressHelpDefault,
    })
  }

  // APP-我的账户
  public apiAccountDetailsMain(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].user.apiAccountDetailsMain,
    })
  }
}
