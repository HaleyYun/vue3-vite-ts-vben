import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

//财务模块

export default class Finance extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 保证金查询分页列表查询-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeMarginPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeMarginPage,
    })
  }

  /**
   * 保证金查看详情-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeMarginDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeMarginDetail,
    })
  }

  /**
   * 未结算订单分页查询-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeBillOrderPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillOrderPage,
    })
  }

  /**
   * 添加未结算订单-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeBillOrder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillOrder,
    })
  }

  /**
   * 批量添加未结算订单-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeBillOrderBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillOrderBatch,
    })
  }

  /**
   * 分页获取结算单信息-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeBillManagePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillManagePage,
    })
  }

  /**
   * id 获取结算单详情-GET
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeBillManageBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillManageBy$id,
    })
  }

  /**
   * 平台垫付(转账)分页列表-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeAdvancesStandingPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeAdvancesStandingPage,
    })
  }

  /**
   * 平台垫付(转账)查看详情-POST
   * api:http://10.0.2.42:11122/project/124/interface/api/25736
   * @param data
   * @param option
   */
  public financeAdvancesStandingDetailBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeAdvancesStandingDetailBy$id + `/${data.id}`,
    })
  }

  /**
 * 平台垫付(转账)确认收款-POST
 * api:http://10.0.2.42:11122/project/124/interface/api/26546
 * @param data
 * @param option
 */
  public financeAdvancesStandingConfirmBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeAdvancesStandingConfirmBy$id + `/${data.id}`,
    })
  }

  /**
   * 获取默认结算周期规则-GET
   * api:http://10.0.2.42:11122/project/124/interface/api/26033
   * @param data
   * @param option
   */
  public financeBillConfigDefault(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillConfigDefault,
    })
  }

  /**
   * 修改结算配置信息-GET
   * api:http://10.0.2.42:11122/project/124/interface/api/26042
   * @param data
   * @param option
   */
  public financeBillConfig(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillConfig,
    })
  }
  /**
   * financeBillManageManualBill
   * 结算单 id，手动结算异常结算单-POST
   *
   * @param data
   * @param option
   */
  public financeBillManageManualBill(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeBillManageManualBill,
    })
  }

  /**
  *
  * 分页查询支付单列表-POST
  *
  * @param data
  * @param option
  */
  public financePayPcPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financePayPcPage,
    })
  }
  /**
  *
  * 根据支付单id获取支付单详情-POST finance/pay/detail
  *
  * @param data
  * @param option
  */
  public financePayDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financePayDetail,
    })
  }

  /**
 *
 * 发票分页列表查询-POST
 *
 * @param data
 * @param option
 */
  public financeInvoiceSelectList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeInvoiceSelectList,
    })
  }

  /**
*
* PC-发票详情-POST
*
* @param data
* @param option
*/
  public financeInvoiceDetailSellBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeInvoiceDetailSellBy$id + `/${data.id}`,
    })
  }

  /**
*
* PC-确认开票-PUT
*
* @param data
* @param option
*/
  public financeInvoiceConfirmInvoice(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeInvoiceConfirmInvoice,
    })
  }

  /**
*
* PC-开票详情页,不包含订单-Get
*
* @param data
* @param option
*/
  public financeInvoiceDetailBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeInvoiceDetailBy$id + `/${data.id}`,
    })
  }

  /**
*
* PC-开票页订单信息-Get
*
* @param data
* @param option
*/
  public financeInvoiceOrderListBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].finance.financeInvoiceOrderListBy$id + `/${data.id}`,
    })
  }

}
