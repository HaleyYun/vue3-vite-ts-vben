import { createApp } from 'vue'
import App from './App.vue'
import VoPhotoGallery from '../../packages/components/PhotoGallery'
import VoWangEditor from '../../packages/components/WangEditor'

async function bootstrap() {
  const app = createApp(App)

  //注册全局组件 图片库
  app.component('VoPhotoGallery', VoPhotoGallery)
  app.component('VoWangEditor', VoWangEditor)

  app.mount('#app')
}

bootstrap().then((r) => {})
