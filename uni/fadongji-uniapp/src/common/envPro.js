
// 正式环境域名
const apiBaseUrl = 'https://gate.fdjcyl.com'
// 测试环境前缀
const apiPrefix = '/vocen-wolverine'
// h5测试链接
const shareBaseUrl = 'https://m.fdjcyl.com'


const licenseId = '133960256299597825'
const clientId = 'engine-app'
const clientSecret = 'engine-app-Secret'


// 微信验签appid
const appid = 'wx2b3387f5086ec242'
// 腾讯直传域名
const tencentCosUrl = 'https://dcp.fdjcyl.com'
//腾讯云回显域名
const showCosUrl = 'https://dcp.fdjcyl.com'
// 正式imConnectUrl
const imConnectUrl = 'ws://gate.fdjcyl.com/notice/websocket'
// 分享用logo
const shareLogo = 'https://dcp.fdjcyl.com/GongChuangJi/fadongji-logo.png'

// 是否预生产
const isPre = false
// 是否是生产环境
const isPro = true

const devConf = {
  apiBaseUrl,
  licenseId,
  clientId,
  clientSecret,
  appid,
  tencentCosUrl,
  showCosUrl,
  apiPrefix,
  imConnectUrl,
  shareBaseUrl,
  shareLogo,
  isPre,
  isPro
}

export default devConf
