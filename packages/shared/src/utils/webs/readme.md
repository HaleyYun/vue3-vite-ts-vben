## VoStorage 类

### 使用说明

VoStorage类是兼容 PC端 移动端  uni-app 三端的本地存储 stoarge的封装，使用前必须进行实例化该类，传入device参数，说明是哪一端，默认是 device： 'PC' pc 和 移动端， 如果要在uni-app中使用，则进行使用 device：‘UNI’,当前类挂在在VoUtils工具类方法中，使用方式如下

使用方式

```

import { VoUtils } from '@vocen/shared'

const storage = new VoUtils.VoStorage({ device: 'PC' })

storage.get(key)

storage.set(key, val)

storage.remove(key)

storage.clear()

```

### 方法说明

创建实例

创建`const store = new VoUtils.VoStorage({ device: 'PC''})`实例，`store`提供的 API 如下

| 参数    | 说明                         | return  | 调用方式                                                      |
|-------| ----------------------------  |---------|-----------------------------------------------------------|
| has   | 判断本地存储的数据是否失效        | boolean | store.has('id')                                           |
| get   | 获取本地存储的数据                | string  | store.get(key)                                            |
| set   | 设置本地数据      |         |  | string、boolean、object、number<br/> store.set('test', '122') |
| remove | 删除本地数据                   | boolean | store.delete()                                            |
| clear | 清除全部本地数据                    |         | store.clear()                                             |
