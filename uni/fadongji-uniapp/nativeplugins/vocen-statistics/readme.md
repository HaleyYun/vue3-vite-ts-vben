本插件为uniapp提供iOS移动端友盟统计功能。
###### 原生插件暴露给js的id为：vocen-statistics
只要接入插件，uniapp 就会带有友盟的基础统计功能，以下为友盟统计的高级功能
#接口说明
###### 引入原生插件方法：
```
var vocenStatistics= uni.requireNativePlugin("vocen-statistics")
```
#账号统计功能
######【友盟+】在统计用户时以设备为标准，如果需要统计应用自身的账号，可以使用此功能
```
H5调用方法 原生开发不需要看
vocenStatistics.voUMengAccountStatistics  ({
    puid:'userID',
    provider:''
  },(res) => {},
)

//原生方法 H5不用看
- (void)voUMengAccountStatistics:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback {
    
    NSString * puid = NIL(json[@"puid"]) ? @"" : json[@"puid"];
    NSString *provider = NIL(json[@"provider"]) ? @"" : json[@"provider"];
    if (NIL(puID)) {
        if (callback) {

            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"用户账号ID不能为空"
            },YES);
        }
        return;
    }
    // PUID：用户账号ID.长度小于64字节
    // Provider：账号来源。不能以下划线"_"开头，使用大写字母和数字标识，长度小于32 字节;
    if (NIL(provider)) {
        [MobClick profileSignInWithPUID:puid];
        return;
    }
    [MobClick profileSignInWithPUID:puid provider:provider];
}
```
##### H5调原生 入参说明
|  参数   | 类型  | 描述 | 备注 |
|  ----   | ---- | ---- | ---- |
| puid    | String | 用户ID |  |
| provider  | String    | 账号来源 | 不能以下划线”_”开头，使用大写字母和数字标识; 如果是上市公司，建议使用股票代码。 |
###### Signoff调用后，不再发送账号内容。
`voUMengAccountProfileSignOff`
```
H5调用方法 原生开发不需要看
vocenStatistics.voUMengAccountProfileSignOff()

//原生方法 H5不用看
- (void)voUMengAccountProfileSignOff {
    [MobClick profileSignOff];
}
```
# 页面统计功能
###### 页面统计两种方式对比![E58B7E40-5080-467F-A389-43CCB016E537.png](https://upload-images.jianshu.io/upload_images/1684855-6024260dfc2ff24a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
AUTO模式：
```
H5调用方法 原生开发不需要看
vocenStatistics.voUMengPageAUTOStatistics()
//原生方法 H5不用看
- (void)voUMengPageAUTOStatistics {
    [MobClick setAutoPageEnabled:YES];
}
```
MANUAL模式
```
H5调用方法 原生开发不需要看
//动页面时长统计, 记录某个页面展示的时长.
vocenStatistics.voUMengPageMANUALStatistics ({
    pageName:'Class',
    seconds:'10'
  },(res) => {},
)
//onShow 声明周期下调用
vocenStatistics.voUMengPageBeginLogPageView ({
    pageName:'Class',
  },(res) => {},
)
//onHide 声明周期下顶用  
vocenStatistics.voUMengPageEndLogPageView ({
    pageName:'Class',
  },(res) => {},
)
//原生方法 H5不用看
//MANUAL模式
/** 手动页面时长统计, 记录某个页面展示的时长.
 pageName 统计的页面名称.
 seconds 单位为秒，int型.
 */
- (void)voUMengPageMANUALStatistics:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback {
    
    NSString *pageName = NIL(json[@"pageName"]) ? @"" : json[@"pageName"];
    NSString *seconds = NIL(json[@"seconds"]) ? @"" : json[@"seconds"];
    if (NIL(pageName)) {
        if (callback) {

            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"统计的页面名称不能为空"
            },YES);
        }
        return;
    }
    if (NIL(seconds)) {
        if (callback) {

            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"记录某个页面展示的时长不能为空"
            },YES);
        }
        return;
    }
    
    [MobClick logPageView:pageName seconds:[seconds intValue]];
}

/** 自动页面时长统计, 开始记录某个页面展示时长.

 使用方法：必须配对调用beginLogPageView:和endLogPageView:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据。

 在该页面展示时调用beginLogPageView:，当退出该页面时调用endLogPageView:
 
 pageName 统计的页面名称.

 */
- (void)voUMengPageBeginLogPageView:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback {
    
    NSString *pageName = NIL(json[@"pageName"]) ? @"" : json[@"pageName"];
    if (NIL(pageName)) {
        if (callback) {

            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"统计的页面名称不能为空"
            },YES);
        }
        return;
    }
    [MobClick beginLogPageView:pageName];
}

/** 自动页面时长统计, 结束记录某个页面展示时长.

 使用方法：必须配对调用beginLogPageView:和endLogPageView:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据。

 在该页面展示时调用beginLogPageView:，当退出该页面时调用endLogPageView:

 pageName 统计的页面名称.

 */
- (void)voUMengPageEndLogPageView:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback {
    
    NSString *pageName = NIL(json[@"pageName"]) ? @"" : json[@"pageName"];
    if (NIL(pageName)) {
        if (callback) {

            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"统计的页面名称不能为空"
            },YES);
        }
        return;
    }
    [MobClick endLogPageView:pageName];
}
```
##### H5调原生 入参说明
|  参数   | 类型  | 描述 | 备注 |
|  ----   | ---- | ---- | ---- |
| pageName    | String | 统计的页面名称 |  |
| seconds  | int    | 时长 | 单位为秒 |
注意：
必须配对调用beginLogPageView:和endLogPageView:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据；
在该页面展示时调用beginLogPageView:，当退出该页面时调用endLogPageView。

# 事件统计功能 可认为是埋点
```
H5调用方法 原生开发不需要看
vocenStatistics.voUMengEventStatistics  ({
    eventType:'1',
    attributes:{},
    label:'',
    counter:'',
  },(res) => {},
)

//原生方法 H5不用看
- (void)voUMengEventStatistics:(NSDictionary *)json callback:(UniModuleKeepAliveCallback)callback {
    
    NSString *eventType = NIL(json[@"eventType"]) ? @"" : json[@"eventType"];
    if (NIL(eventType)) {
        if (callback) {
            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"请选择事件统计的类型"
            },YES);
        }
        return;
    }
    NSString *eventId = NIL(json[@"eventId"]) ? @"" : json[@"eventId"];
    if (NIL(eventId)) {
        if (callback) {
            callback(@{
                @"code":@(0),
                @"data":@{},
                @"info":@"网站注册的事件Id不能为空"
            },YES);
        }
        return;
    }
    NSDictionary *attributes = NIL(json[@"attributes"]) ? @"" : json[@"attributes"];
    NSString *label = NIL(json[@"label"]) ? @"" : json[@"label"];
    NSString *counter = NIL(json[@"counter"]) ? @"" : json[@"counter"];

    //无参数时候的事件统计
    if ([eventType intValue] == 1) {
        [MobClick event:eventId];
        return;
    }
    //有参数的事件统计
    if ([eventType intValue] == 2) {
        [MobClick event:eventId attributes:attributes];
        return;
    }
    //分类标签时候的事件统计
    if ([eventType intValue] == 3) {
        [MobClick event:eventId label:label];
        return;
    }
    
    //有参数 && 可自定义 事件统计
    if ([eventType intValue] == 3) {
        [MobClick event:eventId attributes:attributes counter:[counter intValue]];
        return;
    }
}
```
##### H5调原生 入参说明
|  参数   | 类型  | 描述 | 备注 |
|  ----   | ---- | ---- | ---- |
| eventType    | String | 事件统计的类型 | 1.无参数时候的事件统计 2.有参数的事件统计 3.分类标签时候的事件统计 4.有参数 && 可自定义 事件统计 |
| eventId    | String | 网站上注册的事件Id | 无 |
| label  | String    | 分类标签 | 不同的标签会分别进行统计，方便同一事件的不同标签的对比,为nil或空字符串时后台会生成和eventId同名的标签。 |
| attributes    | NSDictionary | 自定义属性 | 属性中的key－value必须为String类型, 每个应用至多添加500个自定义事件，key不能超过100个。 |
| counter    | int | 自定义数值 | 无 |

注意：
自定义事件可以用于追踪用户行为，记录行为发生的具体细节。本文适用于不低于6.0.0版本的sdk（包含6.0.0版本），若您使用的sdk版本低于6.0.0，为便于您获取更好的产品使用，建议您先进行SDK升级。
### 事件基本构成
*   event ID：自定义事件ID，指一个操作
    例如：您可定义“pause”或“play”作为一个事件。您也可更加具体，创建一个“music_willbe_finished”的事件，并设定在音乐播放了 90% 的那一刻触发；友盟+提供了两种自定义事件的形式：**多参数类型事件**和**计算事件**。
*   key：自定义事件下的参数，一个可选的描述符，用于定义事件操作的属性信息
    例如，您可以定义“music_style”或“singer_name”作为“play”事件的参数，也可以定义“play_time”作为事件的参数。
*   value：自定义事件参数下的参数值，用于描述事件属性的详细信息。
    例如，“play”事件下“music_style”的参数值可以是“slight”、“rock”等。数值型参数的取值是数字变量。值可以是明确的数字，如“23”；也可以是在其他位置定义的基于推断值的变量，如“downloadTime”。
### 使用自定义事件的依赖条件与限制
UMConfigure.setProcessEvent。
*   event ID或者key请使用英文、数字、下划线、中划线及加号进行定义，使用其中一种或者几种都可以，不能以“数字”开头，避免使用中文。为保证数据计算的准确性，非这些“合法”以外的字符无法添加，具体限制请查看下文注意事项；
*   每个应用至多添加500个event，一个event下支持100个key同时计算，若超过100个，需要开发者手动指定哪些参数需要计算；
*   一个key下支持可传1000个value，value不建议使用特殊字符定义（建议使用标准ASCII码中可见字符部分进行定义）；
*   为方便使用者理解及使用，可通过显示名称进行重命名（支持中文），进入【应用设置-事件-编辑】进行操作；
*   埋码完成后，建议使用集成测试进行验证；
### 注意事项
*   event id长度不能超过128个字节，key不能超过128个字节，value不能超过256个字节
*   id、ts、du、token、device_name、device_model 、device_brand、country、city、channel、province、appkey、app_version、access、launch、pre_app_version、terminate、no_first_pay、is_newpayer、first_pay_at、first_pay_level、first_pay_source、first_pay_user_level、first_pay_versio是保留字段，不能作为event id 及key的名称

###### 相应参数
|  参数   | 参数类型  | 参数说明 |
|  ----   | ----      | ---- |
| code    | int  | 0.失败  |
| data    | Object  | 空 |
| info  | String    | 信息描述 |

如需查看详细文档请阅读友盟相关文档：https://developer.umeng.com/docs/119267/detail/119517#h1-u9875u9762u7EDFu8BA1u529Fu80FD2
```如有问题可以联系我们iOS:王宁赛 Android:郭炎林```