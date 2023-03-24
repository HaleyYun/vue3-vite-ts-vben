import { httpRequest } from '../../types'
import VoHttp from '../ajax'
import { AdminApi } from '../api'
// 文件模块

export default class File extends VoHttp {
  constructor(props) {
    super(props)
  }

  // 文件上传-文件上传
  public fileFileUpload(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiRequest({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.fileUpload,
      method: 'POST',
      params: data,
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // 文件上传-片上传-返回图片信息
  public fileImgUpload(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiRequest({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.imgUpload,
      method: 'POST',
      params: data,
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

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

  public fileFileUploadInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].filePc.fileUpload,
    })
  }

  public batchUploadFileInfo(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].goods.resource.add,
    })
  }

  // 图片上传-片上传-返回图片信息 不带api  I
  public fileImgUploadInfo(data = { file: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    console.log(localOptions)
    const formData = new FormData()
    formData.append('file', localOptions.data.file)
    return this.$service.apiRequest({
      url: AdminApi[`${localOptions.version}`].filePc.imgUpload,
      method: 'POST',
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // 图片上传-片上传-返回图片信息 不带api  I
  public fileImgUploadInfoBatch(data = { files: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    console.log(localOptions)
    const formData = new FormData()
    formData.append('file', localOptions.data.files)
    return this.$service.apiRequest({
      url: AdminApi[`${localOptions.version}`].filePc.imgUploadBatch,
      method: 'POST',
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // 视频上传-片上传-返回图片信息 不带api  I
  public fileVideoUploadInfo(data = { file: '' }, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    const formData = new FormData()
    formData.append('file', localOptions.data.file)
    return this.$service.apiRequest({
      url: AdminApi[`${localOptions.version}`].filePc.videoUpload,
      method: 'POST',
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 600 * 1000,
    })
  }

  // 文件上传-视频上传-返回视频信息
  public fileVideoUpload(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiRequest({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.videoUpload,
      method: 'POST',
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // 文件操作-获取文件
  public fileOperationsGetObject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.operations.getObject,
    })
  }

  // 文件操作-获取图片缩略图
  public fileOperationsGetImageThumbnail(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiGet({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.operations.getImageThumbnail,
    })
  }

  // 文件操作-临时桶文件复制到永久储存桶
  public fileOperationsTemporaryToForever(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.operations.temporaryToForever,
    })
  }

  // 文件操作-文件复制
  public fileOperationsCopyObject(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      data,
      ...option,
    })
    return this.$service.apiPost({
      ...localOptions,
      url: AdminApi[`${localOptions.version}`].file.operations.copyObject,
    })
  }

  // 图片上传包含ocr识别
  public apiCreateCosGet(data = {}, option?: httpRequest) {
    const localOptions = this.mergeRequest({
      ...option,
    })
    return this.$service.apiRequest(
      {
        url: AdminApi[`${localOptions.version}`].api.createCosGet,
        method: 'GET',
        params: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        options: {
          noAutoAddDomain: true,
        },
      },
      {
        // urlPrefix: '/vocen-wolverine', // 兼容李义广特殊接口使用
      }
    )
  }
}
