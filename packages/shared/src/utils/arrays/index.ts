/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的数组方法中通用的总结
 */

import { Fn } from '../../types'

// 数组去重
export function dedupe(array) {
  return Array.from(new Set(array))
}

/**
 * 删除数组元素中的一个值 并返回删除的元素 仅支持一维数组
 * @param arr
 * @param item
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * 检测是否是有效的数组索引
 */
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * 数组转换，保证转后的值，必须是一个数组
 * @param arr
 */
export const ensureArray = (arr: any): any[] => {
  if (!arr && arr !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}

/**
 * 判断一个对象是否是数组
 * @param arr
 */
export function isArray(arr: any): boolean {
  return Array.isArray(arr)
}

// 一维数组降序排序
export function orderByDesc(arr: Array<any>): Array<any> {
  if (!isArray(arr)) {
    throw new Error('param must be an array')
  }
  return arr.sort((a, b) => {
    return b - a
  })
}

// 一维数组升序排序
export function orderByAsc(arr: Array<any>): Array<any> {
  if (!isArray(arr)) {
    throw new Error('param must be an array')
  }
  return arr.sort((a, b) => {
    return a - b
  })
}

function compare(property: string, order = 'desc') {
  return function (a, b) {
    const value1 = a[property]
    const value2 = b[property]
    return order === 'asc' ? value1 - value2 : value2 - value1 //升序,降序为value2 - value1
  }
}

/**
 * 对象一维数组 降序排列
 * @param arr
 * @param property
 */
export function orderPropertyByDesc(arr: Array<object>, property: string): Array<object> {
  if (!isArray(arr)) {
    throw new Error('param must be an array')
  }
  return arr.sort(compare(property, 'desc'))
}

/**
 * 对象一维数组 升序排列
 * @param arr
 * @param property
 */
export function orderPropertyByAsc(arr: Array<object>, property: string): Array<object> {
  if (!isArray(arr)) {
    throw new Error('param must be an array')
  }
  if (!isArray(arr)) {
    throw new Error('param must be an array')
  }
  return arr.sort(compare(property, 'asc'))
}

/**
 * @description: Extract tree specified structure
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach(item, opt))
}

/**
 * @description: Extract tree specified structure
 */
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion,
        })
      ),
    }
  } else {
    return {
      ...conversionData,
    }
  }
}
