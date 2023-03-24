# @vocen/shared

## 介绍

通用工具类包 @vocen/shared，包含 lodash 工具类、decimaljs 数字精度计算类、常用业务工具类方法、常用正则，正则校验方法、通用状态类等

## 说明

@voven/shared 工具类包属于沃森信息管理部私有 npm 包，使用之前需要切换本地 npm 源镜像

## 推荐使用 nrm 来切换不同的 npm 源

[nrm 安装与配置](https://www.jianshu.com/p/94d084ce6834)

## 新增源并切换

```
nrm add vocen http://npm.gongchuangji.cn/

nrm use vocen
```

## 安装

```
pnpm add @vocen/shared
```

## 使用方式

```
import { _, VoUtils, Decimal, Pattern } from '@vocen/shared'
```

## 文档说明

请参考 [@vocen/shared](http://frontdoc.gongchuangji.com/shared/readMe.html) 文档说明

## 版本说明

- ### v0.1.0

    - 第一版本包含功能有
    - lodash.js
    - decimaljs
    - 常用正则 Pattern
    - 常用正则校验方法
    - 常用业务方法
- ### v0.1.1

    - 时间函数支持 时间戳和 YYYY-MM-DD HH:mm:ss格式的转换
- ### v0.1.2

    - 新增VoStorage 和 VoHttp类，增加更多工具类方法
- ### v0.1.3

    - 拆分VoHttp类，分为AdminHttp 和 AppHttp，并优化调用方式，维护icon图标类等、[详见文档](http://10.0.7.126/shared/readMe.html#vohttp%E7%B1%BB)
- ### v0.1.4

    - 移除svg包，独立发布svg包@vocen/era-svg-icons，新增工具类非对称加密库 Encrypt，提供加密解密方法, 依据原型新增标准密码正则校验

## 参与贡献

汪君相、闫亚松
