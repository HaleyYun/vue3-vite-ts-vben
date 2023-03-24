import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

// 管理后台api接口列表

export default class UserHttp extends VoHttp {
  constructor(props) {
    super(props)
  }

  // 获取用户投诉类型
  public userInfoComplaintDic(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoComplaintDic,
    })
  }

  // 用户详情(运营平台用户)
  public userInfoOpDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpDetail,
    })
  }

  //修改密码(运营平台用户)
  public userInfoOpUpdatePassword(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpUpdatePassword,
    })
  }

  // 用户列表（带分页）
  public userInfoPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.page,
    })
  }

  // 用户投诉/v1/user/info/update/reason
  public userInfoUpdateReason(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.update.reason,
    })
  }

  // 用户投诉列表（带分页）/v1/user/info/user/page
  public userInfoUserPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.user.page,
    })
  }

  // 修改启用禁用状态（身份信息页）
  public userCompanyStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPatch({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.company.status,
    })
  }

  // 删除用户身份
  public userCompanyDelete$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.company.delete + data.id,
    })
  }

  // 重置密码
  public userInfoPassword(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.password,
    })
  }

  // 用户详情
  public userInfoDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.detail,
    })
  }

  // 修改启用禁用状态（用户列表页）
  public userInfoStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPatch({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.userStatus,
    })
  }

  // 获取用户平台角色
  // 修改启用禁用状态（用户列表页）
  public userInfoPlatformCode(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.platformCode,
    })
  }

  /**
   * 修改账号(运营平台用户)-PUT
   * @param data
   * @param option
   */
  public userInfoOpAccount$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpAccount$PUT,
    })
  }

  /**
   * 重置密码(运营平台用户)-put
   * @param data
   * @param option
   */
  public userInfoOpPasswordBy$userId(data = { userId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpPasswordBy$userId + data.userId,
    })
  }

  /**
   * 新增账号(运营平台用户)-PUT
   * @param data
   * @param option
   */
  public userInfoOpAccount$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpAccount$POST,
    })
  }

  /**
   * 用户列表(运营平台用户)-POST
   * @param data
   * @param option
   */
  public userInfoOpPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpPage,
    })
  }

  /**
   * 用户列表(运营平台用户 模糊查询)-POST
   * @param data
   * @param option
   */
  public userInfoOpRealName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.userInfoOpRealName,
    })
  }

  // changeInfo
  public userInfoPut(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.changeInfo,
    })
  }

  // end
}
