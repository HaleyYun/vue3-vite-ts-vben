/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(
  date: any,
  format = DATE_TIME_FORMAT,
): string {
  return moment(date).format(format)
}

export function formatToDate(date: any, format = DATE_FORMAT): string {
  return moment(date).format(format)
}

/**
 * 延迟时间
 * @param num number
 */
export function sleep(num: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, num)
  })
}

/*
  上门时间类型组合
 */

export function doorTime(startTime: String, endTime: String){
  const endArr = endTime.split(' ');
  const startArr = startTime.split(' ')
  const homeStartTime = startArr[0]
  const homeEndTime = startArr[1]+ '-' +endArr[1]
  return `${homeStartTime}<br/>${homeEndTime}`
}
export function assignedTime(startTime: String, endTime: String){
  const endArr = endTime.split(' ');
  const startArr = startTime.split(' ')
  const homeStartTime = startArr[0]
  const homeEndTime = startArr[1]+ '~' +endArr[1]
  return [homeStartTime,homeEndTime]
}

export const dateUtil = moment
