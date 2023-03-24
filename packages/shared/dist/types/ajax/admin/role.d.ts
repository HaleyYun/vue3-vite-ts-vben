import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Role extends VoHttp {
    constructor(props: any);
    /**
     * pc 角色分页查询-POST /vocen-jarvis/v1/role/page
     * api:http://10.0.2.42:11122/project/108/interface/api/22766
     * @param data
     * @param option
     */
    rolePage(data?: {}, option?: httpRequest): any;
    /**
   * pc 新增角色-POST /vocen-jarvis/v1/role/page
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
    role(data?: {}, option?: httpRequest): any;
    /**
   * pc 修改角色-POST /vocen-jarvis/v1/role/page
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
    modifyRole(data?: {}, option?: httpRequest): any;
    /**
 * pc 修改角色权限-PuT /vocen-jarvis/v1/role/page
 * api:http://10.0.2.42:11122/project/108/interface/api/22766
 * @param data
 * @param option
 */
    rolePerms(data?: {}, option?: httpRequest): any;
    /**
  * pc 获取角色-Get
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    roleCompany(data?: {}, option?: httpRequest): any;
    /**
  * pc 主键角色获取角色信息-Get
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    roleGet$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  * pc 逻辑删除角色-Delet
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    role$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  * pc 脱敏条件分页查询-post
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskPage(data?: {}, option?: httpRequest): any;
    /**
  * pc 脱敏删除-Delet
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMask$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  * pc 脱敏新增-Post
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskAdd(data?: {}, option?: httpRequest): any;
    /**
   * pc 脱敏编辑-edit
   * api:http://10.0.2.42:11122/project/108/interface/api/22766
   * @param data
   * @param option
   */
    accountMaskEdit(data?: {}, option?: httpRequest): any;
    /**
  * pc 脱敏 获取单条数据GET
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskGET(data?: {}, option?: httpRequest): any;
    /**
  * pc获取所有启用状态脱敏字段list
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskList(data?: {}, option?: httpRequest): any;
    /**
  * 角色 id 获取角色数据脱敏规则
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskRole(data?: {}, option?: httpRequest): any;
    /**
  * 新增角色与脱敏字段关系
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskRole$Post(data?: {}, option?: httpRequest): any;
    /**
 * 获取app版本
 * api:/vocen-jarvis/v1/version/currentVersion
 * @param data
 * @param option
 */
    versionCurrentVersion(data?: {}, option?: httpRequest): any;
    /**
 * 设置app版本
 * api:/vocen-jarvis/v1/version/save
 * @param data
 * @param option
 */
    versionSave(data?: {}, option?: httpRequest): any;
    /**
  * 修改角色脱敏字段是否脱敏
  * api:http://10.0.2.42:11122/project/108/interface/api/22766
  * @param data
  * @param option
  */
    accountMaskRole$Put(data?: {}, option?: httpRequest): any;
}
