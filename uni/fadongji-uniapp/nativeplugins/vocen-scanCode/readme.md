本插件为uniapp提供iOS移动端视频播放的功能。
######原生插件暴露给js的id为：vocen-scanCode
#接口说明
###### 此插件为组件格式，uniapp 只能为nvue为容器
// uniapp调用方式为：类似于调用组件的方式调动插件
```
<vocen-scanCode class="flex1" style="width: 750rpx;" :style="{height: height}" @voSacnBack="voSacnBack" @voScanCode="voScanCode" />
```
##### 方法说明
|  方法名  | 方法说明 |
|  ----  |--|
| voScanCode   | 扫码结果返回 |
| voSacnBack  | 点击返回 |

###### 示例 接收的时候res.detail 是固定写法
```
voScanCode(res) {
				console.log(res.detail)
				
			}
```
   
###### voScanCode 响应参数说明
| 参数       | 类型     | 描述                 |
|----------|--------|--------------------|
| code     | int    | 200.识别成功 0.识别失败    |
| result   | String | 扫码识别的结果            |

##### 方法说明
//开启扫描
```voScanCodeStart```
//停止扫描
```voScanCodeStop```