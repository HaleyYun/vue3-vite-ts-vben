import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Menu extends VoHttp {
    constructor(props: any);
    /**
     * 菜单管理 根据用户信息获取菜单树
     * @param data
     * @param option
     *
     */
    menuTree(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 用户信息获取按钮 perms列表
     * @param data
     * @param option
     *
     */
    menuBtnPerms(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 根据用户信息获取菜单列表
     * @param data
     * @param option
     *
     */
    menuList(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 菜单名获取菜单列表，name 为空返回树形结构，name 有值不拼接树
     * @param data
     * @param option
     *
     */
    menuNameTree(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 保存菜单
     * @param data
     * @param option
     *
     */
    menu$POST(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 更新菜单
     * @param data
     * @param option
     *
     */
    menu$PUT(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 删除菜单
     * @param data
     * @param option
     *
     */
    menu$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 菜单管理 角色 id 获取权限列表
     * @param data
     * @param option
     *
     */
    menuRoleTree(data?: {}, option?: httpRequest): any;
    /**
     * 菜单管理 用户信息中组织 id 获取组织权限列表
     * @param data
     * @param option
     *
     */
    menuOrgTree(data?: {}, option?: httpRequest): any;
    /**
     * 当前用户叶子节点 id 集合
     * @param data
     * @param option
     *
     */
    menuTreeLeaf(data?: {}, option?: httpRequest): any;
    /**
     * 当前用户叶子节点 id 集合
     * @param data
     * @param option
     *
     */
    menuTreeRoleLeaf(data?: {}, option?: httpRequest): any;
}
