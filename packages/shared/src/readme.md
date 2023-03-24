# @vocen/shared工具类

沃森通用工具类包 @vocen/shared，包含 lodash 工具类、decimaljs 数字精度计算类、常用业务工具类方法、常用正则，正则校验方法、通用状态类等

## 工具类说明

### 类型集合

| 工具类型                                   | 类型说明                  |
| -------------------------------------------- | --------------------------- |
| [Validator](/shared/readMe.html#pattern类) | 表单校验类                |
| [Pattern](/shared/readMe.html#pattern类)   | 正则类                    |
| [Decimal](/shared/readMe.html#decimal类)   | 数字精度计算              |
| [Lodash](/shared/readMe.html#lodash类)     | 通用lodash工具类          |
| [VoUtils](/shared/readMe.html#voutils类)   | 沃森业务工具类            |
| [VoHttp](/shared/readMe.html#vohttp类)     | 兼容pc和uni端的数据请求库 |
| [Encrypt](/shared/readMe.html#encrypt类)   | 非对称加密解密库        |
| [Store](/shared/readMe.html#store类)       | 通用状态管理类            |
| ...                                        | ...                       |

### 使用方法

1、切换内网镜像，可参考[第三方依赖管理](/engineering/readMe.html#第三方依赖管理)

2、安装使用，推荐使用[pnpm](https://www.pnpm.cn/installation)

```
pnpm add @vocen/shared
```

3、使用方式 (根据业务需求，引入相应的模块，即可使用，具体方法请参考使用文档说明)

```
import { Store, VoUtils, _, Pattern, Decimal, Validator, VoHttp } from '@vocen/shared'
```

## Validator类

### 使用方式

```
import { Validator } from '@vocen/shared'

const source = {};
const rule = {};
const mul = false;

const validator = new Validator(source, rule, mul);

const result = validator.validate((valid, errors) => {
    if(valid) {
        // 校验通过执行的逻辑
    } else {
        // 校验不通过，可根据返回的errors进行业务端进行提示
    }
})
```

### 参数说明

校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)

#### source

```
    # source
    需要校验的对象
    比如：
    {
        name: 'xx',
        age: '12'
    }
```

#### rule

```
# rule
校验规则
{
  email: [
    { type: 'string', required: true, pattern: Schema.pattern.email },
    {
      validator(rule, value, callback, source, options) {
        const errors = [];
        // test if email address already exists in a database
        // and add a validation error to the errors array if it does
        return errors;
      },
    },
  ],
};
```

##### Type

`type`要使用的验证器。认可的类型值为

- string: 必须是类型 string。This is the default type.
- number: 必须是类型 number。
- boolean: 必须是类型 boolean。
- method: 必须是类型 function。
- regexp: 必须是 RegExp 创建新的时不产生异常的实例或字符串 RegExp。
- integer: 必须是类型 number 和整数。
- float: 必须是类型 number 和浮点数。
- array: 必须是由 确定的数组 Array.isArray。
- object: 必须是 typeobject 而不是 Array.isArray。
- enum: 值必须存在于 enum.
- date：值必须是有效的，由 Date
- url: 必须是类型 url。
- hex: 必须是类型 hex。
- email: 必须是类型 email。
- any: 可以是任何类型。

##### Required

`require` `drule` 属性指示该字段必须存在于正在验证的源对象上。

##### Pattern

`pattern` `rule` 属性指示值必须匹配才能通过验证的正则表达式

##### Range

使用`min`和`max`属性定义范围。`For ` `string` 和 `array` `types `比较针对 `length`, for `number` `types `数字不能小于`min`或大于`max`。

##### Length

要验证字段的确切长度，请指定`len`属性。对属性执行`string`和`array`类型比较，对于类型，此属性指示与 的完全匹配，即它只能严格等于。`length` `number` `number` `len`

如果该`len`属性与`min`和 max 范围属性结合使用，`len`则优先。

Enumerable

> 从 3.0.0 版开始，如果要验证值 0 或 false 内部 enum 类型，则必须显式包含它们。

要验证可能值列表中的值，请使用具有列出字段有效值`enum`的属性的类型，例如：`enum`

```
const descriptor = {
  role: { type: 'enum', enum: ['admin', 'user', 'guest'] },
};
```

#### mul

返回格式 mul = false; // 单个返回， 从上往下依次验证，如遇到输入错误，则返回报错的第一个失败信息 mul = true; // 返回所有的输入错误的信息

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

## Decimal类

### Decimal 介绍

JavaScript 的任意精度 Decimal 类型，解决 js 业务中，遇到的数字计算精度问题，比如 0.1 + 0.2 = 0.3 但是在 js 中就是 0.30000000000000004，使用 decimal
类，此问题就会迎刃而解，不用再担心精度问题

### 使用方式

```
import { Decimal } from '@vocen/shared';
const a = 0.1;
const b = 0.2;
// 求 a + b 的值

// 第一种方式
const c = new Decimal.add(a, b).toNumber();
// c = 0.3

// 第二种
const c = new Decimal(a).plus(b).toNumber();
// c = 0.3
```

### 常用方法

#### 加法

```
const z = Decimal.add(x, y).toNumber();
```

#### 减法

```
const z = Decimal.sub(x, y).toNumber();
```

#### 乘法

```
const z = Decimal.mul(x, y).toNumber();
```

#### 除法

```
const z = Decimal.div(x, y).toNumber();
```

### Decimal 的 api 方法大全

更多 Decimal 探索请参考 [decimal 文档](http://mikemcl.github.io/decimal.js/)

![API](https://raw.githubusercontent.com/MikeMcl/decimal.js/gh-pages/API.png)

## Lodash类

### lodash 介绍

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库，包含了，数组、集合、函数、语言、数学、数字、对象、Seq、字符串、使用函数、Properties、Methods 等类型的工具类。

### lodash 使用方式

```
import { _ } from '@vocen/shared';

const arr = _.concat([1,3], [3,4]);
// [1, 2, 3, 4]
```

更多使用方式请参考 [lodash 文档](https://www.lodashjs.com/)

## VoUtils 类

### 介绍

VoUtils 是根据具体业务需求，抽离出来的通用的工具方法，根据出来的方法特性，分为字符串类、对象类、函数类、数组类、时间类、web 类分类，可根据具体的业务使用其中提供的方法。

### 使用方式

```
import { VoUtils } from '@vocen/shared';


const timeStr = VoUtils.formatTime('1648025122');
console.log(timeStr)
// timeStr 输出 刚刚
```

## VoHttp类

### 使用说明

VoHttp类是基于 uni-app端和H5端 使用的数据请求类 进行封装的 request通用数据交互类，兼容移动端、PC端、uni-app，一次配置，适配多端， 注意： 仅仅是使用方法，具体实现则以业务端进行维护.

基于VoHttp类，实现分为 uni端 AppHttp类， 和 pc端 AdminHttp类，具体实现方式如下

### 使用方式

第一步： 引用当前端需要的http类库

```
// app端
import { AppHttp } from '@vocen/shared'

// admin管理后台端
import { AdminHttp } from '@vocen/shared'
```

第二步：实例化使用端的数据请求类

```
// 以app端为例
// 假设 app端封装的 request实例为  httpRequest

import httpRequest from 'xxxxx封装文件路径'
const http = new AppHttp({
  device: 'UNI',
  requestInstance:   httpRequest
});

// 另外终端封装的数据请求类，必须事项以下基础数据请求方法 统一返回 request Promise对象



// get请求
httpRequest.apiGet({url, data, version, options })

// post请求
httpRequest.apiPost({url, data, version, options })

// put 请求
httpRequest.apiPut({url, data, version, options })

// delete 请求
httpRequest.apiDelete({url, data, version, options })

// 其他封装的数据请求方法
http.test({}).then(result => {
    console.log(result)
})
```

### 方法介绍

#### apiGet( { url, data = {}, version, options = {} })

#### apiPost( { url, data = {}, version, options = {} })

#### apiPut( { url, data = {}, version, options = {} })

#### apiDelete( { url, data = {}, version, options = {} })

get/post/put/delte 请求

#### 参数说明

url: 请求地址 data: 请求数据 options: 额外配置 version: 接口版本 备注：

### 实例化

```
import { AppHttp } from '@vocen/shared'

const http = new AppHttp(options)
```

### options参数说明

| 参数名称        | 参数类型 | 必选 | 参数说明                        | 参数值       |
| ----------------- | ---------- | ------ | --------------------------------- | -------------- |
| device          | string   | 否   | 设置类型（默认PC）              | PC/UNI       |
| requestInstance | boolean  | 是   | 终端设别分装的实例化request请求 | 参考各端实现 |

### admin端 示例

```
// 假设 admin端封装的 request实例为  httpRequest
import httpRequest from 'xxxxx封装文件路径'
const http = new appHttp({
  device: 'PC',
  requestInstance:   httpRequest
});
```

### 业务使用方法

#### app端

app端调用封装好的通用方法，方法名称和功能说明如下

##### `function appTestList({ data: ''})`

测试方法

#### admin端

admin端调用封装好的通用方法，方法名称和功能说明如下

##### `function adminTestList({ data: ''})`

测试方法

## Encrypt类

### Encrypt 介绍

Encrypt 是非对称加密和解密的工具类

### Encrypt 使用方式

```
import { Encrypt } from '@vocen/shared';

// 公钥和私钥可根据实际业务需求进行配置
const encrypt = new Encrypt({
  publicKey: '公钥' // 用公钥进行加密
  privateKey: '私钥' // 用私钥进行解密
})

// 加密  === 必须进行配置 公钥

const ret1 = encrypt.encrypt('需要加密的字符串')


// 解密  === 必须进行配置 私钥

const ret2 = encrypt.decrypt('需要解密的字符串')
```

## VoUtils类

### 介绍

VoUtils是根据具体业务需求，抽离出来的通用的工具方法，根据出来的方法特性，分为字符串类、对象类、函数类、数组类、时间类、web类分类，可根据具体的业务使用其中提供的方法。

### 使用方式

```
import { VoUtils } from '@vocen/shared';


const timeStr = VoUtils.formatTime('1648025122');
console.log(timeStr)
// timeStr 输出 刚刚
```

### 字符串类

#### `toString(val: any): string`

把输入的值转换为字符串

```
const test = 123;
const ret = VoUtils.toString(test);
console.log(ret)
// ret 输出 '123'
```

#### `function encryptPhone(phone: string): string `

手机号加密 输出类似 `155 **** 1175` 的格式

```
const test = 15565601175;
const ret = VoUtils.encryptPhone(test);
console.log(ret)
// ret 输出 '155 **** 1175'
```

### 对象类

#### `hasOwn(obj: Object | any[], key: string): boolean`

判断当前对象是否含有某个属性

```
const test = { name: 'hello'};

const ret1 = VoUtils.hasOwn(test, 'name');
const ret2 = VoUtils.hasOwn(test, 'age');
console.log(ret1)
console.log(ret2)
// ret1输出 true
// ret2输出 false
```

#### `isObject(obj: Object): boolean`

判断当前对象是否是对象类型

```
const test = {a: 1};

const ret = VoUtils.isObject(test);
console.log(ret)
// ret 输出 true
```

#### `emptyObject `

返回一个冻结的空对象、不可以修改

```


const ret = VoUtils.emptyObject;
console.log(ret)
// ret 输出 {}
```

### 函数类

#### `checkIsEmpty(param: any): boolean`

返回一个变量是否为空 `undefined` `0` `空` 返回为 true

```
const test = undefined;

const ret = VoUtils.checkIsEmpty(test);
console.log(ret)
// ret 输出 true
```

#### `toNumber(val: string): number | string`

将输入值转换为数字，如果转换失败，则返回原字符串

```
const test = '20';

const ret = VoUtils.toNumber(test);
console.log(ret)
// ret 输出 20
```

#### `isPromise(val: any): boolean`

判断当前实例是否是 Promise 对象

```
const test = new Promise(() => {});

const ret = VoUtils.isPromise(test);
console.log(ret)
// ret 输出 true
```

#### ` toRawType(value: any): string`

获取值得原始类型字符串原始类型 `String` `Number` `Array` `Null` `RegExp` `Undefined` `Boolean` `Object` `Function` `Symbol`

```
const test = '20';

const ret = VoUtils.toRawType(test);
console.log(ret)
// ret 输出 String
```

#### `isRegExp(v: any): boolean`

判断当前对象是否是正则实例化对象

```
const test = /\d/g;

const ret = VoUtils.isRegExp(test);
console.log(ret)
// ret 输出 true
```

#### `isUndef(v: any): boolean`

判断变量是否 非 undefined

```
const test = '20';

const ret = VoUtils.isUndef(test);
console.log(ret)
// ret 输出 true
```

#### `isDef(v: any): boolean`

判断变量是否 是 undefined

```
const test = undefined;

const ret = VoUtils.isDef(test);
console.log(ret)
// ret 输出 true
```

#### `isTrue(v: any): boolean`

判断变量是否是 假值

```
const test = true;

const ret = VoUtils.isTrue(test);
console.log(ret)
// ret 输出 true
```

#### `isFalse(v: any): boolean `

判断变量是否是 假值

```
const test = false;

const ret = VoUtils.isFalse(test);
console.log(ret)
// ret 输出 true
```

#### `getRandomColor(): string `

获取随机css颜色值， 返回 `rgb` 颜色字符串

```

const ret = VoUtils.getRandomColor();
console.log(ret)
// ret 输出 rgb(123, 234, 133)
```

#### ` function transformUrl(url: string): string `

获取静态资源 url地址，如果是全路径则原样返回

```
设置： CDN 地址为： www.test.com
const ret = VoUtils.transformUrl(‘/test/a.png’);
console.log(ret)
// ret 输出 http://www.test.com/test/a.png
```

#### ` function transformDateByType(num: number, type: string): string[] `

获取月份或者年份的开始时间和结束时间

```
例如 transformDateByType(1, 'month')  // 获取近一个月的开始时间和结束时间
结果：['2022-07-04 14:15:33', '2022-08-04 14:15:33']

例如 transformDateByType(2022, 'year')  // 获取2022年的开始时间和结束时间
结果：['2022-01-01 00:00:00', '2023-01-01 00:00:00']
```

### 数组类

#### `remove(arr: Array<any>, item: any)`

删除数组元素中的一个值 仅支持一维数组如果传入的非数组，则无返回值

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.remove(arr, 2);
console.log(ret)
// ret 输出 [1, 3, 4]
```

#### `isValidArrayIndex(val: any): boolean`

检测是否是有效的数组索引

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.isValidArrayIndex(arr);
console.log(ret)
// ret 输出 true
```

#### `ensureArray = (arr: any): any[]`

确保一个变量返回的事一个数组类型,如果传入的非数组类型，则返回一个空数组

```
const arr1 = [1, 2, 3, 4];
const arr2 = 123123;

const ret1 = VoUtils.ensureArray(arr1);
const ret2 = VoUtils.ensureArray(arr2);
console.log(ret1)
console.log(ret2)
// ret1 输出 [1, 2, 3, 4]
// ret2 输出 []
```

#### `isArray(arr: any): boolean`

判断传入的参数变量是否是数组

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.isArray(arr);
console.log(ret)
// ret 输出 true
```

#### `orderByDesc(arr: Array<any>): Array<any>`

一维数组降序排序

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.orderByDesc(arr);
console.log(ret)
// ret 输出 [4,3,2,1]
```

#### `function orderByAsc(arr: Array<any>): Array<any>`

一维数组升序排序

```
const arr = [4,3,2,1];

const ret = VoUtils.orderByAsc(arr);
console.log(ret)
// ret 输出 [1, 2, 3, 4]
```

#### `function orderPropertyByDesc(arr: Array<object>, property: string): Array<object>`

对象一维数组 降序排列

```
const arr = [{ name: 'zs1', age: 1 }, { name: 'zs2', age: 2 }, { name: 'zs2', age: 3 }];

const ret = VoUtils.orderPropertyByDesc('age');
console.log(ret)
// ret 输出 [ { name: 'zs2', age: 3 },{ name: 'zs2', age: 2 },{ name: 'zs1', age: 1 }]
```

#### `function orderPropertyByAsc(arr: Array<object>, property: string): Array<object>`

对象一维数组 升序排列

```
const arr = [ { name: 'zs2', age: 3 },{ name: 'zs2', age: 2 },{ name: 'zs1', age: 1 }];

const ret = VoUtils.orderPropertyByAsc('age');
console.log(ret)
// ret 输出 [{ name: 'zs1', age: 1 }, { name: 'zs2', age: 2 }, { name: 'zs2', age: 3 }]
```

### 时间类

#### `timeFormat(dateTime: any, formatStr = 'yyyy-mm-dd hh:MM:ss'): string`

传入时间戳后，返回格式化后的时间 返回格式可进行配置默认返回 yyyy-mm-dd hh:MM:ss 格式

```
const timestamp = 1648098884;

const ret = VoUtils.timeFormat(timestamp);
console.log(ret)
// ret 输出 2022-03-24 13:14:44
```

#### `timeTransfer(timestamp: any, format = 'yyyy-mm-dd'): string`

时间处理函数五分钟以内显示刚刚；一小时以内显示几分钟前； 24 小时内显示几小时前；超过 24 小时三天内（含三天）显示几天前； 3 天以上显示具体日期，到天具体某一天。超过一年显示年份，显示年份

```
const timestamp = (new Date().getTime()/1000).toFixed(0);
支持 时间戳格式  和 YYYY-MM-DD HH:mm:ss  和 YYYY-MM-DD 三种格式 

const ret = VoUtils.timeTransfer(timestamp);
console.log(ret)
// ret 输出 刚刚
```

## VoStorage 类

### 使用说明

VoStorage类是兼容 PC端 移动端 uni-app 三端的本地存储 stoarge的封装，使用前必须进行实例化该类，传入device参数，说明是哪一端，默认是 device： 'PC' pc 和 移动端，
如果要在uni-app中使用，则进行使用 device：‘UNI’,当前类挂在在VoUtils工具类方法中，使用方式如下

使用方式

```

import { VoUtils } from '@vocen/shared'

const storage = new VoUtils.VoStorage({ device: 'PC' })

storage.get(key)

storage.set(key, val)

storage.remove(key)

storage.clear()

```

### 方法说明

创建实例

创建`const store = new VoUtils.VoStorage({ device: 'PC''})`实例，`store`提供的 API 如下

| 参数    | 说明                         | return  | 调用方式                                                      |
|-------| ----------------------------  |---------|-----------------------------------------------------------|
| has   | 判断本地存储的数据是否失效        | boolean | store.has('id')                                           |
| get   | 获取本地存储的数据                | string  | store.get(key)                                            |
| set   | 设置本地数据      |         |  | string、boolean、object、number<br/> store.set('test', '122') |
| remove | 删除本地数据                   | boolean | store.delete()                                            |
| clear | 清除全部本地数据                    |         | store.clear()                                             |

## Store类

...待补充
