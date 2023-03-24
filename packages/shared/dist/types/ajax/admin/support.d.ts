import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Support extends VoHttp {
    constructor(props: any);
    /**
     * 安装服务订单-安装订单列表查询-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23540
     * @param data
     * @param option
     */
    supportInstallQueryList(data?: {}, option?: httpRequest): any;
    /**
   * 安装服务订单-页签-Get
   * api: http://10.0.2.42:11122/project/104/interface/api/23540
   * @param data
   * @param option
   */
    supportInstallListCount(data?: {}, option?: httpRequest): any;
    /**
     * 安装服务订单-查看详情-GET
     * api: http://10.0.2.42:11122/project/104/interface/api/23549
     * @param data
     * @param option
     */
    supportInstallDetailBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 安装服务订单-修改安装服务单-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23936
     * @param data
     * @param option
     */
    supportInstallUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 安装服务订单-确认安装完成-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23945
     * @param data
     * @param option
     */
    supportInstallConfirm(data?: {}, option?: httpRequest): any;
    /**
     * 安装服务订单-订单处理结果-POST
     * api: http://10.0.2.42:11122/project/104/interface/api/23954
     * @param data
     * @param option
     */
    supportInstallHandel(data?: {}, option?: httpRequest): any;
}
