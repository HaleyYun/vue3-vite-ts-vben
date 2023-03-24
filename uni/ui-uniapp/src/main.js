import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 此处为演示vuex使用，非uView的功能部分

const app = new Vue({
  ...App,
});

app.$mount();
