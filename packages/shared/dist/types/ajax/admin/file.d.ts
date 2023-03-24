import { httpRequest } from '../../types';
import VoHttp from '../ajax';
export default class File extends VoHttp {
    constructor(props: any);
    fileFileUpload(data?: {}, option?: httpRequest): any;
    fileImgUpload(data?: {}, option?: httpRequest): any;
    fileFileUploadInfo(data?: {}, option?: httpRequest): any;
    batchUploadFileInfo(data?: {}, option?: httpRequest): any;
    fileImgUploadInfo(data?: {
        file: string;
    }, option?: httpRequest): any;
    fileImgUploadInfoBatch(data?: {
        files: string;
    }, option?: httpRequest): any;
    fileVideoUploadInfo(data?: {
        file: string;
    }, option?: httpRequest): any;
    fileVideoUpload(data?: {}, option?: httpRequest): any;
    fileOperationsGetObject(data?: {}, option?: httpRequest): any;
    fileOperationsGetImageThumbnail(data?: {}, option?: httpRequest): any;
    fileOperationsTemporaryToForever(data?: {}, option?: httpRequest): any;
    fileOperationsCopyObject(data?: {}, option?: httpRequest): any;
    apiCreateCosGet(data?: {}, option?: httpRequest): any;
}
