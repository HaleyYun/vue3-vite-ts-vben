import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Warehouse extends VoHttp {
  constructor(props) {
    super(props)
  }

  // 获取所有仓库列表
  public warehouseListAll(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseListAll,
    })
  }

  /**
   * 调拨管理-调拨分页查询-POST
   * api: http://10.0.2.42:11122/project/120/interface/api/26150
   * @param data
   * @param option
   */
  public warehouseTransferPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseTransferPage,
    })
  }
  /**
 * 调拨管理-仓库调拨--get
 * api: http://10.0.2.42:11122/project/85/interface/api/26186
 * @param data
 * @param option
 */
  public warehousePlat(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehousePlat,
    })
  }
    /**
 * 打码配置--post 
 * api: http://10.0.2.42:11122/project/120/interface/api/29228
 * @param data
 * @param option
 */
    public warehouseCodingQueryList(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].warehouse.warehouseCodingQueryList,
      })
    }
  /**
 * 编辑打码服务费
 * api: http://10.0.2.42:11122/project/85/interface/api/26186
 * @param data
 * @param option
 */
  public warehouseCodingUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseCodingUpdate,
    })
  }
  /**
   * 调拨 id 获取详情
   * api: http://10.0.2.42:11122/project/120/interface/api/26150
   * @param data
   * @param option
   */
  public warehouseTransfer(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseTransfer,
    })
  }

  /**
   * 商品 id 获取商品各个仓库库存信息
   * warehouseStockGoodsWarehouse
   * api: http://10.0.2.42:11122/project/85/interface/api/18842
   * @param data
   * @param option
   */

  public warehouseStockGoodsWarehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseStockGoodsWarehouse,
    })
  }



}
