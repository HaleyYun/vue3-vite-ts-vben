import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Finance extends VoHttp {
    constructor(props: any);
    /**
     * 保证金查询分页列表查询-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeMarginPage(data?: {}, option?: httpRequest): any;
    /**
     * 保证金查看详情-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeMarginDetail(data?: {}, option?: httpRequest): any;
    /**
     * 未结算订单分页查询-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeBillOrderPage(data?: {}, option?: httpRequest): any;
    /**
     * 添加未结算订单-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeBillOrder(data?: {}, option?: httpRequest): any;
    /**
     * 批量添加未结算订单-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeBillOrderBatch(data?: {}, option?: httpRequest): any;
    /**
     * 分页获取结算单信息-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeBillManagePage(data?: {}, option?: httpRequest): any;
    /**
     * id 获取结算单详情-GET
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeBillManageBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 平台垫付(转账)分页列表-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeAdvancesStandingPage(data?: {}, option?: httpRequest): any;
    /**
     * 平台垫付(转账)查看详情-POST
     * api:http://10.0.2.42:11122/project/124/interface/api/25736
     * @param data
     * @param option
     */
    financeAdvancesStandingDetailBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
   * 平台垫付(转账)确认收款-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/26546
   * @param data
   * @param option
   */
    financeAdvancesStandingConfirmBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 获取默认结算周期规则-GET
     * api:http://10.0.2.42:11122/project/124/interface/api/26033
     * @param data
     * @param option
     */
    financeBillConfigDefault(data?: {}, option?: httpRequest): any;
    /**
     * 修改结算配置信息-GET
     * api:http://10.0.2.42:11122/project/124/interface/api/26042
     * @param data
     * @param option
     */
    financeBillConfig(data?: {}, option?: httpRequest): any;
    /**
     * financeBillManageManualBill
     * 结算单 id，手动结算异常结算单-POST
     *
     * @param data
     * @param option
     */
    financeBillManageManualBill(data?: {}, option?: httpRequest): any;
    /**
    *
    * 分页查询支付单列表-POST
    *
    * @param data
    * @param option
    */
    financePayPcPage(data?: {}, option?: httpRequest): any;
    /**
    *
    * 根据支付单id获取支付单详情-POST finance/pay/detail
    *
    * @param data
    * @param option
    */
    financePayDetail(data?: {}, option?: httpRequest): any;
    /**
   *
   * 发票分页列表查询-POST
   *
   * @param data
   * @param option
   */
    financeInvoiceSelectList(data?: {}, option?: httpRequest): any;
    /**
  *
  * PC-发票详情-POST
  *
  * @param data
  * @param option
  */
    financeInvoiceDetailSellBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  *
  * PC-确认开票-PUT
  *
  * @param data
  * @param option
  */
    financeInvoiceConfirmInvoice(data?: {}, option?: httpRequest): any;
    /**
  *
  * PC-开票详情页,不包含订单-Get
  *
  * @param data
  * @param option
  */
    financeInvoiceDetailBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  *
  * PC-开票页订单信息-Get
  *
  * @param data
  * @param option
  */
    financeInvoiceOrderListBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
}
