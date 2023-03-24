"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../../../helpers");
var app_api_prefix_v1_1 = require("../../../helpers/app-api-prefix-v1");
exports.default = {
    login: "".concat(helpers_1.$prefix, "/login"),
    logoff: "".concat(helpers_1.$prefix, "/logoff"),
    register: "".concat(helpers_1.$prefix, "/register"),
    smsSend: "".concat(helpers_1.$prefixUser, "/sms/send"),
    role: "".concat(helpers_1.$prefixUser, "/user/info/role"),
    password: "".concat(helpers_1.$prefixUser, "/user/info/password"),
    smsVerify: "".concat(helpers_1.$prefixUser, "/sms/verify"),
    apiCreatedCosGet: "".concat(helpers_1.$prefixUser, "/create/cos/get"),
    wxSignature: "/wx/signature",
    switchRole: "/switch/role",
    defaultAddress: "".concat(app_api_prefix_v1_1.$v1Api, "receiver/address/default"),
    pay: "/pay/pay",
    sixHotAreaSub: "".concat(helpers_1.$v1Prefix, "sixhot/area/sub"), // 根据地区父级code获取所有子级
};
//# sourceMappingURL=api-v1.js.map