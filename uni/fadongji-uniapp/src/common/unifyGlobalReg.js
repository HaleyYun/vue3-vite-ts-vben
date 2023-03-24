import Vue from 'vue'

import * as vocenApi from '../../../../packages/shared/dist/index.es5'
import httpRequest from '@/common/request.js'
///**
// * 全局引用VoNav组件
// */
//import VoNav from '@/components/VoNav/VoNav.vue'
///**
// * 全局引用VoSafetyArea组件
// */
//import VoSafetyArea from '@/components/VoSafetyArea/VoSafetyArea.vue'
///**
// * 全局引用VoIcon组件
// */
//import VoIcon from '@/components/VoIcon/VoIcon.vue'
///**
// * 全局引用VoChart组件
// */
//import VoChart from '@/components/VoChart/VoChart.vue'
///**
// * 全局引用VoSearch组件
// */
//import VoSearch from '@/components/VoSearch/VoSearch.vue'
///**
// * 全局引用VoHelpAction组件
// */
//import VoHelpAction from '@/components/VoHelpAction/VoHelpAction'
///**
// * 全局引用VoBatteryBar组件
// */
//import VoBatteryBar from '@/components/VoBatteryBar/VoBatteryBar'
///**
// * 全局引用快捷入口组件
// */
//import VoQuick from '@/components/VoQuick/VoQuick'
///**
// * 全局引用VoUpload组件
// */
//import VoUpload from '@/components/VoUpload/VoUpload'
///**
// * 全局引用VoSelectPro组件
// */
//import VoSelectPro from '@/components/VoSelectPro/VoSelectPro'
///**
// * 全局引用VoAddress组件
// */
//import VoAddress from '@/components/VoAddress/VoAddress'
//
///**
// * 全局引用VoLetter组件
// */
//import VoLetter from '@/components/VoLetter/VoLetter'
///**
// * 全局引用VoPointPrice组件
// */
//import VoPointPrice from '@/components/VoPointPrice/VoPointPrice'
//
///**
// * 全局引用VoComplaintAction组件
// */
//import VoComplaintAction from '@/components/VoComplaintAction/VoComplaintAction'

//挂载全局vocen api
Vue.prototype.$vocenApi = vocenApi

const VoHttp = new vocenApi.AppHttp({
  device: 'UNI',
  requestInstance: httpRequest,
})

// 全局请求
Vue.prototype.$VoHttp = VoHttp

const utils = vocenApi.VoUtils
Vue.prototype.$utils = utils

// 挂载全局的storage
const storage = new vocenApi.VoUtils.VoStorage({ device: 'UNI' })
console.log('init,xxxx')
storage.set('onLaunchEd', 1)
Vue.prototype.$storage = storage

// 挂载全局的非对称加密和解密的工具类
const encrypt = new vocenApi.Encrypt({
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClqT9K8KjYc2v10BZ+U1splAvv5zzNtNdOgbILTZ+yR6DWZtXDfGJQV9fKEDe/ILpuoP5IzAOQzsr/YqlAwrUWgk0mBRxbPZpnxFTEpuaI7L3Av2Wg7/n8+03/+BkaxM0OeeM9z6SBhubtUY0MS8Iptfrx3ayHn1/ct9NynyQDUQIDAQAB',
})
Vue.prototype.$encrypt = encrypt


/**
 * 获取系统信息同步接口。
 */
Vue.prototype.$systemInfo = uni.getSystemInfoSync()

//Vue.component('VoNav', VoNav)
//Vue.component('VoSafetyArea', VoSafetyArea)
//Vue.component('VoIcon', VoIcon)
//
//Vue.component('VoChart', VoChart)
//
//Vue.component('VoSearch', VoSearch)
//
//Vue.component('VoHelpAction', VoHelpAction)
//
//Vue.component('VoBatteryBar', VoBatteryBar)
//
//Vue.component('VoQuick', VoQuick)
//Vue.component('VoUpload', VoUpload)
//
//Vue.component('VoSelectPro', VoSelectPro)
//Vue.component('VoAddress', VoAddress)
//Vue.component('VoLetter', VoLetter)
//Vue.component('VoPointPrice', VoPointPrice)
//Vue.component('VoComplaintAction', VoComplaintAction)

export { storage, vocenApi, VoHttp, encrypt, utils }
