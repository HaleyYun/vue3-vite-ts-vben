/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param formatStr
 * @returns {string} 返回格式化后的字符串
 */
export declare function timeFormat(dateTime: any, formatStr?: string): string;
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
export declare function timeTransfer(timestamp: any, format?: any): string;
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
export declare function IMTimeTransfer(timestamp: any, format: any, beforeTime: null): string;
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
export declare function chartTimeTransfer(timestamp: any, format: any, beforeTime: null): string;
export declare function isSameWeek(inDate: any): boolean;
export declare function getWeek(today: any): string;
export declare function isYestday(theDate: any): boolean;
export declare function isToday(date: any): boolean;
export declare function getNowFormatDate(): string;
