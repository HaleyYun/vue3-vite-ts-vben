import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class ContentManagerHttp extends VoHttp {
    constructor(props: any);
    /**
     *@description 商家大学内容
     */
    contentContentCondition(data?: {}, option?: httpRequest): any;
    contentContentSave(data?: {}, option?: httpRequest): any;
    contentHelpContentSave(data?: {}, option?: httpRequest): any;
    contentHelpContentModify(data?: {}, option?: httpRequest): any;
    contentHelpCategoryModify(data?: {}, option?: httpRequest): any;
    contentContentModify(data?: {}, option?: httpRequest): any;
    contentHelpContentCondition(data?: {}, option?: httpRequest): any;
    contentHelpCategoryCondition(data?: {}, option?: httpRequest): any;
    contentHelpCategorySave(data?: {}, option?: httpRequest): any;
    contentContentDelete(data?: {}, option?: httpRequest): any;
    contentHelpContentDelete(data?: {}, option?: httpRequest): any;
    contentHelpCategoryDelete(data?: {}, option?: httpRequest): any;
    contentContentUpdate(data?: {}, option?: httpRequest): any;
    contentContentEnable(data?: {}, option?: httpRequest): any;
    contentHelpContentEnable(data?: {}, option?: httpRequest): any;
    contentHelpCategoryEnable(data?: {}, option?: httpRequest): any;
    contentContentDisable(data?: {}, option?: httpRequest): any;
    contentContentRecommend(data?: {}, option?: httpRequest): any;
    contentContentCancelRecommend(data?: {}, option?: httpRequest): any;
    /**
     *@description 商家大学分类
     */
    contentCategoryCondition(data?: {}, option?: httpRequest): any;
    contentCategorySave(data?: {}, option?: httpRequest): any;
    contentCategoryModify(data?: {}, option?: httpRequest): any;
    contentCategoryDelete(data?: {}, option?: httpRequest): any;
    contentCategoryBatchUpdate(data?: {}, option?: httpRequest): any;
    contentCategoryEnable(data?: {}, option?: httpRequest): any;
    contentCategoryDisable(data?: {}, option?: httpRequest): any;
    helpCategoryEnable(data?: {}, option?: httpRequest): any;
    contentCategorySort(data?: {}, option?: httpRequest): any;
    communityContentIdeaRelease(data?: {}, option?: httpRequest): any;
    communityContentIdeaReleaseBatch(data?: {}, option?: httpRequest): any;
    communityContentQuestionRelease(data?: {}, option?: httpRequest): any;
}
