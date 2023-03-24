import type { App } from 'vue'
import { VoUtils } from '@vocen/shared'
import Message from '/@/components/VoAlert/resultMessageAlert/resultMessageAlert'
import * as vocenApi from '@vocen/shared/dist/index.es5'

const storage = new VoUtils.VoStorage({ device: 'PC' })

export function setVoGlobalRegister(app: App<Element>) {
  // const http = new AdminHttp({
  //   device: 'PC',
  //   requestInstance: defHttp,
  // })
  // app.config.globalProperties.$VoHttp = http
  app.config.globalProperties.$VoStorage = storage
  app.config.globalProperties.$Message = Message
}

// 非对称加密和解密的工具类
export const encrypt = new vocenApi.Encrypt({
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClqT9K8KjYc2v10BZ+U1splAvv5zzNtNdOgbILTZ+yR6DWZtXDfGJQV9fKEDe/ILpuoP5IzAOQzsr/YqlAwrUWgk0mBRxbPZpnxFTEpuaI7L3Av2Wg7/n8+03/+BkaxM0OeeM9z6SBhubtUY0MS8Iptfrx3ayHn1/ct9NynyQDUQIDAQAB',
})
export { storage }
