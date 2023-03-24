type AnyObject = Record<string | number | symbol, any>;
export interface VoCenRequest {
    device: string;
    requestInstance: VoCenHttpInstance;
}
export interface httpRequest {
    url?: string;
    data?: any;
    options?: any;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'UPLOAD' | 'DOWNLOAD';
    header?: AnyObject;
    version?: string;
}
export interface httpResponse<T = any> {
    code?: number | string | undefined;
    success?: boolean;
    message?: string;
    data?: any;
    time?: string;
}
export interface VoCenHttpInstance {
    apiGet<T = any>(requestParams?: any): Promise<httpResponse>;
    apiPost<T = any>(requestParams?: any): Promise<httpResponse>;
    apiPut<T = any>(requestParams?: any): Promise<httpResponse>;
    apiPatch<T = any>(requestParams?: any): Promise<httpResponse>;
    apiRequest<T = any>(requestParams?: any): Promise<httpResponse>;
    apiDelete<T = any>(requestParams?: any): Promise<httpResponse>;
}
export declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}
export {};
