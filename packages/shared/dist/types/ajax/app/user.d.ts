import { httpRequest } from '../../types';
import VoHttp from './../ajax';
export default class userHttp extends VoHttp {
    getUserProfileInfo(data?: {}, option?: httpRequest): any;
    apiReceiverAddressDefault(data?: {}, option?: httpRequest): any;
    apiUserInfoMobile(data?: {}, option?: httpRequest): any;
    apiUserInfoCheckMobile(data?: {}, option?: httpRequest): any;
    apiExtraBankApplyBankcard(data?: {}, option?: httpRequest): any;
    apiExtraBankBindBankcard(data?: {}, option?: httpRequest): any;
    apiExtraBankUnBankcard(data?: {}, option?: httpRequest): any;
    apiExtraBankList(data?: {}, option?: httpRequest): any;
    apiAccountDetailsPage(data?: {}, option?: httpRequest): any;
    apiAccountDetailsAdd(data?: {}, option?: httpRequest): any;
    apiAccountDetailsWithdrawPage(data?: {}, option?: httpRequest): any;
    apiReceiverAddressHelpDefault(data?: {}, option?: httpRequest): any;
    apiAccountDetailsMain(data?: {}, option?: httpRequest): any;
}
