/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的字符串通用的一些方法的总结
 */
/**
 * 把输入的值转换为字符串.
 * @param val
 */
export declare function toString(val: any): string;
/**
 * 加密手机号
 * 输入 155 6560 1175
 * 输出 155 **** 1175
 * @param phone
 * @returns {string}
 */
export declare function encryptPhone(phone: string): string;
