"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_validator_1 = require("async-validator");
var utils_1 = require("../utils/utils");
var Validator = /** @class */ (function () {
    function Validator(config) {
        this.mul = false;
        var source = config.source, rule = config.rule, mul = config.mul;
        if (!(0, utils_1.isObject)(source)) {
            throw new Error('source need an object');
        }
        if (!(0, utils_1.isObject)(rule)) {
            throw new Error('rule need an object');
        }
        this.source = source;
        this.rule = rule;
        this.mul = mul;
    }
    /**
     * ghgh
     * @param callback
     */
    Validator.prototype.validate = function (callback) {
        var _a = this, rule = _a.rule, source = _a.source, mul = _a.mul;
        var validator = new async_validator_1.default(rule);
        // @ts-ignore
        validator.validate(source, function (errors) {
            if (errors) {
                // 校验不通过 do something
                if (mul) {
                    return callback(false, errors.map(function (item) {
                        return {
                            filed: item.field,
                            msg: item.message,
                        };
                    }));
                }
                else {
                    return callback(false, [
                        {
                            filed: errors[0].field,
                            msg: errors[0].message,
                        },
                    ]);
                }
            }
            return callback(true, []);
        });
    };
    return Validator;
}());
exports.default = Validator;
//# sourceMappingURL=Validator.js.map