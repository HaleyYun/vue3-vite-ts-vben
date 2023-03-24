import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Company extends VoHttp {
  constructor(props) {
    super(props)
  }

  //  汽修厂-变更绑定关系
  public companyInfoChangeRelation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoChangeRelation,
    })
  }

  // 汽修厂-解除绑定关系
  public companyInfoRemoveRelation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoRemoveRelation,
    })
  }

  // 后台-下拉框获取企业店铺信息列表
  public companyInfoManageList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoManageList,
    })
  }

  // 用户详情
  public CompanyLegalSupplierMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.detail,
    })
  }

  //根据（平台角色code、店铺名称）模糊查询企业信息
  public CompanyInfoPlatformStoreName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyInfoPlatformStoreName,
    })
  }

  //根据（平台角色code、店铺名称）获取企业下拉列表
  public CompanyInfoSelectPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyInfoSelectPage,
    })
  }

  // 渠道/招商经理-管辖企业分页查询列表
  public CompanyInfoManagerRelationPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyInfoManagerRelationPage,
    })
  }

  // 渠道/招商经理-解除管辖企业绑定关系
  public CompanyInfoManagerUnbind(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyInfoManagerUnbind,
    })
  }

  // 验证该手机号是否已存在渠道经理
  public CompanyLegalChannelMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyLegalChannelMobile,
    })
  }

  // 新增渠道经理
  public CompanyLegalChannelAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyLegalChannelAdd,
    })
  }

  // 新增招商经理
  public CompanyLegalAttractAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyLegalAttractAdd,
    })
  }

  // 验证该手机号是否已存在招商经理
  public CompanyLegalAttractMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyLegalAttractMobile,
    })
  }

  // 渠道/招商经理-分页查询列表
  public CompanyInfoManagerPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.CompanyInfoManagerPage,
    })
  }

  /**
   * 企业合同信息管理-获取合同详情信息-GET
   * @param data
   * @param option
   */
  public companyContractGetBy$id(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyContractGetBy$id + data.companyId,
    })
  }

  /**
   * 企业合同信息管理-获取企业合同信息-GET
   * @param data
   * @param option
   */
  public companyContractListBy$CompanyId(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AdminApi[`${localOptions.version}`].company.companyContractListBy$CompanyId +
        data.companyId,
    })
  }

  /**
   * 企业合同信息管理-修改合同信息-POST
   * @param data
   * @param option
   * @constructor
   */
  public companyContractUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyContractUpdate,
    })
  }

  /**
   * 企业合同信息管理-新增合同信息-POST
   * @param data
   * @param option
   */
  public companyContractAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyContractAdd,
    })
  }

  /**
   * 验证该手机号是否已存在旧机买家-GET
   * @param data
   * @param option
   */
  public companyLegalOldMachineMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalOldMachineMobile,
    })
  }

  /**
   * 获取旧机买家详细 （修改接口专用
   * @param data
   * @param option
   */

  public companyLegalAuthInfo(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalAuthInfo,
    })
  }

  /**
   * 更新旧机买家信息
   * @param data
   * @param option
   */

  public companyLegalOldMachineUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalOldMachineUpdate,
    })
  }

  /**
   * 身份证重新认证 旧机买家
   * @param data
   * @param option
   */

  public companyLegalAnewIdentity(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalAnewIdentity,
    })
  }

  /**
   * 营业执照重新认证 旧机买家
   * @param data
   * @param option
   */

  public companyLegalWnewLicense(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalWnewLicense,
    })
  }

  /**
   * 营业执照身份证重新认证 旧机买家
   * @param data
   * @param option
   */

  public companyLegalAnewAll(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalAnewAll,
    })
  }

  /**
   * 验证该手机号是否已存在技术工-GET
   * @param data
   * @param option
   */
  public companyLegalSkilledWorkerMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalSkilledWorkerMobile,
    })
  }

  /**
   * 新增技术工-POST
   * @param data
   * @param option
   */
  public companyLegalSkilledWorkerAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalSkilledWorkerAdd,
    })
  }

  /**
   * 新增旧机买家-POST
   * @param data
   * @param option
   */
  public companyLegalOldMachineAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyLegalOldMachineAdd,
    })
  }

  /**
   * 术工邀请技术工分页列表-POST
   * @param data
   * @param option
   */
  public companyInfoSkilledWorkerAssociatedPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerAssociatedPage,
    })
  }

  /**
   * 技术工详情-GET
   * @param data
   * @param option
   */
  public companyInfoSkilledWorkerDetailsBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerDetailsBy$id + data.id,
    })
  }

  /**
   * 技术工邀请汽修厂分页列表-POST
   * @param data
   * @param option
   */
  public companyInfoSkilledWorkerAssociatedGaragePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerAssociatedGaragePage,
    })
  }

  /**
   * 旧机买家详情-GET
   * @param data
   * @param option
   */
  public companyInfoOldMachineGetBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoOldMachineGetBy$id + data.id,
    })
  }

  /**
   * 技术工分页列表-POST
   * @param data
   * @param option
   */
  public companyInfoSkilledWorkerPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerPage,
    })
  }
    /**
   * 技术工扩客
   * @param data
   * @param option
   */
    public companyInfoShowStatus(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].company.companyInfoShowStatus,
      })
    }

  /**
   * 技术工tab页签 - GET
   * @param data
   * @param option
   */
  public companyInfoSkilledWorkerTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerTab,
    })
  }

  /**
   * 旧机买家tab页签-GET
   * @param data
   * @param option
   */
  public companyInfoOldMachineTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoOldMachineTab,
    })
  }

  /**
   * 旧机买家审核链路-GET
   * @param data
   * @param option
   */
  public companyInfoOldMachineAuditLinkBy$id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoOldMachineAuditLinkBy$id,
    })
  }

  /**
   * 旧机买家分页列表-POST
   * @param data
   * @param option
   */
  public companyInfoOldMachinePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoOldMachinePage,
    })
  }

  /**
   * 获取企业店铺信息-GET
   * @param data
   * @param option
   */
  public companyInfoStoreInfoBy$CompanyId(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AdminApi[`${localOptions.version}`].company.companyInfoStoreInfoBy$CompanyId +
        data.companyId,
    })
  }

  /**
   * 客户财务信息-GET
   * @param data
   * @param option
   */
  public companyInfoFinancialBy$CompanyId(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AdminApi[`${localOptions.version}`].company.companyInfoFinancialBy$CompanyId +
        data.companyId,
    })
  }

  /**
   * 企业法人银行卡信息列表-GET
   * @param data
   * @param option
   */
  public companyInfoBankCardListBy$CompanyId(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url:
        AdminApi[`${localOptions.version}`].company.companyInfoBankCardListBy$CompanyId +
        data.companyId,
    })
  }

  // companyInfoManageUpdate

  /**
   * 修改店铺详情  后台修改-patch
   * @param data
   * @param option
   */
  public companyInfoManageUpdate(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPatch({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoManageUpdate,
    })
  }

  /**
   * 获取地址信息 列表
   * receiverAddressList
   */
  public receiverAddressList(data = { companyId: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.receiverAddressList,
    })
  }

  /**
   * 绑定企业-POST
   * @param data
   * @param option
   * companyInfoBind
   */
  public companyInfoBind(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoBind,
    })
  }

  /**
   * 获取未被绑定的客户信息-POST
   * @param data
   * @param option
   * companyInfoGarageNotBindPage
   */
  public companyInfoGarageNotBindPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoGarageNotBindPage,
    })
  }

  /*
   *技术工解除绑定管辖关系-PUT
   *@param data
   * @param option
   */
  public companyInfoSkilledWorkerUnbind(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerUnbind,
    })
  }

  /*
	 *获取服务商关联的汽修厂信息分页列表
	 companyInfoAgentAssociatedGaragePage
	 */

  public companyInfoAgentAssociatedGaragePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoAgentAssociatedGaragePage,
    })
  }

  //修改角色渠道经理和招商经理
  public companyInfoChangeManager(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoChangeManager,
    })
  }

  /**
   * 关联汽修厂排名-获取汽修厂列表-GET
   * @param data
   * @param option
   */
  public companyInfoGarageList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoGarageList,
    })
  }

  /**
   *  关联汽修厂排名-关联汽修厂排名-POST
   * @param data
   * @param option
   */
  public companyInfoGarageCountPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoGarageCountPage,
    })
  }

  /**
   * 平台客户数（身份分组）- POST
   * @param data
   * @param option
   */
  public companyInfoCustomerCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoCustomerCount,
    })
  }

  /**
   * 平台客户总数-POST
   * @param data
   * @param option
   */
  public companyInfoCustomerTotal(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoCustomerTotal,
    })
  }

  /**
   * @title 分页查询服务商账户信息 - POST
   * @api http://10.0.2.42:11122/project/132/interface/api/27509
   * @param data
   * @param option
   * @method POST
   */
  public companyStatisticsAgentAccountInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyStatisticsAgentAccountInfo,
    })
  }

  /**
   * @title 查询账户实时余额 - GET
   * @api http://10.0.2.42:11122/project/132/interface/api/28544
   * @param data
   * @param option
   * @method POST
   */
  public companyStatisticsAgentAccountAmount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyStatisticsAgentAccountAmount,
    })
  }

  /**
   * 分页查询服务商账户明细接口
   *  @api http://10.0.2.42:11122/project/132/interface/api/27527
   * @param data
   * @param option
   * @method POST
   */
  public companyStatisticsAgentAccountDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyStatisticsAgentAccountDetail,
    })
  }

  /**
   * 技术工接单资格开通
   * @api http://10.0.2.42:11122/project/106/interface/api/28013
   * @param data
   * @param option
   * @method POST
   */

  public companyInfoSkilledWorkerOpenqualify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoSkilledWorkerOpenqualify,
    })
  }

  /**
   * 获取修理厂服务项目字典值
   * @api http://10.0.2.42:11122/project/106/interface/api/28148
   * @param data
   * @param option
   * @method get
   */
  public companyInfoServiceProject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoServiceProject,
    })
  }

  /**
   * 账户台账/vocen-jarvis/v1/company/statistics/account/withdraw/apply
   * @api http://10.0.2.42:11122/project/106/interface/api/28148
   * @param data
   * @param option
   * @method get
   */
  public companyStatisticsAccountWithdrawApply(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyStatisticsAccountWithdrawApply,
    })
  }

    /**
   * 更新修理厂基本信息/vocen-jarvis/v1/company/info/garage/base/update
   * @api http://10.0.2.42:11122/project/106/interface/api/29489
   * @param data
   * @param option
   * @method POST
   */
    public companyInfoGarageBaseUpdate(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].company.companyInfoGarageBaseUpdate,
      })
    }

  /**
   * 获取修理厂车系字典值
   * @api http://10.0.2.42:11122/project/106/interface/api/28157
   * @param data
   * @param option
   * @method get
   */
  public companyInfoCarSeries(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoCarSeries,
    })
  }
}
