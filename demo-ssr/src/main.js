import Vue from 'vue'
import App from './App.vue'
import { createRouter } from "./router";
import store from './store'

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter();
  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app }
}