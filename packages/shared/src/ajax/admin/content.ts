import { httpRequest, httpResponse } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

// 客户 供应商 代理商

export default class contentHttp extends VoHttp {
  constructor(props) {
    super(props)
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

  // 获取代理商tab
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

  /**
   * 认证课程管理-列表查询-POST
   * @param data
   * @param option
   */
  public contentContentCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentContentCondition,
    })
  }

  /**
   * 认证课程管理-列表查询-POST
   * @param data
   * @param option
   */
  public contentCertificationCourseCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseCondition,
    })
  }

  /**
   * 认证课程管理-新增内容-POST
   * @param data
   * @param option
   */
  public contentCertificationCourseSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseSave,
    })
  }

  /**
   * 认证课程管理-修改内容-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseModify,
    })
  }

  /**
   * 认证课程管理-逻辑删除-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseDelete,
    })
  }

  /**
   * 认证课程管理-批量删除-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseBatchUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseBatchUpdate,
    })
  }

  /**
   * 认证课程管理-是否启用-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseEnable,
    })
  }

  /**
   * 认证课程管理分类-列表查询-POST
   * @param data
   * @param option
   */
  public contentCertificationCourseCategoryCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseCategoryCondition,
    })
  }

  /**
   * 认证课程管理分类-新增分类-POST
   * @param data
   * @param option
   */
  public contentCertificationCourseCategorySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseCategorySave,
    })
  }

  /**
   * 认证课程管理分类-列表查询-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseCategoryModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseCategoryModify,
    })
  }

  /**
   * 认证课程管理分类-是否启用-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseCategoryEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseCategoryEnable,
    })
  }

  /**
   * 认证课程管理分类-列表查询-PUT
   * @param data
   * @param option
   */
  public contentCertificationCourseCategorySort(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCertificationCourseCategorySort,
    })
  }

  /**
   * 招商手册-列表查询-POST
   * @param data
   * @param option
   */
  public contentInvestmentCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentInvestmentCondition,
    })
  }

  /**
   * 招商手册-修改内容-PUT
   * @param data
   * @param option
   */
  public contentInvestmentModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentInvestmentModify,
    })
  }

  /**
   * 招商手册-逻辑删除-PUT
   * @param data
   * @param option
   */
  public contentInvestmentDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentInvestmentDelete,
    })
  }

  /**
   * 招商手册-批量删除-PUT
   * @param data
   * @param option
   */
  public contentInvestmentBatchUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentInvestmentBatchUpdate,
    })
  }

  /**
   * 修理厂技术指导管理分类-列表查询-POST
   * @param data
   * @param option
   */
  public contentTechnicalCategoryCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategoryCondition,
    })
  }

  /**
   * 修理厂技术指导管理分类-新增分类-POST
   * @param data
   * @param option
   */
  public contentTechnicalCategorySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategorySave,
    })
  }

  /**
   * 修理厂技术指导管理分类-修改分类-PUT
   * @param data
   * @param option
   */
  public contentTechnicalCategoryModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategoryModify,
    })
  }

  /**
   * 修理厂技术指导管理分类-删除(逻辑删除)-PUT
   * @param data
   * @param option
   */
  public contentTechnicalCategoryDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategoryDelete,
    })
  }

  /**
   * 修理厂技术指导管理分类-是否启用-PUT
   * @param data
   * @param option
   */
  public contentTechnicalCategoryEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategoryEnable,
    })
  }

  /**
   *  修理厂技术指导管理分类-排序-PUT
   * @param data
   * @param option
   */
  public contentTechnicalCategorySort(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategorySort,
    })
  }

  /**
   *   修理厂技术指导管理分类-列表查询-POST
   * @param data
   * @param option
   */
  public contentTechnicalCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCondition,
    })
  }

  /**
   *  修理厂技术指导管理分类-新增分类-POST
   * @param data
   * @param option
   */
  public contentTechnicalSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalSave,
    })
  }

  /**
   *  修理厂技术指导管理分类-修改分类-PUT
   * @param data
   * @param option
   */
  public contentTechnicalModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalModify,
    })
  }

  /**
   *  修理厂技术指导管理分类-删除(逻辑删除)-PUT
   * @param data
   * @param option
   */
  public contentTechnicalDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalDelete,
    })
  }
  /**
     *  修理厂技术指导管理-批量删除-PUT
     * @param data
     * @param option
     */
  public contentTechnicalBatchUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalBatchUpdate,
    })
  }
  /**
   *  修理厂技术指导管理分类-删除(逻辑删除)-PUT
   * @param data
   * @param option
   */
  public contentTechnicalBatchDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalBatchDelete,
    })
  }

  /**
   * 修理厂技术指导管理分类-是否启用-PUT
   * @param data
   * @param option
   */
  public contentTechnicalEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalEnable,
    })
  }

  /**
   *  修理厂技术指导管理分类-排序-PUT
   * @param data
   * @param option
   */
  public contentTechnicalCategoryRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalCategoryRecommend,
    })
  }
  /**
   *  修理厂技术指导管理-是否精选/vocen-jarvis/v1/content/technical/recommend
   * @param data
   * @param option
   */
  public contentTechnicalRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentTechnicalRecommend,
    })
  }
  /**
   *  商家大学内容管理-批量新增内容-POST
   * @param data
   * @param option
   */
  public contentContentSaveBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentContentSaveBatch,
    })
  }
  /**
 *  帮助中心内容管理-批量新增内容-POST/v1/content/help/content/save/batch
 * @param data
 * @param option
 */
  public contentHelpContentSaveBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentHelpContentSaveBatch,
    })
  }
  /**
*  帮助中心分类管理-批量新增分类-POST/v1/content/help/category/save/batch
* @param data
* @param option
*/
  public contentHelpCategorySaveBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentHelpCategorySaveBatch,
    })
  }
  /**
 *  商家大学分类管理-批量新增分类-POST
 * @param data
 * @param option
 */
  public contentCategorySaveBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentCategorySaveBatch,
    })
  }

  /**
*  语音识别绑定列表-POST
* @param data
* @param option
*/
  public contentVoiceRecognizeBindQueryListPage(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentVoiceRecognizeBindQueryListPage,
    })
  }

  /**
*  语音识别绑定列表禁用启用-PUT
* @param data
* @param option
*/
  public contentVoiceRecognizeBindStatusUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentVoiceRecognizeBindStatusUpdate,
    })
  }

  /**
*  语音识别绑定列表批量删除
* @param data
* @param option
*/
  public contentVoiceRecognizeBindDeleteBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentVoiceRecognizeBindDeleteBatch,
    })
  }

  /**
*  语音识别绑定列表删除
* @param data
* @param option
*/
  public contentVoiceRecognizeBindBy$id(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiDelete({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentVoiceRecognizeBindBy$id + `/${data.id}`,
    })
  }

  /**
*  语音识别绑定列表添加/v1/content/voice/recognize/bind/save
* @param data
* @param option
*/
  public contentVoiceRecognizeBindSave(data = { id: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentVoiceRecognizeBindSave,
    })
  }

  /**
*  语音识别绑定列表禁用修改-PUT/v1/content/voice/recognize/bind/update
* @param data
* @param option
*/
  public contentVoiceRecognizeBindUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentVoiceRecognizeBindUpdate,
    })
  }

  /**
*  获取路由列表映射-Get//v1/content/function/route/list
* @param data
* @param option
*/
  public contentFunctionRouteList(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].content.contentFunctionRouteList,
    })
  }

  // end
}
