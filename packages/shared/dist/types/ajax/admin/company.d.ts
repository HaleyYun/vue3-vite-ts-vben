import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Company extends VoHttp {
    constructor(props: any);
    companyInfoChangeRelation(data?: {}, option?: httpRequest): any;
    companyInfoRemoveRelation(data?: {}, option?: httpRequest): any;
    companyInfoManageList(data?: {}, option?: httpRequest): any;
    CompanyLegalSupplierMobile(data?: {}, option?: httpRequest): any;
    CompanyInfoPlatformStoreName(data?: {}, option?: httpRequest): any;
    CompanyInfoSelectPage(data?: {}, option?: httpRequest): any;
    CompanyInfoManagerRelationPage(data?: {}, option?: httpRequest): any;
    CompanyInfoManagerUnbind(data?: {}, option?: httpRequest): any;
    CompanyLegalChannelMobile(data?: {}, option?: httpRequest): any;
    CompanyLegalChannelAdd(data?: {}, option?: httpRequest): any;
    CompanyLegalAttractAdd(data?: {}, option?: httpRequest): any;
    CompanyLegalAttractMobile(data?: {}, option?: httpRequest): any;
    CompanyInfoManagerPage(data?: {}, option?: httpRequest): any;
    /**
     * 企业合同信息管理-获取合同详情信息-GET
     * @param data
     * @param option
     */
    companyContractGetBy$id(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 企业合同信息管理-获取企业合同信息-GET
     * @param data
     * @param option
     */
    companyContractListBy$CompanyId(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 企业合同信息管理-修改合同信息-POST
     * @param data
     * @param option
     * @constructor
     */
    companyContractUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 企业合同信息管理-新增合同信息-POST
     * @param data
     * @param option
     */
    companyContractAdd(data?: {}, option?: httpRequest): any;
    /**
     * 验证该手机号是否已存在旧机买家-GET
     * @param data
     * @param option
     */
    companyLegalOldMachineMobile(data?: {}, option?: httpRequest): any;
    /**
     * 获取旧机买家详细 （修改接口专用
     * @param data
     * @param option
     */
    companyLegalAuthInfo(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 更新旧机买家信息
     * @param data
     * @param option
     */
    companyLegalOldMachineUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 身份证重新认证 旧机买家
     * @param data
     * @param option
     */
    companyLegalAnewIdentity(data?: {}, option?: httpRequest): any;
    /**
     * 营业执照重新认证 旧机买家
     * @param data
     * @param option
     */
    companyLegalWnewLicense(data?: {}, option?: httpRequest): any;
    /**
     * 营业执照身份证重新认证 旧机买家
     * @param data
     * @param option
     */
    companyLegalAnewAll(data?: {}, option?: httpRequest): any;
    /**
     * 验证该手机号是否已存在技术工-GET
     * @param data
     * @param option
     */
    companyLegalSkilledWorkerMobile(data?: {}, option?: httpRequest): any;
    /**
     * 新增技术工-POST
     * @param data
     * @param option
     */
    companyLegalSkilledWorkerAdd(data?: {}, option?: httpRequest): any;
    /**
     * 新增旧机买家-POST
     * @param data
     * @param option
     */
    companyLegalOldMachineAdd(data?: {}, option?: httpRequest): any;
    /**
     * 术工邀请技术工分页列表-POST
     * @param data
     * @param option
     */
    companyInfoSkilledWorkerAssociatedPage(data?: {}, option?: httpRequest): any;
    /**
     * 技术工详情-GET
     * @param data
     * @param option
     */
    companyInfoSkilledWorkerDetailsBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 技术工邀请汽修厂分页列表-POST
     * @param data
     * @param option
     */
    companyInfoSkilledWorkerAssociatedGaragePage(data?: {}, option?: httpRequest): any;
    /**
     * 旧机买家详情-GET
     * @param data
     * @param option
     */
    companyInfoOldMachineGetBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 技术工分页列表-POST
     * @param data
     * @param option
     */
    companyInfoSkilledWorkerPage(data?: {}, option?: httpRequest): any;
    /**
   * 技术工扩客
   * @param data
   * @param option
   */
    companyInfoShowStatus(data?: {}, option?: httpRequest): any;
    /**
     * 技术工tab页签 - GET
     * @param data
     * @param option
     */
    companyInfoSkilledWorkerTab(data?: {}, option?: httpRequest): any;
    /**
     * 旧机买家tab页签-GET
     * @param data
     * @param option
     */
    companyInfoOldMachineTab(data?: {}, option?: httpRequest): any;
    /**
     * 旧机买家审核链路-GET
     * @param data
     * @param option
     */
    companyInfoOldMachineAuditLinkBy$id(data?: {}, option?: httpRequest): any;
    /**
     * 旧机买家分页列表-POST
     * @param data
     * @param option
     */
    companyInfoOldMachinePage(data?: {}, option?: httpRequest): any;
    /**
     * 获取企业店铺信息-GET
     * @param data
     * @param option
     */
    companyInfoStoreInfoBy$CompanyId(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 客户财务信息-GET
     * @param data
     * @param option
     */
    companyInfoFinancialBy$CompanyId(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 企业法人银行卡信息列表-GET
     * @param data
     * @param option
     */
    companyInfoBankCardListBy$CompanyId(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 修改店铺详情  后台修改-patch
     * @param data
     * @param option
     */
    companyInfoManageUpdate(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 获取地址信息 列表
     * receiverAddressList
     */
    receiverAddressList(data?: {
        companyId: string;
    }, option?: httpRequest): any;
    /**
     * 绑定企业-POST
     * @param data
     * @param option
     * companyInfoBind
     */
    companyInfoBind(data?: {}, option?: httpRequest): any;
    /**
     * 获取未被绑定的客户信息-POST
     * @param data
     * @param option
     * companyInfoGarageNotBindPage
     */
    companyInfoGarageNotBindPage(data?: {}, option?: httpRequest): any;
    companyInfoSkilledWorkerUnbind(data?: {}, option?: httpRequest): any;
    companyInfoAgentAssociatedGaragePage(data?: {}, option?: httpRequest): any;
    companyInfoChangeManager(data?: {}, option?: httpRequest): any;
    /**
     * 关联汽修厂排名-获取汽修厂列表-GET
     * @param data
     * @param option
     */
    companyInfoGarageList(data?: {}, option?: httpRequest): any;
    /**
     *  关联汽修厂排名-关联汽修厂排名-POST
     * @param data
     * @param option
     */
    companyInfoGarageCountPage(data?: {}, option?: httpRequest): any;
    /**
     * 平台客户数（身份分组）- POST
     * @param data
     * @param option
     */
    companyInfoCustomerCount(data?: {}, option?: httpRequest): any;
    /**
     * 平台客户总数-POST
     * @param data
     * @param option
     */
    companyInfoCustomerTotal(data?: {}, option?: httpRequest): any;
    /**
     * @title 分页查询服务商账户信息 - POST
     * @api http://10.0.2.42:11122/project/132/interface/api/27509
     * @param data
     * @param option
     * @method POST
     */
    companyStatisticsAgentAccountInfo(data?: {}, option?: httpRequest): any;
    /**
     * @title 查询账户实时余额 - GET
     * @api http://10.0.2.42:11122/project/132/interface/api/28544
     * @param data
     * @param option
     * @method POST
     */
    companyStatisticsAgentAccountAmount(data?: {}, option?: httpRequest): any;
    /**
     * 分页查询服务商账户明细接口
     *  @api http://10.0.2.42:11122/project/132/interface/api/27527
     * @param data
     * @param option
     * @method POST
     */
    companyStatisticsAgentAccountDetail(data?: {}, option?: httpRequest): any;
    /**
     * 技术工接单资格开通
     * @api http://10.0.2.42:11122/project/106/interface/api/28013
     * @param data
     * @param option
     * @method POST
     */
    companyInfoSkilledWorkerOpenqualify(data?: {}, option?: httpRequest): any;
    /**
     * 获取修理厂服务项目字典值
     * @api http://10.0.2.42:11122/project/106/interface/api/28148
     * @param data
     * @param option
     * @method get
     */
    companyInfoServiceProject(data?: {}, option?: httpRequest): any;
    /**
     * 账户台账/vocen-jarvis/v1/company/statistics/account/withdraw/apply
     * @api http://10.0.2.42:11122/project/106/interface/api/28148
     * @param data
     * @param option
     * @method get
     */
    companyStatisticsAccountWithdrawApply(data?: {}, option?: httpRequest): any;
    /**
   * 更新修理厂基本信息/vocen-jarvis/v1/company/info/garage/base/update
   * @api http://10.0.2.42:11122/project/106/interface/api/29489
   * @param data
   * @param option
   * @method POST
   */
    companyInfoGarageBaseUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 获取修理厂车系字典值
     * @api http://10.0.2.42:11122/project/106/interface/api/28157
     * @param data
     * @param option
     * @method get
     */
    companyInfoCarSeries(data?: {}, option?: httpRequest): any;
}
