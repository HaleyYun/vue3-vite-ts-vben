import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class Goods extends VoHttp {
    constructor(props: any);
    /**
     * 服务佣金配置 修改
     * @param data
     * @param option
     *
     */
    goodsModelCommissionUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 服务佣金配置 获取已设置省份
     * @param data
     * @param option
     *
     */
    goodsModelCommissionModelProvince(data?: {}, option?: httpRequest): any;
    /**
     * 服务佣金配置 导出
     * @param data
     * @param option
     *
     */
    goodsModelCommissionExport(data?: {}, option?: httpRequest): any;
    /**
     * 服务佣金配置 分页查询
     * @param data
     * @param option
     *
     */
    goodsModelCommissionQueryPageList(data?: {}, option?: httpRequest): any;
    /**
     * 服务佣金配置 删除
     * @param data
     * @param option
     *
     */
    goodsModelCommissionDelBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 服务佣金配置 获取全国34个省份
     * @param data
     * @param option
     *
     */
    goodsModelCommissionProvince(data?: {}, option?: httpRequest): any;
    /**
     * 服务佣金配置 详情
     * @param data
     * @param option
     *
     */
    goodsModelCommissionDetail(data?: {}, option?: httpRequest): any;
    /**
     * 服务佣金配置 添加
     * @param data
     * @param option
     *
     */
    goodsModelCommissionSave(data?: {}, option?: httpRequest): any;
    /**
     * 旧机回收商品-pc 暂停/启动回收
     * @param data
     * @param option
     *
     */
    goodsRecycleModelStatus(data?: {}, option?: httpRequest): any;
    /**
     * // 旧机回收商品-pc 操作历史记录
     * @param data
     * @param option
     *
     */
    goodsRecycleModelOperate(data?: {}, option?: httpRequest): any;
    /**
     * // 旧机回收商品-pc 初始化数量统计
     * @param data
     * @param option
     *
     */
    goodsRecycleModelCount(data?: {}, option?: httpRequest): any;
    /**
     * // 旧机回收商品-pc 列表查询（带分页）
     * @param data
     * @param option
     *
     */
    goodsRecycleModelQueryListPage(data?: {}, option?: httpRequest): any;
    /**
     * // 旧机回收商品-pc 详情
     * @param data
     * @param option
     *
     */
    goodsRecycleModelDetail(data?: {}, option?: httpRequest): any;
    /**
     * 投资项目-操作历史记录-项目-GET
     * @param data
     * @param option
     *
     */
    goodsInvestmentOperateList(data?: {}, option?: httpRequest): any;
    /**
     * 投资项目-操作历史记录-商品-GET
     * @param data
     * @param option
     *
     */
    goodsGoodsOperateList(data?: {}, option?: httpRequest): any;
    /**
     * 投资项目润列表-项目-POST
     * @param data
     * @param option
     *
     */
    goodsInvestmentProfitList(data?: {}, option?: httpRequest): any;
    /**
     * 投资项目-设置分润-PUT
     * @param data
     * @param option
     *
     */
    goodsInvestmentProfit(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号-新增-POST
     * @param data
     * @param option
     *
     */
    goodsModelSave(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号-修改-PUT
     * @param data
     * @param option
     *
     */
    goodsModelUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号-启用/禁用-PUT
     * @param data
     * @param option
     *
     */
    goodsModelEnableUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号-批量删除-DELETE
     * @param data
     * @param option
     *
     */
    goodsModelBatchDelete(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号-删除-DELETE
     * @param data
     * @param option
     *
     */
    goodsModelDeleteBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 商品型号-列表-分页-POST
     * @param data
     * @param option
     *
     */
    goodsModelQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号-型号下拉列表-GET
     * @param data
     * @param option
     *
     */
    goodsModelSelectList(data?: {}, option?: httpRequest): any;
    /**
     * 售后补偿配置-新增-POST
     * @param data
     * @param option
     *
     */
    goodsModelCompensateSave(data?: {}, option?: httpRequest): any;
    /**
     * 售后补偿配置-修改-POST
     * @param data
     * @param option
     *
     */
    goodsModelCompensateUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 售后补偿配置-零部件列表-GET
     * @param data
     * @param option
     *
     */
    goodsModelCompensateUnitList(data?: {}, option?: httpRequest): any;
    /**
     * 旧件寄回-启用/禁用-GET
     * @param data
     * @param option
     *
     */
    goodsModelCompensateSendBackUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 售后补偿配置-删除-DELETE
     * @param data
     * @param option
     *
     */
    goodsModelCompensateDeleteBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 售后补偿配置-列表-分页-POST
     * @param data
     * @param option
     *
     */
    goodsModelCompensateQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 预售活动管理-列表分页查询-POST
     * @param data
     * @param option
     *
     */
    goodsRecyclePreSaleQueryList(data?: {}, option?: httpRequest): any;
    /**
     * 预售活动管理-初始化数量统计-GET
     * @param data
     * @param option
     *
     */
    goodsRecyclePreSaleListCount(data?: {}, option?: httpRequest): any;
    /**
     * 预售活动管理-上架/下架-PUT
     * @param data
     * @param option
     *
     */
    goodsRecyclePreSaleUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 预售活动管理-详情-GET
     * @param data
     * @param option
     *
     */
    goodsRecyclePreSaleDetail(data?: {}, option?: httpRequest): any;
    /**
     * 预售活动管理-操作历史记录-GET
     * @param data
     * @param option
     *
     */
    goodsRecyclePreSaleOperateList(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号申请-详情-GET
     * @param data
     * @param option
     *
     */
    goodsModelApplyView(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号申请-列表-分页-POST
     * @param data
     * @param option
     *
     */
    goodsRecycleModelViewBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
     * 机再销售管理-上架/下架-PUT
     * @param data
     * @param option
     *
     */
    goodsRecycleModelUpdateStatus(data?: {}, option?: httpRequest): any;
    /**
     * 旧机再销售管理-修改分润-PUT
     * @param data
     * @param option
     *
     */
    goodsRecycleModelUpdateProfit(data?: {}, option?: httpRequest): any;
    /**
     * 旧机再销售管理-审核-POST
     * @param data
     * @param option
     *
     */
    goodsRecycleModelApproval(data?: {}, option?: httpRequest): any;
    /**
     * 旧机再销售管理-操作列表-GET
     * @param data
     * @param option
     *
     */
    goodsRecycleModelQueryOpLogList(data?: {}, option?: httpRequest): any;
    /**
     * 旧机再销售管理-列表-分页-POST
     * @param data
     * @param option
     *
     */
    goodsRecycleModelQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号申请-列表-分页-POST
     * @param data
     * @param option
     *
     */
    goodsModelApplyQueryPage(data?: {}, option?: httpRequest): any;
    /**
     * 图片视频资源列表
     * @param data
     * @param option
     *
     */
    goodsResourceFileList(data?: {}, option?: httpRequest): any;
    /**
     * 商品型号申请-审核-POST
     * @param data
     * @param option
     *
     */
    goodsModelApplyApproval(data?: {}, option?: httpRequest): any;
    /**
     * 旧机回收商品-暂停/启动回收-PUT
     * @param data
     * @param option
     *
     */
    goodsModelRecycleStatus(data?: {}, option?: httpRequest): any;
    /**
     * 旧机回收商品-操作历史记录-GET
     * @param data
     * @param option
     *
     */
    goodsModelRecycleOperate(data?: {}, option?: httpRequest): any;
    /**
     * 旧机回收商品-初始化数量统计-GET
     * @param data
     * @param option
     *
     */
    goodsModelRecycleCount(data?: {}, option?: httpRequest): any;
    /**
     * 商旧机回收商品-列表查询（带分页）-POST
     * @param data
     * @param option
     *
     */
    goodsModelRecycleQueryListPage(data?: {}, option?: httpRequest): any;
    /**
     * 旧机回收商品-详情-GET
     * @param data
     * @param option
     *
     */
    goodsModelRecycleDetail(data?: {}, option?: httpRequest): any;
    goodsInvestmentProfitRole(data?: {}, option?: httpRequest): any;
    goodsGoodsQueryReason(data?: {}, option?: httpRequest): any;
    goodsGoodsShop(data?: {}, option?: httpRequest): any;
    goodsInvestmentShop(data?: {}, option?: httpRequest): any;
    goodsGoodsListCount(data?: {}, option?: httpRequest): any;
    goodsGoodsAgentListCount(data?: {}, option?: httpRequest): any;
    goodsGoodsSubmitter(data?: {}, option?: httpRequest): any;
    goodsInvestmentSubmitter(data?: {}, option?: httpRequest): any;
    goodsModelQueryListCatergory(data?: {}, option?: httpRequest): any;
    goodsStatisticQuerySalesRankingList(data?: {}, option?: httpRequest): any;
    goodsTemplateGetProfit(data?: {}, option?: httpRequest): any;
    goodsStatisticQuerySalesComparisonList(data?: {}, option?: httpRequest): any;
    goodsStatisticQueryInvestRankingList(data?: {}, option?: httpRequest): any;
    goodsCategoryCategoryAdd(data?: {}, option?: httpRequest): any;
    goodsBrandBrandAdd(data?: {}, option?: httpRequest): any;
    goodsCategoryCertificationCategoryAdd(data?: {}, option?: httpRequest): any;
    goodsCertificationBrandBrandAdd(data?: {}, option?: httpRequest): any;
    goodsTemplateCount(data?: {}, option?: httpRequest): any;
    goodsBrandApplyShieldBrandList(data?: {}, option?: httpRequest): any;
    goodsBrandApplyShieldBrand(data?: {}, option?: httpRequest): any;
    goodsBrandBrandShield(data?: {}, option?: httpRequest): any;
}
