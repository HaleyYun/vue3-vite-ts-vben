// 合并初始化参数功能

// 接口前缀
import { VoCenRequest } from '../../types'

export const $prefix = ''

export const $v1Prefix = '/v1/'

export const $prefixUser = '/v1/api'

// 设备类型
export const device = ['PC', 'UNI']

// 设定版本为 v1  v2
export const version = ['v1', 'v2']

// 默认v1版本
export const defaultVersion = 'v1'

// 处理默认配置
export function transformConfig(config: VoCenRequest) {
  if ((config && !config['device']) || !device.includes(config['device'])) {
    config['device'] = device[0]
  }
  return config
}

export function mix(...mixins): any {
  class Mix {
    constructor() {
      for (const mixin of mixins) {
        copyProperties(this, new mixin()) // 拷贝实例属性
      }
    }
  }

  for (const mixin of mixins) {
    copyProperties(Mix, mixin) // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
  }

  return Mix
}

export function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc: any = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc)
    }
  }
}

export function getTreeConfig(obj, keyArr) {
  console.log({
    obj,
    keyArr,
  })
  if (keyArr.length === 1) return obj[keyArr[0]]
  const firstKeyStr = keyArr.splice(0, 1)
  return getTreeConfig(obj[firstKeyStr], [...keyArr])
}
