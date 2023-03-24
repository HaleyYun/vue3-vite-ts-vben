// 开发环境域名
// const apiBaseUrl = 'http://devgate.fdjcyl.com'
// 测试环境域名
const apiBaseUrl = 'http://testgate.fdjcyl.com'
// 测试环境前缀
const apiPrefix = '/vocen-wolverine'
// h5测试链接
const shareBaseUrl = 'http://testm.fdjcyl.com'
// 本地联调前缀
//const apiPrefix = ''
//王钊宁本地
// const apiBaseUrl = 'http://10.0.7.106:20004'

//林宗宗本地
// const apiBaseUrl = 'http://10.0.7.103:20200'

// 张苗本地
// const apiBaseUrl = 'http://10.0.7.42:20200'
// 义广本地
// const apiBaseUrl = 'http://10.0.7.177:10003'
// 钊东本地
// const apiBaseUrl = 'http://10.0.7.70:20200'
// 马朋飞本地
// const apiBaseUrl = 'http://10.0.7.26:20200'
// 张栓本地
// const apiBaseUrl = 'http://10.0.7.26:20200'

// 郭耀旗本地
// const apiBaseUrl = 'http://10.0.7.132:20200'

// 刘泽本地
//const apiBaseUrl = 'http://10.0.7.30:20200'

const licenseId = '133960256299597825'
const clientId = 'engine-app'
const clientSecret = 'engine-app-Secret'


// 微信验签appid
const appid = 'wx2b3387f5086ec242'
// 腾讯直传域名
const tencentCosUrl = 'https://dcp.fdjcyl.com'
//腾讯云回显域名
const showCosUrl = 'https://dcp.fdjcyl.com'
// 测试imConnectUrl
const imConnectUrl = 'ws://testgate.fdjcyl.com/notice/websocket'
// 刘泽本地
//const imConnectUrl = 'ws://10.0.7.30:80'
// 分享用logo
const shareLogo = 'https://dcp.fdjcyl.com/GongChuangJi/fadongji-logo.png'
// 是否预生产
const isPre = false
// 是否是生产环境
const isPro = false
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
