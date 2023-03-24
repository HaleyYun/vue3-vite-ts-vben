## uniapp 沃森 组件库

全部引入示例

```js
import VoUniappUi from '@vocen/ui_uniapp';
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  app.use(VoUniappUi);

  return {
    app,
  };
}
```

分别引入示例

```js
import VoUniappUi from '@vocen/ui_uniapp';
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  app.component('vocenButton', VocenButton);
  return {
    app,
  };
}
```
