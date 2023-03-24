## VoHttp类

### 使用说明

VoHttp类是基于 uni-app端和H5端 使用的数据请求类 进行封装的 request通用数据交互类，兼容移动端、PC端、uni-app，一次配置，适配多端，
注意： 仅仅是使用方法，具体实现则以业务端进行维护.

基于VoHttp类，实现分为 uni端 AppHttp类， 和 pc端 AdminHttp类，具体实现方式如下

### 使用方式

第一步： 引用当前端需要的http类库

```
// app端
import { AppHttp } from '@vocen/shared'

// admin管理后台端
import { AdminHttp } from '@vocen/shared'
```

第二步：实例化使用端的数据请求类

```
// 以app端为例
// 假设 app端封装的 request实例为  httpRequest

import httpRequest from 'xxxxx封装文件路径'
const http = new AppHttp({
  device: 'UNI',
  requestInstance:   httpRequest
});

// 另外终端封装的数据请求类，必须事项以下基础数据请求方法 统一返回 request Promise对象



// get请求
httpRequest.apiGet({url, data, version, options })

// post请求
httpRequest.apiPost({url, data, version, options })

// put 请求
httpRequest.apiPut({url, data, version, options })

// delete 请求
httpRequest.apiDelete({url, data, version, options })

// 其他封装的数据请求方法
http.test({}).then(result => {
    console.log(result)
})
```

### 方法介绍

#### apiGet( { url, data = {}, version, options = {} })

#### apiPost( { url, data = {}, version, options = {} })

#### apiPut( { url, data = {}, version, options = {} })

#### apiDelete( { url, data = {}, version, options = {} })

get/post/put/delte 请求

#### 参数说明

url: 请求地址
data: 请求数据
options: 额外配置
version: 接口版本
备注：

### 实例化

```
import { AppHttp } from '@vocen/shared'

const http = new AppHttp(options)
```

### options参数说明


| 参数名称        | 参数类型 | 必选 | 参数说明                        | 参数值       |
| ----------------- | ---------- | ------ | --------------------------------- | -------------- |
| device          | string   | 否   | 设置类型（默认PC）              | PC/UNI       |
| requestInstance | boolean  | 是   | 终端设别分装的实例化request请求 | 参考各端实现 |

### admin端 示例

```
// 假设 admin端封装的 request实例为  httpRequest
import httpRequest from 'xxxxx封装文件路径'
const http = new appHttp({
  device: 'PC',
  requestInstance:   httpRequest
});
```

### 业务使用方法

#### app端

app端调用封装好的通用方法，方法名称和功能说明如下

##### `function appTestList({ data: ''})`

测试方法

#### admin端

admin端调用封装好的通用方法，方法名称和功能说明如下

##### `function adminTestList({ data: ''})`

测试方法
