"use strict";
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的对象通用的一些方法的总结
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyObject = exports.isPlainObject = exports.isObject = exports.hasOwn = void 0;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString = Object.prototype.toString;
/**
 * 判断当前对象是否含有某个属性
 * @param obj
 * @param key
 */
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
exports.hasOwn = hasOwn;
/**
 * 判断当前对象是否是对象类型
 * @param obj
 */
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isObject = isObject;
/**
 * 严格的对象类型检查。只返回true
 * 对于普通的JavaScript对象。
 */
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
/**
 * 返回一个空对象
 */
exports.emptyObject = Object.freeze({});
//# sourceMappingURL=index.js.map