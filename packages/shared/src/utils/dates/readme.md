### 时间类

#### `timeFormat(dateTime: any, formatStr = 'yyyy-mm-dd hh:MM:ss'): string`

传入时间戳后，返回格式化后的时间 返回格式可进行配置默认返回 yyyy-mm-dd hh:MM:ss 格式

```
const timestamp = 1648098884;

const ret = VoUtils.timeFormat(timestamp);
console.log(ret)
// ret 输出 2022-03-24 13:14:44
```

#### `timeTransfer(timestamp: any, format = 'yyyy-mm-dd'): string`

时间处理函数五分钟以内显示刚刚；一小时以内显示几分钟前； 24 小时内显示几小时前；超过 24 小时三天内（含三天）显示几天前； 3 天以上显示具体日期，到天具体某一天。超过一年显示年份，显示年份

```
const timestamp = (new Date().getTime()/1000).toFixed(0);
支持 时间戳格式  和 YYYY-MM-DD HH:mm:ss  和 YYYY-MM-DD 三种格式 

const ret = VoUtils.timeTransfer(timestamp);
console.log(ret)
// ret 输出 刚刚
```
