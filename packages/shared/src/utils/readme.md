## VoUtils类
### 介绍
VoUtils是根据具体业务需求，抽离出来的通用的工具方法，根据出来的方法特性，分为字符串类、对象类、函数类、数组类、时间类、web类分类，可根据具体的业务使用其中提供的方法。
### 使用方式
```
import { VoUtils } from '@vocen/shared';


const timeStr = VoUtils.formatTime('1648025122');
console.log(timeStr)
// timeStr 输出 刚刚
```
