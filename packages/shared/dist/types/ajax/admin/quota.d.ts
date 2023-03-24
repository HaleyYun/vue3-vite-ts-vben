import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Quota extends VoHttp {
    constructor(props: any);
    /**
     * 获取账期额度调整记录列表-GET
     * @param data
     * @param option
     */
    quotaRecordPage(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 获取账期额度信息-GET
     * @param data
     * @param option
     */
    quotaGetBy$CompanyId(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 新增账期额度-GET
     * @param data
     * @param option
     */
    quotaAdd(data?: {}, option?: httpRequest): any;
    /**
     * 保存账期系数 quotaCoefficientSave
     * @param data
     * @param option
     */
    quotaCoefficientSave(data?: {}, option?: httpRequest): any;
}
