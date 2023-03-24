import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class CustomerHttp extends VoHttp {
    constructor(props: any);
    apiCompanyLegalSupplierMobile(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAgentMobile(data?: {}, option?: httpRequest): any;
    apiFileOcr(data?: {}, option?: httpRequest): any;
    apiInvoiceFileOcr(data?: {}, option?: httpRequest): any;
    apiCompanyLegalSupplier(data?: {}, option?: httpRequest): any;
    apiCompanyLegalAgent(data?: {}, option?: httpRequest): any;
    apiExtraBankFuzzy(data?: {}, option?: httpRequest): any;
    apiExtraBankInfoFuzzy(data?: {}, option?: httpRequest): any;
    companyInfoPage(data?: {}, option?: httpRequest): any;
    companyInfoAgentTab(data?: {}, option?: httpRequest): any;
    companyInfoAudit$Post(data?: {}, option?: httpRequest): any;
    companyInfoSupplierTab(data?: {}, option?: httpRequest): any;
    companyInfoChangeBlack(data?: {}, option?: httpRequest): any;
    companyInfoAuditLink(data?: {}, option?: httpRequest): any;
    companyInfoManage(data?: {}, option?: httpRequest): any;
    companyInfoListStorehouse(data?: {}, option?: httpRequest): any;
    companyInfoStaffPage(data?: {}, option?: httpRequest): any;
    companyInfoChangeStoreStatus(data?: {}, option?: httpRequest): any;
    useInfoAccountItem(data?: {
        id: string;
    }, option?: httpRequest): any;
    companyInfoSelectPage(data?: {}, option?: httpRequest): any;
    companyInfoSelectAllPage(data?: {}, option?: httpRequest): any;
    companyInfoUnbindRole(data?: {}, option?: httpRequest): any;
    companyInfoAgentPage(data?: {}, option?: httpRequest): any;
    memberCompanyBindingInviteePage(data?: {}, option?: httpRequest): any;
    memberCompanyBindingOperation(data?: {}, option?: httpRequest): any;
    useInfoAddAccount(data?: {}, option?: httpRequest): any;
    companyInfoChangeUserStatus(data?: {}, option?: httpRequest): any;
    apiSixHotAreaSub(data?: {}, option?: httpRequest): any;
    apiRoleNum(data?: {}, option?: httpRequest): any;
    companyInfoGaragePage(data?: {}, option?: httpRequest): any;
    companyInfoGarageGet(data?: {
        id: string;
    }, option?: httpRequest): any;
    companyInfoAssetPage(data?: {}, option?: httpRequest): any;
    companyInfoGarageTab(data?: {}, option?: httpRequest): any;
    companyInfoLogoffPage(data?: {}, option?: httpRequest): any;
    companyInfoGarageAssetPage(data?: {}, option?: httpRequest): any;
    companyInfoAssetPages(data?: {}, option?: httpRequest): any;
    companyLegalGarageMoblie(data?: {}, option?: httpRequest): any;
    goodsTypeList(data?: {}, option?: httpRequest): any;
    goodsTypeStatusUpdates(data?: {}, option?: httpRequest): any;
    goodsTypeSave(data?: {}, option?: httpRequest): any;
    goodsTypeDeleteName(data?: {}, option?: httpRequest): any;
    apiCompanyLegalGarage(data?: {}, option?: httpRequest): any;
    goodsBrandApplyList(data?: {}, option?: httpRequest): any;
    goodsBrandApplyPage(data?: {}, option?: httpRequest): any;
    goodsBrandApplyAudit(data?: {}, option?: httpRequest): any;
    customerRoleCompany(data?: {}, option?: httpRequest): any;
    GoodsCertificationBrandInfo(data?: {
        id: string;
    }, option?: httpRequest): any;
}
