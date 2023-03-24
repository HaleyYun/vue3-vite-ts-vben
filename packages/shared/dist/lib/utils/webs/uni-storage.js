"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    set: function (key, val) {
        try {
            // @ts-ignore
            return uni.setStorageSync(key, val);
        }
        catch (e) {
            uni.showModal("\u8BBE\u7F6EStorage\u5931\u8D25\uFF0Ckey\uFF1A".concat(key));
        }
    },
    get: function (key, defaultValue) {
        try {
            var val = uni.getStorageSync(key);
            if (!val && defaultValue !== undefined)
                return defaultValue;
            return val;
        }
        catch (e) {
            // error
            uni.showModal("\u83B7\u53D6Storage\u5931\u8D25\uFF0Ckey\uFF1A".concat(key));
        }
    },
    remove: function (key) {
        return uni.removeStorageSync(key);
    },
    clear: function () {
        return uni.clearStorageSync();
    },
};
//# sourceMappingURL=uni-storage.js.map