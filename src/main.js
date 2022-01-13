import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { dbConnect } from './db'
import './plugins/element'

dbConnect()

Vue.prototype.$ELEMENT = {
  i18n: (key, value) => i18n.t(key, value)
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
