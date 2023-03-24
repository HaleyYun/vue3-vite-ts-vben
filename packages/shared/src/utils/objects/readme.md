### 对象类

#### `hasOwn(obj: Object | any[], key: string): boolean`

判断当前对象是否含有某个属性

```
const test = { name: 'hello'};

const ret1 = VoUtils.hasOwn(test, 'name');
const ret2 = VoUtils.hasOwn(test, 'age');
console.log(ret1)
console.log(ret2)
// ret1输出 true
// ret2输出 false
```

#### `isObject(obj: Object): boolean`

判断当前对象是否是对象类型

```
const test = {a: 1};

const ret = VoUtils.isObject(test);
console.log(ret)
// ret 输出 true
```

#### `emptyObject `

返回一个冻结的空对象、不可以修改

```


const ret = VoUtils.emptyObject;
console.log(ret)
// ret 输出 {}
```
