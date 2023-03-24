import { CosConfigInterface, CosUploadApiResult, UploadApiResult } from './model/uploadModel'
import { defHttp } from '/@/utils/http'
import { UploadFileParams } from '/#/axios'
import { useGlobSetting } from '/@/hooks/setting'
import TencentCos from '/@/api/sys/TencentCos'
import { buildUUID } from '/@/utils/uuid'
import AdminHttp from '/@/utils/http/adminHttp'
import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
import { TREE_ID } from '/@/enums/VoCacheEnum'

const loadingkey = 'handlerRow'
import { useMessage } from '/@/hooks/web/useMessage'

const { createMessage } = useMessage()
const { uploadUrl = '' } = useGlobSetting()

/**
 * @description: Upload interface
 */
export function uploadFileFn(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  )
}

let templateUpload = [] as any[]

/**
 * 上传文件 上传本地图片api
 */
export async function uploadLocalByUrl(data) {
  console.log(data, '上传本地')
  return AdminHttp.FILE.fileFileUploadInfo({ file: data.file })
}

export async function upLoadFilePath(list) {
  try {
    const { code, data } = await AdminHttp.FILE.batchUploadFileInfo(list)
    if (code === '20001') {
      templateUpload = []
    }
  } catch (err: any) {
    console.log('error upload', err)
  }
}

/**
 * 上传图片 上传本地图片api
 */

export async function fileImgUploadInfo(data) {
  try {
    const ret = await AdminHttp.FILE.fileImgUploadInfo({ file: data.file }).then((res) => res.data)

    if (ret) {
      return ret
      data.onSuccess({ url: ret.filePath, ...ret }, data.file)
    }
    if (storage.get(TREE_ID) !== 0) {
      folderValue = storage.get(TREE_ID)
    }
    const map = {
      folderId: storage.get(TREE_ID).length > 8 ? storage.get(TREE_ID) : 0,
      measurement: ret.width + '*' + ret.height,
      name: ret.fileName,
      resourceSuffix: ret.resourceSuffix,
      size: ret.fileSize,
      type: 1,
      url: ret.filePath,
    }
    templateUpload.push(map)
    // 调用其他接口
    await upLoadFilePath(templateUpload)
  } catch (err: any) {
    createMessage.error({ content: `上传失败`, key: loadingkey })
  }
}

/**
 * 上传视频 上传本地图片api
 */
export async function fileVideoUploadInfo(data) {
  const ret = await AdminHttp.FILE.fileVideoUploadInfo({ file: data.file }).then((res) => res.data)
  if (ret) {
    data.onSuccess({ url: ret.filePath, ...ret }, data.file)
  }
  let folderValue = Number(storage.get(TREE_ID))
  if (folderValue !== 0) {
    folderValue = storage.get(TREE_ID)
  } else {
    folderValue = 0
  }
  return ret
  const map = {
    folderId: folderValue,
    name: ret.fileName,
    resourceSuffix: ret.resourceSuffix,
    size: ret.fileSize,
    type: 2,
    url: ret.filePath,
    duration: ret.duration,
    videoPicUrl: ret.picUrl,
  }
  templateUpload.push(map)
  // 调用其他接口
  await upLoadFilePath(templateUpload)
}

/**
 * 上传文件 by 腾讯cos
 * @param params
 * @param onUploadProgress
 */
export async function uploadFileFnByTencentCos(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
): Promise<CosUploadApiResult> {
  const cosConfig: CosConfigInterface = await TencentCos.getCosUploadTempParams()
  console.log(cosConfig)
  const { opts, tencentCosUploadUrl, tencentCosShowUrl } = cosConfig
  const dateVal = new Date()
  const yearDate =
    dateVal.getFullYear() + '/' + (dateVal.getMonth() + 1) + '/' + dateVal.getDate() + '/'
  // const fileName =  buildUUID()+params.file['name'];
  const fileName =
    'GongChuangJi/' +
    yearDate +
    (Date.now() +
      Math.floor(Math.random() * (100 - 0)) * Math.floor(Math.random() * (100 - 0)) +
      params.file['name'])
  const postData = {
    key: fileName,
    ...opts,
  }

  return new Promise((resolve, reject) => {
    defHttp
      .uploadFile(
        {
          url: tencentCosUploadUrl,
          onUploadProgress,
        },
        //, ...params.data 就不要了
        Object.assign({}, params, { data: { ...postData } }),
      )
      .then(() => {
        const file = { fileName, filePath: `${tencentCosShowUrl}/${fileName}` }
        const shotName = fileName.slice(0, fileName.lastIndexOf('.'))
        file.picUrl = tencentCosShowUrl + '/' + shotName + 'shot0' + '.jpg'
        resolve({ file: file })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const loadImage = (src) => {
  return new Promise(function (resolve, reject) {
    try {
      const img = new Image()
      img.onload = function () {
        resolve(img) //加载时执行resolve函数
      }
      img.onerror = function () {
        loadImage(src).then((res) => {
          resolve()
        })
        // reject(src + '这个地址错误') //抛出异常时执行reject函数
      }
      img.src = src
    } catch (e) {
      reject(e)
    }
  })
}
