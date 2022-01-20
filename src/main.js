import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Db from './db'
import './plugins/element'
import * as echarts from 'echarts'

import VueHotkey from 'v-hotkey'
Vue.use(VueHotkey)

Vue.prototype.$db = new Db()
Vue.prototype.$echarts = echarts
Vue.prototype.$ELEMENT = {
  i18n: (key, value) => i18n.t(key, value)
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  mounted() {
    const locale = this.$db.getConfig('locale')
    this.$i18n.locale = locale.value
  }
}).$mount('#app')
