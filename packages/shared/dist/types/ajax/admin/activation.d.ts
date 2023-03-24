import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Activation extends VoHttp {
    constructor(props: any);
    /**
     * 激活列表-分页查询列表-POST
     * api: http://10.0.2.42:11122/project/124/interface/api/25907
     * @param data
     * @param option
     */
    activationRecordQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 激活列表   取消激活
     * @param data
     * @param option
     *
     */
    activationRecordBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
}
