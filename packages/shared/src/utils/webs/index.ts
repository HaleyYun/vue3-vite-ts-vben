// @ts-nocheck

/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是浏览器端，设备检测、路由对象、存储、cookie、等一些公共方法的总结
 */

import uniStorage from './uni-storage'
import pcStorage from './pc-storage'
import { hasOwn, isPlainObject } from '../objects'

const device_base = 'DEVICE_BASE'

export function getDevice() {
  try {
    return uniStorage.get(device_base)
  } catch {
    return pcStorage.get(device_base)
  }
}

export const deviceType = ['PC', 'UNI']

export class VoStorage {
  private readonly $device: string
  private readonly $isPc: boolean

  constructor(props) {
    if (!isPlainObject(props)) {
      throw new Error(JSON.stringify({ code: 1000, message: 'props must be an object' }))
    }
    if (!hasOwn(props, 'device') || !deviceType.includes(props.device)) {
      throw new Error(
        JSON.stringify({
          code: 10001,
          message: 'The parameter must contain `device` key, value must be PC or UNI',
        })
      )
    }
    this.$device = props.device || 'PC'
    this.$isPc = this.$device === 'PC'
  }

  // 判断是否存在
  has(key) {
    return !!this.get(key)
  }

  // 获取
  get(key, defaultVal = '') {
    return this.$isPc ? pcStorage.get(key, defaultVal) : uniStorage.get(key, defaultVal)
  }

  // 设置
  set(key: string, val: string) {
    return this.$isPc ? pcStorage.set(key, val) : uniStorage.set(key, val)
  }

  // 删除
  remove(key) {
    return this.$isPc ? pcStorage.remove(key) : uniStorage.remove(key)
  }

  // 清空
  clear() {
    return this.$isPc ? pcStorage.clear() : uniStorage.clear()
  }
}

// 定义生成26个英文字母
export function indexList() {
  const indexList: [] = []
  const charCodeOfA = 'A'.charCodeAt(0)
  for (let i = 0; i < 26; i++) {
    indexList.push({
      id: String.fromCharCode(charCodeOfA + i),
      key: String.fromCharCode(charCodeOfA + i),
    })
  }
  return indexList
}
