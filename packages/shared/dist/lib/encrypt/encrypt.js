"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsencrypt_1 = require("@era/jsencrypt");
var objects_1 = require("../utils/objects");
var Encrypt = /** @class */ (function () {
    function Encrypt(config) {
        this.$publicKey = (0, objects_1.hasOwn)(config, 'publicKey') ? config.publicKey : '';
        this.$privateKey = (0, objects_1.hasOwn)(config, 'privateKey') ? config.privateKey : '';
        this.instanceEncrypt();
    }
    // 实例化 jsencrypt
    Encrypt.prototype.instanceEncrypt = function () {
        this.$encrypt = new jsencrypt_1.default();
        if (this.$publicKey) {
            this.$encrypt.setPublicKey(this.$publicKey);
        }
        if (this.$privateKey) {
            this.$encrypt.setPrivateKey(this.$privateKey);
        }
    };
    // 加密方法
    Encrypt.prototype.encrypt = function (val) {
        if (!this.$publicKey) {
            console.warn('before you use encrypt ,encrypt need a public key');
            return '';
        }
        return this.$encrypt.encrypt(val);
    };
    // 解密
    Encrypt.prototype.decrypt = function (val) {
        if (!this.$publicKey) {
            console.warn('before you use decrypt , decrypt need a private key');
            return '';
        }
        return this.$encrypt.decrypt(val);
    };
    return Encrypt;
}());
exports.default = Encrypt;
//# sourceMappingURL=encrypt.js.map