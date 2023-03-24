## pc 沃森 组件库

# @vocen/ui-pc-web

## 介绍

沃森应用开发-公共模块-pc 组件库

## 推荐使用 nrm 来切换不同的 npm 源

[nrm 安装与配置](https://www.jianshu.com/p/94d084ce6834)

## 新增源并切换

```
nrm add vocen http://10.0.2.62/

nrm use vocen
```

## 安装

```
pnpm add @vocen/ui-pc-web
```

引入示例

```js
import UiPcWeb from '@vocen/ui-pc-web'

import '@vocen/ui-pc-web/lib/theme-default/index.css'

createApp(App).use(UiPcWeb).mount('#app')
```
