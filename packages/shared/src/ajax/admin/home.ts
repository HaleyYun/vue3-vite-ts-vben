import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Home extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * @title 订单数-折线图
   * @API http://10.0.2.42:11122/project/132/interface/api/27482
   * @param data
   * @param option
   * @method POST
   *
   */
  public homePagePcOrderNumberLine(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].home.homePagePcOrderNumberLine,
    })
  }

  /**
   * @title 平台交易额-折线图- POST
   * @API http://10.0.2.42:11122/project/132/interface/api/27491
   * @param data
   * @param option
   * @method POST
   *
   */
  public homePagePcAmountCountLine(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].home.homePagePcAmountCountLine,
    })
  }

  /**
   * @title 平台总收入-饼状图
   * @API http://10.0.2.42:11122/project/132/interface/api/27500
   * @param data
   * @param option
   * @method POST
   *
   */
  public homePagePcAmountFeePie(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].home.homePagePcAmountFeePie,
    })
  }
}
