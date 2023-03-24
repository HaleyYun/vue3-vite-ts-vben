import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

//设置模块

export default class Role extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * pc 角色分页查询-POST /vocen-jarvis/v1/role/page
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
  public rolePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.rolePage,
    })
  }

  /**
 * pc 新增角色-POST /vocen-jarvis/v1/role/page
 * api:http://10.0.2.42:11122/project/108/interface/api/22766
 * @param data
 * @param option
 */
  public role(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.role,
    })
  }
  /**
 * pc 修改角色-POST /vocen-jarvis/v1/role/page
 * api:http://10.0.2.42:11122/project/108/interface/api/22766
 * @param data
 * @param option
 */
  public modifyRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.modifyRole,
    })
  }

    /**
 * pc 修改角色权限-PuT /vocen-jarvis/v1/role/page
 * api:http://10.0.2.42:11122/project/108/interface/api/22766
 * @param data
 * @param option
 */
     public rolePerms(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPut({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].role.rolePerms,
      })
    }
  /**
* pc 获取角色-Get
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public roleCompany(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.roleCompany,
    })
  }


  /**
* pc 主键角色获取角色信息-Get
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public roleGet$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.roleGet$Id + data.id,
    })
  }

  /**
* pc 逻辑删除角色-Delet
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public role$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.role$Id + data.id,
    })
  }

  /**
* pc 脱敏条件分页查询-post
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskPage,
    })
  }

  /**
* pc 脱敏删除-Delet
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMask$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMask$Id + data.id,
    })
  }
  /**
* pc 脱敏新增-Post
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskAdd,
    })
  }

  /**
 * pc 脱敏编辑-edit
 * api:http://10.0.2.42:11122/project/108/interface/api/22766
 * @param data
 * @param option
 */
  public accountMaskEdit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskEdit,
    })
  }

  /**
* pc 脱敏 获取单条数据GET
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskGET(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskGET,
    })
  }

  /**
* pc获取所有启用状态脱敏字段list
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskList,
    })
  }

  /**
* 角色 id 获取角色数据脱敏规则
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskRole,
    })
  }

  /**
* 新增角色与脱敏字段关系
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskRole$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskRole$Post,
    })
  }
   /**
* 获取app版本
* api:/vocen-jarvis/v1/version/currentVersion
* @param data
* @param option
*/
public versionCurrentVersion(data = {}, option?: httpRequest) {
  const localOptions = this.mergeRequest({
    data,
    ...option,
  })
  return this.$service.apiGet({
    ...localOptions,
    url: AdminApi[`${localOptions.version}`].role.versionCurrentVersion,
  })
}
   /**
* 设置app版本
* api:/vocen-jarvis/v1/version/save
* @param data
* @param option
*/
public versionSave(data = {}, option?: httpRequest) {
  const localOptions = this.mergeRequest({
    data,
    ...option,
  })
  return this.$service.apiPost({
    ...localOptions,
    url: AdminApi[`${localOptions.version}`].role.versionSave,
  })
}

  /**
* 修改角色脱敏字段是否脱敏
* api:http://10.0.2.42:11122/project/108/interface/api/22766
* @param data
* @param option
*/
  public accountMaskRole$Put(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].role.accountMaskRole$Put,
    })
  }

}
