import { httpRequest, httpResponse } from '../../types'
import VoHttp from '../ajax'
import { AdminApi, AppApi } from '../api'
import CommunityHttp from './community'
import UserHttp from './user'
import CustomerHttp from './customer'
import ContentManagerHttp from './contentManager'
import OrderHttp from './order'
import Company from './company'

import StoreHttp from './store'
import Warehouse from './warehouse'
import VEHICLE from './vehicle'
import FILE from './file'
import COMMON from './common'
import GOODS from './goods'
import CONTENT from './content'
import QUOTA from './quota'
import ORDER from './order'
import SUPPORT from './support'
import FINANCE from './finance'
import ACTIVATION from './activation'
import ROLE from './role'
import MENU from './menu'
import INTEGRAL from './integral'
import HOME from './home'

// 管理后台api接口列表
export default class adminHttp extends VoHttp {
  // 社群模块
  public COMMUNITY: CommunityHttp
  public USER: UserHttp
  public CUSTOMER: CustomerHttp
  public CONTENTMENT: ContentManagerHttp
  public Order: OrderHttp
  public Store: StoreHttp
  public VEHICLE: VEHICLE
  public FILE: FILE
  public COMPANY: Company
  public WAREHOUSE: Warehouse
  public COMMON: COMMON
  public GOODS: GOODS
  public CONTENT: CONTENT
  public QUOTA: QUOTA
  public ORDER: ORDER
  public SUPPORT: SUPPORT
  public FINANCE: FINANCE
  public ACTIVATION: ACTIVATION
  public ROLE: ROLE
  public MENU: MENU
  public INTEGRAL: INTEGRAL
  public HOME: HOME
  $user = {
    test() {},
  }

  constructor(props) {
    super(props)
    this.COMMUNITY = new CommunityHttp(props)
    this.USER = new UserHttp(props)
    this.CUSTOMER = new CustomerHttp(props)
    this.CONTENTMENT = new ContentManagerHttp(props)
    this.Order = new OrderHttp(props)
    this.Store = new StoreHttp(props)
    this.VEHICLE = new VEHICLE(props)
    this.FILE = new FILE(props)
    this.COMPANY = new Company(props)
    this.WAREHOUSE = new Warehouse(props)
    this.COMMON = new COMMON(props)
    this.GOODS = new GOODS(props)
    this.CONTENT = new CONTENT(props)
    this.QUOTA = new QUOTA(props)
    this.ORDER = new ORDER(props)
    this.SUPPORT = new SUPPORT(props)
    this.FINANCE = new FINANCE(props)
    this.ACTIVATION = new ACTIVATION(props)
    this.ROLE = new ROLE(props)
    this.MENU = new MENU(props)
    this.INTEGRAL = new INTEGRAL(props)
    this.HOME = new HOME(props)
  }

  // 测试案例
  public adminTestList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].home.es.test,
    })
  }

  // 投资项目- 查看原因
  public goodsInvestmentQueryReason(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentQueryReason,
    })
  }

  // 商品 - 查看原因
  public goodsGoodsQueryReason(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsQueryReason,
    })
  }

  // 品牌删除
  public goodsBrandDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.delete,
    })
  }

  // 商品类目列表 v1/goods/category/apply/query/list
  public goodsCategoryApplyQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.apply.query.list,
    })
  }

  // 品牌列表
  public goodsBrandList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.list,
    })
  }

  // 品牌列表-分页
  public goodsBrandPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.page,
    })
  }

  // 商品品牌模块 - 品牌删除
  public goodsBrandBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.delete.batch,
    })
  }

  // 商品品牌模块 - 品牌列表,带分页
  public goodsBranchQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.query.page,
    })
  }

  // 商品评价列表,带分页/v1/order/evaluate/page
  public orderEvaluatePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.evaluate.page,
    })
  }

  // 商品评价列表，删除/v1/order/evaluate/delete
  public orderEvaluateDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.evaluate.delete,
    })
  }

  // 商品评价列表，批量删除/v1/order/evaluate/batch/update
  public orderEvaluateBatchUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.evaluate.batch.update,
    })
  }

  // 商品评价列表，批量隐藏/v1/order/evaluate/batch/modify
  public orderEvaluateBatchModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.evaluate.batch.modify,
    })
  }

  // 商品评价修改状态/v1/order/evaluate/modify
  public orderEvaluateModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.evaluate.modify,
    })
  }

  // 商品品牌模块 - 品牌列表 v1/goods/category/apply/query/list
  public goodsBranchQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.query.list,
    })
  }
   // 商品品号
   public goodsDistributionArticlNumber(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsDistributionArticlNumber,
    })
  }

  // 品牌添加
  public goodsBrandSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.save,
    })
  }

  // 更新品牌的启用状态/v1/goods/brand/hot/update
  public goodsBrandStatusUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.status.update,
    })
  }

  // 品牌的热门状态/v1/goods/brand/hot/update
  public goodsBrandHotUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.hot.update,
    })
  }

  // 更新品牌的启用状态goods/brand/apply/audit
  public goodsCategoryApplyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.apply.update,
    })
  }

  // 品牌审核的状态/goods/brand/apply/{id}
  public goodsBrandApplyAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.audit,
    })
  }

  // 品牌审核的状态/goods/brand/apply/{id}
  public goodsBrandApplyId(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.id + data.id,
    })
  }

  // 保存商品分润/v1/goods/goods/profit/set
  public goodsGoodsProfitSet(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.profit.set,
    })
  }

  // 商品投资限投/v1/goods/investment/number/set
  public goodsInvestmentNumberSet(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.investment.number.set,
    })
  }

  // 评价详情/v1/order/evaluate/evaluate/Detail
  public orderEvaluateEvaluateDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.evaluate.evaluate.Detail,
    })
  }

  // 品牌修改/v1/user/info/update/reason
  public goodsBrandUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.update,
    })
  }

  // 投资商品列表/v1/goods/investment/list/count
  public goodsInvestmentQueryListPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.investment.query.list.page,
    })
  }

  // 投资商品列表角标/v1/goods/investment/list/count
  public goodsInvestmentListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.investment.list.count,
    })
  }

  // 商品列表goods/investment/query/list/page
  public goodsGoodsQueryListPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.query.list.page,
    })
  }
  // 寄售商品列表
  public goodsGoodsDistributionPageList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsDistributionPageList,
    })
  }

  // 寄售商品管理-导出
  public goodsGoodsDistributionExport(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsDistributionExport,
    })
  }
  // 导入寄售商品
  public goodsGoodsExportConsignment(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsExportConsignment,
    })
  }


    // 寄售价修改
    public goodsGoodsDistributionUpdatePrice(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].goods.goodsGoodsDistributionUpdatePrice,
      })
    }

  // 商品 - 分润
  public goodsGoodsProfitList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.profit.list,
    })
  }

  // 商品上下架/v1/goods/goods/status/update
  public goodsGoodsStatusUpdata(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.status.update,
    })
  }

    // 寄售状态开关
    public goodsGoodsDistributionStatus(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiPost({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].goods.goodsGoodsDistributionStatus,
      })
    }

  //  投资审核通过/v1/goods / investment / update / status
  public goodsInvestmentUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.investment.update.status,
    })
  }

  // 审核通过/goods/goods/violation/audit
  public goodsGoodsAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.audit,
    })
  }
// 新审核通过/vocen-jarvis/v1/goods/goods/distribution/audit
public goodsGoodsDistributionAudit(data = {}, option?: httpRequest) {
  const localOptions = this.mergeRequest({
    data,
    ...option,
  })
  return this.$service.apiPost({
    ...localOptions,
    url: AdminApi[`${localOptions.version}`].goods.goods.distribution.audit,
  })
}
  // 审核不通过/goods/goods/violation/audit
  public goodsGoodsViolationAudit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.violationList.audit,
    })
  }

  //操作日志 /v1/goods/goods/query/operatelog/page
  public goodsGoodsQueryOperatelogPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsQueryOperatelogPage,
    })
  }

  // 违规下架 /v1/goods/goods/violation
  public goodsGoodsViolation(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.violation,
    })
  }

  // 保存厂商
  public goodsBrandManufacturerPost(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.post,
    })
  }

  // 修改厂商
  public goodsBrandManufacturerPut(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.put,
    })
  }

  // 批量删除厂商
  public goodsBrandManufacturerBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.batch,
    })
  }

  // ：厂商列表
  public goodsBrandManufacturerList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.list,
    })
  }

  // 厂商分页
  public goodsBrandManufacturerPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.page,
    })
  }

  // 更新厂商的启用状态
  public goodsBrandManufacturerStatusUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.status.update,
    })
  }

  // 根据id获取厂商
  public goodsBrandManufacturer$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.manufacturer.$id + `/${data?.id}`,
    })
  }

  // 评价关键词 列表
  public goodsKeywordList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.keyword.list,
    })
  }

  // 产品类型 --- 列表
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

  // 添加评价关键词
  public goodsKeywordSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.keyword.save,
    })
  }

  // 评价关键词 禁用启用 - 弃用
  public goodsKeywordStatusUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.keyword.status.update,
    })
  }

  // 评价关键词 删除关键词
  public goodsKeywordDeleteName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.keyword.delete.name,
    })
  }

  // 删除商品
  public goodsGoodsDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.delete,
    })
  }

  // 商品详情
  public goodsGoodsGoodsDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.goodsDetails,
    })
  }

  // 商品列表
  public goodsGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.list,
    })
  }

  // 添加商品
  public goodsGoodsSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.save,
    })
  }

  // 修改商品
  public goodsGoodsUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.update,
    })
  }

  // 修改商品类目
  public goodsCategoryUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.update,
    })
  }

  // 商品类目 更新排序
  public goodsCategorySortUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.sortUpdate,
    })
  }

  // 商品类目 查询获取二级类目
  public goodsCategorySecondCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.secondCategory,
    })
  }

  // 商品类目 添加商品类目
  public goodsCategorySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.save,
    })
  }

  // 商品类目 查询商品类目列表
  public goodsCategoryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.list,
    })
  }

  // 商品类目 更新禁用类型
  public goodsCategoryDisableTypeUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.disabletypeUpdate,
    })
  }
  // 运营类别更新禁用类型
  public goodsCategoryDisabletypeUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.disabletypeUpdate,
    })
  }

  // 运营类别中关联商品类别的时候 需要的查询
  public goodsCategoryCategorySelect(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.categorySelect,
    })
  }

  // 商品类目 批量删除
  public goodsCategoryBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.batchDelete,
    })
  }

  // 商品属性 sku属性类别列表
  public goodsSkuPropertyCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.category,
    })
  }

  // 商品属性 sku属性列表/v1/goods/param/property/query/list
  public goodsSkuPropertyQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.query.list,
    })
  }

  // 商品属性 sku属性类别列表/v1/goods/sku/property/query/category
  public goodsSkuPropertyQueryCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.query.category,
    })
  }

  // 商品属性 sku属性删除
  public goodsSkuPropertyDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.delete,
    })
  }

  // 商品属性 sku属性批量删除
  public goodsSkuPropertyDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.deleteBatch,
    })
  }

  // 商品属性  sku属性详情
  public goodsSkuPropertyDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.detail,
    })
  }

  // 商品属性 sku属性禁用
  public goodsSkuPropertyForbidden(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.forbidden,
    })
  }

  // 商品属性 sku属性导入
  public goodsSkuPropertyImport(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.import,
    })
  }

  // 商品属性 sku属性列表
  public goodsSkuPropertyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.list,
    })
  }

  // 商品属性 sku属性添加
  public goodsSkuPropertySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.save,
    })
  }

  // 商品参数属性 参数属性删除/v1/goods/sku/property/{id}
  public goodsSkuProperty$id(
    data = {
      id: '',
    },
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.$id + `/${data.id}`,
    })
  }

  // 商品属性 sku属性排序
  public goodsSkuPropertySort(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.sort,
    })
  }

  // 商品属性 sku属性修改
  public goodsSkuPropertyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.skuProperty.update,
    })
  }

  // 商品参数属性 参数属性类别列表
  public goodsParamPropertyCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.category,
    })
  }

  // 商品参数属性 参数属性批量删除
  public goodsParamPropertyDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.deleteBatch,
    })
  }

  // 商品参数属性 参数属性详情
  public goodsParamPropertyDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.detail,
    })
  }

  // 商品参数属性 参数属性禁用/goods/param/property/query/category
  public goodsParamPropertyForbidden(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.forbidden,
    })
  }

  // 商品参数属性 参数属性禁用/goods/param/property/query/category
  public goodsParamPropertyQueryCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.query.category,
    })
  }

  // 商品属性 sku属性列表/v1/goods/param/property/query/list
  public goodsParamPropertyQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.query.list,
    })
  }

  // 商品参数属性 参数属性导入
  public goodsParamPropertyImportant(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.import,
    })
  }

  // 商品参数属性   参数属性列表
  public goodsParamPropertyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.list,
    })
  }

  // 商品参数属性
  public goodsParamPropertyRequired(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.required,
    })
  }

  // 商品参数属性
  public goodsParamPropertySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.save,
    })
  }

  // 商品参数属性
  public goodsParamPropertySort(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.sort,
    })
  }

  // 商品参数属性
  public goodsParamPropertyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.update,
    })
  }

  // 商品参数属性 参数属性删除/v1/goods/sku/property/{id}
  public goodsParamProperty$id(
    data = {
      id: '',
    },
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.paramProperty.delBy$id + `${data.id}`,
    })
  }

  // 商户品牌申请模块   保存品牌申请,返回生成的申请主键

  public goodsBrandApplyPost(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.postApply,
    })
  }

  // 根据id获取品牌详情

  public goodsBrand$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.$id + data.id,
    })
  }

  //投资 /v1/order/invest/{id}

  public orderInvest$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.invest.$id + data.id,
    })
  }

  // 根据id获取品牌详情/v1/orderSell

  public orderSell$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.sell.$id + data.id,
    })
  }

  // 根据id获取品牌详情/v1/goods/goods/{id}

  public goodsGoods$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goods.$id + data.id,
    })
  }
    // 商品标签配置查询
    public goodsGoodsQueryLabels(data = {}, option?: httpRequest) {
      const localOptions = this.mergeRequest({
        data,
        ...option,
      })
      return this.$service.apiGet({
        ...localOptions,
        url: AdminApi[`${localOptions.version}`].goods.goodsGoodsQueryLabels,
      })
    }
      // 商品标签操作
      public goodsGoodsSaveLabel(data = {}, option?: httpRequest) {
        const localOptions = this.mergeRequest({
          data,
          ...option,
        })
        return this.$service.apiPost({
          ...localOptions,
          url: AdminApi[`${localOptions.version}`].goods.goodsGoodsSaveLabel,
        })
      }

  // 根据id获取投资详情v1/goods/investment/{id}
  public goodsInvestment$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.investment.$id + data.id,
    })
  }

  // 商户品牌申请模块   修改品牌申请

  public goodsBrandApplyPut(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.putApply,
    })
  }

  // 商户品牌申请模块   批量删除品牌申请,逻辑删除

  public goodsBrandApplyBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.deleteApply,
    })
  }

  // 商户品牌申请模块   保存品牌申请,返回生成的申请主键

  public goodsBrandApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.list,
    })
  }

  // 商户品牌申请模块   保存品牌申请,返回生成的申请主键

  public goodsBrandApplyPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.page,
    })
  }

  // 商户品牌申请模块   根据id获取品牌申请

  public goodsBrandApplyBy$id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.get$id,
    })
  }

  // 商户品牌申请模块   删除品牌申请

  public goodsBrandApplyDeleteBy$id(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.apply.delete$id,
    })
  }

  // 商品模板列表

  // 商品模板列表   商品模板删除
  public goodsTemplateDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.delete,
    })
  }

  // 商品模板列表   商品模板批量删除
  public goodsTemplateDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.deleteBatch,
    })
  }

  // 商品模板列表   商品模板详情
  public goodsTemplateDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.detail,
    })
  }

  // 商品模板列表   商品模板列表
  public goodsTemplateList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.list,
    })
  }

  // 商品模板列表   商品模板列表
  public goodsTemplateCategoryRecently(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.recently,
    })
  }

  // 商品模板列表   获取分润信息
  public goodsTemplateProfitGet(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.profitGet,
    })
  }

  // 新增商品模板   初始化“属性及价格区间” 和“类别属性”
  public goodsTemplateInfoInit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.info.init,
    })
  }

  // 商品模板列表   设置分润信息
  public goodsTemplateProfitPost(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.profitPost,
    })
  }

  //项目操作日志/v1/goods/investment/query/opearatelog/page
  public goodsInvestmentQueryOperatelogPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentQueryOperatelogPage,
    })
  }

  public goodsTemplateGetProfit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.getProfit,
    })
  }

  // 仓库发货时效 ///v1/warehouse/delivery/warehouse/{warehouseId}
  public warehouseDeliveryWarehouse$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.delivery.warehouse.$id,
    })
  }

  // 仓库到货时效/v1/warehouse/arrival/warehouse
  public warehouseArrivalWarehouse(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.arrival.warehouse,
    })
  }

  // 寄售可用库存修改
  public warehouseStockUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].warehouse.warehouseStockUpdate,
    })
  }

  // 商品模板列表   商品模板添加
  public goodsTemplateSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.save,
    })
  }

  // 商品模板列表   模板发布/取消发布
  public goodsTemplateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.status,
    })
  }

  // 商品模板列表   商品模板删除
  public goodsTemplateUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.update,
    })
  }

  // 商品模板列表   取消发布
  public goodsTemplateUnPublish(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsTemplateUnPublish,
    })
  }

  // 商品草稿箱模块   批量删除草稿/单个删除
  public goodsTemplateDraftBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.draft.batchDelete,
    })
  }

  // 商品草稿箱模块   查询草稿详情
  public goodsTemplateDraftDetails(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.draft.details,
    })
  }

  // 商品草稿箱模块   批量删除草稿/单个删除
  public goodsTemplateDraftList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.draft.list,
    })
  }

  // 商品草稿箱模块   批量删除草稿/单个删除
  public goodsTemplateDraftSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.draft.save,
    })
  }

  // 获取分润信息
  public goodsTemplateProfit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.profitGet,
    })
  }

  // 模板发布/v1/goods/template/publish
  public goodsTemplatePublish(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.publish,
    })
  }

  // 商品草稿箱模块   批量删除草稿/单个删除
  public goodsTemplateDraftUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.draft.update,
    })
  }

  // 商品资源库管理-批量上传文件
  public goodsResourceAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.add,
    })
  }

  // 商品资源库管理-删除文件
  public goodsResourceDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.delete,
    })
  }

  // 商品资源库管理-批量删除文件
  public goodsResourceDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.deleteBatch,
    })
  }

  // 商品资源库管理-当前文件夹下的文件及文件夹
  public goodsResourceList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.list,
    })
  }

  // 商品资源库管理-移动文件
  public goodsResourceMove(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.move,
    })
  }

  // 商品资源库管理-批量移动文件
  public goodsResourceMoveBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.moveBatch,
    })
  }

  // 商品资源库管理-查找文件
  public goodsResourceSearch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.search,
    })
  }

  // 商品资源库管理-修改文件名称
  public goodsResourceUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.update,
    })
  }

  // 商品资源库管理-文件夹-创建文件夹
  public goodsResourceLibraryAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.library.add.trim(),
    })
  }

  // 商品资源库管理-文件夹-修改文件夹名称
  public goodsResourceLibraryUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.library.update.trim(),
    })
  }

  // 商品资源库管理-文件夹-文件夹-树状图
  public goodsResourceLibraryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.library.list.trim(),
    })
  }

  // 商品资源库管理-文件夹-移动文件夹
  public goodsResourceLibraryMove(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.library.move.trim(),
    })
  }

  // 商品资源库管理-文件夹-删除文件夹
  public goodsResourceLibraryDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.library.delete.trim(),
    })
  }

  // 商品运营类目-查询二级运营类别商品运营类目删除
  public goodsCategoryOperateDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.delete,
    })
  }

  // 商品运营类目-查询二级运营类别
  public goodsCategoryOperateDisableTypeUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.disabletypeUpdate,
    })
  }

  // 商品运营类目-查询二级运营类别1
  public goodsCategoryOperateSelectSecondCategory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.selectSecondCategory,
    })
  }

  // 商品运营类目-更新商品类别
  public goodsCategoryOperateGoodsCategoryGoodsUpdate(
    data = {},
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.goodscategorygoodsUpdate,
    })
  }

  // 商品运营类目-商品运营类目列表
  public goodsCategoryOperateList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.list,
    })
  }

  // 商品运营类目-商品运营类目添加
  public goodsCategoryOperateSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.save,
    })
  }

  // 商品运营类目-查询二级运营类别
  public goodsCategoryOperateSortUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.sortUpdate,
    })
  }

  // 商品运营类目-商品运营类目修改
  public goodsCategoryOperateUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.category.operate.update,
    })
  }

  // 产品类型-禁用启用
  public goodsTypeStatusUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.statusUpdate,
    })
  }

  // 产品类型-添加产品类型
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

  // 产品类型-删除
  public goodsTypeDeleteBy$id(
    data = {
      id: '',
    },
    option?: httpRequest
  ): httpResponse {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.delete$id + data.id,
    })
  }

  // 产品类型-删除评价关键词
  public goodsTypeDeleteName(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.delete.name,
    })
  }

  // 产品类型-列表
  public goodsTypeStatusList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.type.list,
    })
  }

  // 销售订单v1/order/sell/status/count
  public orderSellQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.sell.query.list,
    })
  }

  // 销售数值/v1/order/invest/status/count
  public orderSellStatusCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.sell.status.count,
    })
  }
  //销售订单统计
  public orderSellListStatistics(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderSellListStatistics,
    })
  }
  //铺货订单
  public orderDistributionPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderDistributionPage,
    })
  }
   //铺货订单页签
   public orderDistributionCountList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderDistributionCountList,
    })
  }
   //投资订单统计
   public orderInvestListStatistics(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.orderInvestListStatistics,
    })
  }

  // 投资数值/v1/order/invest/status/count
  public orderInvestStatusCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].order.invest.status.count,
    })
  }

  // 商品模板列表 -  商品模板添加
  public goodsTemplateParamProperty(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.param.property,
    })
  }

  // 获取 县市区
  public findArea(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].sixHotArea,
    })
  }

  // 获取 省市区/v1/sixhot / area / tree
  public sixHotAreaTree(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].sixHotAreaTree,
    })
  }

  public companyInfoRemoveBinder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoRemoveBinder,
    })
  }

  public companyInfoChangeBinder(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].company.companyInfoChangeBinder,
    })
  }

  public apiRolePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].api.role.page,
    })
  }

  // 获取员工角色列表
  public apiRoleCompany(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].roleCompany,
    })
  }
}
