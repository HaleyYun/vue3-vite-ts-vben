// 手机号正则

export const phone = /^1[3456789][0-9]{9}$/

// 数字验证码6位正则
export const smsCode = /^[1-9]\d{5}$/

// 邮箱正则
export const email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

// 浮点数字正则
export const float_number = /^-?\d+\.?\d+$/

// 正数
export const positive_number = /^(\+)?\d+(\.\d+)?$/

// 0 - 1 正则
export const zero_dot = /^(1|0(\.(\d?)(\d?)([1-9]?))?)$/

// 整型正则
export const int_number = /^[0-9]*$/

// 正数、负数、和小数正则
export const number = /^(\-|\+)?\d+(\.\d+)?$/

// 汉字 数字 字母 不支持特殊符号
export const standard_name =
  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\u4E00-\u9FA5])[\u4E00-\u9FA5A-Za-z0-9]*$/

//
// 。
export const standard_password = /^[a-zA-Z0-9]{6,16}$/

// 身份证号
export const id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 身份证号 一代
export const id_card_one = /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/

// 身份证号 二代
export const id_card_two = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/

// 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
export const password = /^[a-zA-Z]\w{5,17}$/

//强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：
export const strong_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/

// 日期格式 yyyy-MM-dd
export const date_day = /^\d{4}-\d{1,2}-\d{1,2}/

// 可以被moment转化成功的时间 YYYY-MM-DD HH:mm:ss
export const date =
  /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/

// 腾讯qq号
export const qq = /[1-9][0-9]{4,}/

// 邮编地址
export const zipcode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/

//验证银行卡 16位或19位
export const bank_card = /^([1-9]){1}(\d{15,})$/

// ipv4地址
export const ipv4 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

// 微信号
export const weichat_account = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/

// 护照
export const passport =
  /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/

// 新能源车牌号
export const new_energy =
  /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]$/

// 非新能源
export const energy =
  /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5}$/

// 域名
export const host = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/

// 空白行
export const white = /\n\s*\r/

// 匹配正数、负数、和小数
export const num = /^(\-|\+)?\d+(\.\d+)?$/

// url 地址
export const url =
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/

// 国电话号码（包括移动和固定电话)
export const mobile = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{3,14}/

// 数字/货币金额 (只支持正数、不支持校验千分位分隔符)
export const money =
  /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/

// 车牌号
export const car_num =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/

// 16进制颜色
export const hex_color = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

// 中文
export const chinese =
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/

// 英文
export const english = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/

// 24小时制时间（HH:mm:ss）
export const time24 = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/

// 12小时制时间（hh:mm:ss）
export const time12 = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/

// base64格式
export const base64 =
  /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i

// 数字/货币金额（支持负数、千分位分隔符
export const money_all = /^-?\d+(,\d{3})*(\.\d{1,2})?$/

// 图片(image)链接地址（图片格式可按需增删）
export const imgUrl = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/

// 视频video 连接地址（视频格式可按需增删）
export const video_url =
  /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/

// 音频格式
export const audio_url = /^https?:\/\/(.+\/)+.+(\.(mp3|aac|wma|ogg|mpc|flac|ape|pcm|aiff|wav))$/

// 版本号(version)格式必须为X.Y.Z
export const version = /^\d+(?:\.\d+){2}$/

// guid 和 uuid 正则
export const GUID_UUID = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/

// md5格式
export const md5 = /^([a-f\d]{32}|[A-F\d]{32})$/

// 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
export const credit_code = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/

// 火车车次
export const train_number = /^[GCDZTSPKXLY1-9]\d{1,4}$/

// 校验手机号是否正确
export function isPhone(str: string): boolean {
  return phone.test(str.toString())
}

// 是否是是正数
export function isPositiveNumber(str: string): boolean {
  return positive_number.test(str.toString())
}

// 校验邮箱是否正确
export function isEmail(str: string): boolean {
  return email.test(str.toString())
}

// 校验验证码是否是六位数组
export function isSmsCode(str: string | number): boolean {
  return smsCode.test(str.toString())
}

// 校验是否是浮点数字
export function isFloatName(str: number | string): boolean {
  return float_number.test(str.toString())
}

// 校验数字是否是 0 - 1
export function isZeroDot(str: number | string): boolean {
  return zero_dot.test(str.toString())
}

// 校验是否是整型
export function isIntNumber(str: number | string): boolean {
  return int_number.test(str.toString())
}

// 校验是否是身份证号
export function isIdCard(str: string): boolean {
  return id_card.test(str.toString())
}

// 校验是否是身份证号 一代
export function isIdCardOne(str: string): boolean {
  return id_card_one.test(str.toString())
}

// 校验是否是身份证号 二代
export function isIdCardTwo(str: string): boolean {
  return id_card_two.test(str.toString())
}

// 校验密码 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
export function isPassword(str: string): boolean {
  return password.test(str.toString())
}

//强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：
export function isStrongPassword(str: string): boolean {
  return strong_password.test(str.toString())
}

// 校验年月日格式
export function isDateDay(str: string): boolean {
  return date_day.test(str.toString())
}

// 校验日期 年-月-日 时:分:秒
export function isDate(str: string): boolean {
  return date.test(str.toString())
}

// 校验是否是qq
export function isQQ(str: string): boolean {
  return qq.test(str.toString())
}

// 校验是否是邮编
export function isZipCode(str: string): boolean {
  return zipcode.test(str.toString())
}

// 校验是否是银行卡号
export function isBankCard(str: string): boolean {
  return bank_card.test(str.toString())
}

// 校验是否是ipv4地址
export function isIpv4(str: string): boolean {
  return ipv4.test(str.toString())
}

// 校验是否是微信账号
export function isWechatAccount(str: string): boolean {
  return weichat_account.test(str.toString())
}

// 校验是否是护照
export function isPassport(str: string): boolean {
  return passport.test(str.toString())
}

// 校验是否是新能源车牌
export function isNewEnergy(str: string): boolean {
  return new_energy.test(str.toString())
}

// 校验是否是汽车车牌 非新能源
export function isEnergy(str: string): boolean {
  return energy.test(str.toString())
}

// 校验host地址
export function isHost(str: string): boolean {
  return host.test(str.toString())
}

// 校验是否是空白

// 校验是否是数字
export function isNum(str: string): boolean {
  return num.test(str.toString())
}

// 校验是否是url地址
export function isUrl(str: string): boolean {
  return url.test(str.toString())
}

// 校验是否是电话号码
export function isMobile(str: string): boolean {
  return mobile.test(str.toString())
}

// 校验是否是金额
export function isMoney(str: string): boolean {
  return money.test(str.toString())
}

// 校验是否是汽车车牌号
export function isCarNum(str: string): boolean {
  return car_num.test(str.toString())
}

// 校验是否是16进制颜色值
export function isHexColor(str: string): boolean {
  return hex_color.test(str.toString())
}

// 校验是否是中文
export function isChinese(str: string): boolean {
  return chinese.test(str.toString())
}

// 校验是否是英文
export function isEnglish(str: string): boolean {
  return english.test(str.toString())
}

// 校验是否是24小时制时间
export function isTime24(str: string): boolean {
  return time24.test(str.toString())
}

// 校验是否是12进制时间
export function isTime12(str: string): boolean {
  return time12.test(str.toString())
}

// 校验是否是base64字符串
export function isBase64(str: string): boolean {
  return base64.test(str.toString())
}

// 校验是否是金额 支持千分位
export function isMoneyAll(str: string): boolean {
  return money_all.test(str.toString())
}

// 校验是否是图片地址
export function isImgUrl(str: string): boolean {
  return imgUrl.test(str.toString())
}

// 校验是否是视频地址
export function isVideoUrl(str: string): boolean {
  return video_url.test(str.toString())
}

// 校验是否是音频地址
export function isAudioUrl(str: string): boolean {
  return audio_url.test(str.toString())
}

// 校验是否是版本号 x.x.x 格式
export function isVersion(str: string): boolean {
  return version.test(str.toString())
}

// 校验是否是guid 或者 uuid
export function isGuidOrUuid(str: string): boolean {
  return GUID_UUID.test(str.toString())
}

// 校验是否是md5加密的字符串
export function isMd5(str: string): boolean {
  return md5.test(str.toString())
}

// 校验是否是信用代码
export function isCreditCode(str: string): boolean {
  return credit_code.test(str.toString())
}

// 校验是否是火车车次号
export function isTrainNum(str: string): boolean {
  return train_number.test(str.toString())
}

// 检验是否是标准的名称 只包含 中文 英文 数字 组合
export function isStandardName(str: string): boolean {
  return standard_name.test(str.toString())
}

// 检测是否是标准的 6- 16 位 数字和字母组合的密码
export function isStandardPassword(str: string): boolean {
  return standard_password.test(str.toString())
}
