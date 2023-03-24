import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class StoreHttp extends VoHttp {
    constructor(props: any);
    warehouseQueryWareHousePage(data?: {}, option?: httpRequest): any;
    warehouseDelivery(data?: {}, option?: httpRequest): any;
    warehouseDelete(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * @description 到货时效
     */
    warehouseArrivalPage(data?: {}, option?: httpRequest): any;
    /**
     * @description 到货时效Page
     */
    warehouseArrivalQueryWarehouseArrivalTimePage(data?: {}, option?: httpRequest): any;
    wareHouseArrival(data?: {
        id: string;
    }, option?: httpRequest): any;
    warehouseArrivalDay(data?: {
        id: string;
    }, option?: httpRequest): any;
    warehouseArrivalTime(data?: {}, option?: httpRequest): any;
    /**
     * @description 新增到货时效/v1/warehouse/arrival
     */
    warehousePrescription(data?: {}, option?: httpRequest): any;
    /**
     * @description 仓储管理 --  禁用（首页列表）
     */
    warehouseforbidden(data?: {}, option?: httpRequest): any;
    /**
     * @description 仓储管理 --  禁用（首页列表）
     */
    warehouseStartup(data?: {}, option?: httpRequest): any;
    warehouseAdd(data?: {}, option?: httpRequest): any;
    warehouseChange(data?: {}, option?: httpRequest): any;
    queryWareHouseDropDown(data?: {}, option?: httpRequest): any;
    warehouseDeliveryPage(data?: {}, option?: httpRequest): any;
    warehouseStatisSupplierInout(data?: {}, option?: httpRequest): any;
    warehouseStatisticsSupplierRefill(data?: {}, option?: httpRequest): any;
    warehouseStatisSupplierTransfe(data?: {}, option?: httpRequest): any;
    deliveryPage(data?: {}, option?: httpRequest): any;
    deliveryByIDViewDetails(data?: {}, option?: httpRequest): any;
    batchAddTimeLimit(data?: {}, option?: httpRequest): any;
    AddBatchTimeLimit(data?: {}, option?: httpRequest): any;
    changeTimeLimit(data?: {}, option?: httpRequest): any;
    batchDeleteTimeLimit(data?: {}, option?: httpRequest): any;
    deleteTimeLimit(data?: {}, option?: httpRequest): any;
}
