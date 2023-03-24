import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class Goods extends VoHttp {
  constructor(props) {
    super(props)
  }

  /**
   * 服务佣金配置 修改
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionUpdate,
    })
  }

  /**
   * 服务佣金配置 获取已设置省份
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionModelProvince(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionModelProvince,
    })
  }

  /**
   * 服务佣金配置 导出
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionExport(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionExport,
    })
  }

  /**
   * 服务佣金配置 分页查询
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionQueryPageList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionQueryPageList,
    })
  }

  /**
   * 服务佣金配置 删除
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionDelBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionDelBy$id + data.id,
    })
  }

  /**
   * 服务佣金配置 获取全国34个省份
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionProvince(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionProvince,
    })
  }

  /**
   * 服务佣金配置 详情
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionDetail,
    })
  }

  /**
   * 服务佣金配置 添加
   * @param data
   * @param option
   *
   */
  public goodsModelCommissionSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCommissionSave,
    })
  }

  /**
   * 旧机回收商品-pc 暂停/启动回收
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelStatus,
    })
  }

  /**
   * // 旧机回收商品-pc 操作历史记录
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelOperate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelOperate,
    })
  }

  /**
   * // 旧机回收商品-pc 初始化数量统计
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelCount,
    })
  }

  /**
   * // 旧机回收商品-pc 列表查询（带分页）
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelQueryListPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelQueryListPage,
    })
  }

  /**
   * // 旧机回收商品-pc 详情
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelDetail,
    })
  }

  /**
   * 投资项目-操作历史记录-项目-GET
   * @param data
   * @param option
   *
   */
  public goodsInvestmentOperateList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentOperateList,
    })
  }

  /**
   * 投资项目-操作历史记录-商品-GET
   * @param data
   * @param option
   *
   */
  public goodsGoodsOperateList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsOperateList,
    })
  }

  /**
   * 投资项目润列表-项目-POST
   * @param data
   * @param option
   *
   */
  public goodsInvestmentProfitList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentProfitList,
    })
  }

  /**
   * 投资项目-设置分润-PUT
   * @param data
   * @param option
   *
   */
  public goodsInvestmentProfit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentProfit,
    })
  }

  /**
   * 商品型号-新增-POST
   * @param data
   * @param option
   *
   */
  public goodsModelSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelSave,
    })
  }

  /**
   * 商品型号-修改-PUT
   * @param data
   * @param option
   *
   */
  public goodsModelUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelUpdate,
    })
  }

  /**
   * 商品型号-启用/禁用-PUT
   * @param data
   * @param option
   *
   */
  public goodsModelEnableUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelEnableUpdate,
    })
  }

  /**
   * 商品型号-批量删除-DELETE
   * @param data
   * @param option
   *
   */
  public goodsModelBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelBatchDelete,
    })
  }

  /**
   * 商品型号-删除-DELETE
   * @param data
   * @param option
   *
   */
  public goodsModelDeleteBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelDeleteBy$id + `/${data.id}`,
    })
  }

  /**
   * 商品型号-列表-分页-POST
   * @param data
   * @param option
   *
   */
  public goodsModelQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelQueryPage,
    })
  }

  /**
   * 商品型号-型号下拉列表-GET
   * @param data
   * @param option
   *
   */
  public goodsModelSelectList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelSelectList,
    })
  }

  /**
   * 售后补偿配置-新增-POST
   * @param data
   * @param option
   *
   */
  public goodsModelCompensateSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCompensateSave,
    })
  }

  /**
   * 售后补偿配置-修改-POST
   * @param data
   * @param option
   *
   */
  public goodsModelCompensateUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCompensateUpdate,
    })
  }

  /**
   * 售后补偿配置-零部件列表-GET
   * @param data
   * @param option
   *
   */
  public goodsModelCompensateUnitList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCompensateUnitList,
    })
  }

  /**
   * 旧件寄回-启用/禁用-GET
   * @param data
   * @param option
   *
   */
  public goodsModelCompensateSendBackUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCompensateSendBackUpdate,
    })
  }

  /**
   * 售后补偿配置-删除-DELETE
   * @param data
   * @param option
   *
   */
  public goodsModelCompensateDeleteBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url:
        AdminApi[`${localOptions.version}`].goods.goodsModelCompensateDeleteBy$id + `/${data.id}`,
    })
  }

  /**
   * 售后补偿配置-列表-分页-POST
   * @param data
   * @param option
   *
   */
  public goodsModelCompensateQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelCompensateQueryPage,
    })
  }

  /**
   * 预售活动管理-列表分页查询-POST
   * @param data
   * @param option
   *
   */
  public goodsRecyclePreSaleQueryList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecyclePreSaleQueryList,
    })
  }

  /**
   * 预售活动管理-初始化数量统计-GET
   * @param data
   * @param option
   *
   */
  public goodsRecyclePreSaleListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecyclePreSaleListCount,
    })
  }

  /**
   * 预售活动管理-上架/下架-PUT
   * @param data
   * @param option
   *
   */
  public goodsRecyclePreSaleUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecyclePreSaleUpdate,
    })
  }

  /**
   * 预售活动管理-详情-GET
   * @param data
   * @param option
   *
   */
  public goodsRecyclePreSaleDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecyclePreSaleDetail,
    })
  }

  /**
   * 预售活动管理-操作历史记录-GET
   * @param data
   * @param option
   *
   */
  public goodsRecyclePreSaleOperateList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecyclePreSaleOperateList,
    })
  }

  /**
   * 商品型号申请-详情-GET
   * @param data
   * @param option
   *
   */
  public goodsModelApplyView(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelApplyView,
    })
  }

  /**
   * 商品型号申请-列表-分页-POST
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelViewBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelViewBy$id + data.id,
    })
  }

  /**
   * 机再销售管理-上架/下架-PUT
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelUpdateStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelUpdateStatus,
    })
  }

  /**
   * 旧机再销售管理-修改分润-PUT
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelUpdateProfit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelUpdateProfit,
    })
  }

  /**
   * 旧机再销售管理-审核-POST
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelApproval(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelApproval,
    })
  }

  /**
   * 旧机再销售管理-操作列表-GET
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelQueryOpLogList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelQueryOpLogList,
    })
  }

  /**
   * 旧机再销售管理-列表-分页-POST
   * @param data
   * @param option
   *
   */
  public goodsRecycleModelQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsRecycleModelQueryPage,
    })
  }

  /**
   * 商品型号申请-列表-分页-POST
   * @param data
   * @param option
   *
   */
  public goodsModelApplyQueryPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelApplyQueryPage,
    })
  }

  /**
   * 图片视频资源列表
   * @param data
   * @param option
   *
   */
  public goodsResourceFileList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsResourceFileList,
    })
  }

  /**
   * 商品型号申请-审核-POST
   * @param data
   * @param option
   *
   */
  public goodsModelApplyApproval(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelApplyApproval,
    })
  }

  /**
   * 旧机回收商品-暂停/启动回收-PUT
   * @param data
   * @param option
   *
   */
  public goodsModelRecycleStatus(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelRecycleStatus,
    })
  }

  /**
   * 旧机回收商品-操作历史记录-GET
   * @param data
   * @param option
   *
   */
  public goodsModelRecycleOperate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelRecycleOperate,
    })
  }

  /**
   * 旧机回收商品-初始化数量统计-GET
   * @param data
   * @param option
   *
   */
  public goodsModelRecycleCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelRecycleCount,
    })
  }

  /**
   * 商旧机回收商品-列表查询（带分页）-POST
   * @param data
   * @param option
   *
   */
  public goodsModelRecycleQueryListPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelRecycleQueryListPage,
    })
  }

  /**
   * 旧机回收商品-详情-GET
   * @param data
   * @param option
   *
   */
  public goodsModelRecycleDetail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelRecycleDetail,
    })
  }

  /*
		获取分润信息-GET
	 * @param data
	 * @param option
 */
  public goodsInvestmentProfitRole(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentProfitRole,
    })
  }

  // 商品查看原因
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

  // 获取商家商品 goodsGoodsShop
  public goodsGoodsShop(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsShop,
    })
  }

  // 获取商家项目 goodsInvestmentShop
  public goodsInvestmentShop(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentShop,
    })
  }

  // 获取商品列表所有的页签的数量统计
  public goodsGoodsListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsListCount,
    })
  }

  // 获取商品列表所有的页签的数量统计（服务商）
  public goodsGoodsAgentListCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsAgentListCount,
    })
  }

  // 获取提交人商品 goodsGoodsSubmitter
  public goodsGoodsSubmitter(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsGoodsSubmitter,
    })
  }

  // 获取提交人项目 goodsInvestmentSubmitter
  public goodsInvestmentSubmitter(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsInvestmentSubmitter,
    })
  }

  // 获取商品型号 goodsModelQueryListCatergory
  public goodsModelQueryListCatergory(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsModelQueryListCatergory,
    })
  }

  // 获取商品销量 goodsStatisticQuerySalesRankingList
  public goodsStatisticQuerySalesRankingList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsStatisticQuerySalesRankingList,
    })
  }

  // 获取初始化分润
  public goodsTemplateGetProfit(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsTemplateGetProfit,
    })
  }

  // 获取同型号商品销量对比
  public goodsStatisticQuerySalesComparisonList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsStatisticQuerySalesComparisonList,
    })
  }

  // 获取同型号商品销量对比
  public goodsStatisticQueryInvestRankingList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsStatisticQueryInvestRankingList,
    })
  }

  // 商品类别，绑定列表-get
  public goodsCategoryCategoryAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsCategoryCategoryAdd,
    })
  }

  // 品牌列表,绑定品牌用-get
  public goodsBrandBrandAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsBrandBrandAdd,
    })
  }

  // 绑定类别
  public goodsCategoryCertificationCategoryAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsCategoryCertificationCategoryAdd,
    })
  }

  // 绑定品牌-post
  public goodsCertificationBrandBrandAdd(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsCertificationBrandBrandAdd,
    })
  }

  // 商品模版数据统计count
  public goodsTemplateCount(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.template.count,
    })
  }

  // 获取屏蔽的品牌 goodsBrandApplyShieldBrandList
  public goodsBrandApplyShieldBrandList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsBrandApplyShieldBrandList,
    })
  }

  // 屏蔽品牌 goodsBrandApplyShieldBrand
  public goodsBrandApplyShieldBrand(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.goodsBrandApplyShieldBrand,
    })
  }

  // 品牌列表,屏蔽品牌用 按字母排序 shield
  public goodsBrandBrandShield(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.brand.shield,
    })
  }
}
