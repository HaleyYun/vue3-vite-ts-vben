"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDateByType = exports.transformUrl = exports.getRandomColor = exports.isFalse = exports.isTrue = exports.isDef = exports.isUndef = exports.isRegExp = exports.toRawType = exports.isPromise = exports.toNumber = exports.checkIsEmpty = exports.CDN_URL = void 0;
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的方法中通用的的总结
 */
var dayjs_1 = require("dayjs");
var index_1 = require("../../index");
// xml 和 json 互转
var _toString = Object.prototype.toString;
exports.CDN_URL = '';
/**
 * 返回一个变量是否为空
 * @param param
 */
function checkIsEmpty(param) {
    return param === undefined || +param === 0 || param === null || !param.toString().trim();
}
exports.checkIsEmpty = checkIsEmpty;
/**
 * 将输入值转换为数字，如果转换失败，则返回原字符串
 * @param val
 */
function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
}
exports.toNumber = toNumber;
/**
 * 判断当前实例是否是 Promise对象
 * @param val
 */
function isPromise(val) {
    return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
exports.isPromise = isPromise;
/**
 * 获取值得原始类型字符串
 * @param value
 */
function toRawType(value) {
    return _toString.call(value).slice(8, -1);
}
exports.toRawType = toRawType;
/**
 * 判断当前对象是否是正则实例化对象
 * @param v
 */
function isRegExp(v) {
    return _toString.call(v) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
/**
 * 判断变量是否 非undefined
 * @param v
 */
function isUndef(v) {
    return v === undefined || v === null;
}
exports.isUndef = isUndef;
/**
 * 判断变量是否 是undefined
 * @param v
 */
function isDef(v) {
    return v !== undefined && v !== null;
}
exports.isDef = isDef;
/**
 * 判断变量是否是 真值
 * @param v
 */
function isTrue(v) {
    return v === true;
}
exports.isTrue = isTrue;
/**
 * 判断变量是否是 假值
 * @param v
 */
function isFalse(v) {
    return v === false;
}
exports.isFalse = isFalse;
/**
 * 获取随机css颜色
 */
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    // rgba 颜色 待实现，根据需求再进行补充
    // rgb颜色
    return 'rgb(' + r + ',' + g + ',' + b + ')';
    // 16进制颜色
    //return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}
exports.getRandomColor = getRandomColor;
/**
 * 获取静态资源 url地址，如果是全路径则原样返回
 * @param url
 */
function transformUrl(url) {
    if (!url)
        return '';
    if (url.indexOf('http') === -1)
        return exports.CDN_URL + url;
    return url;
}
exports.transformUrl = transformUrl;
// time为某一天的时间戳
function startTime(time) {
    var nowTimeDate = new Date(time);
    return nowTimeDate.setHours(0, 0, 0, 0);
}
function endTime(time) {
    var nowTimeDate = new Date(time);
    return nowTimeDate.setHours(23, 59, 59, 999);
}
// Type
// 1.1个月内
// 2.3个月内
// 3.6个月内
// 4.2022年
// 5.2023年
// 6.2024年
/**
 *
 * @param num  月份或者年
 * @param type ['month', 'year']
 * 例如 transformDateByType(1, 'month')  // 获取近一个月的开始时间和结束时间
 * 结果：['2022-07-04 14:15:33', '2022-08-04 14:15:33']
 *
 * 例如 transformDateByType(2022, 'year')  // 获取2022年的开始时间和结束时间
 * 结果：['2022-01-01 00:00:00', '2023-01-01 00:00:00']
 * @remarks
 * 时间字符串返回
 */
function transformDateByType(num, type) {
    var nowTime = (0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss');
    var typeArray = ['month', 'year'];
    if (!typeArray.includes(type)) {
        throw Error('type must be month or year');
    }
    if (!index_1.Pattern.isIntNumber(num)) {
        throw Error('num must be int number');
    }
    if (type === 'month') {
        var startTime_1 = (0, dayjs_1.default)().subtract(num, 'month').format('YYYY-MM-DD HH:mm:ss');
        return [startTime_1, nowTime];
    }
    if (type === 'year') {
        var startTime_2 = (0, dayjs_1.default)((+num).toString()).format('YYYY-MM-DD HH:mm:ss');
        var endTime_1 = (0, dayjs_1.default)((+num + 1).toString()).format('YYYY-MM-DD HH:mm:ss');
        return [startTime_2, endTime_1];
    }
    return [];
}
exports.transformDateByType = transformDateByType;
//# sourceMappingURL=index.js.map