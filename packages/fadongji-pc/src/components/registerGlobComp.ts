import type { App } from 'vue'

import ErWangEditor from '/@/components/WangEditor/src/WangEditors.vue'
// import { Button } from './Button'
// import {
//   // Need Button as AntButton,
//
//   Input,
//   Layout,
// } from 'ant-design-vue'

// const compList = [AntButton.Group]

export function registerGlobComp(app: App) {
  // compList.forEach((comp) => {
  //   app.component(comp.name || comp.displayName, comp)
  // })
  // app.use(Input).use(Layout)

  //注册全局组件 图片库
  app.component('EraEditor', ErWangEditor)
}
