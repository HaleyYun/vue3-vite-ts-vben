本插件为uniapp提供iOS移动端抖音一键登录的功能。
######原生插件暴露给js的id为：vocen-dyLogin
#接口说明
######首先需要通过 uni.requireNativePlugin("ModuleName") ModuleName: 获取原生插件的名称
```
// 首先需要通过 uni.requireNativePlugin("vocen-dyLogin") 获取原生插件的名称
var vocenDyLogin = uni.requireNativePlugin("vocen-dyLogin")
```
###### 抖音登录接口（将拉起授权页）
```- (void)vocenAuthDouYinLoginCallback:(UniModuleKeepAliveCallback)callback ```
```
// #ifdef APP-PLUS
vocenDyLogin.vocenAuthDouYinLoginCallback(function (res) {
  let dict = res
  console.log(dict)
  if (dict.code === 200) {
  
  } else {
     console.log(dict.info)
  }
})
 // #endif
```
##### 返回参数说明
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| code    | int       | 错误标识 200.成功  失败参考下方抖音官方返回的code值 |
| info  | String    | 返回信息标识 |
| data  | Object    | 返回信息内容，code = 200 时返回的信息 下面是data中返回数据，code = 0时为空 |
| data - code  | String    | 抖音授权成功，返回的code |

###### 抖音官方返回的code
|  DouyinOpenSDKErrorCode   | errorCode  | 描述 |
|  ----   | ----      | ---- |
| DouyinOpenSDKSuccess    | 0  | 成功 - 我们文档是200标识成功已做更改 |
| DouyinOpenSDKErrorCodeCommon  | -1 | 通用错误类型<包括网络错误> |
| DouyinOpenSDKErrorCodeUserCanceled  | -2 | 用户手动取消 |
| DouyinOpenSDKErrorCodeSendFailed  | -3 | 发送失败 |
| DouyinOpenSDKErrorCodeAuthDenied  | -4 | 权限错误 |
| DouyinOpenSDKErrorCodeUnsupported  | -5 | 不支持 |