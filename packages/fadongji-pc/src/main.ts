import '/@/design/index.less'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
// Register icon sprite
import 'virtual:svg-icons-register'
import App from './App.vue'
import { createApp } from 'vue'
import { initAppConfigStore } from '/@/logics/initAppConfig'
import { setupErrorHandle } from '/@/logics/error-handle'
import { router, setupRouter } from '/@/router'
import { setupRouterGuard } from '/@/router/guard'
import { setupStore } from '/@/store'
import { setupGlobDirectives } from '/@/directives'
import { setupI18n } from '/@/locales/setupI18n'
import { registerGlobComp } from '/@/components/registerGlobComp'
// import DesignForm from '/@/components/voAntDesignForm/designForm'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import pinyin from 'pinyin'
import { setVoGlobalRegister } from '/@/components/VoGlobalRegister/VoGlobalRegister' // localStrage http
// import 'default-passive-events'
// 在本地开发中按需导入将增加大约20%的浏览器请求数量。
// 这可能会减慢浏览器的刷新速度。
// 因此，只在生产环境中启用按需导
// if (import.meta.env.DEV) {
//   import('ant-design-vue/dist/antd.less')
// }

async function bootstrap() {
  const app = createApp(App)

  //全局注册，基本所有组件都会用到
  app.use(Antd)

  //配置存储
  setupStore(app)

  // 初始化系统内部配置
  initAppConfigStore()

  // 全球注册组件
  registerGlobComp(app)

  // 多语言配置
  // 异步情况:语言文件可能从服务器端获取
  await setupI18n(app)

  // 配置路由
  setupRouter(app)

  // router-guard
  setupRouterGuard(router)

  // 全局指令
  setupGlobDirectives(app)

  // 配置全局错误处理
  setupErrorHandle(app)

  // 全局配置 http 以及 localStorage
  setVoGlobalRegister(app)

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app')
}

bootstrap()
