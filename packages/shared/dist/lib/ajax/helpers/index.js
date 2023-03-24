"use strict";
// 合并初始化参数功能
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTreeConfig = exports.copyProperties = exports.mix = exports.transformConfig = exports.defaultVersion = exports.version = exports.device = exports.$prefixUser = exports.$v1Prefix = exports.$prefix = void 0;
exports.$prefix = '';
exports.$v1Prefix = '/v1/';
exports.$prefixUser = '/v1/api';
// 设备类型
exports.device = ['PC', 'UNI'];
// 设定版本为 v1  v2
exports.version = ['v1', 'v2'];
// 默认v1版本
exports.defaultVersion = 'v1';
// 处理默认配置
function transformConfig(config) {
    if ((config && !config['device']) || !exports.device.includes(config['device'])) {
        config['device'] = exports.device[0];
    }
    return config;
}
exports.transformConfig = transformConfig;
function mix() {
    var mixins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mixins[_i] = arguments[_i];
    }
    var Mix = /** @class */ (function () {
        function Mix() {
            for (var _i = 0, mixins_2 = mixins; _i < mixins_2.length; _i++) {
                var mixin = mixins_2[_i];
                copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
        return Mix;
    }());
    for (var _a = 0, mixins_1 = mixins; _a < mixins_1.length; _a++) {
        var mixin = mixins_1[_a];
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mix;
}
exports.mix = mix;
function copyProperties(target, source) {
    for (var _i = 0, _a = Reflect.ownKeys(source); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            var desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
exports.copyProperties = copyProperties;
function getTreeConfig(obj, keyArr) {
    console.log({
        obj: obj,
        keyArr: keyArr,
    });
    if (keyArr.length === 1)
        return obj[keyArr[0]];
    var firstKeyStr = keyArr.splice(0, 1);
    return getTreeConfig(obj[firstKeyStr], __spreadArray([], keyArr, true));
}
exports.getTreeConfig = getTreeConfig;
//# sourceMappingURL=index.js.map