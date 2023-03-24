import { pinyin } from 'pinyin-pro'

export default {
  /**
   * 获取字符串的第一个中文字的声母
   * @param str
   * @return {string}
   */
  getChineseFirstName(str) {
    if(typeof str !='string' || !str)return '无'
    const ret = pinyin(str[0], { pattern: 'initial' })
    return ret.toUpperCase() // 'h y p y'
  },
}
