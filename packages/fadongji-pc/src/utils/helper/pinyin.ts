import { pinyin } from 'pinyin-pro'



export function getChineseFirstName(str) {
  if(typeof str !='string' || !str)return '无'
  const ret = pinyin(str[0], { pattern: 'first', toneType: 'none' })
  return ret.toUpperCase() // 'h y p y'
}
