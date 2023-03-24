### 数组类

#### `remove(arr: Array<any>, item: any)`

删除数组元素中的一个值 仅支持一维数组如果传入的非数组，则无返回值

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.remove(arr, 2);
console.log(ret)
// ret 输出 [1, 3, 4]
```

#### `isValidArrayIndex(val: any): boolean`

检测是否是有效的数组索引

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.isValidArrayIndex(arr);
console.log(ret)
// ret 输出 true
```

#### `ensureArray = (arr: any): any[]`

确保一个变量返回的事一个数组类型,如果传入的非数组类型，则返回一个空数组

```
const arr1 = [1, 2, 3, 4];
const arr2 = 123123;

const ret1 = VoUtils.ensureArray(arr1);
const ret2 = VoUtils.ensureArray(arr2);
console.log(ret1)
console.log(ret2)
// ret1 输出 [1, 2, 3, 4]
// ret2 输出 []
```


#### `isArray(arr: any): boolean`

判断传入的参数变量是否是数组

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.isArray(arr);
console.log(ret)
// ret 输出 true
```


#### `orderByDesc(arr: Array<any>): Array<any>`

一维数组降序排序

```
const arr = [1, 2, 3, 4];

const ret = VoUtils.orderByDesc(arr);
console.log(ret)
// ret 输出 [4,3,2,1]
```

#### `function orderByAsc(arr: Array<any>): Array<any>`

一维数组升序排序

```
const arr = [4,3,2,1];

const ret = VoUtils.orderByAsc(arr);
console.log(ret)
// ret 输出 [1, 2, 3, 4]
```


#### `function orderPropertyByDesc(arr: Array<object>, property: string): Array<object>`

对象一维数组 降序排列

```
const arr = [{ name: 'zs1', age: 1 }, { name: 'zs2', age: 2 }, { name: 'zs2', age: 3 }];

const ret = VoUtils.orderPropertyByDesc('age');
console.log(ret)
// ret 输出 [ { name: 'zs2', age: 3 },{ name: 'zs2', age: 2 },{ name: 'zs1', age: 1 }]
```


#### `function orderPropertyByAsc(arr: Array<object>, property: string): Array<object>`

对象一维数组 升序排列

```
const arr = [ { name: 'zs2', age: 3 },{ name: 'zs2', age: 2 },{ name: 'zs1', age: 1 }];

const ret = VoUtils.orderPropertyByAsc('age');
console.log(ret)
// ret 输出 [{ name: 'zs1', age: 1 }, { name: 'zs2', age: 2 }, { name: 'zs2', age: 3 }]
```

