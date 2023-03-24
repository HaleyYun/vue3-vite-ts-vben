### 字符串类

#### `toString(val: any): string`

把输入的值转换为字符串

```
const test = 123;
const ret = VoUtils.toString(test);
console.log(ret)
// ret 输出 '123'
```

#### `function encryptPhone(phone: string): string `

手机号加密 输出类似 `155 **** 1175` 的格式

```
const test = 15565601175;
const ret = VoUtils.encryptPhone(test);
console.log(ret)
// ret 输出 '155 **** 1175'
```
