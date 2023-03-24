export interface UploadApiResult {
  message: string
  code: number
  url: string
}

export interface CosConfigInterface {
  opts: object
  tencentCosUploadUrl: string
  tencentCosShowUrl: string
}

export interface CosUploadApiResult {
  filePath: string
  fileName?: string
}
