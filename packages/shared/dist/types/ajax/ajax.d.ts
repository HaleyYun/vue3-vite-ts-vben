import { httpRequest, httpResponse, VoCenRequest } from '../types';
export default class VoHttp {
    readonly $service: any;
    protected readonly $config: any;
    constructor(config: VoCenRequest);
    /**
     * 用于快捷获取对应的url
     * @param path community/content/idea/release
     * @param channel
     * @param version
     */
    getFullUrlByAdmin(path: any, channel?: string, version?: string): any;
    protected isPc(): boolean;
    protected isUni(): boolean;
    testList(option: httpRequest): httpResponse;
    login(data: {} | undefined, option: httpRequest): httpResponse;
    logoff(data: {} | undefined, option: httpRequest): httpResponse;
    register(data: {} | undefined, option: httpRequest): httpResponse;
    smsSend(data: {} | undefined, option: httpRequest): httpResponse;
    test(data: {} | undefined, option: httpRequest): httpResponse;
    role(data?: {}, option?: httpRequest): any;
    switchRole(data?: {}, option?: httpRequest): any;
    password(data?: {}, option?: httpRequest): any;
    smsVerify(data?: {}, option?: httpRequest): any;
    apiCreatedCosGet(data?: {}, option?: httpRequest): any;
    wxSignature(data?: {}, option?: httpRequest): any;
    mergeRequest(config: httpRequest): httpRequest;
}
