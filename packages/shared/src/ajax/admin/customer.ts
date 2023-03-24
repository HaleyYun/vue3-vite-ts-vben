import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

// 客户 供应商 代理商

export default class CustomerHttp extends VoHttp {
  constructor(props) {
    super(props)
  }

  //验证该手机号是否已存在供应商
  public apiCompanyLegalSupplierMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.CompanyLegalSupplierMobile,
    })
  }

  //验证该手机号是否已存在服务商
  public apiCompanyLegalAgentMobile(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.CompanyLegalAgentMobile,
    })
  }

  // 图片上传包含ocr识别
  public apiFileOcr(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiRequest(
      {
        url: AdminApi[`${localOptions.version}`].api.FileOcr,
        method: 'POST',
        params: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      {
        urlPrefix: '/vocen-wolverine', // 兼容李义广特殊接口使用
      }
    )
  }

  // 图片上传包含ocr识别
  public apiInvoiceFileOcr(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiRequest(
      {
        url: AdminApi[`${localOptions.version}`].api.FileInvoiceOcr,
        method: 'POST',
        params: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      {
        urlPrefix: '/vocen-wolverine', // 兼容李义广特殊接口使用
      }
    )
  }

  //新增供应商
  public apiCompanyLegalSupplier(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.CompanyLegalSupplier,
    })
  }

  //新增服务商
  public apiCompanyLegalAgent(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.CompanyLegalAgent,
    })
  }

  //根据银行名称模糊查询支行信息
  public apiExtraBankFuzzy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.ExtraBankFuzzy,
    })
  }

  //根据银行名称查询开户行信息
  public apiExtraBankInfoFuzzy(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.ExtraBankInfoFuzzy,
    })
  }

  // 分页查询企业信息列表
  public companyInfoPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.page,
    })
  }

  // 获取代理商
  public companyInfoAgentTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.agent.tab,
    })
  }

  // 审核tabvocen-jarvis/v1/company/info/audit
  public companyInfoAudit$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.audit.$Post,
    })
  }

  // 获取供应商tab
  public companyInfoSupplierTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.supplier.tab,
    })
  }

  // 供应商 -加入黑名单
  public companyInfoChangeBlack(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.change.black,
    })
  }

  // 供应商 -获取审核链路
  public companyInfoAuditLink(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.audit.link,
    })
  }

  // 供应商 -获取审核链路
  public companyInfoManage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.manage,
    })
  }

  // 供应商仓库列表/v1/company/info/list/storehouse
  public companyInfoListStorehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.list.storehouse,
    })
  }

  // 企业信息管理 -  供应商 || 服务商 - 员工信息分页查询
  public companyInfoStaffPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.staff.page,
    })
  }

  // 供应商 || 服务商 - 改变店铺状态
  public companyInfoChangeStoreStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.change.store.status,
    })
  }

  // change: {
  //   black: `${$merchant}info/change/black`,
  //   user: `${$merchant}info/change/user/status`,
  //   store: {
  //     status: `${$merchant}info/change/store/status`,
  //   }

  // 供应商 || 服务商 - 删除员工账号
  public useInfoAccountItem(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].users.info.account + data.id,
    })
  }

  //角色筛选-仅负责人
  public companyInfoSelectPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.selectPage,
    })
  }

  //  //角色筛选-包含员工
  public companyInfoSelectAllPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].user.info.SelectAllPage,
    })
  }

  // 供应商 || 服务商 -- 解除角色
  public companyInfoUnbindRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.unbind.role,
    })
  }
  // 自营服务商
  public companyInfoAgentPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.companyInfoAgentPage,
    })
  }

  // 添加服务商
  public memberCompanyBindingInviteePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.memberCompanyBindingInviteePage,
    })
  }
  // 绑定服务商
  public memberCompanyBindingOperation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.memberCompanyBindingOperation,
    })
  }

  // 供应商 || 服务商 - 新增员工账号
  public useInfoAddAccount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].users.info.create,
    })
  }

  // 企业信息管理___员工启用状态变更
  public companyInfoChangeUserStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.change.user.status,
    })
  }

  public apiSixHotAreaSub(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].area.sub,
    })
  }

  // 公共接口 __ 公司按角色统计账号数量
  public apiRoleNum(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].area.sub,
    })
  }

  // 企业信息管理__汽修厂分页查询
  public companyInfoGaragePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.garage.page,
    })
  }

  // 企业信息管理__获取汽修厂详情
  public companyInfoGarageGet(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.garage.get + '/' + data.id,
    })
  }

  // 企业信息管理__获取汽修厂tab /v1/company/info/asset/page
  public companyInfoAssetPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.asset.page,
    })
  }

  public companyInfoGarageTab(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.garage.tab,
    })
  }

  // 企业信息管理__汽修厂注销 company/info/asset/page
  public companyInfoLogoffPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.logoff.page,
    })
  }

  // 企业信息管理__资产分页查询（汽修厂） /v1/company/info/garage/asset/page
  public companyInfoGarageAssetPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.garage.asset.page,
    })
  }

  public companyInfoAssetPages(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchant.info.asset.page,
    })
  }

  // 企业法体信息管理__ 证该手机号是否已存在修理厂 v1/api/company/legal/garage/moblie
  public companyLegalGarageMoblie(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.company.legal.garage.moblie,
    })
  }

  // 产品列表 -- list
  public goodsTypeList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.list,
    })
  }

  // 产品列表 -- 禁用启用
  public goodsTypeStatusUpdates(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.statusUpdate,
    })
  }

  // 产品列表 -- 添加产品类型
  public goodsTypeSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.save,
    })
  }

  // 产品列表 -- 删除
  public goodsTypeDeleteName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.save,
    })
  }

  public apiCompanyLegalGarage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.company.legal.garageCreate,
    })
  }

  public goodsBrandApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goodsBrand.apply.list,
    })
  }

  public goodsBrandApplyPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goodsBrand.apply.page,
    })
  }

  public goodsBrandApplyAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goodsBrand.apply.audit,
    })
  }

  public customerRoleCompany(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].customer.customerRoleCompany,
    })
  }

  public GoodsCertificationBrandInfo(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goodsCertificationBrandInfo + '/' + data.id,
    })
  }

  // end
}
