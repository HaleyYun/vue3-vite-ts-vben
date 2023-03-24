import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Integral extends VoHttp {
    constructor(props: any);
    /**
     * 查询积分成长值规则
     * @param data
     * @param option
     *
     */
    integralRuleList(data?: {}, option?: httpRequest): any;
    /**
     * 查询积分成长值规则
     * @param data
     * @param option
     *
     */
    integralRuleUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 查询等级设置
     * @param data
     * @param option
     *
     */
    integralUserLevelList(data?: {}, option?: httpRequest): any;
    /**
     * 新增等级设置
     * @param data
     * @param option
     *
     */
    integralUserLevelAdd(data?: {}, option?: httpRequest): any;
    /**
     * 修改等级设置
     * @param data
     * @param option
     *
     */
    integralUserLevelUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 查询用户成长值积分明细 grantRecordList
     */
    grantRecordList(data?: {}, option?: httpRequest): any;
}
