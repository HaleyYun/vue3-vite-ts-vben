"use strict";
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是对js中或者业务中需求中的数组方法中通用的总结
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeMapEach = exports.treeMap = exports.orderPropertyByAsc = exports.orderPropertyByDesc = exports.orderByAsc = exports.orderByDesc = exports.isArray = exports.ensureArray = exports.isValidArrayIndex = exports.remove = exports.dedupe = void 0;
// 数组去重
function dedupe(array) {
    return Array.from(new Set(array));
}
exports.dedupe = dedupe;
/**
 * 删除数组元素中的一个值 并返回删除的元素 仅支持一维数组
 * @param arr
 * @param item
 */
function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}
exports.remove = remove;
/**
 * 检测是否是有效的数组索引
 */
function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
}
exports.isValidArrayIndex = isValidArrayIndex;
/**
 * 数组转换，保证转后的值，必须是一个数组
 * @param arr
 */
var ensureArray = function (arr) {
    if (!arr && arr !== 0)
        return [];
    return Array.isArray(arr) ? arr : [arr];
};
exports.ensureArray = ensureArray;
/**
 * 判断一个对象是否是数组
 * @param arr
 */
function isArray(arr) {
    return Array.isArray(arr);
}
exports.isArray = isArray;
// 一维数组降序排序
function orderByDesc(arr) {
    if (!isArray(arr)) {
        throw new Error('param must be an array');
    }
    return arr.sort(function (a, b) {
        return b - a;
    });
}
exports.orderByDesc = orderByDesc;
// 一维数组升序排序
function orderByAsc(arr) {
    if (!isArray(arr)) {
        throw new Error('param must be an array');
    }
    return arr.sort(function (a, b) {
        return a - b;
    });
}
exports.orderByAsc = orderByAsc;
function compare(property, order) {
    if (order === void 0) { order = 'desc'; }
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return order === 'asc' ? value1 - value2 : value2 - value1; //升序,降序为value2 - value1
    };
}
/**
 * 对象一维数组 降序排列
 * @param arr
 * @param property
 */
function orderPropertyByDesc(arr, property) {
    if (!isArray(arr)) {
        throw new Error('param must be an array');
    }
    return arr.sort(compare(property, 'desc'));
}
exports.orderPropertyByDesc = orderPropertyByDesc;
/**
 * 对象一维数组 升序排列
 * @param arr
 * @param property
 */
function orderPropertyByAsc(arr, property) {
    if (!isArray(arr)) {
        throw new Error('param must be an array');
    }
    if (!isArray(arr)) {
        throw new Error('param must be an array');
    }
    return arr.sort(compare(property, 'asc'));
}
exports.orderPropertyByAsc = orderPropertyByAsc;
/**
 * @description: Extract tree specified structure
 */
function treeMap(treeData, opt) {
    return treeData.map(function (item) { return treeMapEach(item, opt); });
}
exports.treeMap = treeMap;
/**
 * @description: Extract tree specified structure
 */
function treeMapEach(data, _a) {
    var _b;
    var _c = _a.children, children = _c === void 0 ? 'children' : _c, conversion = _a.conversion;
    var haveChildren = Array.isArray(data[children]) && data[children].length > 0;
    var conversionData = conversion(data) || {};
    if (haveChildren) {
        return __assign(__assign({}, conversionData), (_b = {}, _b[children] = data[children].map(function (i) {
            return treeMapEach(i, {
                children: children,
                conversion: conversion,
            });
        }), _b));
    }
    else {
        return __assign({}, conversionData);
    }
}
exports.treeMapEach = treeMapEach;
//# sourceMappingURL=index.js.map