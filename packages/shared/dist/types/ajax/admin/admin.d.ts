import { httpRequest, httpResponse } from '../../types';
import VoHttp from '../ajax';
import CommunityHttp from './community';
import UserHttp from './user';
import CustomerHttp from './customer';
import ContentManagerHttp from './contentManager';
import OrderHttp from './order';
import Company from './company';
import StoreHttp from './store';
import Warehouse from './warehouse';
import VEHICLE from './vehicle';
import FILE from './file';
import COMMON from './common';
import GOODS from './goods';
import CONTENT from './content';
import QUOTA from './quota';
import ORDER from './order';
import SUPPORT from './support';
import FINANCE from './finance';
import ACTIVATION from './activation';
import ROLE from './role';
import MENU from './menu';
import INTEGRAL from './integral';
import HOME from './home';
export default class adminHttp extends VoHttp {
    COMMUNITY: CommunityHttp;
    USER: UserHttp;
    CUSTOMER: CustomerHttp;
    CONTENTMENT: ContentManagerHttp;
    Order: OrderHttp;
    Store: StoreHttp;
    VEHICLE: VEHICLE;
    FILE: FILE;
    COMPANY: Company;
    WAREHOUSE: Warehouse;
    COMMON: COMMON;
    GOODS: GOODS;
    CONTENT: CONTENT;
    QUOTA: QUOTA;
    ORDER: ORDER;
    SUPPORT: SUPPORT;
    FINANCE: FINANCE;
    ACTIVATION: ACTIVATION;
    ROLE: ROLE;
    MENU: MENU;
    INTEGRAL: INTEGRAL;
    HOME: HOME;
    $user: {
        test(): void;
    };
    constructor(props: any);
    adminTestList(data?: {}, option?: httpRequest): any;
    goodsInvestmentQueryReason(data?: {}, option?: httpRequest): any;
    goodsGoodsQueryReason(data?: {}, option?: httpRequest): any;
    goodsBrandDelete(data?: {}, option?: httpRequest): any;
    goodsCategoryApplyQueryList(data?: {}, option?: httpRequest): any;
    goodsBrandList(data?: {}, option?: httpRequest): any;
    goodsBrandPage(data?: {}, option?: httpRequest): any;
    goodsBrandBatch(data?: {}, option?: httpRequest): any;
    goodsBranchQueryPage(data?: {}, option?: httpRequest): any;
    orderEvaluatePage(data?: {}, option?: httpRequest): any;
    orderEvaluateDelete(data?: {}, option?: httpRequest): any;
    orderEvaluateBatchUpdate(data?: {}, option?: httpRequest): any;
    orderEvaluateBatchModify(data?: {}, option?: httpRequest): any;
    orderEvaluateModify(data?: {}, option?: httpRequest): any;
    goodsBranchQueryList(data?: {}, option?: httpRequest): any;
    goodsDistributionArticlNumber(data?: {}, option?: httpRequest): any;
    goodsBrandSave(data?: {}, option?: httpRequest): any;
    goodsBrandStatusUpdate(data?: {}, option?: httpRequest): any;
    goodsBrandHotUpdate(data?: {}, option?: httpRequest): any;
    goodsCategoryApplyUpdate(data?: {}, option?: httpRequest): any;
    goodsBrandApplyAudit(data?: {}, option?: httpRequest): any;
    goodsBrandApplyId(data?: {
        id: string;
    }, option?: httpRequest): any;
    goodsGoodsProfitSet(data?: {}, option?: httpRequest): any;
    goodsInvestmentNumberSet(data?: {}, option?: httpRequest): any;
    orderEvaluateEvaluateDetail(data?: {}, option?: httpRequest): any;
    goodsBrandUpdate(data?: {}, option?: httpRequest): any;
    goodsInvestmentQueryListPage(data?: {}, option?: httpRequest): any;
    goodsInvestmentListCount(data?: {}, option?: httpRequest): any;
    goodsGoodsQueryListPage(data?: {}, option?: httpRequest): any;
    goodsGoodsDistributionPageList(data?: {}, option?: httpRequest): any;
    goodsGoodsDistributionExport(data?: {}, option?: httpRequest): any;
    goodsGoodsExportConsignment(data?: {}, option?: httpRequest): any;
    goodsGoodsDistributionUpdatePrice(data?: {}, option?: httpRequest): any;
    goodsGoodsProfitList(data?: {}, option?: httpRequest): any;
    goodsGoodsStatusUpdata(data?: {}, option?: httpRequest): any;
    goodsGoodsDistributionStatus(data?: {}, option?: httpRequest): any;
    goodsInvestmentUpdateStatus(data?: {}, option?: httpRequest): any;
    goodsGoodsAudit(data?: {}, option?: httpRequest): any;
    goodsGoodsDistributionAudit(data?: {}, option?: httpRequest): any;
    goodsGoodsViolationAudit(data?: {}, option?: httpRequest): any;
    goodsGoodsQueryOperatelogPage(data?: {}, option?: httpRequest): any;
    goodsGoodsViolation(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturerPost(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturerPut(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturerBatch(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturerList(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturerPage(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturerStatusUpdate(data?: {}, option?: httpRequest): any;
    goodsBrandManufacturer$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    goodsKeywordList(data?: {}, option?: httpRequest): any;
    goodsTypeList(data?: {}, option?: httpRequest): any;
    goodsKeywordSave(data?: {}, option?: httpRequest): any;
    goodsKeywordStatusUpdate(data?: {}, option?: httpRequest): any;
    goodsKeywordDeleteName(data?: {}, option?: httpRequest): any;
    goodsGoodsDelete(data?: {}, option?: httpRequest): any;
    goodsGoodsGoodsDetail(data?: {}, option?: httpRequest): any;
    goodsGoodsList(data?: {}, option?: httpRequest): any;
    goodsGoodsSave(data?: {}, option?: httpRequest): any;
    goodsGoodsUpdate(data?: {}, option?: httpRequest): any;
    goodsCategoryUpdate(data?: {}, option?: httpRequest): any;
    goodsCategorySortUpdate(data?: {}, option?: httpRequest): any;
    goodsCategorySecondCategory(data?: {}, option?: httpRequest): any;
    goodsCategorySave(data?: {}, option?: httpRequest): any;
    goodsCategoryList(data?: {}, option?: httpRequest): any;
    goodsCategoryDisableTypeUpdate(data?: {}, option?: httpRequest): any;
    goodsCategoryDisabletypeUpdate(data?: {}, option?: httpRequest): any;
    goodsCategoryCategorySelect(data?: {}, option?: httpRequest): any;
    goodsCategoryBatchDelete(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyCategory(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyQueryList(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyQueryCategory(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyDelete(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyDeleteBatch(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyDetail(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyForbidden(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyImport(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyList(data?: {}, option?: httpRequest): any;
    goodsSkuPropertySave(data?: {}, option?: httpRequest): any;
    goodsSkuProperty$id(data?: {
        id: string;
    }, option?: httpRequest): httpResponse;
    goodsSkuPropertySort(data?: {}, option?: httpRequest): any;
    goodsSkuPropertyUpdate(data?: {}, option?: httpRequest): any;
    goodsParamPropertyCategory(data?: {}, option?: httpRequest): any;
    goodsParamPropertyDeleteBatch(data?: {}, option?: httpRequest): any;
    goodsParamPropertyDetail(data?: {}, option?: httpRequest): any;
    goodsParamPropertyForbidden(data?: {}, option?: httpRequest): any;
    goodsParamPropertyQueryCategory(data?: {}, option?: httpRequest): any;
    goodsParamPropertyQueryList(data?: {}, option?: httpRequest): any;
    goodsParamPropertyImportant(data?: {}, option?: httpRequest): any;
    goodsParamPropertyList(data?: {}, option?: httpRequest): any;
    goodsParamPropertyRequired(data?: {}, option?: httpRequest): any;
    goodsParamPropertySave(data?: {}, option?: httpRequest): any;
    goodsParamPropertySort(data?: {}, option?: httpRequest): any;
    goodsParamPropertyUpdate(data?: {}, option?: httpRequest): any;
    goodsParamProperty$id(data?: {
        id: string;
    }, option?: httpRequest): httpResponse;
    goodsBrandApplyPost(data?: {}, option?: httpRequest): any;
    goodsBrand$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    orderInvest$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    orderSell$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    goodsGoods$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    goodsGoodsQueryLabels(data?: {}, option?: httpRequest): any;
    goodsGoodsSaveLabel(data?: {}, option?: httpRequest): any;
    goodsInvestment$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    goodsBrandApplyPut(data?: {}, option?: httpRequest): any;
    goodsBrandApplyBatch(data?: {}, option?: httpRequest): any;
    goodsBrandApplyList(data?: {}, option?: httpRequest): any;
    goodsBrandApplyPage(data?: {}, option?: httpRequest): any;
    goodsBrandApplyBy$id(data?: {}, option?: httpRequest): any;
    goodsBrandApplyDeleteBy$id(data?: {}, option?: httpRequest): any;
    goodsTemplateDelete(data?: {}, option?: httpRequest): any;
    goodsTemplateDeleteBatch(data?: {}, option?: httpRequest): any;
    goodsTemplateDetail(data?: {}, option?: httpRequest): any;
    goodsTemplateList(data?: {}, option?: httpRequest): any;
    goodsTemplateCategoryRecently(data?: {}, option?: httpRequest): any;
    goodsTemplateProfitGet(data?: {}, option?: httpRequest): any;
    goodsTemplateInfoInit(data?: {}, option?: httpRequest): any;
    goodsTemplateProfitPost(data?: {}, option?: httpRequest): any;
    goodsInvestmentQueryOperatelogPage(data?: {}, option?: httpRequest): any;
    goodsTemplateGetProfit(data?: {}, option?: httpRequest): any;
    warehouseDeliveryWarehouse$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    warehouseArrivalWarehouse(data?: {}, option?: httpRequest): any;
    warehouseStockUpdate(data?: {}, option?: httpRequest): any;
    goodsTemplateSave(data?: {}, option?: httpRequest): any;
    goodsTemplateStatus(data?: {}, option?: httpRequest): any;
    goodsTemplateUpdate(data?: {}, option?: httpRequest): any;
    goodsTemplateUnPublish(data?: {}, option?: httpRequest): any;
    goodsTemplateDraftBatchDelete(data?: {}, option?: httpRequest): any;
    goodsTemplateDraftDetails(data?: {}, option?: httpRequest): any;
    goodsTemplateDraftList(data?: {}, option?: httpRequest): any;
    goodsTemplateDraftSave(data?: {}, option?: httpRequest): any;
    goodsTemplateProfit(data?: {}, option?: httpRequest): any;
    goodsTemplatePublish(data?: {}, option?: httpRequest): any;
    goodsTemplateDraftUpdate(data?: {}, option?: httpRequest): any;
    goodsResourceAdd(data?: {}, option?: httpRequest): any;
    goodsResourceDelete(data?: {}, option?: httpRequest): any;
    goodsResourceDeleteBatch(data?: {}, option?: httpRequest): any;
    goodsResourceList(data?: {}, option?: httpRequest): any;
    goodsResourceMove(data?: {}, option?: httpRequest): any;
    goodsResourceMoveBatch(data?: {}, option?: httpRequest): any;
    goodsResourceSearch(data?: {}, option?: httpRequest): any;
    goodsResourceUpdate(data?: {}, option?: httpRequest): any;
    goodsResourceLibraryAdd(data?: {}, option?: httpRequest): any;
    goodsResourceLibraryUpdate(data?: {}, option?: httpRequest): any;
    goodsResourceLibraryList(data?: {}, option?: httpRequest): any;
    goodsResourceLibraryMove(data?: {}, option?: httpRequest): any;
    goodsResourceLibraryDelete(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateDelete(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateDisableTypeUpdate(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateSelectSecondCategory(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateGoodsCategoryGoodsUpdate(data?: {}, option?: httpRequest): httpResponse;
    goodsCategoryOperateList(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateSave(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateSortUpdate(data?: {}, option?: httpRequest): any;
    goodsCategoryOperateUpdate(data?: {}, option?: httpRequest): any;
    goodsTypeStatusUpdate(data?: {}, option?: httpRequest): any;
    goodsTypeSave(data?: {}, option?: httpRequest): any;
    goodsTypeDeleteBy$id(data?: {
        id: string;
    }, option?: httpRequest): httpResponse;
    goodsTypeDeleteName(data?: {}, option?: httpRequest): any;
    goodsTypeStatusList(data?: {}, option?: httpRequest): any;
    orderSellQueryList(data?: {}, option?: httpRequest): any;
    orderSellStatusCount(data?: {}, option?: httpRequest): any;
    orderSellListStatistics(data?: {}, option?: httpRequest): any;
    orderDistributionPage(data?: {}, option?: httpRequest): any;
    orderDistributionCountList(data?: {}, option?: httpRequest): any;
    orderInvestListStatistics(data?: {}, option?: httpRequest): any;
    orderInvestStatusCount(data?: {}, option?: httpRequest): any;
    goodsTemplateParamProperty(data?: {}, option?: httpRequest): any;
    findArea(data?: {}, option?: httpRequest): any;
    sixHotAreaTree(data?: {}, option?: httpRequest): any;
    companyInfoRemoveBinder(data?: {}, option?: httpRequest): any;
    companyInfoChangeBinder(data?: {}, option?: httpRequest): any;
    apiRolePage(data?: {}, option?: httpRequest): any;
    apiRoleCompany(data?: {}, option?: httpRequest): any;
}
