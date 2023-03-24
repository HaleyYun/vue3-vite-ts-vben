import { httpRequest, httpResponse } from '../../types';
import VoHttp from './../ajax';
import goods from './goods';
export default class appHttp extends VoHttp {
    CREATE_MODEL: any;
    BUSINESS: any;
    GOODS: goods;
    IM: any;
    USER: any;
    WAREHOUSE: any;
    constructor(props: any);
    appPay(data?: {}, option?: httpRequest): any;
    appTestList(data?: {}, option?: httpRequest): any;
    apiCreateColumnList(data?: {}, option?: httpRequest): any;
    apiCreateVideoSave(data?: {}, option?: httpRequest): any;
    apiCreateVideo$Id(data?: {
        id: string;
    }, option?: httpRequest): httpResponse;
    apiCreateIdeasSave(data?: {}, option?: httpRequest): any;
    apiCompanyInfoSerialDic(data?: {}, option?: httpRequest): any;
    apiCompanyInfoAdminPhoneNumber(data?: {}, option?: httpRequest): any;
    apiCompanyLegalSkillGarage(data?: {}, option?: httpRequest): any;
    apiCompanyBindingInviterExist(data?: {}, option?: httpRequest): any;
    apiCreateIdeas$Id(data?: {
        id: string;
    }, option?: httpRequest): httpResponse;
    apiCreateQuestionsQuestionTipoff(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionLike(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionCancelLike(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionCollect(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionCancelCollect(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsAnswerSave(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionSave(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionList(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestion$Id(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionView$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCreateQuestionsAnswer$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCreateQuestionsCommentCancelLike(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsCommentLike(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsCommentList(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsCommentSave(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsCommentReplay(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsCommentTipoff(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsQuestionUpdate(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsAnswerUpdate(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsAnswerList(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeGetUserInfo(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeUpdateUserInfo(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeGetUserInfoById(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCreateQuestionsHomeGetInfoById(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCreateQuestionsHomeGetFollowTypeById$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCreateQuestionsHomeUpdateFollow(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeCancelFollow(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeGetFans(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeGetAttention(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeGetCollection(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeCancelCollect(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeCheckEnable(data?: {}, option?: httpRequest): any;
    apiCreateQuestionsHomeCollectTotalCount(data?: {}, option?: httpRequest): any;
    apiCouponTradePage(data?: {}, option?: httpRequest): any;
    apiCouponTradeMy(data?: {}, option?: httpRequest): any;
    apiCouponTradeTrading(data?: {}, option?: httpRequest): any;
    apiCouponTradeShelf(data?: {}, option?: httpRequest): any;
    apiCouponTradeResponderPending(data?: {}, option?: httpRequest): any;
    apiCouponTradeResponderApproved(data?: {}, option?: httpRequest): any;
    apiCouponTradeResponderRejected(data?: {}, option?: httpRequest): any;
    apiCouponTradeApplicantPending(data?: {}, option?: httpRequest): any;
    apiCouponTradeApplicantApproved(data?: {}, option?: httpRequest): any;
    apiCouponTradeApplicantRejected(data?: {}, option?: httpRequest): any;
    apiCouponTradeApplicantCancel$id(data?: {}, option?: httpRequest): any;
    apiCouponTradeResponderAgree$id(data?: {}, option?: httpRequest): any;
    apiCouponTradeResponderReject$id(data?: {}, option?: httpRequest): any;
    apiCouponWantConfig(data?: {}, option?: httpRequest): any;
    apiCouponWantConfig$userId(data?: {
        userId: string;
    }, option?: httpRequest): httpResponse;
    apiCompanyLegalInfo(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthAnewIdentity(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthAnewLicense(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthAnewAll(data?: {}, option?: httpRequest): any;
    apiCompanyInfoInvoiceTitle(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAddressGarage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoMapAllStatistical(data?: {}, option?: httpRequest): any;
    apiCompanyLegalGarage(data?: {}, option?: httpRequest): any;
    apiCompanyLegalRealNameInfo(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthCompany(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthIdentity(data?: {}, option?: httpRequest): any;
    fileOcr(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthAccount(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthGarage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoDetail(data?: {}, option?: httpRequest): any;
    apiCompanyInfoPhoto(data?: {}, option?: httpRequest): any;
    apiCompanyInfoSroreName(data?: {}, option?: httpRequest): any;
    apiCompanyInfoSms(data?: {}, option?: httpRequest): any;
    apiCompanyInfoGarageAudit(data?: {}, option?: httpRequest): any;
    apiCompanyInfoBindMobile(data?: {}, option?: httpRequest): any;
    apiCompanyInfoStore(data?: {}, option?: httpRequest): any;
    apiCompanyInfoSupplierStatistical(data?: {}, option?: httpRequest): any;
    apiCompanyLegalRealName$PUT(data?: {}, option?: httpRequest): any;
    apiCompanyLegalRealName$GET(data?: {}, option?: httpRequest): any;
    apiExtraBankFuzzy(data?: {}, option?: httpRequest): any;
    apiExtraBankInfoFuzzy(data?: {}, option?: httpRequest): any;
    apiExtraWithdrawQuerySign$GET(data?: {}, option?: httpRequest): any;
    apiExtraWithdrawSign$PUT(data?: {
        type: string;
    }, option?: httpRequest): any;
    apiExtraWithdrawApply(data?: {}, option?: httpRequest): any;
    apiExtraCustomerShow(data?: {}, option?: httpRequest): any;
    apiExtraCustomerMoor(data?: {}, option?: httpRequest): any;
    apiUserInfoAccountList(data?: {}, option?: httpRequest): any;
    apiUserInfoCustomerService(data?: {}, option?: httpRequest): any;
    apiUserInfoCustomer$GET(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiUserInfoAccount$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiUserInfoAccountRole(data?: {}, option?: httpRequest): any;
    apiUserInfo(data?: {}, option?: httpRequest): any;
    apiUserInfo$PUT(data?: {}, option?: httpRequest): any;
    apiAccountRolePage(data?: {}, option?: httpRequest): any;
    apiAccountRole$Post(data?: {}, option?: httpRequest): any;
    apiAccountRole$Put(data?: {}, option?: httpRequest): any;
    apiAccountRole$Post$Id(data?: {}, option?: httpRequest): any;
    apiAccountRoleBatch(data?: {}, option?: httpRequest): any;
    apiAccountRole$Delete$Id(data?: {}, option?: httpRequest): any;
    apiRolePerms(data?: {}, option?: httpRequest): any;
    apiRole(data?: {}, option?: httpRequest): any;
    apiRole$Put(data?: {}, option?: httpRequest): any;
    apiRole$Delete(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiMenuTree(data?: {}, option?: httpRequest): any;
    apiMenuList(data?: {}, option?: httpRequest): any;
    apiMenuRoleTree(data?: {}, option?: httpRequest): any;
    apiMenuOrgTree(data?: {}, option?: httpRequest): any;
    apiSixhotAreaSub(data?: {}, option?: httpRequest): any;
    apiSixhotAreaTertiaryInfo(data?: {}, option?: httpRequest): any;
    apiAreaProvinceSub(data?: {}, option?: httpRequest): any;
    apiAreaProvinceTree(data?: {}, option?: httpRequest): any;
    appSixhotAreaList(data?: {}, option?: httpRequest): any;
    apiWarehousePage(data?: {}, option?: httpRequest): any;
    apiWarehousePlat(data?: {}, option?: httpRequest): any;
    apiWarehousePageGoods(data?: {}, option?: httpRequest): any;
    apiWarehouse$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiWarehouse$Post(data?: {}, option?: httpRequest): any;
    apiWarehouse$Put(data?: {}, option?: httpRequest): any;
    apiWarehouseBatch(data?: {}, option?: httpRequest): any;
    apiWarehouse$Delete(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierRefill(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierSelfRefill(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierSelfRefillBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierSelfRefillMultiter(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierTransfer(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierStockSelfRefill(data?: {}, option?: httpRequest): any;
    apiWarehouseOperBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseOper(data?: {}, option?: httpRequest): any;
    apiWarehouseArrival$Id(data?: {
        id: undefined;
    }, option?: httpRequest): any;
    apiWarehouseArrivalWarehouse(data?: {}, option?: httpRequest): any;
    apiWarehouseArrival$Post(data?: {}, option?: httpRequest): any;
    apiWarehouseArrival$Put(data?: {}, option?: httpRequest): any;
    apiWarehouseArrivalBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseArrival$Delete(data?: {}, option?: httpRequest): any;
    apiWarehouseArrivalPage(data?: {}, option?: httpRequest): any;
    apiWarehouseGoodsList(data?: {}, option?: httpRequest): any;
    apiWarehouseStockAppPage(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierInout(data?: {}, option?: httpRequest): any;
    apiWarehouseStatisRecyclingInout(data?: {}, option?: httpRequest): any;
    apiWarehouseStockWarnSetting(data?: {}, option?: httpRequest): any;
    apiWarehouseStatisSupplierRefill(data?: {}, option?: httpRequest): any;
    apiWarehouseStatisSupplierTransfer(data?: {}, option?: httpRequest): any;
    apiWarehouseDeliveryPage(data?: {}, option?: httpRequest): any;
    apiWarehouseDelivery$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiWarehouseDelivery$Post(data?: {}, option?: httpRequest): any;
    apiWarehouseDelivery$Put(data?: {}, option?: httpRequest): any;
    apiWarehouseDeliveryBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseDelivery$Delete(data?: {}, option?: httpRequest): any;
    apiWarehouseStockGoodsWarehouse(data?: {}, option?: httpRequest): any;
    apiWarehouseStockAgentInvestAreaGoodsWarehouse(data?: {}, option?: httpRequest): any;
    apiWarehouseStockCompanyGoodsWarehouse(data?: {}, option?: httpRequest): any;
    apiWarehouseStockGoodsList(data?: {}, option?: httpRequest): any;
    apiWarehouseStockPage(data?: {}, option?: httpRequest): any;
    apiWarehouseStock$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiWarehouseStockGoods(data?: {}, option?: httpRequest): any;
    apiWarehouseStockGoodsArival(data?: {}, option?: httpRequest): any;
    apiWarehouseStock$Post(data?: {}, option?: httpRequest): any;
    apiWarehouseStock$Put(data?: {}, option?: httpRequest): any;
    apiWarehouseStockBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseStock$Delete(data?: {}, option?: httpRequest): any;
    apiMessageRecordSendMessage(data?: {}, option?: httpRequest): any;
    apiMessageRecordReadMessage(data?: {}, option?: httpRequest): any;
    apiMessageRecordGetMessage(data?: {}, option?: httpRequest): any;
    apiMessageRecordRollbackMessage(data?: {}, option?: httpRequest): any;
    apiOrderSellDelivery(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleQueryListSupplier(data?: {}, option?: httpRequest): any;
    apiOrderInvestQueryListAgent(data?: {}, option?: httpRequest): any;
    apiOrderSellQueryListGarage(data?: {}, option?: httpRequest): any;
    apiOrderSellQueryListInviter(data?: {}, option?: httpRequest): any;
    apiOrderSellQueryInviterCount(data?: {}, option?: httpRequest): any;
    apiAccountperiodList(data?: {}, option?: httpRequest): any;
    apiOrderSellQueryListPromote(data?: {}, option?: httpRequest): any;
    apiOrderProfitQueryUnsettleList(data?: {}, option?: httpRequest): any;
    apiOrderProfitQueryUnsettleAmount(data?: {}, option?: httpRequest): any;
    apiOrderSellAddressEdit(data?: {}, option?: httpRequest): any;
    apiOrderSellCancel(data?: {}, option?: httpRequest): any;
    apiOrderSellRemarkAdd(data?: {}, option?: httpRequest): any;
    apiOrderSell$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderSellQueryList(data?: {}, option?: httpRequest): any;
    apiOrderSellReceive(data?: {}, option?: httpRequest): any;
    apiOrderSellEnumStatus(data?: {}, option?: httpRequest): any;
    apiOrderSellSend$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderSellStatus(data?: {}, option?: httpRequest): any;
    apiOrderSellWarn(data?: {}, option?: httpRequest): any;
    apiOrderSellQueryListRefundEnabled(data?: {}, option?: httpRequest): any;
    apiOrderInvestStatus(data?: {}, option?: httpRequest): any;
    apiOrderInvestAddressEdit(data?: {}, option?: httpRequest): any;
    apiOrderInvestReceipt(data?: {}, option?: httpRequest): any;
    apiOrderInvestRemarkAdd(data?: {}, option?: httpRequest): any;
    apiOrderInvest$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderInvestWarn(data?: {}, option?: httpRequest): any;
    apiOrderInvestDelivery(data?: {}, option?: httpRequest): any;
    apiOrderInvestCancel(data?: {}, option?: httpRequest): any;
    apiOrderInvestSend$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderInvestEnumStatus(data?: {}, option?: httpRequest): any;
    apiOrderInvestQueryList(data?: {}, option?: httpRequest): any;
    apiOrderInvestQueryListRefundEnabled(data?: {}, option?: httpRequest): any;
    apiOrderPlaceSpNational(data?: {}, option?: httpRequest): any;
    apiOrderPlaceGarage(data?: {}, option?: httpRequest): any;
    apiOrderPlaceSpLocal(data?: {}, option?: httpRequest): any;
    apiRefundCalculateAmount(data?: {}, option?: httpRequest): any;
    apiRefundCreateDelivery(data?: {}, option?: httpRequest): any;
    apiRefundCreateFefundApply(data?: {}, option?: httpRequest): any;
    apiRefundCancelApply(data?: {}, option?: httpRequest): any;
    apiRefundUpdateApply(data?: {}, option?: httpRequest): any;
    apiRefundReceipt(data?: {}, option?: httpRequest): any;
    apiRefundDetail(data?: {}, option?: httpRequest): any;
    apiOrderRefundCauseQueryList(data?: {}, option?: httpRequest): any;
    apiRefundQueryList(data?: {}, option?: httpRequest): any;
    apiRefundCheckOrder(data?: {}, option?: httpRequest): any;
    apiRefundCheckFastRefund(data?: {}, option?: httpRequest): any;
    apiRefundGetRefundEngineCode(data?: {}, option?: httpRequest): any;
    apiOrderRepaymentQueryRepayableList(data?: {}, option?: httpRequest): any;
    apiOrderRepaymentQueryRepayableCalendar(data?: {}, option?: httpRequest): any;
    apiOrderRepaymentQueryRepayableAmount(data?: {}, option?: httpRequest): any;
    apiOrderRepaymentQueryReceivableList(data?: {}, option?: httpRequest): any;
    apiOrderRepaymentQueryReceivableCalendar(data?: {}, option?: httpRequest): any;
    apiOrderRepaymentQueryReceivableAmount(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodReceivableList(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodReceivableStatistics(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodPayableStatistics(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodGetByCurrentUser(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodQueryReceivableCalendar(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodQueryRepayableCalendar(data?: {}, option?: httpRequest): any;
    apiOrderEvaluateGetUnEvaluateOrderList(data?: {}, option?: httpRequest): any;
    apiOrderEvaluateGetEvaluateOrderDetail(data?: {}, option?: httpRequest): any;
    apiOrderEvaluateGetEvaluateOrderList(data?: {}, option?: httpRequest): any;
    apiOrderRecycleRepairQueryPage(data?: {}, option?: httpRequest): any;
    apiOrderRecycleCheckCancel(data?: {}, option?: httpRequest): any;
    apiOrderRecycleSave(data?: {}, option?: httpRequest): any;
    apiOrderRecycleUpdate(data?: {}, option?: httpRequest): any;
    apiOrderRecycleDetail(data?: {}, option?: httpRequest): any;
    apiOrderRecycleNotNeed(data?: {}, option?: httpRequest): any;
    apiOrderRecycleNeedAssign(data?: {}, option?: httpRequest): any;
    apiOrderRecycleContinueWait(data?: {}, option?: httpRequest): any;
    apiOrderRecycleConfirmRecycle(data?: {}, option?: httpRequest): any;
    apiOrderNoninductiveEvaluateQuestion(data?: {}, option?: httpRequest): any;
    apiOrderNoninductiveEvaluateSave(data?: {}, option?: httpRequest): any;
    apiOrderRecycleSaveEvaluate(data?: {}, option?: httpRequest): any;
    apiOrderRecycleMasterCancel(data?: {}, option?: httpRequest): any;
    apiOrderRecycleSaveLogistics(data?: {}, option?: httpRequest): any;
    apiOrderRecycleCheck(data?: {}, option?: httpRequest): any;
    apiOrderRecycleQueryLogistics(data?: {}, option?: httpRequest): any;
    apiOrderRecycleOrderDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderRecycleQueryPageList(data?: {}, option?: httpRequest): any;
    apiOrderRecycleQuality(data?: {}, option?: httpRequest): any;
    apiOrderRecycleReceiptGoods(data?: {}, option?: httpRequest): any;
    apiOrderInstallQueryList(data?: {}, option?: httpRequest): any;
    apiOrderInstallUpdate(data?: {}, option?: httpRequest): any;
    apiOrderInstallPay(data?: {}, option?: httpRequest): any;
    apiOrderInstallCancel(data?: {}, option?: httpRequest): any;
    apiOrderInstallPayRefund(data?: {}, option?: httpRequest): any;
    apiOrderInstallConfirm(data?: {}, option?: httpRequest): any;
    apiOrderInstallEvaluation(data?: {}, option?: httpRequest): any;
    apiOrderInstallNeedAssign(data?: {}, option?: httpRequest): any;
    apiOrderInstallUnwanted(data?: {}, option?: httpRequest): any;
    apiOrderInstallContinueWait(data?: {}, option?: httpRequest): any;
    apiOrderInstallCommitComplaint(data?: {}, option?: httpRequest): any;
    apiOrderInstallSubmitOrder(data?: {}, option?: httpRequest): any;
    apiOrderInstallDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiGraborderQuerycantakeorders(data?: {}, option?: httpRequest): any;
    apiGraborderGraborders(data?: {}, option?: httpRequest): any;
    apiGraborderSaveordercancel(data?: {}, option?: httpRequest): any;
    apiGraborderLastorder(data?: {}, option?: httpRequest): any;
    apiGraborderGetorderdetailbyid$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiGraborderIsUndertaker(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrdertakesettingUpdate(data?: {}, option?: httpRequest): any;
    apiOrdertakesettingDetail(data?: {}, option?: httpRequest): any;
    apiCompanyInfoRecycling(data?: {}, option?: httpRequest): any;
    apiOrderOldEnumStatus(data?: {}, option?: httpRequest): any;
    apiOrderPlaceOld(data?: {}, option?: httpRequest): any;
    apiOrderOldCancel(data?: {}, option?: httpRequest): any;
    apiOrderOldWarn(data?: {}, option?: httpRequest): any;
    apiOrderOldQueryList(data?: {}, option?: httpRequest): any;
    apiOrderOld$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderOldRemarkAdd$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderOldSend$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderOldDelivery(data?: {}, option?: httpRequest): any;
    apiOrderOldRemarkAdd(data?: {}, option?: httpRequest): any;
    apiOrderOldAddressEdit(data?: {}, option?: httpRequest): any;
    apiOrderOldReceive(data?: {}, option?: httpRequest): any;
    apiOrderTechnicianQueryList(data?: {}, option?: httpRequest): any;
    apiOrderTechnicianInstallDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderTechnicianInstallStart$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderTechnicianInstallSubmit(data?: {}, option?: httpRequest): any;
    apiOrderSupportAfterSaleDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderSupportAfterSaleConfirm(data?: {}, option?: httpRequest): any;
    apiOrderSupportAfterSaleTimeUpdate(data?: {}, option?: httpRequest): any;
    apiOrderSupportAfterSaleCancel(data?: {}, option?: httpRequest): any;
    apiOrderSupportAfterSaleResultCommit(data?: {}, option?: httpRequest): any;
    apiOrderSupportAfterSaleVisit(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderSupportAfterSaleEnumStatus(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleQueryList(data?: {}, option?: httpRequest): any;
    apiOrderAfterSale(id: any, option?: httpRequest): any;
    apiOrderAfterSalePlace(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleCheck(id: any, option?: httpRequest): any;
    apiOrderAfterSaleEnumStatus(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleReceipt(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleCancel(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleDelivery(data?: {}, option?: httpRequest): any;
    apiOrderRecycleTechnologyMapLocation(data?: {}, option?: httpRequest): any;
    apiOrderRecycleRepairMapLocation(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleComment(data?: {}, option?: httpRequest): any;
    apiOrderAfterSaleDeliveryEdit(data?: {}, option?: httpRequest): any;
    apiOrderInstallCount(data?: {}, option?: httpRequest): any;
    apiOrderAccountPeriodPayableList(data?: {}, option?: httpRequest): any;
    apiOrderCancelCauseQueryList(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsStatisticBoard(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsStatisticCount(data?: {}, option?: httpRequest): any;
    apiContentUniversityDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentUniversityNewCourse(data?: {}, option?: httpRequest): any;
    apiContentUniversityMyCollection(data?: {}, option?: httpRequest): any;
    apiContentUniversityBatchDelete(data?: {}, option?: httpRequest): any;
    apiContentUniversityCancelCollectionCourse$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentUniversityRelevantCourse(data?: {
        categoryId: string;
    }, option?: httpRequest): any;
    apiContentUniversityBrowseRecord$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentUniversityCollectionCourse$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentUniversityStudyCourse(data?: {}, option?: httpRequest): any;
    apiContentUniversityRecommendCourse(data?: {}, option?: httpRequest): any;
    apiContentUniversityHotCourse(data?: {}, option?: httpRequest): any;
    apiContentUniversitySearch(data?: {}, option?: httpRequest): any;
    apiContentUniversitySelectCourse(data?: {}, option?: httpRequest): any;
    apiContentUniversitySelectCategory(data?: {}, option?: httpRequest): any;
    apiContentUniversityQueryHelpDetail(data?: {}, option?: httpRequest): any;
    apiContentUniversityQueryHelpTypeList(data?: {}, option?: httpRequest): any;
    apiContentEvaluateSave(data?: {}, option?: httpRequest): any;
    apiContentEvaluateQueryEvaluateById(data?: {}, option?: httpRequest): any;
    apiContentEvaluateQueryProductFavorableComment(data?: {}, option?: httpRequest): any;
    apiContentEvaluateQueryProductEvaluateInfo(data?: {}, option?: httpRequest): any;
    apiContentComplaintCommitContent(data?: {}, option?: httpRequest): any;
    apiContentComplaintDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentComplaintQueryListByDealStatus(data?: {}, option?: httpRequest): any;
    apiContentComplaintRevocationComplaint$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentComplaintUpdateComplaint(data?: {}, option?: httpRequest): any;
    apiContentComplaintType(data?: {}, option?: httpRequest): any;
    apiContentEvaluateQueryProductEvaluatePage(data?: {}, option?: httpRequest): any;
    apiOrderEvaluateFavorableComment(data?: {}, option?: httpRequest): any;
    apiContentLearningTasksInitialize(data?: {}, option?: httpRequest): any;
    apiContentLearningTasksCourseList(data?: {}, option?: httpRequest): any;
    apiContentLearningTasksLearningHistory(data?: {}, option?: httpRequest): any;
    apiContentLearningTasksProgress(data?: {}, option?: httpRequest): any;
    apiContentLearningUpdateProgress(data?: {}, option?: httpRequest): any;
    apiContentLearningRelatedCourse(data?: {}, option?: httpRequest): any;
    apiContentLearningCourseDetail(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceStudyCourse(data?: {}, option?: httpRequest): any;
    apiGoodsModelContentModelList(data?: {}, option?: httpRequest): any;
    apiCompanyInfoServiceProject(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceRecommendCourse(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceHotCourse(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceCancelCollectionCourse$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentTechnicalGuidanceMyCollection(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceBatchDelete(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentTechnicalGuidanceRelevantCourse(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceBrowseRecord$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentTechnicalGuidanceCollectionCourse$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiContentTechnicalGuidanceSearch(data?: {}, option?: httpRequest): any;
    apiContentTechnicalGuidanceSelectCategory(data?: {}, option?: httpRequest): any;
    apiContentMessageLogAnnouncementList(data?: {}, option?: httpRequest): any;
    apiContentMessageUserSettingSelect(data?: {}, option?: httpRequest): any;
    apiContentMessageUserSettingSet(data?: {}, option?: httpRequest): any;
    apiContentSwiperList(data?: {}, option?: httpRequest): any;
    apiContentMessageLogCount(data?: {}, option?: httpRequest): any;
    apiContentMessageLogNoticeList(data?: {}, option?: httpRequest): any;
    apiContentMessageLogLogisticsList(data?: {}, option?: httpRequest): any;
    apiContentMessageLogCollectList(data?: {}, option?: httpRequest): any;
    apiContentMessageLogCommentList(data?: {}, option?: httpRequest): any;
    apiContentMessageLogMessageRead(data?: {}, option?: httpRequest): any;
    apiContentMessageLogAttentionList(data?: {}, option?: httpRequest): any;
    apiContentFunctionRouteRoute(data?: {}, option?: httpRequest): any;
    apiAclSearchEntrance(data?: {}, option?: httpRequest): any;
    apiReceiverAddressList(data?: {}, option?: httpRequest): any;
    apiReceiverAddress$Put(data?: {}, option?: httpRequest): any;
    apiReceiverAddress$Post(data?: {}, option?: httpRequest): any;
    apiReceiverAddress$Delete(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiReceiverAddress$Patch(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiReceiverAddress$Get(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiReceiverAddressRegister(data?: {}, option?: httpRequest): any;
    apiGoodsQueryMyGoods(data?: {}, option?: httpRequest): any;
    apiGoodsQueryMyGoodsCount(data?: {}, option?: httpRequest): any;
    apiGoodsQueryReplenishList(data?: {}, option?: httpRequest): any;
    apiGoodsTemplateQueryList(data?: {}, option?: httpRequest): any;
    apiGoodsBrandQueryApplyList(data?: {}, option?: httpRequest): any;
    apiGoodsSkuPropertyApplyList(data?: {}, option?: httpRequest): any;
    apiGoodsParamsPropertyApplyList(data?: {}, option?: httpRequest): any;
    apiGoodsSave(data?: {}, option?: httpRequest): any;
    apiGoodsDetail(data?: {}, option?: httpRequest): any;
    apiGoodsSealAreaQueryList(data?: {}, option?: httpRequest): any;
    apiGoodsTypeQueryList(data?: {}, option?: httpRequest): any;
    apiGoodsCategoryQueryCategoryList(data?: {}, option?: httpRequest): any;
    apiGoodsTemplateDetail(data?: {}, option?: httpRequest): any;
    apiGoodsUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsDetailAgent(data?: {}, option?: httpRequest): any;
    apiGoodsQueryReason(data?: {}, option?: httpRequest): any;
    apiGoodsStatusUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsUpdateAgent(data?: {}, option?: httpRequest): any;
    apiGoodsApplyUpdatePut(data?: {}, option?: httpRequest): any;
    apiGoodsQueryAgentGoodsList(data?: {}, option?: httpRequest): any;
    apiGoodsBrandApplySave(data?: {}, option?: httpRequest): any;
    apiGoodsBrandApplyLogList(data?: {}, option?: httpRequest): any;
    apiGoodsBrandApplyCheck(data?: {}, option?: httpRequest): any;
    apiGoodsBrandApply$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiGoodsBrandQueryMyList(data?: {}, option?: httpRequest): any;
    apiGoodsCategoryApplyCertificationList(data?: {}, option?: httpRequest): any;
    apiGoodsCategoryApplyCertificationCategory(data?: {}, option?: httpRequest): any;
    apiGoodsCategoryApplyDetail(data?: {}, option?: httpRequest): any;
    apiGoodsCategoryApplyQueryList(data?: {}, option?: httpRequest): any;
    apiGoodsCategoryApplySave(data?: {}, option?: httpRequest): any;
    apiGoodsKeywordQueryGetKeyWord(data?: {}, option?: httpRequest): any;
    apiCartBasisDeleteBatch(data?: {}, option?: httpRequest): any;
    apiCartResaleDeleteBatch(data?: {}, option?: httpRequest): any;
    apiCartBasisDetailst(data?: {}, option?: httpRequest): any;
    apiCartResaleDetailst(data?: {}, option?: httpRequest): any;
    apiCartBasisSave(data?: {}, option?: httpRequest): any;
    apiCartBasisReduceNum(data?: {}, option?: httpRequest): any;
    apiCartResaleSave(data?: {}, option?: httpRequest): any;
    apiCartResaleReduceNum(data?: {}, option?: httpRequest): any;
    apiCartBasisUpdateGoodscount(data?: {}, option?: httpRequest): any;
    apiCartResaleUpdateGoodscount(data?: {}, option?: httpRequest): any;
    apiCartBasisQueryNum(data?: {}, option?: httpRequest): any;
    apiCartBasisSaveCollection(data?: {}, option?: httpRequest): any;
    apiCartResaleSaveCollection(data?: {}, option?: httpRequest): any;
    payPayResult(data?: {}, option?: httpRequest): any;
    payType(data?: {}, option?: httpRequest): any;
    payRepaymentPay(data?: {}, option?: httpRequest): any;
    apiRepaymentLogList(data?: {}, option?: httpRequest): any;
    apiRepaymentLogInfoList(data?: {}, option?: httpRequest): any;
    apiInvoiceSelectList(data?: {}, option?: httpRequest): any;
    apiInvoiceDetail$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiInvoiceConfirmInvoice(data?: {}, option?: httpRequest): any;
    apiInvoiceSave(data?: {}, option?: httpRequest): any;
    apiInvoiceRecord(data?: {}, option?: httpRequest): any;
    apiInvoiceDetailBuyer$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiInvoiceOrderListEnable(data?: {}, option?: httpRequest): any;
    apiInvoiceQueryOrderList$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCompanyInfoRemoveBind$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCompanyInfoRemoveBinder(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationSms(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Sms(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5CheckGarage(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5TertiaryInfo(data?: {}, option?: httpRequest): any;
    apiCompanyInfoAudit(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Common(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Garage(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5BindMobile(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAuthInfo(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAnewIdentity(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAnewLicense(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAnewAll(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5BindInvitation(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationCheckSupplier(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationSupplier$POST(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationSupplier$PUT(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5CheckSupplier(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Supplier$POST(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Supplier$PUT(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5CheckAgent(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Agent$POST(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationH5Agent$PUT(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationCheckAgent(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAgent$POST(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAgent$PUT(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationCheckGarage(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationGarage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGarageTab(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerTab(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGaragePage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGarageInfo(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerInfo(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerPage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGarageMapStatistical(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGarageMapDetails(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiCompanyInfoManagerGarageLabelSave(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGarageMapTab(data?: {}, option?: httpRequest): any;
    apiCompanyInfoManagerGarageMapList(data?: {}, option?: httpRequest): any;
    apiCompanyInfoTechnicianRelationCount(data?: {}, option?: httpRequest): any;
    apiCompanyInfoTechnicianRelationPage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoTechnicianGaragePage(data?: {}, option?: httpRequest): any;
    apiCompanyCancellationPage(data?: {}, option?: httpRequest): any;
    apiCompanyCancellation$Delete(data?: {}, option?: httpRequest): any;
    apiCompanyCancellationType(data?: {}, option?: httpRequest): any;
    apiCompanyCancellation$Post(data?: {}, option?: httpRequest): any;
    apiCompanyCancellationWait(data?: {}, option?: httpRequest): any;
    apiCompanyCancellationStaff(data?: {}, option?: httpRequest): any;
    apiCompanyInfoSkillInfo(data?: {}, option?: httpRequest): any;
    apiCompanyInvitationAgentByGarage(data?: {}, option?: httpRequest): any;
    apiCompanyInfoInviterInfo(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAuthSkill(data?: {}, option?: httpRequest): any;
    apiOrderRecycleCancel(data?: {}, option?: httpRequest): any;
    apiOrderRecycleNotWaitCheck(data?: {}, option?: httpRequest): any;
    apiOrderRecycleWaitingAssign(data?: {}, option?: httpRequest): any;
    apiGoodsModelRecycleList(data?: {}, option?: httpRequest): any;
    apiGoodsModeQueryByCylinderNo(data?: {}, option?: httpRequest): any;
    apiGoodsModelList(data?: {}, option?: httpRequest): any;
    apiGoodsDistributionSave(data?: {}, option?: httpRequest): any;
    apiGoodsDistributionUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsAgentGoods(data?: {}, option?: httpRequest): any;
    apiGoodsModelSaleList(data?: {}, option?: httpRequest): any;
    apiGoodsRecylePreSaleSave(data?: {}, option?: httpRequest): any;
    apiGoodsApplyUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsApplySave(data?: {}, option?: httpRequest): any;
    apiGoodsApplyCheck(data?: {}, option?: httpRequest): any;
    apiGoodsApplyView(data?: {}, option?: httpRequest): any;
    apiGoodsApplyQuery(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleModelSave(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleModelUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleModelQuery(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleModelUpdateStatus(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleModelUpdatePrice(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleModelView(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResalePublish(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleUpdatePrice(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleUpdateStatus(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleCheckIsExist(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleQueryByModelId(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleMyGoodsList(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleForSaleList(data?: {}, option?: httpRequest): any;
    apiGoodsRecylePreSaleQueryBuyerInfo(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleBuyerInfo(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleBuyerSaleList(data?: {}, option?: httpRequest): any;
    apiGoodsRecyleResaleBuyerPreSaleList(data?: {}, option?: httpRequest): any;
    apiGoodsModelApplyUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsModelApplySave(data?: {}, option?: httpRequest): any;
    apiGoodsModelApplyQuery(data?: {}, option?: httpRequest): any;
    apiGoodsModelApplyCheck(data?: {}, option?: httpRequest): any;
    apiGoodsModelApplyView(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelUpdatePrice(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelSave(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelQuery(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelQueryByModelId(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelPrice(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelUpdateStatus(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelCheckPrice(data?: {}, option?: httpRequest): any;
    apiGoodsProjectInvestmentBuyerPreview(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelView(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResalePublish(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleUpdatePrice(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleUpdateStatus(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleMyGoodsList(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleBuyerPreSaleList(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleSave(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleUpdate(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleQueryMyList(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleQueryInfo(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleQueryReason(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleUpdateStatus(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleForSaleList(data?: {}, option?: httpRequest): any;
    apiGoodsqueryVehicleModelList(data?: {}, option?: httpRequest): any;
    apiGoodsqueryModelList(data?: {}, option?: httpRequest): any;
    apiGoodsqueryBrandList(data?: {}, option?: httpRequest): any;
    apiGoodsqueryGoodsTypeList(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResaleQueryInfo(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleModelView$Id(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiGoodsRecycleResaleBuyerInfo(data?: {}, option?: httpRequest): any;
    apiGoodsRecyclePreSaleQueryBuyerInfo(data?: {}, option?: httpRequest): any;
    apiGoodsRecycleResalePreviewInfo(data?: {}, option?: httpRequest): any;
    apiGoodsModelCompensateUnitList(data?: {}, option?: httpRequest): any;
    apiGoodsModelCompensateDetailCondition(data?: {}, option?: httpRequest): any;
    apiWarehouseOperRecyclingSelfRefillBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseDelivery(data?: {}, option?: httpRequest): any;
    apiWarehouseAddDelivery(data?: {}, option?: httpRequest): any;
    apiWarehouseOperRecyclingSelfOutBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseOperRecyclingSelfModifyBatch(data?: {}, option?: httpRequest): any;
    apiWarehouseOperSupplierQuerySalesReturn(data?: {}, option?: httpRequest): any;
    apiWarehouseRecycling(data?: {}, option?: httpRequest): any;
    apiTencentSignSign(data?: {}, option?: httpRequest): any;
    apiImportGarageMapTab(data?: {}, option?: httpRequest): any;
    apiVersionCurrent(data?: {}, option?: httpRequest): any;
    apiImportGarageMap(data?: {}, option?: httpRequest): any;
    apiImportGarageDetail(data?: {}, option?: httpRequest): any;
    apiImportGarageMapByAreaCode(data?: {}, option?: httpRequest): any;
    apiTencentSignH5Sign(data?: {}, option?: httpRequest): any;
    apiGrantRecordList(data?: {}, option?: httpRequest): any;
    apiAccountWorkbench$POST(data?: {}, option?: httpRequest): any;
    apiAccountWorkbench$GET(data?: {}, option?: httpRequest): any;
    apiFinanceBillManagePage(data?: {}, option?: httpRequest): any;
    apiFinanceBillManageDetail(data?: {}, option?: httpRequest): any;
    apiFinanceMarginTotal(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsSalesPage(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsOrderPayment(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsSalesRanking(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsInvest(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsInvestTotal(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsOrderPaymentDetail(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsCompanyInvitation(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsWholesaleDistrict(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsWarehouseDistrict(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsSupplierBoard(data?: {}, option?: httpRequest): any;
    apiOrderInvestQueryFinallyPrice(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsRevenueColumn(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsCustomerOrderStatistic(data?: {}, option?: httpRequest): any;
    apiOrderStatisticsCustomerOrderRanking(data?: {}, option?: httpRequest): any;
    apiHomeSupplier(data?: {}, option?: httpRequest): any;
    /**
     * ocr识别-返单据
     * @param data
     * @param option
     */
    apiBusinessVehicleBrandOcrGoods(data?: {}, option?: httpRequest): any;
    /**
     * VIN查询车型商品信息
     * @param data
     * @param option
     */
    apiBusinessVehicleScanGetgoodsbyvin(data?: {}, option?: httpRequest): any;
    apiBusinessVehicleFilter(data?: {}, option?: httpRequest): any;
    apiBusinessVehicleQueryVehicleDetail(data?: {}, option?: httpRequest): any;
    /**
     * 查询绑定车型
     * @param data
     * @param option
     */
    apiBusinessVehicleQueryBindVehicle(data?: {}, option?: httpRequest): any;
    /**
     * 缸体号查询售后信息
     * @param data
     * @param option
     */
    apiBusinessVehicleScanGetgoodsbyno(data?: {}, option?: httpRequest): any;
    /**
     * 手动数据发动集码入库
     * @param data
     * @param option
     */
    apiBusinessVehicleHandloseWarehousing(data?: {}, option?: httpRequest): any;
    apiBusinessVehicleVehicleByVin(data?: {}, option?: httpRequest): any;
    /**
     * 分享、邀请  新增数据，获取标识
     * @param data
     * @param option
     */
    apiShareLinkAdd(data?: {}, option?: httpRequest): any;
    /**
     * 分享、邀请  根据标识，获取数据
     * @param data
     * @param option
     */
    apiShareLinkDetail(data?: {}, option?: httpRequest): any;
    apiAccountDetailsBalance(data?: {}, option?: httpRequest): any;
    apiOrderDistributionPage(data?: {}, option?: httpRequest): any;
    apiOrderDistributionDetail(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiOrderDistributionDeliver(data?: {
        id: string;
    }, option?: httpRequest): any;
    apiExtraWithdrawCheckApply(data?: {}, option?: httpRequest): any;
}
