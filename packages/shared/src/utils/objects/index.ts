/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的对象通用的一些方法的总结
 */

const hasOwnProperty = Object.prototype.hasOwnProperty
const _toString = Object.prototype.toString

/**
 * 判断当前对象是否含有某个属性
 * @param obj
 * @param key
 */
export function hasOwn(obj: Object | any[], key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * 判断当前对象是否是对象类型
 * @param obj
 */
export function isObject(obj: Object): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 严格的对象类型检查。只返回true
 * 对于普通的JavaScript对象。
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

/**
 * 返回一个空对象
 */
export const emptyObject = Object.freeze({})
