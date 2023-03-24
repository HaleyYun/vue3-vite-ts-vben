import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Menu extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 菜单管理 根据用户信息获取菜单树
   * @param data
   * @param option
   *
   */
  public menuTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuTree,
    })
  }

  /**
   * 菜单管理 用户信息获取按钮 perms列表
   * @param data
   * @param option
   *
   */
  public menuBtnPerms(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuBtnPerms,
    })
  }

  /**
   * 菜单管理 根据用户信息获取菜单列表
   * @param data
   * @param option
   *
   */
  public menuList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuList,
    })
  }

  /**
   * 菜单管理 菜单名获取菜单列表，name 为空返回树形结构，name 有值不拼接树
   * @param data
   * @param option
   *
   */
  public menuNameTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuNameTree,
    })
  }

  /**
   * 菜单管理 保存菜单
   * @param data
   * @param option
   *
   */
  public menu$POST(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menu$POST,
    })
  }

  /**
   * 菜单管理 更新菜单
   * @param data
   * @param option
   *
   */
  public menu$PUT(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menu$PUT,
    })
  }

  /**
   * 菜单管理 删除菜单
   * @param data
   * @param option
   *
   */
  public menu$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menu$Id + data.id,
    })
  }

  /**
   * 菜单管理 角色 id 获取权限列表
   * @param data
   * @param option
   *
   */
  public menuRoleTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuRoleTree,
    })
  }

  /**
   * 菜单管理 用户信息中组织 id 获取组织权限列表
   * @param data
   * @param option
   *
   */
  public menuOrgTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuOrgTree,
    })
  }

  /**
   * 当前用户叶子节点 id 集合
   * @param data
   * @param option
   *
   */
  public menuTreeLeaf(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuTreeLeaf,
    })
  }

  /**
   * 当前用户叶子节点 id 集合
   * @param data
   * @param option
   *
   */
  public menuTreeRoleLeaf(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].menu.menuTreeRoleLeaf,
    })
  }
}
