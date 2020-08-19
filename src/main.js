import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementUI库和必要样式组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册elementUI
Vue.use(ElementUI)
//声明一个vue 实例  让每个组件都拥有  this.eventBus
// 全局添加 eventBus对象
Vue.prototype.eventBus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
