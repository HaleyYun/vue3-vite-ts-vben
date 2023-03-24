# 富文本组件

参数

| 参数                | 说明         | 类型    | 可选值              | 默认值       |
| ------------------- | ------------ | ------- | ------------------- | ------------ |
| editorId            | 编辑器 id    | String  |                     | vocenEdiltor |
| height              | 高度         | number  | ---                 | 500          |
| zIndex              | 层级         | number  | ---                 | 20           |
| placeholder         | 提示文字     | String  | ---                 | 请输入内容   |
| focus               | 自动获取焦点 | Boolean | true,false          | false        |
| content             | 初始化内容   | String  | ---                 | ''           |
| menus               | 菜单配置     | Array   | wangEditor 官网配置 |              |
| colors              | 颜色配置     | Array   | wangEditor 官网配置 |              |
| fontNames           | 文字字体配置 | Array   | wangEditor 官网配置 |              |
| fontSizes           | 文字大小配置 | Array   | wangEditor 官网配置 |              |
| showFullScreen      | 是否显示全屏 | Boolean | true，false         | true         |
| menuTooltipPosition | 菜单提示     | String  | up 上标 down 下标   | up           |

方法

| 方法名      | 说明            | 返回值 |
| ----------- | --------------- | ------ |
| getHtml     | 获取富文本 html | String |
| getText     | 获取富文本文本  | String |
| clearEditor | 清空富文本      | 无     |
