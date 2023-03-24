import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class UserHttp extends VoHttp {
    constructor(props: any);
    userInfoComplaintDic(data?: {}, option?: httpRequest): any;
    userInfoOpDetail(data?: {}, option?: httpRequest): any;
    userInfoOpUpdatePassword(data?: {}, option?: httpRequest): any;
    userInfoPage(data?: {}, option?: httpRequest): any;
    userInfoUpdateReason(data?: {}, option?: httpRequest): any;
    userInfoUserPage(data?: {}, option?: httpRequest): any;
    userCompanyStatus(data?: {}, option?: httpRequest): any;
    userCompanyDelete$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    userInfoPassword(data?: {}, option?: httpRequest): any;
    userInfoDetail(data?: {}, option?: httpRequest): any;
    userInfoStatus(data?: {}, option?: httpRequest): any;
    userInfoPlatformCode(data?: {}, option?: httpRequest): any;
    /**
     * 修改账号(运营平台用户)-PUT
     * @param data
     * @param option
     */
    userInfoOpAccount$PUT(data?: {}, option?: httpRequest): any;
    /**
     * 重置密码(运营平台用户)-put
     * @param data
     * @param option
     */
    userInfoOpPasswordBy$userId(data?: {
        userId: string;
    }, option?: httpRequest): any;
    /**
     * 新增账号(运营平台用户)-PUT
     * @param data
     * @param option
     */
    userInfoOpAccount$POST(data?: {}, option?: httpRequest): any;
    /**
     * 用户列表(运营平台用户)-POST
     * @param data
     * @param option
     */
    userInfoOpPage(data?: {}, option?: httpRequest): any;
    /**
     * 用户列表(运营平台用户 模糊查询)-POST
     * @param data
     * @param option
     */
    userInfoOpRealName(data?: {}, option?: httpRequest): any;
    userInfoPut(data?: {}, option?: httpRequest): any;
}
