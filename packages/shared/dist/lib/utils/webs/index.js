"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexList = exports.VoStorage = exports.deviceType = exports.getDevice = void 0;
/**
 * Created by yanyasong
 * User: yanyasong
 * Email: 815801759@qq.com
 * Data: 2022/3/18
 * Time: 13:20
 * 此文件主要是浏览器端，设备检测、路由对象、存储、cookie、等一些公共方法的总结
 */
var uni_storage_1 = require("./uni-storage");
var pc_storage_1 = require("./pc-storage");
var objects_1 = require("../objects");
var device_base = 'DEVICE_BASE';
function getDevice() {
    try {
        return uni_storage_1.default.get(device_base);
    }
    catch (_a) {
        return pc_storage_1.default.get(device_base);
    }
}
exports.getDevice = getDevice;
exports.deviceType = ['PC', 'UNI'];
var VoStorage = /** @class */ (function () {
    function VoStorage(props) {
        if (!(0, objects_1.isPlainObject)(props)) {
            throw new Error(JSON.stringify({ code: 1000, message: 'props must be an object' }));
        }
        if (!(0, objects_1.hasOwn)(props, 'device') || !exports.deviceType.includes(props.device)) {
            throw new Error(JSON.stringify({
                code: 10001,
                message: 'The parameter must contain `device` key, value must be PC or UNI',
            }));
        }
        this.$device = props.device || 'PC';
        this.$isPc = this.$device === 'PC';
    }
    // 判断是否存在
    VoStorage.prototype.has = function (key) {
        return !!this.get(key);
    };
    // 获取
    VoStorage.prototype.get = function (key, defaultVal) {
        if (defaultVal === void 0) { defaultVal = ''; }
        return this.$isPc ? pc_storage_1.default.get(key, defaultVal) : uni_storage_1.default.get(key, defaultVal);
    };
    // 设置
    VoStorage.prototype.set = function (key, val) {
        return this.$isPc ? pc_storage_1.default.set(key, val) : uni_storage_1.default.set(key, val);
    };
    // 删除
    VoStorage.prototype.remove = function (key) {
        return this.$isPc ? pc_storage_1.default.remove(key) : uni_storage_1.default.remove(key);
    };
    // 清空
    VoStorage.prototype.clear = function () {
        return this.$isPc ? pc_storage_1.default.clear() : uni_storage_1.default.clear();
    };
    return VoStorage;
}());
exports.VoStorage = VoStorage;
// 定义生成26个英文字母
function indexList() {
    var indexList = [];
    var charCodeOfA = 'A'.charCodeAt(0);
    for (var i = 0; i < 26; i++) {
        indexList.push({
            id: String.fromCharCode(charCodeOfA + i),
            key: String.fromCharCode(charCodeOfA + i),
        });
    }
    return indexList;
}
exports.indexList = indexList;
//# sourceMappingURL=index.js.map