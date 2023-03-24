import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Vehicle extends VoHttp {
    constructor(props: any);
    /**
     *	车系品牌列表
     * @param data
     * @param option
     */
    VehicleBrandSelectSeries(data?: {}, option?: httpRequest): any;
    /**
     *	车型-头部参数
     * @param data
     * @param option
     */
    VehicleBrandSelectParameters(data?: {}, option?: httpRequest): any;
    /**
     *	一级品牌列表
     * @param data
     * @param option
     */
    VehicleBrandSelectOne(data?: {}, option?: httpRequest): any;
    /**
     *	车型列表-树形
     * @param data
     * @param option
     */
    VehicleBrandSelectMode(data?: {}, option?: httpRequest): any;
    /**
     * ocr识别-返单据
     * @param data
     * @param option
     */
    VehicleBrandOcrGoods(data?: {}, option?: httpRequest): any;
    /**
     * 分页查询车型库列表
     * @param data
     * @param option
     */
    communityVehicleModelModelList(data?: {}, option?: httpRequest): any;
    /**
   * 车型库详情
   * @param data
   * @param option
   */
    communityVehicleModelModelDetail(data?: {}, option?: httpRequest): any;
    /**
  * 绑定车型库详情
  * @param data
  * @param option
  */
    communityVehicleModelBindBatchModel(data?: {}, option?: httpRequest): any;
    /**
* 车型联动条件查询
* @param data
* @param option
*/
    communityVehicleModelCondition(data?: {}, option?: httpRequest): any;
}
