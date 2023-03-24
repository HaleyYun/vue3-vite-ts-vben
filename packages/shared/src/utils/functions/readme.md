### 函数类

#### `checkIsEmpty(param: any): boolean`

返回一个变量是否为空 `undefined` `0` `空` 返回为 true

```
const test = undefined;

const ret = VoUtils.checkIsEmpty(test);
console.log(ret)
// ret 输出 true
```

#### `toNumber(val: string): number | string`

将输入值转换为数字，如果转换失败，则返回原字符串

```
const test = '20';

const ret = VoUtils.toNumber(test);
console.log(ret)
// ret 输出 20
```

#### `isPromise(val: any): boolean`

判断当前实例是否是 Promise 对象

```
const test = new Promise(() => {});

const ret = VoUtils.isPromise(test);
console.log(ret)
// ret 输出 true
```

#### ` toRawType(value: any): string`

获取值得原始类型字符串原始类型 `String` `Number` `Array` `Null` `RegExp` `Undefined` `Boolean` `Object` `Function` `Symbol`

```
const test = '20';

const ret = VoUtils.toRawType(test);
console.log(ret)
// ret 输出 String
```

#### `isRegExp(v: any): boolean`

判断当前对象是否是正则实例化对象

```
const test = /\d/g;

const ret = VoUtils.isRegExp(test);
console.log(ret)
// ret 输出 true
```

#### `isUndef(v: any): boolean`

判断变量是否 非 undefined

```
const test = '20';

const ret = VoUtils.isUndef(test);
console.log(ret)
// ret 输出 true
```

#### `isDef(v: any): boolean`

判断变量是否 是 undefined

```
const test = undefined;

const ret = VoUtils.isDef(test);
console.log(ret)
// ret 输出 true
```

#### `isTrue(v: any): boolean`

判断变量是否是 假值

```
const test = true;

const ret = VoUtils.isTrue(test);
console.log(ret)
// ret 输出 true
```

#### `isFalse(v: any): boolean `

判断变量是否是 假值

```
const test = false;

const ret = VoUtils.isFalse(test);
console.log(ret)
// ret 输出 true
```

#### `getRandomColor(): string `

获取随机css颜色值， 返回 `rgb` 颜色字符串

```

const ret = VoUtils.getRandomColor();
console.log(ret)
// ret 输出 rgb(123, 234, 133)
```

#### ` function transformUrl(url: string): string `

获取静态资源 url地址，如果是全路径则原样返回

```
设置： CDN 地址为： www.test.com
const ret = VoUtils.transformUrl(‘/test/a.png’);
console.log(ret)
// ret 输出 http://www.test.com/test/a.png
```

#### ` function transformDateByType(num: number, type: string): string[] `

获取月份或者年份的开始时间和结束时间

```
例如 transformDateByType(1, 'month')  // 获取近一个月的开始时间和结束时间
结果：['2022-07-04 14:15:33', '2022-08-04 14:15:33']

例如 transformDateByType(2022, 'year')  // 获取2022年的开始时间和结束时间
结果：['2022-01-01 00:00:00', '2023-01-01 00:00:00']
```
