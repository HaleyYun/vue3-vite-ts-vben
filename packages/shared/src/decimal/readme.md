## Decimal类

### Decimal 介绍

JavaScript 的任意精度 Decimal 类型，解决 js 业务中，遇到的数字计算精度问题，比如 0.1 + 0.2 = 0.3 但是在 js 中就是 0.30000000000000004，使用 decimal 类，此问题就会迎刃而解，不用再担心精度问题

### 使用方式

```
import { Decimal } from '@vocen/shared';
const a = 0.1;
const b = 0.2;
// 求 a + b 的值

// 第一种方式
const c = new Decimal.add(a, b).toNumber();
// c = 0.3

// 第二种
const c = new Decimal(a).plus(b).toNumber();
// c = 0.3
```

### 常用方法

#### 加法

```
const z = Decimal.add(x, y).toNumber();
```

#### 减法

```
const z = Decimal.sub(x, y).toNumber();
```

#### 乘法

```
const z = Decimal.mul(x, y).toNumber();
```

#### 除法

```
const z = Decimal.div(x, y).toNumber();
```

### Decimal 的 api 方法大全

更多 Decimal 探索请参考 [decimal 文档](http://mikemcl.github.io/decimal.js/)

![API](https://raw.githubusercontent.com/MikeMcl/decimal.js/gh-pages/API.png)
