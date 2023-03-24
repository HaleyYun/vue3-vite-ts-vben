import { useGlobSetting } from '/@/hooks/setting'
import adminHttp from '/@/utils/http/adminHttp'
import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
import { VOCEN_USERINFO } from '/@/enums/VoCacheEnum'

const { tencentCosUploadUrl, tencentCosShowUrl } = useGlobSetting()
export default class TencentCos {
  static getCosUploadTempParams(): Promise<any> {
    const common = {
      tencentCosUploadUrl,
      tencentCosShowUrl,
    }
    const userInfo = JSON.parse(storage.get(VOCEN_USERINFO))
    return new Promise(async (resolve, reject) => {
      const params = {
        businessType: 1,
        fileUrl: 1,
        licenseId: userInfo.licenseId,
      }
      console.log(params)
      // http://10.0.2.63:10000/vocen-jarvis/v1/api/create/cos/get?businessType=1&fileUrl=1
      // 此处替换为你自己的网络请求方法
      //adminHttp.apiCreatedCosGet
      try {
        const { code, data } = await adminHttp.FILE.apiCreateCosGet(params)
        if (code == '20001') {
          const opts = {
            policy: data.policy, // 这个传 policy 的 base64 字符串
            success_action_status: 200,
            'q-sign-algorithm': 'sha1',
            'q-ak': data.secretId,
            'q-key-time': data.KeyTime,
            'q-signature': data.qSignature,
            'x-cos-security-token': data.secretToken,
          }
          resolve({
            opts,
            ...common,
          })
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}
