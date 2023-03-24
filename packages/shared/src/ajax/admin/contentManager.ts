import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'

export default class ContentManagerHttp extends VoHttp {
  constructor(props) {
    super(props)
  }
  /**
   *@description 商家大学内容
   */

  // 商家大学___ 内容-列表查询
  public contentContentCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.condition,
    })
  }

  // 商家大学___ 内容-新增内容
  public contentContentSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.save,
    })
  }
  // /v1/content/help/content/save
  // 帮助中心___新增内容//v1/content/help/content/modify
  public contentHelpContentSave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.content.save,
    })
  }
  // 帮助中心___内容-修改内容//v1/content/help/content/modify
  public contentHelpContentModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.content.modify,
    })
  }
  // 帮助中心___分类-修改内容/v1/content/help/category/modify
  public contentHelpCategoryModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.category.modify,
    })
  }
  // 商家大学___内容-修改内容
  public contentContentModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.modify,
    })
  }

  // 商家大学___帮助中心v1/content/help/category/condition
  public contentHelpContentCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.content.condition,
    })
  }
  // 商家大学___帮助分类管理content/help/category/save
  public contentHelpCategoryCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.category.condition,
    })
  }
  // 商家大学___帮助新增分类管理content/help/category/save
  public contentHelpCategorySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.category.save,
    })
  }
  // 帮助中心删除
  public contentContentDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.delete,
    })
  }
  // 帮助中心内容删除/v1/content/help/content/delete
  public contentHelpContentDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.content.delete,
    })
  }
  // 帮助中心分类删除//v1/content/help/category/delete
  public contentHelpCategoryDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.category.delete,
    })
  }
  // 商家大学___内容-批量删除
  public contentContentUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.batch.update,
    })
  }

  // 商家大学___内容-启用///v1/content/help/content/enable
  public contentContentEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.enable,
    })
  }
  // 帮助中心___内容-启用///v1/content/help/content/enable
  public contentHelpContentEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.content.enable,
    })
  }
  // 帮助中心___分类-启用
  public contentHelpCategoryEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.category.enable,
    })
  }
  // 商家大学___内容-禁用
  public contentContentDisable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.disabled,
    })
  }
  // 商家大学___内容-精选推荐
  public contentContentRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.recommend,
    })
  }

  // 商家大学___内容-取消推荐
  public contentContentCancelRecommend(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.content.recommend,
    })
  }

  /**
   *@description 商家大学分类
   */

  // 商家大学___分类-列表查询
  public contentCategoryCondition(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.condition,
    })
  }

  // 商家大学___分类-新增分类
  public contentCategorySave(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.save,
    })
  }

  // 商家大学___分类-修改分类
  public contentCategoryModify(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.modify,
    })
  }

  // 商家大学___分类-删除
  public contentCategoryDelete(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.delete,
    })
  }

  // 商家大学___分类-排序
  public contentCategoryBatchUpdate(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.batch.update,
    })
  }

  // 商家大学___分类-启用
  public contentCategoryEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.enable,
    })
  }

  // 商家大学___分类-禁用
  public contentCategoryDisable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.batch.disabled,
    })
  }

  // 商家大学___ 是否启用禁用
  public helpCategoryEnable(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.help.category.enable,
    })
  }

  // 商家大学___分类-排序
  public contentCategorySort(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPut({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].merchantUniversity.category.sort,
    })
  }
  // 写想法  release
  public communityContentIdeaRelease(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.release,
    })
  }
  // 发布多选想法  /vocen-jarvis/v1/community/content/idea/release/batch
  public communityContentIdeaReleaseBatch(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.idea.getOne.batch,
    })
  }

  // 写问题  release
  public communityContentQuestionRelease(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].community.content.question.release,
    })
  }




  //帮助中心 ___

  // end
}
