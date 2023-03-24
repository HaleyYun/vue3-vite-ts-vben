import { Pattern } from '../src/index'

test('校验输入的值是否是手机号', () => {
  const phone1 = '15565601175'
  const phone2 = '1354451154884'
  expect(Pattern.isPhone(phone1)).toBe(true)
  expect(Pattern.isPhone(phone2)).toBe(false)
})

test('校验邮箱是否正确', () => {
  const email = '815801759@qq.com'
  expect(Pattern.isEmail(email)).toBe(true)
})

test('校验验证码是否是六位数字', () => {
  const smsCode = '123456'
  expect(Pattern.isSmsCode(smsCode)).toBe(true)
})

test('校验是否是浮点数字', () => {
  const test = '12.36'
  expect(Pattern.isFloatName(test)).toBe(true)
})

test('校验数字是否是 0 - 1 之间', () => {
  const test = '0.36'
  expect(Pattern.isZeroDot(test)).toBe(true)
})

test('校验是否是整型', () => {
  const test = 52
  expect(Pattern.isIntNumber(test)).toBe(true)
})

test('校验是否是身份证号', () => {
  const test = '413026199609253455'
  expect(Pattern.isIdCard(test)).toBe(true)
})

test('校验是否是身份证号 一代', () => {
  const test = '450111720930333'
  expect(Pattern.isIdCardOne(test)).toBe(true)
})

test('校验是否是身份证号 二代', () => {
  const test = '413026199609253455'
  expect(Pattern.isIdCardTwo(test)).toBe(true)
})

test('校验密码 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)', () => {
  const test = 'xx222_tt44'
  expect(Pattern.isPassword(test)).toBe(true)
})

test('强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)', () => {
  const test = 'Aa8822xxa'
  expect(Pattern.isStrongPassword(test)).toBe(true)
})

test('校验日期格式否正确 日期格式 yyyy-MM-dd', () => {
  const test = '0.36'
  expect(Pattern.isDateDay(test)).toBe(false)
  expect(Pattern.isDateDay('2022-10-02')).toBe(true)
})

test('校验日期 年-月-日 时:分:秒', () => {
  const test = '2022-10-12 12:12:23'
  expect(Pattern.isDate(test)).toBe(true)
})

test('校验是否是qq', () => {
  const test = '815801759'
  expect(Pattern.isQQ(test)).toBe(true)
})

test('校验是否是邮编', () => {
  const test = '476900'
  expect(Pattern.isZipCode(test)).toBe(true)
})

test('校验是否是银行卡号', () => {
  const test = '6217000490000315744'
  expect(Pattern.isBankCard(test)).toBe(true)
})

test('isIpv4', () => {
  const test = '120.194.6.70'
  expect(Pattern.isIpv4(test)).toBe(true)
})

test('校验是否是微信账号', () => {
  const test = 'ww882234'
  expect(Pattern.isWechatAccount(test)).toBe(true)
})

test('校验是否是护照', () => {
  const test = 'G59370156'
  expect(Pattern.isPassport(test)).toBe(true)
})

test('验是否是新能源车牌', () => {
  const test = '豫AD12345'
  expect(Pattern.isNewEnergy(test)).toBe(true)
})

test('校验是否是汽车车牌 非新能源', () => {
  const test = '豫AS12345'
  const test2 = '皖L2Y631'
  expect(Pattern.isEnergy(test)).toBe(false)
  expect(Pattern.isEnergy(test2)).toBe(true)
})

test('校验host地址 即域名', () => {
  const test = 'www.baidu.com'
  expect(Pattern.isHost(test)).toBe(true)
})

test('校验是否是数字', () => {
  const test = '476900'
  expect(Pattern.isNum(test)).toBe(true)
})

test('校验是否是url地址', () => {
  const test = 'http://www.baidu.com/test.html'
  expect(Pattern.isUrl(test)).toBe(true)
})

test('校验是否是电话号码', () => {
  const test = '0511-4405222'
  expect(Pattern.isMobile(test)).toBe(true)
})

test('校验是否是金额', () => {
  const test = '12.22'
  expect(Pattern.isMoney(test)).toBe(true)
})

test('校验是否是汽车车牌号', () => {
  const test = '豫SE2834'
  expect(Pattern.isCarNum(test)).toBe(true)
})

test('校验是否是16进制颜色值', () => {
  const test = '#FF6400'
  expect(Pattern.isHexColor(test)).toBe(true)
})

test('校验是否是邮编', () => {
  const test = 'english'
  expect(Pattern.isEnglish(test)).toBe(true)
})

test('校验是否是中文', () => {
  const test = '中文'
  expect(Pattern.isChinese(test)).toBe(true)
})

test('校验是否是24小时制时间', () => {
  const test = '23:12:12'
  expect(Pattern.isTime24(test)).toBe(true)
})

test('校验是否是12小时制', () => {
  const test = '8:22:35'
  expect(Pattern.isTime12(test)).toBe(true)
})

test('校验base64格式字符串', () => {
  const base64 =
    'data:image/png;base64,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'

  expect(Pattern.isBase64(base64)).toBeTruthy()
})

test('校验是否是金额 支持千分位', () => {
  const test = '7,654,321'
  expect(Pattern.isMoneyAll(test)).toBe(true)
})

test('校验图片格式', () => {
  const test = 'http://img.aliyun.com/code/test.png'
  expect(Pattern.isImgUrl(test)).toBe(true)
})

test('验证是否是视频图片', () => {
  const test = 'http://img.aliyun.com/code/test.mp4'
  expect(Pattern.isVideoUrl(test)).toBe(true)
})

test('校验是否是版本号 x.x.x 格式', () => {
  const test = '1.22.33'
  expect(Pattern.isVersion(test)).toBe(true)
})

test('校验是否是guid 或者 uuid', () => {
  const test = '344fb8dc-e80c-4980-8f60-102e37ea25e4'
  expect(Pattern.isGuidOrUuid(test)).toBe(true)
})

test('校验是否是md5加密的字符串', () => {
  const test = 'dd025f2d2d1553b4ea6bc4e765a1d683'
  expect(Pattern.isMd5(test)).toBe(true)
})

test('校验是否是信用代码', () => {
  const test = '913101175821220588'
  expect(Pattern.isCreditCode(test)).toBe(true)
})

test('校验是否是火车车次号', () => {
  const test = 'D14'
  expect(Pattern.isTrainNum(test)).toBe(true)
})
