import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Warehouse extends VoHttp {
    constructor(props: any);
    warehouseListAll(data?: {}, option?: httpRequest): any;
    /**
     * 调拨管理-调拨分页查询-POST
     * api: http://10.0.2.42:11122/project/120/interface/api/26150
     * @param data
     * @param option
     */
    warehouseTransferPage(data?: {}, option?: httpRequest): any;
    /**
   * 调拨管理-仓库调拨--get
   * api: http://10.0.2.42:11122/project/85/interface/api/26186
   * @param data
   * @param option
   */
    warehousePlat(data?: {}, option?: httpRequest): any;
    /**
 * 打码配置--post
 * api: http://10.0.2.42:11122/project/120/interface/api/29228
 * @param data
 * @param option
 */
    warehouseCodingQueryList(data?: {}, option?: httpRequest): any;
    /**
   * 编辑打码服务费
   * api: http://10.0.2.42:11122/project/85/interface/api/26186
   * @param data
   * @param option
   */
    warehouseCodingUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 调拨 id 获取详情
     * api: http://10.0.2.42:11122/project/120/interface/api/26150
     * @param data
     * @param option
     */
    warehouseTransfer(data?: {}, option?: httpRequest): any;
    /**
     * 商品 id 获取商品各个仓库库存信息
     * warehouseStockGoodsWarehouse
     * api: http://10.0.2.42:11122/project/85/interface/api/18842
     * @param data
     * @param option
     */
    warehouseStockGoodsWarehouse(data?: {}, option?: httpRequest): any;
}
