// app端 接口列表 继承VoHttp
import { httpRequest } from '../../types'
import VoHttp from './../ajax'
import { AppApi } from './../api'

// 商品模块
export default class createHttp extends VoHttp {
  // 模板列表
  public apiGoodsTemplateQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.template.query.list,
    })
  }

  // 品牌列表
  public apiGoodsBrandQueryApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.brand.query.apply.list,
    })
  }

  // 品牌申请
  public apiGoodsBrandQueryApplySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.brand.query.apply.save,
    })
  }

  // 品牌校验
  public apiGoodsBrandQueryApplyCheck(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.brand.query.apply.check,
    })
  }

  // 型号列表
  public apiGoodsSkuQueryApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.sku.property.apply.list,
    })
  }

  // 参数属性
  public apiGoodsParamsPropertyQueryApplyList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.params.property.apply.list,
    })
  }

  // 上货
  public apiGoodsSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.save,
    })
  }

  // 商品详情
  public apiGoodsDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.detail,
    })
  }

  // 销售区域
  public apiGoodsSealAreaQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.seal.area.query.list,
    })
  }

  // 商品类型
  public apiGoodsTypeQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.type.query.list,
    })
  }

  // 商品类别
  public apiGoodsCategoryQueryCategoryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.category.query.category.list,
    })
  }

  // 模板详情
  public apiGoodsTemplateDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.template.detail,
    })
  }

  // 申请上架
  public apiGoodsProjectInvestmentApplyStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.apply.status,
    })
  }

  // 添加
  public apiGoodsProjectInvestmentSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.save,
    })
  }

  // 修改
  public apiGoodsProjectInvestmentUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.update,
    })
  }

  // 查看原因
  public apiGoodsProjectInvestmentReason(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.reason,
    })
  }

  // 检查是否可以申请上架
  public apiGoodsProjectInvestmentWhetherApplyListing(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.whetherApplyListing,
    })
  }

  // 修改状态
  public apiGoodsProjectInvestmentUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.updateStatus,
    })
  }

  // 投资详情
  public apiGoodsProjectInvestmentDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.detail,
    })
  }

  //  获取商品列表
  public apiGoodsQueryMyGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.query.myGoods,
    })
  }

  // 项目投资列表
  public apiGoodsProjectInvestmentList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.list,
    })
  }

  // 卖家视角预览
  public apiGoodsProjectInvestmentSellerPreview(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.sellerPreview,
    })
  }

  // 买家视角预览
  public apiGoodsProjectInvestmentBuyerPreview(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.project.investment.buyerPreview,
    })
  }

  // 价格指导查询列表
  public apiGoodsQueryPriceGuideList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.query.priceGuideList,
    })
  }

  // 服务商-投资列表
  public apiGoodsProjectInvestmentSpList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsProjectInvestmentSpList,
    })
  }

  // 热门品牌列表
  public apiGoodsBrandQueryListHot(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsBrandQueryListHot,
    })
  }

  // 商品查询列表-代客下单/修理厂列表
  public apiGoodsQueryWarehousesGoodsList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsQueryWarehousesGoodsList,
    })
  }

  // 商品查询列表-代客下单/修理厂列表
  public apiGoodsQueryWarehousesGoodsList$Post(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsQueryWarehousesGoodsList$Post,
    })
  }

  // 修理厂商品详情
  public apiGoodsGarageDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsGarageDetail,
    })
  }

  // 修理厂商品详情
  public apiGoodsApplyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsApplyUpdate,
    })
  }

  // 修理厂商品详情
  public apiGoodsDistributionApplyUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsDistributionApplyUpdate,
    })
  }

  // 代客下单
  public apiCompanyInfoGaragePage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].company.apiCompanyInfoGaragePage,
    })
  }

  public apiGoodsQueryGoodsOnSale(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsQueryGoodsOnSale,
    })
  }

  // 服务商选择商品-非自由仓
  public apiGoodsQueryChooseGoods(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsQueryChooseGoods,
    })
  }

  // 商品收藏列表
  public apiGoodsCollectionCollectionList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCollectionList,
    })
  }

  // 商品收藏
  public apiGoodsCollectionCollection(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCollection,
    })
  }

  // 取消收藏
  public apiGoodsCollectionCancel$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCancel$Id + '/' + data.id,
    })
  }

  // 取消收藏批量操作
  public apiGoodsCollectionCancelBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCancelBatch,
    })
  }

  // 我的收藏数量
  public apiGoodsCollectionCollectionCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCollectionCount,
    })
  }

  // 店铺收藏列表
  public apiGoodsCollectionStoreCollectionList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionStoreCollectionList,
    })
  }

  // 店铺收藏
  public apiGoodsCollectionCollectionStore(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCollectionStore,
    })
  }

  // 店铺取消收藏
  public apiGoodsCollectionCancelStore$Id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCancelStore$Id + '/' + data.id,
    })
  }

  // 店铺取消收藏批量
  public apiGoodsCollectionCancelStoreBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goods.apiGoodsCollectionCancelStoreBatch,
    })
  }

  // 商品流量统计 apiGoodsVisitRecordStatistic
  public apiGoodsVisitRecordStatistic(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsVisitRecordStatistic,
    })
  }

  // 商品人气分页列表 apiGoodsVisitRecordQuery
  public apiGoodsVisitRecordQuery(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsVisitRecordQuery,
    })
  }

  // 商品收藏量排序 apiGoodsCollectionGoodsCollectionSorted
  public apiGoodsCollectionGoodsCollectionSorted(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsCollectionGoodsCollectionSorted,
    })
  }

  // apiGoodsVisitRecordAdd 插入浏览量（修理厂查看、分享）
  public apiGoodsVisitRecordAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsVisitRecordAdd,
    })
  }

  // 根据项目id获取项目服务费-GET
  public apiGoodsProjectInvestmentGetProjectServeFee(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsProjectInvestmentGetProjectServeFee,
    })
  }

  // 根据项目id获取项目服务费-GET
  public apiGoodsGetGoodsServeFee(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsGetGoodsServeFee,
    })
  }
  // 服务商一键上架供应商商品
  public apiGoodsShelves(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsShelves,
    })
  }

  // 服务商一键上架供应商商品
  public apiGoodsShelfBulk(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AppApi[`${localOptions.version}`].goodsList.apiGoodsShelfBulk,
    })
  }
}
