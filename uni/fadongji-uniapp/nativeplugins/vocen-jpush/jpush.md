# 极光推送插件
`注：目前极光推送的功能只有别名推送，后续如需增加其他功能在做添加操作`
###### 原生插件暴露给js的id为：vocen-jpush
# 接口说明
###### 首先需要通过 uni.requireNativePlugin("ModuleName") ModuleName: 获取原生插件的名称
```
// 首先需要通过 uni.requireNativePlugin("vocen-jpush") 获取原生插件的名称
var testModule = uni.requireNativePlugin("vocen-jpush")
```
# 暴露方法说明
###### 设置极光别名`voJPushSetAlias()`
```
vocenPluginJPushModule() {
    testModule.voJPushSetAlias({
    'alias':'user_100'
},
(res) => {
    console.log(res.result)
    uni.showToast({
	title: JSON.stringify(res),
	icon: "none"
        })
    }
)}
```
###### 移除极光别名 `voJPushDeleteAlias()`
```
vocenPluginDeleteModule() {
    testModule.voJPushDeleteAlias({
    'alias':'user_100'
},
(res) => {
    console.log(res.result)
    uni.showToast({
	title: JSON.stringify(res),
	icon: "none"
        })
    }
)}
```
###### 获取的推送数据 `voJPushReviceDataCallback()`
```需要加全局监听```
```
vocenPluginReviceData() {
    testModule.voJPushReviceDataCallback({},
(res) => {
    console.log(res)
)}
```
```注：type 1.点击通知栏收到远程通知 2.app 处于前台时调用```
# 参数说明
|  参数   | 参数类型  | 参数说明 |
|  ----  | ----  | ----  |
| alias  | String | 极光推送的别名 一般是用户 user_ID|

# 返回参数说明 `整体是对象{}`
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| code    | int       | 错误标识 200.成功  0.失败 |
| info  | String    | 返回信息标识 |
| data  | Object    | 返回信息内容，code = 200 时返回的信息，code = 0时为空 |

```如有问题可以联系我们iOS:王宁赛 Android:郭彦林```
