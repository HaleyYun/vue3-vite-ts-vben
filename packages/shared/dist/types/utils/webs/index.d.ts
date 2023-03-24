export declare function getDevice(): any;
export declare const deviceType: string[];
export declare class VoStorage {
    private readonly $device;
    private readonly $isPc;
    constructor(props: any);
    has(key: any): boolean;
    get(key: any, defaultVal?: string): any;
    set(key: string, val: string): any;
    remove(key: any): any;
    clear(): any;
}
export declare function indexList(): [];
