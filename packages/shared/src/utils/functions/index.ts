/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的方法中通用的的总结
 */
import dayjs from 'dayjs'

import { Pattern } from '../../index'
// xml 和 json 互转

const _toString = Object.prototype.toString

export const CDN_URL = ''

/**
 * 返回一个变量是否为空
 * @param param
 */
export function checkIsEmpty(param: any): boolean {
  return param === undefined || +param === 0 || param === null || !param.toString().trim()
}

/**
 * 将输入值转换为数字，如果转换失败，则返回原字符串
 * @param val
 */
export function toNumber(val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * 判断当前实例是否是 Promise对象
 * @param val
 */
export function isPromise(val: any): boolean {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function'
}

/**
 * 获取值得原始类型字符串
 * @param value
 */
export function toRawType(value: any): string {
  return _toString.call(value).slice(8, -1)
}

/**
 * 判断当前对象是否是正则实例化对象
 * @param v
 */
export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * 判断变量是否 非undefined
 * @param v
 */
export function isUndef(v: any): boolean {
  return v === undefined || v === null
}

/**
 * 判断变量是否 是undefined
 * @param v
 */
export function isDef(v: any): boolean {
  return v !== undefined && v !== null
}

/**
 * 判断变量是否是 真值
 * @param v
 */
export function isTrue(v: any): boolean {
  return v === true
}

/**
 * 判断变量是否是 假值
 * @param v
 */
export function isFalse(v: any): boolean {
  return v === false
}

/**
 * 获取随机css颜色
 */
export function getRandomColor(): string {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  // rgba 颜色 待实现，根据需求再进行补充
  // rgb颜色
  return 'rgb(' + r + ',' + g + ',' + b + ')'
  // 16进制颜色
  //return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

/**
 * 获取静态资源 url地址，如果是全路径则原样返回
 * @param url
 */
export function transformUrl(url: string): string {
  if (!url) return ''
  if (url.indexOf('http') === -1) return CDN_URL + url
  return url
}

// time为某一天的时间戳
function startTime(time) {
  const nowTimeDate = new Date(time)
  return nowTimeDate.setHours(0, 0, 0, 0)
}

function endTime(time) {
  const nowTimeDate = new Date(time)
  return nowTimeDate.setHours(23, 59, 59, 999)
}

// Type
// 1.1个月内
// 2.3个月内
// 3.6个月内
// 4.2022年
// 5.2023年
// 6.2024年

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
export function transformDateByType(num: number, type: string): string[] {
  const nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const typeArray = ['month', 'year']
  if (!typeArray.includes(type)) {
    throw Error('type must be month or year')
  }
  if (!Pattern.isIntNumber(num)) {
    throw Error('num must be int number')
  }
  if (type === 'month') {
    const startTime = dayjs().subtract(num, 'month').format('YYYY-MM-DD HH:mm:ss')
    return [startTime, nowTime]
  }
  if (type === 'year') {
    const startTime = dayjs((+num).toString()).format('YYYY-MM-DD HH:mm:ss')
    const endTime = dayjs((+num + 1).toString()).format('YYYY-MM-DD HH:mm:ss')
    return [startTime, endTime]
  }
  return []
}
