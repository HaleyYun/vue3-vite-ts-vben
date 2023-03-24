import { $prefix, $prefixUser, $v1Prefix } from '../../../helpers'
import { $v1Api } from '../../../helpers/app-api-prefix-v1'

export default {
  login: `${$prefix}/login`, //    登录
  logoff: `${$prefix}/logoff`, //    退出
  register: `${$prefix}/register`, //    注册
  smsSend: `${$prefixUser}/sms/send`, //    获取验证码
  role: `${$prefixUser}/user/info/role`, //    获取角色列表
  password: `${$prefixUser}/user/info/password`, // 设置密码
  smsVerify: `${$prefixUser}/sms/verify`, // 短信验证码验证
  apiCreatedCosGet: `${$prefixUser}/create/cos/get`, // 获取腾讯云临时凭证
  wxSignature: `/wx/signature`,
  switchRole: `/switch/role`, // 切换角色
  defaultAddress: `${$v1Api}receiver/address/default`, // 默认地址
  pay: `/pay/pay`, // 通用支付
  sixHotAreaSub: `${$v1Prefix}sixhot/area/sub`, // 根据地区父级code获取所有子级
}
