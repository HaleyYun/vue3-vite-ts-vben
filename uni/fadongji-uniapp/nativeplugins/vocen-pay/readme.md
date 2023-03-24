本插件为uniapp提供iOS移动端支付功能。
###### 原生插件暴露给js的id为：vocen-pay
#接口说明
###### 引入原生插件方法：
```
var vocenPay = uni.requireNativePlugin("vocen-pay")
```
###### 通过短连接打开支付宝应用
```
H5调用方法 原生开发不需要看
vocenPay.voPayModuleView  ({
    url:payInfo
    // url: '[https://qr.alipay.com/bax08931vw9wth5je97x5559]    (https://qr.alipay.com/bax08931vw9wth5je97x5559)',
  },(res) => {},
)

//原生方法 H5不用看
- (void)voPayModuleView:(NSDictionary *)jsonData callback:(UniModuleKeepAliveCallback)callback {
    self.payCallback = callback;
    if (NIL(jsonData[@"url"])) {
        
        [QMUITips showInfo:@"支付失败,拉起支付链接不能为空，请检查"];
        return;
    }
    NSString *urlString = jsonData[@"url"];
    //通过webView 拉起支付宝
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlString]]];
}
```
##### H5调原生 入参参数说明
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| code    | int       | 错误标识 200.成功  |
| info  | String    | 返回信息标识 |
| data  | Object    | 返回信息内容如下 |

###### data中的对象内容解析
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| businessCode    | String  | F00001.拉取支付宝失败 S00001.拉取支付宝成功  |
| des  | String    | 信息描述 |

###### 监听支付结果方法
```
H5调用方法 原生开发不需要看
vocenPay.voPayModuleListeningCallback  ((res) => {
    console.log(res)
  },
)

//原生方法 H5不用看
- (void)voPayModuleListeningCallback:(UniModuleKeepAliveCallback)callback {
    self.listeningCallback = callback;
}
```
##### H5调原生 入参参数说明
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| code    | int       | 错误标识 200.成功  |
| info  | String    | 返回信息标识 |
| data  | Object    | 返回信息内容如下 |

###### data中的对象内容解析
|  参数   | 参数类型  | 参数说明|
|  ----   | ----      | ---- |
| businessCode    | String  | S10001.支付宝返回App内成功  |
| des  | String    | 信息描述 |

###### 移除监听支付结果
```
H5调用方法 原生开发不需要看
vocenPay.voPayRemoveListening()
```

