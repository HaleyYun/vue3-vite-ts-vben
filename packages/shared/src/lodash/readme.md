## Lodash类

### lodash 介绍

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库，包含了，数组、集合、函数、语言、数学、数字、对象、Seq、字符串、使用函数、Properties、Methods 等类型的工具类。

### lodash 使用方式

```
import { _ } from '@vocen/shared';

const arr = _.concat([1,3], [3,4]);
// [1, 2, 3, 4]
```

更多使用方式请参考 [lodash 文档](https://www.lodashjs.com/)

## VoUtils 类

### 介绍

VoUtils 是根据具体业务需求，抽离出来的通用的工具方法，根据出来的方法特性，分为字符串类、对象类、函数类、数组类、时间类、web 类分类，可根据具体的业务使用其中提供的方法。

### 使用方式

```
import { VoUtils } from '@vocen/shared';


const timeStr = VoUtils.formatTime('1648025122');
console.log(timeStr)
// timeStr 输出 刚刚
```
