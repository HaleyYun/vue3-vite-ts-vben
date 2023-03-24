"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.default = {
    set: function (key, val) {
        //if (!val && (val !== 0 || val !== false)) return false;
        return localStorage.setItem(key, JSON.stringify(val));
    },
    get: function (key, defaultValue) {
        var val = localStorage.getItem(key);
        if ((0, lodash_1.isEmpty)(val))
            return false;
        try {
            if (!val && defaultValue !== undefined)
                return defaultValue;
            return val;
        }
        catch (e) {
            return false;
        }
    },
    remove: function (key) {
        return localStorage.removeItem(key);
    },
    clear: function () {
        return localStorage.clear();
    },
};
//# sourceMappingURL=pc-storage.js.map