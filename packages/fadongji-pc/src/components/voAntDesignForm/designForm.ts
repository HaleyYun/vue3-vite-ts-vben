import { App } from 'vue'
import AntdDesignForm from './src/core/AntdDesignForm.vue'
import Icons from './src/icons'
import './src/styles/index.styl'

Icons.install()

AntdDesignForm.install = (app: App) => {
  app.component(AntdDesignForm.name, AntdDesignForm)
}

const components = [AntdDesignForm]

const install = (app: App) => {
  components.forEach((component) => app.component(component.name, component))
}

export { install, AntdDesignForm }

export default {
  install,
  AntdDesignForm,
}
