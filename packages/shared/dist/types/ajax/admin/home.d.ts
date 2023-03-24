import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Home extends VoHttp {
    constructor(props: any);
    /**
     * @title 订单数-折线图
     * @API http://10.0.2.42:11122/project/132/interface/api/27482
     * @param data
     * @param option
     * @method POST
     *
     */
    homePagePcOrderNumberLine(data?: {}, option?: httpRequest): any;
    /**
     * @title 平台交易额-折线图- POST
     * @API http://10.0.2.42:11122/project/132/interface/api/27491
     * @param data
     * @param option
     * @method POST
     *
     */
    homePagePcAmountCountLine(data?: {}, option?: httpRequest): any;
    /**
     * @title 平台总收入-饼状图
     * @API http://10.0.2.42:11122/project/132/interface/api/27500
     * @param data
     * @param option
     * @method POST
     *
     */
    homePagePcAmountFeePie(data?: {}, option?: httpRequest): any;
}
