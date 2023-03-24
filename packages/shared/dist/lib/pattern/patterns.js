"use strict";
// 手机号正则
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isPositiveNumber = exports.isPhone = exports.train_number = exports.credit_code = exports.md5 = exports.GUID_UUID = exports.version = exports.audio_url = exports.video_url = exports.imgUrl = exports.money_all = exports.base64 = exports.time12 = exports.time24 = exports.english = exports.chinese = exports.hex_color = exports.car_num = exports.money = exports.mobile = exports.url = exports.num = exports.white = exports.host = exports.energy = exports.new_energy = exports.passport = exports.weichat_account = exports.ipv4 = exports.bank_card = exports.zipcode = exports.qq = exports.date = exports.date_day = exports.strong_password = exports.password = exports.id_card_two = exports.id_card_one = exports.id_card = exports.standard_password = exports.standard_name = exports.number = exports.int_number = exports.zero_dot = exports.positive_number = exports.float_number = exports.email = exports.smsCode = exports.phone = void 0;
exports.isStandardPassword = exports.isStandardName = exports.isTrainNum = exports.isCreditCode = exports.isMd5 = exports.isGuidOrUuid = exports.isVersion = exports.isAudioUrl = exports.isVideoUrl = exports.isImgUrl = exports.isMoneyAll = exports.isBase64 = exports.isTime12 = exports.isTime24 = exports.isEnglish = exports.isChinese = exports.isHexColor = exports.isCarNum = exports.isMoney = exports.isMobile = exports.isUrl = exports.isNum = exports.isHost = exports.isEnergy = exports.isNewEnergy = exports.isPassport = exports.isWechatAccount = exports.isIpv4 = exports.isBankCard = exports.isZipCode = exports.isQQ = exports.isDate = exports.isDateDay = exports.isStrongPassword = exports.isPassword = exports.isIdCardTwo = exports.isIdCardOne = exports.isIdCard = exports.isIntNumber = exports.isZeroDot = exports.isFloatName = exports.isSmsCode = void 0;
exports.phone = /^1[3456789][0-9]{9}$/;
// 数字验证码6位正则
exports.smsCode = /^[1-9]\d{5}$/;
// 邮箱正则
exports.email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
// 浮点数字正则
exports.float_number = /^-?\d+\.?\d+$/;
// 正数
exports.positive_number = /^(\+)?\d+(\.\d+)?$/;
// 0 - 1 正则
exports.zero_dot = /^(1|0(\.(\d?)(\d?)([1-9]?))?)$/;
// 整型正则
exports.int_number = /^[0-9]*$/;
// 正数、负数、和小数正则
exports.number = /^(\-|\+)?\d+(\.\d+)?$/;
// 汉字 数字 字母 不支持特殊符号
exports.standard_name = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\u4E00-\u9FA5])[\u4E00-\u9FA5A-Za-z0-9]*$/;
//
// 。
exports.standard_password = /^[a-zA-Z0-9]{6,16}$/;
// 身份证号
exports.id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 身份证号 一代
exports.id_card_one = /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/;
// 身份证号 二代
exports.id_card_two = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/;
// 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
exports.password = /^[a-zA-Z]\w{5,17}$/;
//强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：
exports.strong_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
// 日期格式 yyyy-MM-dd
exports.date_day = /^\d{4}-\d{1,2}-\d{1,2}/;
// 可以被moment转化成功的时间 YYYY-MM-DD HH:mm:ss
exports.date = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
// 腾讯qq号
exports.qq = /[1-9][0-9]{4,}/;
// 邮编地址
exports.zipcode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
//验证银行卡 16位或19位
exports.bank_card = /^([1-9]){1}(\d{15,})$/;
// ipv4地址
exports.ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
// 微信号
exports.weichat_account = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
// 护照
exports.passport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
// 新能源车牌号
exports.new_energy = /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]$/;
// 非新能源
exports.energy = /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5}$/;
// 域名
exports.host = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
// 空白行
exports.white = /\n\s*\r/;
// 匹配正数、负数、和小数
exports.num = /^(\-|\+)?\d+(\.\d+)?$/;
// url 地址
exports.url = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
// 国电话号码（包括移动和固定电话)
exports.mobile = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{3,14}/;
// 数字/货币金额 (只支持正数、不支持校验千分位分隔符)
exports.money = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
// 车牌号
exports.car_num = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
// 16进制颜色
exports.hex_color = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
// 中文
exports.chinese = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
// 英文
exports.english = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
// 24小时制时间（HH:mm:ss）
exports.time24 = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
// 12小时制时间（hh:mm:ss）
exports.time12 = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;
// base64格式
exports.base64 = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;
// 数字/货币金额（支持负数、千分位分隔符
exports.money_all = /^-?\d+(,\d{3})*(\.\d{1,2})?$/;
// 图片(image)链接地址（图片格式可按需增删）
exports.imgUrl = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/;
// 视频video 连接地址（视频格式可按需增删）
exports.video_url = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/;
// 音频格式
exports.audio_url = /^https?:\/\/(.+\/)+.+(\.(mp3|aac|wma|ogg|mpc|flac|ape|pcm|aiff|wav))$/;
// 版本号(version)格式必须为X.Y.Z
exports.version = /^\d+(?:\.\d+){2}$/;
// guid 和 uuid 正则
exports.GUID_UUID = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/;
// md5格式
exports.md5 = /^([a-f\d]{32}|[A-F\d]{32})$/;
// 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
exports.credit_code = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
// 火车车次
exports.train_number = /^[GCDZTSPKXLY1-9]\d{1,4}$/;
// 校验手机号是否正确
function isPhone(str) {
    return exports.phone.test(str.toString());
}
exports.isPhone = isPhone;
// 是否是是正数
function isPositiveNumber(str) {
    return exports.positive_number.test(str.toString());
}
exports.isPositiveNumber = isPositiveNumber;
// 校验邮箱是否正确
function isEmail(str) {
    return exports.email.test(str.toString());
}
exports.isEmail = isEmail;
// 校验验证码是否是六位数组
function isSmsCode(str) {
    return exports.smsCode.test(str.toString());
}
exports.isSmsCode = isSmsCode;
// 校验是否是浮点数字
function isFloatName(str) {
    return exports.float_number.test(str.toString());
}
exports.isFloatName = isFloatName;
// 校验数字是否是 0 - 1
function isZeroDot(str) {
    return exports.zero_dot.test(str.toString());
}
exports.isZeroDot = isZeroDot;
// 校验是否是整型
function isIntNumber(str) {
    return exports.int_number.test(str.toString());
}
exports.isIntNumber = isIntNumber;
// 校验是否是身份证号
function isIdCard(str) {
    return exports.id_card.test(str.toString());
}
exports.isIdCard = isIdCard;
// 校验是否是身份证号 一代
function isIdCardOne(str) {
    return exports.id_card_one.test(str.toString());
}
exports.isIdCardOne = isIdCardOne;
// 校验是否是身份证号 二代
function isIdCardTwo(str) {
    return exports.id_card_two.test(str.toString());
}
exports.isIdCardTwo = isIdCardTwo;
// 校验密码 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
function isPassword(str) {
    return exports.password.test(str.toString());
}
exports.isPassword = isPassword;
//强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：
function isStrongPassword(str) {
    return exports.strong_password.test(str.toString());
}
exports.isStrongPassword = isStrongPassword;
// 校验年月日格式
function isDateDay(str) {
    return exports.date_day.test(str.toString());
}
exports.isDateDay = isDateDay;
// 校验日期 年-月-日 时:分:秒
function isDate(str) {
    return exports.date.test(str.toString());
}
exports.isDate = isDate;
// 校验是否是qq
function isQQ(str) {
    return exports.qq.test(str.toString());
}
exports.isQQ = isQQ;
// 校验是否是邮编
function isZipCode(str) {
    return exports.zipcode.test(str.toString());
}
exports.isZipCode = isZipCode;
// 校验是否是银行卡号
function isBankCard(str) {
    return exports.bank_card.test(str.toString());
}
exports.isBankCard = isBankCard;
// 校验是否是ipv4地址
function isIpv4(str) {
    return exports.ipv4.test(str.toString());
}
exports.isIpv4 = isIpv4;
// 校验是否是微信账号
function isWechatAccount(str) {
    return exports.weichat_account.test(str.toString());
}
exports.isWechatAccount = isWechatAccount;
// 校验是否是护照
function isPassport(str) {
    return exports.passport.test(str.toString());
}
exports.isPassport = isPassport;
// 校验是否是新能源车牌
function isNewEnergy(str) {
    return exports.new_energy.test(str.toString());
}
exports.isNewEnergy = isNewEnergy;
// 校验是否是汽车车牌 非新能源
function isEnergy(str) {
    return exports.energy.test(str.toString());
}
exports.isEnergy = isEnergy;
// 校验host地址
function isHost(str) {
    return exports.host.test(str.toString());
}
exports.isHost = isHost;
// 校验是否是空白
// 校验是否是数字
function isNum(str) {
    return exports.num.test(str.toString());
}
exports.isNum = isNum;
// 校验是否是url地址
function isUrl(str) {
    return exports.url.test(str.toString());
}
exports.isUrl = isUrl;
// 校验是否是电话号码
function isMobile(str) {
    return exports.mobile.test(str.toString());
}
exports.isMobile = isMobile;
// 校验是否是金额
function isMoney(str) {
    return exports.money.test(str.toString());
}
exports.isMoney = isMoney;
// 校验是否是汽车车牌号
function isCarNum(str) {
    return exports.car_num.test(str.toString());
}
exports.isCarNum = isCarNum;
// 校验是否是16进制颜色值
function isHexColor(str) {
    return exports.hex_color.test(str.toString());
}
exports.isHexColor = isHexColor;
// 校验是否是中文
function isChinese(str) {
    return exports.chinese.test(str.toString());
}
exports.isChinese = isChinese;
// 校验是否是英文
function isEnglish(str) {
    return exports.english.test(str.toString());
}
exports.isEnglish = isEnglish;
// 校验是否是24小时制时间
function isTime24(str) {
    return exports.time24.test(str.toString());
}
exports.isTime24 = isTime24;
// 校验是否是12进制时间
function isTime12(str) {
    return exports.time12.test(str.toString());
}
exports.isTime12 = isTime12;
// 校验是否是base64字符串
function isBase64(str) {
    return exports.base64.test(str.toString());
}
exports.isBase64 = isBase64;
// 校验是否是金额 支持千分位
function isMoneyAll(str) {
    return exports.money_all.test(str.toString());
}
exports.isMoneyAll = isMoneyAll;
// 校验是否是图片地址
function isImgUrl(str) {
    return exports.imgUrl.test(str.toString());
}
exports.isImgUrl = isImgUrl;
// 校验是否是视频地址
function isVideoUrl(str) {
    return exports.video_url.test(str.toString());
}
exports.isVideoUrl = isVideoUrl;
// 校验是否是音频地址
function isAudioUrl(str) {
    return exports.audio_url.test(str.toString());
}
exports.isAudioUrl = isAudioUrl;
// 校验是否是版本号 x.x.x 格式
function isVersion(str) {
    return exports.version.test(str.toString());
}
exports.isVersion = isVersion;
// 校验是否是guid 或者 uuid
function isGuidOrUuid(str) {
    return exports.GUID_UUID.test(str.toString());
}
exports.isGuidOrUuid = isGuidOrUuid;
// 校验是否是md5加密的字符串
function isMd5(str) {
    return exports.md5.test(str.toString());
}
exports.isMd5 = isMd5;
// 校验是否是信用代码
function isCreditCode(str) {
    return exports.credit_code.test(str.toString());
}
exports.isCreditCode = isCreditCode;
// 校验是否是火车车次号
function isTrainNum(str) {
    return exports.train_number.test(str.toString());
}
exports.isTrainNum = isTrainNum;
// 检验是否是标准的名称 只包含 中文 英文 数字 组合
function isStandardName(str) {
    return exports.standard_name.test(str.toString());
}
exports.isStandardName = isStandardName;
// 检测是否是标准的 6- 16 位 数字和字母组合的密码
function isStandardPassword(str) {
    return exports.standard_password.test(str.toString());
}
exports.isStandardPassword = isStandardPassword;
//# sourceMappingURL=patterns.js.map