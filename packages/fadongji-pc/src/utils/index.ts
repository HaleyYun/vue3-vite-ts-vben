import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Plugin } from 'vue'

import { unref } from 'vue'
import { isObject } from '/@/utils/is'

export const noop = () => {}


export const delParam = (url, paramKey) => {
  const urlParam = url.substr(url.indexOf('?') + 1)
  const beforeUrl = url.substr(0, url.indexOf('?'))
  let nextUrl = ''

  const arr: any = []
  if (urlParam !== '') {
    const urlParamArr: any = urlParam.split('&')

    for (let i = 0; i < urlParamArr.length; i++) {
      const paramArr = urlParamArr[i].split('=')
      if (paramArr[0] !== paramKey) {
        arr.push(urlParamArr[i])
      }
    }
  }

  if (arr.length > 0) {
    nextUrl = '?' + arr.join('&')
  }
  url = beforeUrl + nextUrl
  return url
}

export const transferRoleName = (roleKey): string => {
  const roleObject = {
    oldMachine: '旧机买家',
    skilledWorker: '集师傅',
    recycling: '回收公司',
    channelManager: '渠道经理',
    investmentManager: '招商经理',
    garage: '修理厂',
    agent: '服务商',
    supplier: '供应商',
  }

  return Object.keys(roleObject).includes(roleKey) ? roleObject[roleKey] : '无匹配'
}

// 异步加载图片
export function loadCosImage(url) {
  const image: any = new Image()
  let count = 0
  return new Promise((resolve) => {
    const setImageIn = setInterval(() => {
      image.src = url
      count++
      if (count > 10 || image.complete) {
        clearInterval(setImageIn)
        resolve(url)
      }
    }, 500)
  })
}

// 转换第三方平台url
export function transferCosUrl(url: string, type = 1) {
  if (!url) return ''
  if (url.indexOf('/api/file/operations') > -1) {
    return url + `&type=${type}`
  } else {
    return url
  }
}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
