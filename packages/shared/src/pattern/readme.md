## Pattern类

Pattern 类里面，提供了常用的正则表达式和常用的正则校验函数

### 使用方式

```
import { Pattern } from '@vocen/shared'

// 手机号正则表达式
const phoneReg = Pattern.phone;


// 验证手机号是否正确
const phone = '15565601175'
const result = Pattern.isPhone(phone);
// 返回 true

```

### 常用正则表达式

---

#### phone

手机号

```
const phone = /^1[3456789][0-9]{9}$/;
```

#### smsCode

数字验证码 6 位

```
const smsCode = /^[1-9]\d{5}$/;
```

#### email

邮箱

```
const email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
```

#### float_number

浮点数字

#### positive_number

正数或者大于0的数

```
const float_number = /^-?\d+\.?\d+$/;
```

#### zero_dot

0 - 1

```
const zero_dot = /^(1|0(\.(\d?)(\d?)([1-9]?))?)$/;
```

#### int_number

整型

```
const int_number = /^[0-9]*$/;
```

#### number

正数、负数、和小数正则

```
const number = /^(\-|\+)?\d+(\.\d+)?$/;
```

#### standard_name

标准名字正则： 名字字符串组成规则， 只包含数字，中文（汉字），英文组合

```
const standard_name = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\u4E00-\u9FA5])[\u4E00-\u9FA5A-Za-z0-9]*$/;
```

#### standard_password

标准密码正则： 密码可以用字母、数字组合，不区分大小写， 密码长度需在6-16位。

```
const standard_password = /^[a-zA-Z0-9]{6,16}$/
```

#### id_card

身份证号

```
const id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
```

#### id_card_one

身份证号 一代

```
const id_card_one = /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/;
```

#### id_card_two

身份证号 二代

```
const id_card_two = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/;
```

#### password

密码(以字母开头，长度在 6~18 之间，只能包含字母、数字和下划线)

```
const password = /^[a-zA-Z]\w{5,17}$/;
```

#### strong_password

强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)：

```
const strong_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
```

#### date_day

日期格式 yyyy-MM-dd

```
const date_day = /^\d{4}-\d{1,2}-\d{1,2}/;
```

#### date

可以被 moment 转化成功的时间 YYYYMMDD HH:mm:ss

```
const date =/^\d{4}([/:-\\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

```

#### qq

腾讯 qq 号

```
const qq = /[1-9][0-9]{4,}/;
```

#### zipcode 邮编地址

```
const zipcode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;

```

#### bank_card

验证银行卡 16 位或 19 位

```
const bank_card = /^([1-9]{1})(\d{15}|\d{18})$/;
```

#### ipv4

ipv4 地址

```
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

```

#### weichat_account

微信号

```
const weichat_account = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
```

#### passport

护照

```
const passport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
```

#### car_num

车牌号

```
const car_num = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;

```

#### new_energy

新能源车牌号

```
const new_energy = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
```

#### energy

非新能源

```
const energy = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
```

#### host

域名

```
const host = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
```

#### white

空白行

```
const white = /\n\s*\r/;
```

#### num

匹配正数、负数、和小数

```
const num = /^(\-|\+)?\d+(\.\d+)?$/;
```

#### url

url 地址

```
const url = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;

```

#### mobile

国电话号码（包括移动和固定电话)

```
const mobile = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
```

#### money_all

数字/货币金额（支持负数、千分位分隔符）

```
const money_all = /^-?\d+(,\d{3})*(\.\d{1,2})?$/;
```

#### money

// 数字/货币金额 (只支持正数、不支持校验千分位分隔符)

```
const money = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;

```

#### hex_color

16 进制颜色

```
const hex_color = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
```

#### chinese

中文（汉字）

```
const chinese = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;

```

#### english

英文（英语 English english）

```
const english = /(1^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
```

#### time24

// 24 小时制时间（HH:mm:ss）

```
const time24 = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
```

#### time12

// 12 小时制时间（hh:mm:ss）

```
const time12 = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;
```

#### base64

base64 格式

```
const base64 = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/;

```

#### imgUrl

图片(image)链接地址（图片格式可按需增删）

```
const imgUrl = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/;
```

#### phone

视频 video 连接地址（视频格式可按需增删）

```
video_url = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/;

```

#### version

版本号(version)格式必须为 X.Y.Z

```
const version = /^\d+(?:\.\d+){2}$/;
```

#### GUID_UUID

guid 和 uuid 正则

```
const GUID_UUID = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/;
```

#### md5

md5 格式

```
const md5 = /^([a-f\d]{32}|[A-F\d]{32})$/;
```

#### credit_code

统一社会信用代码(宽松匹配)(15 位/18 位/20 位数字/字母)

```
const credit_code = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
```

#### train_number

火车车次

```
const train_number = /^[GCDZTSPKXLY1-9]\d{1,4}$/;
```

### 常用正则校验方法

#### isPhone(string)

校验手机号是否正确

```
const phone = '15565601175';
Pattern.isPhone(phone); // 返回true
```

#### isEmail(string)

校验邮箱是否正确

```
const emain = '815801759@qq.com';
Pattern.isEmail(emain); // 返回true
```

#### isSmsCode(string)

校验验证码是否是六位数字

```
const smsCode = '123456';
Pattern.isSmsCode(smsCode); // 返回true
```

#### isFloatName(string)

校验是否是浮点数字

```
const floatNumber = '1.2';
Pattern.isFloatName(floatNumber); // 返回true
```

#### isZeroDot(string)

校验数字是否是 0 - 1 之间

```
const num = '0.1';
Pattern.isZeroDot(num); // 返回true
```

#### isIntNumber(string)

校验是否是整型

```
const intNum = '52';
Pattern.isIntNumber(intNum); // 返回true
```

#### isIdCard(string)

校验是否是身份证号

```
const idCard = '413026199609253455';
Pattern.isIdCard(idCard); // 返回true
```

#### isIdCardOne(string)

校验是否是身份证号 一代

```
const idCard = '450111720930333';
Pattern.isIdCardOne(idCard); // 返回true

```

#### isIdCardTwo(string)

校验是否是身份证号 二代

```
const idCard = '413026199609253455';
Pattern.isIdCardTwo(idCard); // 返回true
```

#### isPhone(string)

校验手机号是否正确

```
const phone = '15565601175';
Pattern.isPhone(phone); // 返回true
```

#### isPassword(string)

校验密码 密码(以字母开头，长度在 6~18 之间，只能包含字母、数字和下划线)

```
const password = 'xx222_tt44';
Pattern.isPassword(password); // 返回true
```

#### isStrongPassword(string)

强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)：

```
const password = 'Aa8822xxa';
Pattern.isStrongPassword(password); // 返回true
```

#### isDateDay(string)

校验手机号是否正确 日期格式 yyyy-MM-dd

```
const date = '2022-10-23';
Pattern.isDateDay(date); // 返回true
```

#### isDate(string)

校验日期 年-月-日 时:分:秒

```
const date = '2022-10-12 12:12:23';
Pattern.isDate(date); // 返回true
```

#### isQQ(string)

校验是否是 qq

```
const qq = '815801759';
Pattern.isQQ(qq); // 返回true
```

#### isZipCode(string)

校验是否是邮编

```
const zipCode = '476900';
Pattern.isZipCode(zipCode); // 返回true
```

#### isBankCard(string)

校验是否是银行卡号

```
const bankCard = '6217000490000315744';
Pattern.isBankCard(bankCard); // 返回true
```

#### isIpv4(string)

校验是否是 ipv4 地址

```
const ip = '120.194.6.70';
Pattern.isIpv4(ip); // 返回true
```

#### isWechatAccount(string)

校验是否是微信账号

```
const wx = 'ww882234';
Pattern.isWechatAccount(wx); // 返回true
```

#### isPhone(string)

校验手机号是否正确

```
const phone = '15565601175';
Pattern.isPhone(phone); // 返回true
```

#### isPassport(string)

校验是否是护照

```
const passport = 'G59370156';
Pattern.isPassport(passport); // 返回true
```

#### isNewEnergy(string)

校验是否是新能源车牌

```
const energy = '豫AD12345';
Pattern.isNewEnergy(energy); // 返回true
```

#### isEnergy(string)

校验是否是汽车车牌 非新能源

```
const energy = '豫AS12345';
Pattern.isEnergy(energy); // 返回true
```

#### isPhone(string)

校验 host 地址 即域名

```
const host = 'www.baidu.com';
Pattern.isPhone(host); // 返回true
```

#### isWhite(string)

校验是否是空白

#### isNum(string)

校验是否是数字

```
const num = '12';
Pattern.isNum(num); // 返回true
```

#### isUrl(string)

校验是否是 url 地址

```
const url = 'http://www.baidu.com/test.html';
Pattern.isUrl(url); // 返回true
```

#### isMobile(string)

校验是否是电话号码

```
const mobile = '0511-4405222';
Pattern.isMobile(mobile); // 返回true
```

#### isMoney(string)

校验是否是金额

```
const money = '12.22';
Pattern.isMoney(money); // 返回true
```

#### isCarNum(string)

校验是否是汽车车牌号

```
const card = '豫SE2834';
Pattern.isCarNum(card); // 返回true
```

#### isHexColor(string)

校验是否是 16 进制颜色值

```
const color = '#FF6400';
Pattern.isHexColor(color); // 返回true
```

#### isEnglish(string)

校验手机号是否正确

```
const english = 'English';
Pattern.isEnglish(english); // 返回true
```

#### isChinese(string)

校验是否是中文

```
const chinese = '中文';
Pattern.isChinese(chinese); // 返回true
```

#### isTime24(string)

校验是否是 24 小时制时间

```
const time = '23:12:12';
Pattern.isTime24(time); // 返回true
```

#### isTime12(string)

校验手机号是否正确

```
const time = '8:22:35';
Pattern.isTime12(time); // 返回true
```

#### isBase64(string)

校验手机号是否正确

```
const base64 = 'data:image/png;base64,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';
Pattern.isBase64(base64); // 返回true
```

#### isMoneyAll(string)

校验是否是金额 支持千分位

```
const money = '7,654,321';
Pattern.isMoneyAll(money); // 返回true
```

#### isImgUrl(string)

校验手机号是否正确

```
const img = 'http://img.aliyun.com/code/test.png';
Pattern.isImgUrl(img); // 返回true
```

#### isVideoUrl(string)

isVideoUrl

```
const video = 'http://img.aliyun.com/code/test.mp4';
Pattern.isVideoUrl(video); // 返回true
```

#### isVersion(string)

校验是否是版本号 x.x.x 格式

```
const v = '1.22.33';
Pattern.isVersion(v); // 返回true
```

#### isGuidOrUuid(string)

校验是否是 guid 或者 uuid

```
const uuid = '344fb8dc-e80c-4980-8f60-102e37ea25e4';
Pattern.isGuidOrUuid(uuid); // 返回true
```

#### isMd5(string)

校验是否是 md5 加密的字符串

```
const md5 = 'dd025f2d2d1553b4ea6bc4e765a1d683';
Pattern.isMd5(md5); // 返回true
```

#### isCreditCode(string)

校验是否是信用代码

```
const credit_code = '913101175821220588';
Pattern.isCreditCode(credit_code); // 返回true
```

#### isTrainNum(string)

校验是否是火车车次号

```
const t = 'D14';
Pattern.isTrainNum(t); // 返回true
```

#### isTrainNum(string)

校验是否是标准的名字-只包含中文数字数字的随意组合，不包含其他字符

```
const t = '中国YYYDS';
Pattern.isStandardName(t); // 返回true
```

#### function isStandardPassword(str: string): boolean

检测是否是标准的 6- 16 位 数字和字母组合的密码

```
const t = '123123';
Pattern.isStandardPassword(t); // 返回false

const p = 'abcd888'
Pattern.isStandardPassword(p); // 返回true
```

#### function isPositiveNumber(str: string): boolean

检测 是否是是大于0的数

```
const t = '123123';
Pattern.isPositiveNumber(t); // 返回true

const p = '-1'
Pattern.isPositiveNumber(p); // 返回false
```
