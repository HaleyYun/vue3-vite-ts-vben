import type { App } from 'vue'

import PhotoGallery from './components/PhotoGallery'
import WangEditor from './components/WangEditor'

// 需要添加到 VUE 实例的 API
const API = {}
const components = [PhotoGallery, WangEditor]

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  app.config.compilerOptions.isCustomElement = (tag) => tag === 'iconpark-icon'
  // 注册组件
  components.forEach((component) => app.component(component.name, component))
  // ctx 里插入 API
  Object.keys(API).forEach((key) => {
    app.config.globalProperties[`$${key}`] = (API as any)[key]
  })
}

export { PhotoGallery, WangEditor }

export default {
  install,
  ...components,
}
