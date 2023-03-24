本插件为uniapp提供iOS移动端闪验一键登录原生方法。
######原生插件暴露给js的id为：vocen-login
#接口说明
######首先需要通过 uni.requireNativePlugin("ModuleName") ModuleName: 获取原生插件的名称
```
// 首先需要通过 uni.requireNativePlugin("vocen-login") 获取原生插件的名称
var testModule = uni.requireNativePlugin("vocen-login")
```
###### 闪验一键登录接口（将拉起授权页）
```- (void)voShowShanYanView:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback```
```
###### 闪验绑定手机号接口（将拉起授权页）
```- (void)voShowShanYanBindMobileView:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback```
```
// #ifdef APP-PLUS
vocenLogin.voShowShanYanView({
					"role": '代理商',
					"agreementTextFirst": '我已阅读并同意',
					"agreementTextLast": ';未注册的手机号将自动注册',
					"userAgreementTitle": '《用户协议》',
					"privacyTitle": '《隐私政策》',
					"userAgreementUrl": 'http://testm.fdjcyl.com/pages/CommonWeb/PrivacyPolicy',
					"privacyUrl": 'http://testm.fdjcyl.com/pages/CommonWeb/PrivacyPolicy',
					"onlineTitle": "在线客服",
					"mobileTitle": "绑定手机号 - logo下部提示语",
					"mobile": "110"
				}, (res) => {

					let dict = res;
					console.log(dict)
					if (dict.code === 200) {

						let data = dict.data;
						if (data.businessCode === "F10000") {

							vocenLogin.voHiddenLoading()
							vocenLogin.voCloseView()
							console.log(data.token)
							uni.showToast({
								title:data.token,
								icon:'none'
							})		

						} else {

							console.log(data.des)
						}

					} else {

						console.log(dict.info)
					}

				})
// #endif

```
##### 参数说明
|  参数   | 参数类型 | 是否必传   | 参数说明     |
|  ----  | ----  | ----  |----------|
| role  | String| 是  | 用户角色名称   |
| agreementTextFirst  | String | 否 | 协议首部     |
| agreementTextLast  | String |  否 | 协议尾部     |
| userAgreementTitle  | String |  否 | 用户协议     |
| privacyTitle  | String |  否 | 隐私协议     |
| userAgreementUrl  | String |  否 | 用户协议URL  |
| privacyUrl  | String |  否 | 隐私协议URL  |
| onlineTitle  | String |  否 | 在线客服名称   |
| mobile  | String |  否 | 手机号      |
| mobileTitle  | String |  否 | 绑定手机号提示语 |

###### 2.闪验一键登录关闭事件voCloseView

```
vocenLogin.voCloseView()
```

###### 3.隐藏一键登录loading

```
vocenLogin.voHiddenLoading()
```
###### 4.当前环境是否满足预取号 YES 是 NO 否

```
- (void)voCheckAuthEnableCallback:(UniModuleKeepAliveCallback)callback
```

###### 5.一键登录ui 点击事件的监听
```- (void)voSetActionListener:(UniModuleKeepAliveCallback)callback```
```
onLoad() {

			//一键登录 监听
			/*
			C00001:切换角色按钮 
			C00002:其他登录方式按钮 绑定手机号 页面为切换其他手机号
			C00003:帮助中心 - 在线客服
			C00004:帮助中心 - 手机号
			*/
			vocenLogin.voSetActionListener(function(res) {
				let dict = res;
				console.log(dict)
				if (dict.code === 200) {
					
					//关闭一键登录授权框
					vocenLogin.voCloseView()
					
					let data = dict.data;
					if (data.businessCode === "C00001") {
						
						uni.showToast({
							title:data.des,
							icon:'none'
						})			
				
					} else if (data.businessCode === "C00002") {
				
						uni.showToast({
							title:data.des,
							icon:'none'
						})		
						
					} else if (data.businessCode === "C00003") {
				
						uni.showToast({
							title:data.des,
							icon:'none'
						})		
						
					} else if (data.businessCode === "C00004") {
				
						uni.showToast({
							title:data.des,
							icon:'none'
						})		
					}
				
				} else {
				
					console.log(dict.info)
				}
			})
		},
```
##### 返回参数说明
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| code    | int       | 错误标识 200.成功  0.失败 |
| info  | String    | 返回信息标识 |
| data  | Object    | 返回信息内容，code = 200 时返回的信息 下面是data中返回数据，code = 0时为空 |
| data - businessCode  | String    | 业务code，对应businessCode 请参考下方
| data - des  | String    | 对返回信息的描述 |
| data - mobile  | String    | 电话联系客服的反馈 |
| data - token  | String    | 一键登录成功之后，返回的token |
```
C00001:切换角色按钮 
C00002:其他登录方式按钮 
C00003:帮助中心 - 在线客服 
C00004:帮助中心 - 手机号
C00005:预取号环境
F00001:授权页拉取失败
F10001://处理建议：其他错误代码表示闪验通道无法继续，可以统一走开发者自己的其他登录方式，也可以对不同的错误单独处理
 //关闭授权页，如果授权页还未拉起，此调用不会关闭当前用户vc，即不执行任何代码
F10000:一键登录成功获取了token|
```
```如有问题可以联系我们iOS:王宁赛 Android:郭炎林```
