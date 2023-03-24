"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ajax_1 = require("../ajax");
var api_1 = require("../api");
// 文件模块
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(props) {
        return _super.call(this, props) || this;
    }
    // 文件上传-文件上传
    File.prototype.fileFileUpload = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiRequest(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.fileUpload, method: 'POST', params: data, header: {
                'Content-Type': 'multipart/form-data',
            } }));
    };
    // 文件上传-片上传-返回图片信息
    File.prototype.fileImgUpload = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiRequest(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.imgUpload, method: 'POST', params: data, header: {
                'Content-Type': 'multipart/form-data',
            } }));
    };
    // 文件上传-片上传-返回图片信息 不带api
    // public fileFileUploadInfo(data = { data = {}, option?: httpRequest) {
    //   console.log(localOptions)
    //   const formData = new FormData()
    //   formData.append('file', localOptions.data.file)
    //   return this.$service.apiPost({
    //     url: AdminApi[`${localOptions.version}`].filePc.fileUpload,
    //
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    // }
    File.prototype.fileFileUploadInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].filePc.fileUpload }));
    };
    File.prototype.batchUploadFileInfo = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].goods.resource.add }));
    };
    // 图片上传-片上传-返回图片信息 不带api  I
    File.prototype.fileImgUploadInfo = function (data, option) {
        if (data === void 0) { data = { file: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        console.log(localOptions);
        var formData = new FormData();
        formData.append('file', localOptions.data.file);
        return this.$service.apiRequest({
            url: api_1.AdminApi["".concat(localOptions.version)].filePc.imgUpload,
            method: 'POST',
            params: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };
    // 图片上传-片上传-返回图片信息 不带api  I
    File.prototype.fileImgUploadInfoBatch = function (data, option) {
        if (data === void 0) { data = { files: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        console.log(localOptions);
        var formData = new FormData();
        formData.append('file', localOptions.data.files);
        return this.$service.apiRequest({
            url: api_1.AdminApi["".concat(localOptions.version)].filePc.imgUploadBatch,
            method: 'POST',
            params: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };
    // 视频上传-片上传-返回图片信息 不带api  I
    File.prototype.fileVideoUploadInfo = function (data, option) {
        if (data === void 0) { data = { file: '' }; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        var formData = new FormData();
        formData.append('file', localOptions.data.file);
        return this.$service.apiRequest({
            url: api_1.AdminApi["".concat(localOptions.version)].filePc.videoUpload,
            method: 'POST',
            params: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 600 * 1000,
        });
    };
    // 文件上传-视频上传-返回视频信息
    File.prototype.fileVideoUpload = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiRequest(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.videoUpload, method: 'POST', header: {
                'Content-Type': 'multipart/form-data',
            } }));
    };
    // 文件操作-获取文件
    File.prototype.fileOperationsGetObject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.operations.getObject }));
    };
    // 文件操作-获取图片缩略图
    File.prototype.fileOperationsGetImageThumbnail = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiGet(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.operations.getImageThumbnail }));
    };
    // 文件操作-临时桶文件复制到永久储存桶
    File.prototype.fileOperationsTemporaryToForever = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.operations.temporaryToForever }));
    };
    // 文件操作-文件复制
    File.prototype.fileOperationsCopyObject = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({ data: data }, option));
        return this.$service.apiPost(__assign(__assign({}, localOptions), { url: api_1.AdminApi["".concat(localOptions.version)].file.operations.copyObject }));
    };
    // 图片上传包含ocr识别
    File.prototype.apiCreateCosGet = function (data, option) {
        if (data === void 0) { data = {}; }
        var localOptions = this.mergeRequest(__assign({}, option));
        return this.$service.apiRequest({
            url: api_1.AdminApi["".concat(localOptions.version)].api.createCosGet,
            method: 'GET',
            params: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            options: {
                noAutoAddDomain: true,
            },
        }, {
        // urlPrefix: '/vocen-wolverine', // 兼容李义广特殊接口使用
        });
    };
    return File;
}(ajax_1.default));
exports.default = File;
//# sourceMappingURL=file.js.map