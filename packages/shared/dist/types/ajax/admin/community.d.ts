import { httpRequest } from '../../types';
import VoHttp from '../ajax';
/**
 * 管理后台-社群模块
 */
export default class CommunityHttp extends VoHttp {
    constructor(props: any);
    /**
     * 社区社群栏目 列表查询
     * @param data
     * @param option
     */
    communityColumnCondition(data?: {}, option?: httpRequest): any;
    /**
     * 社区社群栏目 删除栏目
     * @param data
     * @param option
     */
    communityColumnDelete$id(data?: {
        id: string;
    }, option?: httpRequest): any;
    communityColumnModify(data?: {}, option?: httpRequest): any;
    communityColumnSave(data?: {}, option?: httpRequest): any;
    communityColumnSaveBatch(data?: {}, option?: httpRequest): any;
    communityContentTipoffGetOne(data?: {}, option?: httpRequest): any;
    communityContentTipoffApproved(data?: {}, option?: httpRequest): any;
    communityContentTipoffCondition(data?: {}, option?: httpRequest): any;
    communityContentTipoffReject(data?: {}, option?: httpRequest): any;
    communityContentAnswerGetOne(data?: {}, option?: httpRequest): any;
    communityContentAnswerApproved(data?: {}, option?: httpRequest): any;
    communityContentAnswerModify(data?: {}, option?: httpRequest): any;
    communityContentAnswerCondition(data?: {}, option?: httpRequest): any;
    communityContentAnswerTop(data?: {}, option?: httpRequest): any;
    communityContentAnswerReset(data?: {}, option?: httpRequest): any;
    communityContentAnswerDelete(data?: {}, option?: httpRequest): any;
    communityContentAnswerDetail(data?: {}, option?: httpRequest): any;
    communityContentAnswerOffSale(data?: {}, option?: httpRequest): any;
    communityContentAnswerCancelRecommend(data?: {}, option?: httpRequest): any;
    communityContentAnswerRecommend(data?: {}, option?: httpRequest): any;
    communityContentAnswerSave(data?: {}, option?: httpRequest): any;
    communityContentIdeaDetail(data?: {}, option?: httpRequest): any;
    communityContentIdeaApproved(data?: {}, option?: httpRequest): any;
    communityContentVideoQueryComment(data?: {}, option?: httpRequest): any;
    communityContentAnswerQueryComment(data?: {}, option?: httpRequest): any;
    communityContentIdeaCondition(data?: {}, option?: httpRequest): any;
    communityContentIdeaDelete(data?: {}, option?: httpRequest): any;
    communityContentIdeaQueryComment(data?: {}, option?: httpRequest): any;
    communityContentIdeaModify(data?: {}, option?: httpRequest): any;
    communityContentIdeaOffsale(data?: {}, option?: httpRequest): any;
    communityContentIdeaRecommend(data?: {}, option?: httpRequest): any;
    communityContentIdeaReject(data?: {}, option?: httpRequest): any;
    communityContentIdeaCancelRecommend(data?: {}, option?: httpRequest): any;
    communityContentIdeaSave(data?: {}, option?: httpRequest): any;
    communityContentVideoGetOne(data?: {}, option?: httpRequest): any;
    communityContentVideoExist(data?: {}, option?: httpRequest): any;
    communityContentVideoApproved(data?: {}, option?: httpRequest): any;
    communityContentVideoCondition(data?: {}, option?: httpRequest): any;
    communityContentVideoDelete(data?: {}, option?: httpRequest): any;
    communityContentVideoModify(data?: {}, option?: httpRequest): any;
    communityContentVideoOffSale(data?: {}, option?: httpRequest): any;
    communityContentVideoDetail(data?: {}, option?: httpRequest): any;
    communityContentVideoReject(data?: {}, option?: httpRequest): any;
    communityContentVideoCancelRecommend(data?: {}, option?: httpRequest): any;
    communityContentVideoRecommend(data?: {}, option?: httpRequest): any;
    communityContentVideoSave(data?: {}, option?: httpRequest): any;
    communityContentTipoffDetail(data?: {}, option?: httpRequest): any;
    communityContentQuestionExist(data?: {}, option?: httpRequest): any;
    communityContentQuestionApproved(data?: {}, option?: httpRequest): any;
    communityContentQuestionCondition(data?: {}, option?: httpRequest): any;
    communityContentQuestionDelete(data?: {}, option?: httpRequest): any;
    communityContentQuestionQueryComment(data?: {}, option?: httpRequest): any;
    communityContentQuestionModify(data?: {}, option?: httpRequest): any;
    communityContentQuestionOffsale(data?: {}, option?: httpRequest): any;
    communityContentQuestionReject(data?: {}, option?: httpRequest): any;
    communityContentAnswerReject(data?: {}, option?: httpRequest): any;
    communityContentQuestionCancelRecommend(data?: {}, option?: httpRequest): any;
    communityContentQuestionRecommend(data?: {}, option?: httpRequest): any;
    communityContentQuestionSave(data?: {}, option?: httpRequest): any;
}
