import type { App } from 'vue'

// import * as components from '../components';
import version from './version'
// export * from '../components';

import Button from './Button'
import PhotoGallery from './PhotoGallery'
import WangEditor from './WangEditor'

const components = [Button, PhotoGallery, WangEditor]

export const install = function (app: App) {
  components.forEach((component) => {
    if (component.install) {
      app.use(component)
    }
  })

  // app.config.globalProperties.$message = components.message;
  // app.config.globalProperties.$notification = components.notification;
  // app.config.globalProperties.$info = components.Modal.info;
  // app.config.globalProperties.$success = components.Modal.success;
  // app.config.globalProperties.$error = components.Modal.error;
  // app.config.globalProperties.$warning = components.Modal.warning;
  // app.config.globalProperties.$confirm = components.Modal.confirm;
  // app.config.globalProperties.$destroyAll = components.Modal.destroyAll;
  return app
}

export { version }

export default {
  version,
  install,
}
