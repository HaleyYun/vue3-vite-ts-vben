本插件为uniapp提供iOS/Android移动端腾讯云人脸识别原生方法。
######原生插件暴露给js的id为：vocen-faceIdentification
#接口说明
######首先需要通过 uni.requireNativePlugin("ModuleName") ModuleName: 获取原生插件的名称
```
// 首先需要通过 uni.requireNativePlugin("vocen-faceIdentification") 获取原生插件的名称
var voFaceID = uni.requireNativePlugin("vocen-faceIdentification")
```
###### 腾讯拉起活体检测
```- (void)voStartFaceIdentification:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback```
```
// #ifdef APP-PLUS
voFaceID.voStartFaceIdentification({
					"userId": '10000',
					"name": '张三',
					"idCard": '420127199603120933',
                    "sign": '',
                    "faceIdSign": '',
					"nonce": '',
				}, (res) => {
					let dict = res;
					console.log(dict)
				})
// #endif

```
##### 参数说明
|  参数   | 参数类型 | 是否必传 | 参数说明                                                                               |
|  ----  | ----  |------|------------------------------------------------------------------------------------|
| userId  | String| 是    | 用户唯一标识                                                                             |
| name  | String | 是    | 身份证名字                                                                              |
| idCard  | String | 是    | 身份证号                                                                               |
| nonce  | String | 是    | 满足接入要求的32位随机数                                                                      |
| sign  | String | 是    | 签名，用于获取人脸识别的faceID                                                                 |
| faceIdSign  | String | 是    | 签名，用于拉取活体识别的签名 如果获取faceID在后端 此faceIdSign不传直接传后端返回的sign 如果获取faceID在前端，则faceIdSign必传 |

##### 返回参数说明
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| code    | int       | 错误标识 200.成功  0.失败 |
| data  | Object    | 返回信息内容，code = 200 时返回的信息 下面是data中返回数据|
| data - businessCode  | String    | 业务code，对应businessCode 请参考下方
| data - des  | String    | 对返回信息的描述 |
```
F00001.人脸识别未调起的错误   
提示语：userId - userID不能为空，请检查userID字段确保有值! 
	   name - name不能为空，请检查name字段确保有值! 
	   idCard - idCard不能为空，请检查idCard身份证号字段确保有值!
	   sign - sign不能为空，请检查sign字段确保有值!
F00002.网络原因导致的获取人脸识别失败 提示语：网络原因导致错误,请重试
F00003.获取faceID时，接口请求失败时 
提示语：获取faceID时, 后台没有返回faceId- + 腾讯云返回的错误信息
S00000. 调起活体检测识别之后，腾讯云返回的信息
```
```当code == 200 或者 businessCode == S0000的时候证明是腾讯云返回的检测结果。参数如下：```
##### 人脸核身（活体检测）失败情况下
 ![image.png](https://upload-images.jianshu.io/upload_images/1684855-33809a2289075ac8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##### 人脸核身（活体检测）iOS错误码如下
腾讯云返回错误文档:https://cloud.tencent.com/document/product/1007/35877
##### 人脸核身（活体检测）成功下返回示例
```
{"code":"0",
 "msg":"请求成功",
 "bizSeqNo":"22032920001184453211174015790894",
 "result":{
         "orderNo":"1617091885609174325769165852",
         "liveRate":"99",
         "similarity":"88.01",
         "occurredTime":"20220329104717",
         "appId":"IDAXXXXX",
         "photo":”******",
         "video":"******",
         "bizSeqNo":"22032920001184453211174015790894",
         "sdkVersion":"1.12.12",
         "trtcFlag":"Y"},
 "transactionTime":"20220329111740"
 }
```
##### 返回参数说明
![image.png](https://upload-images.jianshu.io/upload_images/1684855-b227971fb4a7e6b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如需查看详细文档请阅读腾讯云相关文档：https://cloud.tencent.com/document/product/1007/35880
```如有问题可以联系我们iOS:王宁赛 Android:郭炎林```
