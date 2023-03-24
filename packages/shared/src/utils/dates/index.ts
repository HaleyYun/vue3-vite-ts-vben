/* prettier-ignore */
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的日期方法中通用的总结
 */
import {isDate, isDateDay} from "../../pattern/patterns";

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param formatStr
 * @returns {string} 返回格式化后的字符串
 */
export function timeFormat(dateTime: any, formatStr = 'yyyy-mm-dd'): string {
  let date
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date()
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
    date = new Date(dateTime * 1000)
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime))
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
    date = new Date(typeof dateTime === 'string' ? dateTime.replace(/-/g, '/') : dateTime)
  }

  const timeSource = {
    y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    d: date.getDate().toString().padStart(2, '0'), // 日
    h: date.getHours().toString().padStart(2, '0'), // 时
    M: date.getMinutes().toString().padStart(2, '0'), // 分
    s: date.getSeconds().toString().padStart(2, '0'), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }

  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
    if (ret) {
      // 年可能只需展示两位
      const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
      // @ts-ignore
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
    }
  }

  return formatStr
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 时间处理函数
 * 五分钟以内显示刚刚；
 * 一小时以内显示几分钟前；
 * 24小时内显示几小时前；
 * 超过24小时三天内（含三天）显示几天前；
 * 3天以上显示具体日期，到天即可。
 * 超过一年显示年份，年内不显示年份
 * @returns {string} 转化后的内容
 */
export function timeTransfer(timestamp: any, format: any = 'yyyy-mm-dd'): string {
  if (isDate(timestamp) || isDateDay(timestamp)) {
    timestamp = Number(new Date(timestamp.replace(/-/g, '/')))
  } else if (timestamp == null) {
    timestamp = Number(new Date())
  } else {
    timestamp = parseInt(timestamp)
  }
  // 判断用户输入的时间戳是秒还是毫秒,
  // 前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000
  let timer = new Date().getTime() - timestamp
  timer = parseInt(String(timer / 1000))
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = ''
  if (timer <= 600) {
    // 时间≤10分钟，显示文案“刚刚”
    tips = '刚刚'
  } else if (timer > 600 && timer <= 3600) {
    // 时间＞10分钟，≤60分钟，显示文案“x分钟前”；
    tips = `${parseInt(String(Math.ceil(timer / 60)))}分钟前`
  } else if (timer > 3600 && timer <= 21600) {
    // 大时间＞60分钟，≤360分钟，显示文案“x小时前”；
    tips = `${parseInt(String(Math.ceil(timer / 3600)))}小时前`
  } else if (timer > 21600 && timer <= 345600) {
    // 时间＞360分钟，显示文案“今天”；
    tips = `${parseInt(String(Math.ceil(timer / 86400)))}天前`
  } else if (timer > 345600) {
    // 大于四天显示 年-月-日
    tips = timeFormat(timestamp, format)
  } else {
    // 如果format为false，则无论什么时间戳，都显示xx之前
    if (!format) {
      if (timer >= 2592000 && timer < 365 * 86400) {
        tips = `${parseInt(String(timer / (86400 * 30)))}个月前`
      } else {
        tips = `${parseInt(String(timer / (86400 * 365)))}年前`
      }
    } else {
      tips = timeFormat(timestamp, 'yyyy')
    }
  }
  return tips
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 *最后一条消息日期＝当日  消息发送时间≤1分钟，显示文案“刚刚”；
  消息发送时间＞1分钟，显示文案“hh:mm”，小时为24小时制
  最后一条消息日期 = 当前日期前一天
  显示文案：昨天
  最后一条消息日期 = 本周内
  显示文案：周X
  最后一条消息日期 =  本年内
  显示文案：XX月XX日
  最后一条消息日期不在本年内
  显示文案：XXXX年XX月XX日
 * @returns {string} 转化后的内容
 */

export function IMTimeTransfer(
  timestamp: any,
  format: any = 'yyyy-mm-dd',
  beforeTime: null
): string {
  if (isDate(timestamp) || isDateDay(timestamp)) {
    timestamp = Number(new Date(timestamp.replace(/-/g, '/')))
  } else if (timestamp == null) {
    timestamp = Number(new Date())
  } else {
    timestamp = parseInt(timestamp)
  }
  const date = new Date(timestamp)
  const timeSource = {
    y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    d: date.getDate().toString().padStart(2, '0'), // 日
    h: date.getHours().toString().padStart(2, '0'), // 时
    M: date.getMinutes().toString().padStart(2, '0'), // 分
    s: date.getSeconds().toString().padStart(2, '0'), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  // 判断用户输入的时间戳是秒还是毫秒,
  // 前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000
  let timer
  if (!beforeTime) {
    timer = new Date().getTime() - timestamp
  } else {
    timer = timestamp - beforeTime
  }
  timer = parseInt(String(timer / 1000))
  // 如果小于1分钟,则返回"刚刚",其他以此类推
  let tips = ''
  if (timer >= 0 && timer < 60) {
    // 小于1分钟
    tips = '刚刚'
  } else if (timer >= 60 && isToday(date)) {
    // 大于1分钟小于一个小时
    tips = timeSource.h + ':' + timeSource.M
  } else if (timer >= 60 && isYestday(date)) {
    // 大于1天 小于 2天
    tips = '昨天 ' + timeSource.h + ':' + timeSource.M
  } else if (timer > 172800 && isSameWeek(date)) {
    // 大于1天 小于7天 显示周几
    console.log(date.getDay())
    tips = getWeek(date)
  } else if (timer <= 62208000) {
    tips = timeSource.m + '月' + timeSource.d + '日'
  } else {
    tips = timeSource.y + '年' + timeSource.m + '月' + timeSource.d + '日'
  }
  return tips
}

/**
 *
 * * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 当日消息  第一次发布消息的时候，即显示当前时间点，时间格式为“几点 : 几分”，例：“6:20”。
   两次聊天记录时间超过10分钟，再次发布聊天消息时，显示当前时间点时间格式为“几点 : 几分”，例：“6:20”。
 一周之前且在当前自然年内的历史消息（自然周）
 • 昨天的：昨天 时间范围 几点几分，例：“昨天 18:20”。
 • 昨天之前的：周几 几点几分，例：“周一 6:20”。

 • 非当前自然周的时间点，显示时间格式为“某月-某日 几点：几分”，例：4月11日 18:23
 在当前自然年之前的历史消息
 • 非当前自然年的时间点，显示时间格式为“某年-某月-某日 几点：几分”，例：2022年4月11日 18:23
 *
 */
export function chartTimeTransfer(
  timestamp: any,
  format: any = 'yyyy-mm-dd',
  beforeTime: null
): string {
  if (isDate(timestamp) || isDateDay(timestamp)) {
    timestamp = Number(new Date(timestamp.replace(/-/g, '/')))
  } else if (timestamp == null) {
    timestamp = Number(new Date())
  } else {
    timestamp = parseInt(timestamp)
  }
  const date = new Date(timestamp)
  const timeSource = {
    y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    d: date.getDate().toString().padStart(2, '0'), // 日
    h: date.getHours().toString().padStart(2, '0'), // 时
    M: date.getMinutes().toString().padStart(2, '0'), // 分
    s: date.getSeconds().toString().padStart(2, '0'), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  // 判断用户输入的时间戳是秒还是毫秒,
  // 前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000
  let timer
  if (!beforeTime) {
    timer = new Date().getTime() - timestamp
  } else {
    timer = timestamp - beforeTime
  }
  timer = parseInt(String(timer / 1000))

  let tips = ''
  if (timer > 0 && timer <= 600) {
    // 间隔10分钟
    tips = timeSource.h + ':' + timeSource.M
  } else if (timer > 600 && isToday(date)) {
    // 大于1分钟小于一天
    tips = timeSource.h + ':' + timeSource.M
  } else if (timer > 600 && isYestday(date)) {
    // 大于1天 小于 2天
    tips = '昨天' + timeSource.h + ':' + timeSource.M
  } else if (timer > 172800 && isSameWeek(date)) {
    // 大于1天 小于7天 显示周几

    tips = getWeek(date) + timeSource.h + ':' + timeSource.M
  } else if (timer <= 62208000) {
    tips = timeSource.m + '月' + timeSource.d + '日 ' + timeSource.h + ':' + timeSource.M
  } else {
    tips =
      timeSource.y +
      '年' +
      timeSource.m +
      '月' +
      timeSource.d +
      '日 ' +
      timeSource.h +
      ':' +
      timeSource.M
  }
  return tips
}

// 获取是否是本周内
export function isSameWeek(inDate) {
  // inDate 是一个date对象
  const inDateStr = inDate.toLocaleDateString() // 获取如YYYY/MM/DD的日期
  const nowDate = new Date()
  const nowTime = nowDate.getTime()
  const nowDay = nowDate.getDay()
  for (let i = 0; i < 7; i++) {
    if (inDateStr == new Date(nowTime + (i - nowDay) * 24 * 3600 * 1000).toLocaleDateString())
      return true
  }
  return false
}

// 获取是周几
export function getWeek(today) {
  const days = today.getDay() || 7
  const tips = ''
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  return week[days - 1]
}

// 判断是否是昨天
export function isYestday(theDate) {
  const date = new Date() //当前时间

  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() //今天凌晨

  const yestday = new Date(today - 24 * 3600 * 1000).getTime()

  return theDate.getTime() < today && yestday <= theDate.getTime()
}

// 判断时间是今天之内的
export function isToday(date) {
  //今天
  const d = new Date(date.toString().replace(/-/g, '/'))
  const todaysDate = new Date()
  if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    return true
  } else {
    return false
  }
}

export function getNowFormatDate() {
  const date = new Date()
  const seperator1 = '-'
  const year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  let strDate: string | number = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  return year + seperator1 + month + seperator1 + strDate
}
