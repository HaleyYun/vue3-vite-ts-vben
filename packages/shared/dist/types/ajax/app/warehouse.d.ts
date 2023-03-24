import { httpRequest } from '../../types';
import VoHttp from './../ajax';
export default class createHttp extends VoHttp {
    apiWarehouseSupplierMy(data?: {}, option?: httpRequest): any;
    apiWarehouseMyWarehouses(data?: {}, option?: httpRequest): any;
    apiWarehouseAgentStatisMy(data?: {}, option?: httpRequest): any;
    apiWarehouseGoodsAgentInvest(data?: {}, option?: httpRequest): any;
    apiWarehouseStatisAgentStockChange(data?: {}, option?: httpRequest): any;
    apiWarehouseOperFacilitatorSelfRefillCheck(data?: {}, option?: httpRequest): any;
    apiWarehouseOperFacilitatorSelfOutBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseOperFacilitatorSelfRefillBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseOperAgentGoodsVinPage(data?: {}, option?: httpRequest): any;
    apiWarehouseOper$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiWarehouseOperSupplierLogisticsInout(data?: {}, option?: httpRequest): any;
    apiWarehouseOperConfirmStock(data?: {}, option?: httpRequest): any;
}
