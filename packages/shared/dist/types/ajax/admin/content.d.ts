import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class contentHttp extends VoHttp {
    constructor(props: any);
    companyInfoPage(data?: {}, option?: httpRequest): any;
    companyInfoAgentTab(data?: {}, option?: httpRequest): any;
    companyInfoSupplierTab(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-列表查询-POST
     * @param data
     * @param option
     */
    contentContentCondition(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-列表查询-POST
     * @param data
     * @param option
     */
    contentCertificationCourseCondition(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-新增内容-POST
     * @param data
     * @param option
     */
    contentCertificationCourseSave(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-修改内容-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseModify(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-逻辑删除-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseDelete(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-批量删除-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseBatchUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理-是否启用-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseEnable(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理分类-列表查询-POST
     * @param data
     * @param option
     */
    contentCertificationCourseCategoryCondition(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理分类-新增分类-POST
     * @param data
     * @param option
     */
    contentCertificationCourseCategorySave(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理分类-列表查询-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseCategoryModify(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理分类-是否启用-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseCategoryEnable(data?: {}, option?: httpRequest): any;
    /**
     * 认证课程管理分类-列表查询-PUT
     * @param data
     * @param option
     */
    contentCertificationCourseCategorySort(data?: {}, option?: httpRequest): any;
    /**
     * 招商手册-列表查询-POST
     * @param data
     * @param option
     */
    contentInvestmentCondition(data?: {}, option?: httpRequest): any;
    /**
     * 招商手册-修改内容-PUT
     * @param data
     * @param option
     */
    contentInvestmentModify(data?: {}, option?: httpRequest): any;
    /**
     * 招商手册-逻辑删除-PUT
     * @param data
     * @param option
     */
    contentInvestmentDelete(data?: {}, option?: httpRequest): any;
    /**
     * 招商手册-批量删除-PUT
     * @param data
     * @param option
     */
    contentInvestmentBatchUpdate(data?: {}, option?: httpRequest): any;
    /**
     * 修理厂技术指导管理分类-列表查询-POST
     * @param data
     * @param option
     */
    contentTechnicalCategoryCondition(data?: {}, option?: httpRequest): any;
    /**
     * 修理厂技术指导管理分类-新增分类-POST
     * @param data
     * @param option
     */
    contentTechnicalCategorySave(data?: {}, option?: httpRequest): any;
    /**
     * 修理厂技术指导管理分类-修改分类-PUT
     * @param data
     * @param option
     */
    contentTechnicalCategoryModify(data?: {}, option?: httpRequest): any;
    /**
     * 修理厂技术指导管理分类-删除(逻辑删除)-PUT
     * @param data
     * @param option
     */
    contentTechnicalCategoryDelete(data?: {}, option?: httpRequest): any;
    /**
     * 修理厂技术指导管理分类-是否启用-PUT
     * @param data
     * @param option
     */
    contentTechnicalCategoryEnable(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理分类-排序-PUT
     * @param data
     * @param option
     */
    contentTechnicalCategorySort(data?: {}, option?: httpRequest): any;
    /**
     *   修理厂技术指导管理分类-列表查询-POST
     * @param data
     * @param option
     */
    contentTechnicalCondition(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理分类-新增分类-POST
     * @param data
     * @param option
     */
    contentTechnicalSave(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理分类-修改分类-PUT
     * @param data
     * @param option
     */
    contentTechnicalModify(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理分类-删除(逻辑删除)-PUT
     * @param data
     * @param option
     */
    contentTechnicalDelete(data?: {}, option?: httpRequest): any;
    /**
       *  修理厂技术指导管理-批量删除-PUT
       * @param data
       * @param option
       */
    contentTechnicalBatchUpdate(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理分类-删除(逻辑删除)-PUT
     * @param data
     * @param option
     */
    contentTechnicalBatchDelete(data?: {}, option?: httpRequest): any;
    /**
     * 修理厂技术指导管理分类-是否启用-PUT
     * @param data
     * @param option
     */
    contentTechnicalEnable(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理分类-排序-PUT
     * @param data
     * @param option
     */
    contentTechnicalCategoryRecommend(data?: {}, option?: httpRequest): any;
    /**
     *  修理厂技术指导管理-是否精选/vocen-jarvis/v1/content/technical/recommend
     * @param data
     * @param option
     */
    contentTechnicalRecommend(data?: {}, option?: httpRequest): any;
    /**
     *  商家大学内容管理-批量新增内容-POST
     * @param data
     * @param option
     */
    contentContentSaveBatch(data?: {}, option?: httpRequest): any;
    /**
   *  帮助中心内容管理-批量新增内容-POST/v1/content/help/content/save/batch
   * @param data
   * @param option
   */
    contentHelpContentSaveBatch(data?: {}, option?: httpRequest): any;
    /**
  *  帮助中心分类管理-批量新增分类-POST/v1/content/help/category/save/batch
  * @param data
  * @param option
  */
    contentHelpCategorySaveBatch(data?: {}, option?: httpRequest): any;
    /**
   *  商家大学分类管理-批量新增分类-POST
   * @param data
   * @param option
   */
    contentCategorySaveBatch(data?: {}, option?: httpRequest): any;
    /**
  *  语音识别绑定列表-POST
  * @param data
  * @param option
  */
    contentVoiceRecognizeBindQueryListPage(data?: {}, option?: httpRequest): any;
    /**
  *  语音识别绑定列表禁用启用-PUT
  * @param data
  * @param option
  */
    contentVoiceRecognizeBindStatusUpdate(data?: {}, option?: httpRequest): any;
    /**
  *  语音识别绑定列表批量删除
  * @param data
  * @param option
  */
    contentVoiceRecognizeBindDeleteBatch(data?: {}, option?: httpRequest): any;
    /**
  *  语音识别绑定列表删除
  * @param data
  * @param option
  */
    contentVoiceRecognizeBindBy$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  *  语音识别绑定列表添加/v1/content/voice/recognize/bind/save
  * @param data
  * @param option
  */
    contentVoiceRecognizeBindSave(data?: {
        id: string;
    }, option?: httpRequest): any;
    /**
  *  语音识别绑定列表禁用修改-PUT/v1/content/voice/recognize/bind/update
  * @param data
  * @param option
  */
    contentVoiceRecognizeBindUpdate(data?: {}, option?: httpRequest): any;
    /**
  *  获取路由列表映射-Get//v1/content/function/route/list
  * @param data
  * @param option
  */
    contentFunctionRouteList(data?: {}, option?: httpRequest): any;
}
