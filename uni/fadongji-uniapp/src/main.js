import Vue from 'vue'
import App from './App'
//引入uview
import uView from '@vocen/uview-ui/index'
import { pageMixin } from '@/common/mixins'
//import * as vocenApi from '../../../../packages/shared/dist/index.es5'
//import httpRequest from '@/common/request.js'
/**
 * 全局引用VoNav组件
 */
import VoNav from '@/components/VoNav/VoNav.vue'
import VoMoreTooltip from '@/components/VoTooltip/VoMoreTooltip.vue'
import VoFormUpload from '@/components/VoFormUpload/VoFormUpload.vue'

/**
 * 全局引用VoSafetyArea组件
 */
import VoSafetyArea from '@/components/VoSafetyArea/VoSafetyArea.vue'
/**
 * 全局引用VoIcon组件
 */
import VoIcon from '@/components/VoIcon/VoIcon.vue'
/**
 * 全局引用VoSearch组件
 */
import VoSearch from '@/components/VoSearch/VoSearch.vue'
/**
 * 全局引用VoHelpAction组件
 */
import VoHelpAction from '@/components/VoHelpAction/VoHelpAction'
/**
 * 全局引用VoBatteryBar组件
 */
import VoBatteryBar from '@/components/VoBatteryBar/VoBatteryBar'
/**
 * 全局引用快捷入口组件
 */
import VoQuick from '@/components/VoQuick/VoQuick'
/**
 * 全局引用VoUpload组件
 */
import VoUpload from '@/components/VoUpload/VoUpload'
/**
 * 全局引用VoSelectPro组件
 */
import VoSelectPro from '@/components/VoSelectPro/VoSelectPro'
/**
 * 全局引用VoAddress组件
 */
import VoAddress from '@/components/VoAddress/VoAddress'

/**
 * 全局引用VoLetter组件
 */
import VoLetter from '@/components/VoLetter/VoLetter'
/**
 * 全局引用VoPointPrice组件
 */
import VoPointPrice from '@/components/VoPointPrice/VoPointPrice'

/**
 * 全局引用VoComplaintAction组件
 */
import VoComplaintAction from '@/components/VoComplaintAction/VoComplaintAction'
/**
 * 全局引用VoLoadingText组件
 */
import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'
/**
 * 全局引用VoPayPopup组件
 */
import VoPayPopup from '@/components/VoPayPopup/VoPayPopup'
/**
 * 全局引用VoPayValidation组件
 */
import VoPayValidation from '@/components/VoPayValidation/VoPayValidation'
/**
 * 全局引用VoListFresh组件
 */
import VoListFresh from '@/components/VoListFresh/VoListFresh'
/**
 * 全局引用VoAudioVoice组件
 */
import VoAudioVoice from '@/components/VoAudioVoice/VoAudioVoice'
/**
 * 全局引用VoNoData组件
 */
import VoNoData from '@/components/VoNoData/VoNoData'
/**
 * 全局引用VoSelectRolePopup组件
 */
import VoSelectRolePopup from '@/components/VoSelectRolePopup/VoSelectRolePopup'
/**
 * 全局引用VoShareQrCodeView组件
 */
import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'
/**
 * 全局引用VoShareView组件
 */
import VoShareView from '@/components/VoShareView/VoShareView'

/**
 * 全局版本更新组件
 */

import VoVersionUpdate from '@/components/VoVersionUpdate/VoVersionUpdate'
import VoQiMoCustomer from '@/components/VoQiMoCustomer/VoQiMoCustomer'
//统一注册组件和请求方法
import '@/common/unifyGlobalReg.js'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store/index'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView)

uni.$u.setConfig({
  props: {
    input: {
      adjustPosition: false,
    },
  },
})

Vue.mixin(pageMixin)

////挂载全局vocen api
//Vue.prototype.$vocenApi = vocenApi
//
//const VoHttp = new vocenApi.AppHttp({
//  device: 'UNI',
//  requestInstance: httpRequest,
//})
//
//// 全局请求
//Vue.prototype.$VoHttp = VoHttp
//
//// 挂载全局的storage
//const storage = new vocenApi.VoUtils.VoStorage({ device: 'UNI' })
//Vue.prototype.$storage = storage
//
//// 挂载全局的非对称加密和解密的工具类
//const encrypt = new vocenApi.Encrypt({
//  publicKey:
//    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClqT9K8KjYc2v10BZ+U1splAvv5zzNtNdOgbILTZ+yR6DWZtXDfGJQV9fKEDe/ILpuoP5IzAOQzsr/YqlAwrUWgk0mBRxbPZpnxFTEpuaI7L3Av2Wg7/n8+03/+BkaxM0OeeM9z6SBhubtUY0MS8Iptfrx3ayHn1/ct9NynyQDUQIDAQAB',
//})
//Vue.prototype.$encrypt = encrypt

/**
 * 获取系统信息同步接口。
 */
Vue.prototype.$systemInfo = uni.getSystemInfoSync()

Vue.component('VoNav', VoNav)
Vue.component('VoSafetyArea', VoSafetyArea)
Vue.component('VoIcon', VoIcon)
Vue.component('VoSearch', VoSearch)
Vue.component('VoHelpAction', VoHelpAction)
Vue.component('VoBatteryBar', VoBatteryBar)
Vue.component('VoQuick', VoQuick)
Vue.component('VoUpload', VoUpload)
Vue.component('VoSelectPro', VoSelectPro)
Vue.component('VoAddress', VoAddress)
Vue.component('VoLetter', VoLetter)
Vue.component('VoPointPrice', VoPointPrice)
Vue.component('VoComplaintAction', VoComplaintAction)
Vue.component('VoPayPopup', VoPayPopup)
Vue.component('VoPayValidation', VoPayValidation)
Vue.component('VoListFresh', VoListFresh)
Vue.component('VoAudioVoice', VoAudioVoice)
Vue.component('VoNoData', VoNoData)
Vue.component('VoSelectRolePopup', VoSelectRolePopup)
Vue.component('VoShareQrCodeView', VoShareQrCodeView)
Vue.component('VoLoadingText', VoLoadingText)
Vue.component('VoMoreTooltip', VoMoreTooltip)
Vue.component('VoShareView', VoShareView)
Vue.component('VoFormUpload', VoFormUpload)
Vue.component('VoVersionUpdate', VoVersionUpdate)
Vue.component('VoQiMoCustomer', VoQiMoCustomer)


// #ifdef H5
// if(window.location.href.indexOf('localhost')===-1){
//   console.log = () => {}
// }
Vue.config.ignoredElements.push('wx-open-launch-weapp')
// #endif

Vue.prototype.$store = store
const app = new Vue({
  store,
  ...App,
})

app.$mount()
