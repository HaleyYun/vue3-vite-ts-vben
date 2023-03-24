import { isObject, isString } from '/@/utils/is'
import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '/@/enums/VoCacheEnum'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  // const now = new Date().getTime()
  // if (restful) {
  //   return `?_t=${now}`
  // }
  // return { _t: now }
  return ''
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return
  }

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}

export const getVoToken = () => {
  // return storage.get(ACCESS_TOKEN_KEY, '')
  return storage.get(ACCESS_TOKEN_KEY)
}
export const getVoRefreshToKen = () => {
  return storage.get(REFRESH_TOKEN_KEY, '')
}
