/* prettier-ignore */
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的字符串通用的一些方法的总结
 */

import { isPlainObject } from '../objects';
import { isPhone } from '../../pattern/patterns'
const _toString = Object.prototype.toString

/**
 * 把输入的值转换为字符串.
 * @param val
 */
export function toString(val: any): string {
  if (Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)) {
    return val == null ? '' : JSON.stringify(val, null, 2)
  } else {
    return val == null ? '' : String(val)
  }
}

/**
 * 加密手机号
 * 输入 155 6560 1175
 * 输出 155 **** 1175
 * @param phone
 * @returns {string}
 */
export function encryptPhone(phone: string): string {
  if (!isPhone(phone)) {
    throw new Error('phone param must be correct phone number')
  }
  const strPhone = toString(phone)
  const reg = /(\d{3})\d{4}(\d{4})/ //正则表达式进行匹配确认加密
  return strPhone.replace(reg, '$1 **** $2')
}
