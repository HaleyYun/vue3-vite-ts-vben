export declare const CDN_URL = "";
/**
 * 返回一个变量是否为空
 * @param param
 */
export declare function checkIsEmpty(param: any): boolean;
/**
 * 将输入值转换为数字，如果转换失败，则返回原字符串
 * @param val
 */
export declare function toNumber(val: string): number | string;
/**
 * 判断当前实例是否是 Promise对象
 * @param val
 */
export declare function isPromise(val: any): boolean;
/**
 * 获取值得原始类型字符串
 * @param value
 */
export declare function toRawType(value: any): string;
/**
 * 判断当前对象是否是正则实例化对象
 * @param v
 */
export declare function isRegExp(v: any): boolean;
/**
 * 判断变量是否 非undefined
 * @param v
 */
export declare function isUndef(v: any): boolean;
/**
 * 判断变量是否 是undefined
 * @param v
 */
export declare function isDef(v: any): boolean;
/**
 * 判断变量是否是 真值
 * @param v
 */
export declare function isTrue(v: any): boolean;
/**
 * 判断变量是否是 假值
 * @param v
 */
export declare function isFalse(v: any): boolean;
/**
 * 获取随机css颜色
 */
export declare function getRandomColor(): string;
/**
 * 获取静态资源 url地址，如果是全路径则原样返回
 * @param url
 */
export declare function transformUrl(url: string): string;
/**
 *
 * @param num  月份或者年
 * @param type ['month', 'year']
 * 例如 transformDateByType(1, 'month')  // 获取近一个月的开始时间和结束时间
 * 结果：['2022-07-04 14:15:33', '2022-08-04 14:15:33']
 *
 * 例如 transformDateByType(2022, 'year')  // 获取2022年的开始时间和结束时间
 * 结果：['2022-01-01 00:00:00', '2023-01-01 00:00:00']
 * @remarks
 * 时间字符串返回
 */
export declare function transformDateByType(num: number, type: string): string[];
