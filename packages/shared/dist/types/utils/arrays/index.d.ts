/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的数组方法中通用的总结
 */
import { Fn } from '../../types';
export declare function dedupe(array: any): unknown[];
/**
 * 删除数组元素中的一个值 并返回删除的元素 仅支持一维数组
 * @param arr
 * @param item
 */
export declare function remove(arr: Array<any>, item: any): Array<any> | void;
/**
 * 检测是否是有效的数组索引
 */
export declare function isValidArrayIndex(val: any): boolean;
/**
 * 数组转换，保证转后的值，必须是一个数组
 * @param arr
 */
export declare const ensureArray: (arr: any) => any[];
/**
 * 判断一个对象是否是数组
 * @param arr
 */
export declare function isArray(arr: any): boolean;
export declare function orderByDesc(arr: Array<any>): Array<any>;
export declare function orderByAsc(arr: Array<any>): Array<any>;
/**
 * 对象一维数组 降序排列
 * @param arr
 * @param property
 */
export declare function orderPropertyByDesc(arr: Array<object>, property: string): Array<object>;
/**
 * 对象一维数组 升序排列
 * @param arr
 * @param property
 */
export declare function orderPropertyByAsc(arr: Array<object>, property: string): Array<object>;
/**
 * @description: Extract tree specified structure
 */
export declare function treeMap<T = any>(treeData: T[], opt: {
    children?: string;
    conversion: Fn;
}): T[];
/**
 * @description: Extract tree specified structure
 */
export declare function treeMapEach(data: any, { children, conversion }: {
    children?: string;
    conversion: Fn;
}): any;
