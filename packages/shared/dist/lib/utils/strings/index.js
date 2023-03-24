"use strict";
/* prettier-ignore */
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的字符串通用的一些方法的总结
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPhone = exports.toString = void 0;
var objects_1 = require("../objects");
var patterns_1 = require("../../pattern/patterns");
var _toString = Object.prototype.toString;
/**
 * 把输入的值转换为字符串.
 * @param val
 */
function toString(val) {
    if (Array.isArray(val) || ((0, objects_1.isPlainObject)(val) && val.toString === _toString)) {
        return val == null ? '' : JSON.stringify(val, null, 2);
    }
    else {
        return val == null ? '' : String(val);
    }
}
exports.toString = toString;
/**
 * 加密手机号
 * 输入 155 6560 1175
 * 输出 155 **** 1175
 * @param phone
 * @returns {string}
 */
function encryptPhone(phone) {
    if (!(0, patterns_1.isPhone)(phone)) {
        throw new Error('phone param must be correct phone number');
    }
    var strPhone = toString(phone);
    var reg = /(\d{3})\d{4}(\d{4})/; //正则表达式进行匹配确认加密
    return strPhone.replace(reg, '$1 **** $2');
}
exports.encryptPhone = encryptPhone;
//# sourceMappingURL=index.js.map