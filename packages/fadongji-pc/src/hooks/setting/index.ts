import type { GlobConfig } from '/#/config'

import { warn } from '/@/utils/log'
import { getAppEnvConfig } from '/@/utils/env'

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = getAppEnvConfig()

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    )
  }

  // 腾讯直传域名
  const tencentCosUploadUrl = 'https://dcp.fdjcyl.com'
  //腾讯云回显域名
  const tencentCosShowUrl = 'https://dcp.fdjcyl.com'

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    tencentCosUploadUrl,
    tencentCosShowUrl,
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  }
  return glob as Readonly<GlobConfig>
}
