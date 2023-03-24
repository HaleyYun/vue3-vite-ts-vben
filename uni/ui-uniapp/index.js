import VocenButton from './lib/components/VocenButton/VocenButton.vue';

// 需要添加到 VUE 实例的 API
// const API = {};
const components = [VocenButton];

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app) => {
  // 注册组件
  components.forEach((component) => app.component(component.name, component));
  // ctx 里插入 API
  // Object.keys(API).forEach((key) => {
  //   app.config.globalProperties[`$${key}`] = API[key];
  // });
};

export { VocenButton };

export default {
  install,
  ...components,
};
