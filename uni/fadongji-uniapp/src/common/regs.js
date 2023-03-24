// 手机号
const regPhone = /^1[3-9]\d{9}$/
// 身份证
const regIsCardNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
// 邮箱
const regEmail = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/
// 邮编
const regPostCode = /^[0-9][0-9]{5}$/
// 传真
const regFax = /^(\d{3,4}-)?\d{7,8}$/
// 大于等于0的浮点数或者数字字符串
const regFloatNumber = /^[0-9]+.?[0-9]*$/
// 大于等于0的浮点数或者数字字符串
const regIntNumber = /^[0-9]+$/
// 中文
const regChineseFont = /^[\u4e00-\u9fa5]+$/

export default {
  regPhone,
  regIsCardNo,
  regEmail,
  regPostCode,
  regFax,
  regFloatNumber,
  regIntNumber,
  regChineseFont,
}
