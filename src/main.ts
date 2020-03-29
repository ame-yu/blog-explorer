import Vue from 'vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import './registerServiceWorker'
import "./css/common.styl"
import "@/store"
import App from './App.vue'
import "@/css/iconfont"
import SettingLoader from "@/plugin/SettingLoader"

Vue.use(SettingLoader)
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
