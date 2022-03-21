import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import * as echarts from 'echarts'
import path from 'path'

import 'font-awesome/css/font-awesome.min.css'

import Db from './db'
import '@/plugins/elementUI'
import '@/prototype/base'
import '@/prototype/elementUI'

import { loadTheme } from '@/util/theme'
// 可以根据需要选用只用到的渲染器
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

echarts.use([SVGRenderer, CanvasRenderer])

Vue.prototype.$db = new Db()
Vue.prototype.$echarts = echarts
Vue.prototype.$ELEMENT = {
  i18n: (key, value) => i18n.t(key, value)
}

Vue.config.productionTip = false
window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this

    const isDevelopment = process.env.NODE_ENV !== 'production'
    if (isDevelopment) {
      Vue.prototype.$appFilePath = path.join(process.cwd(), './app_file')
    } else {
      Vue.prototype.$appFilePath = path.join(__dirname, '../app_file')
    }
  },
  created() {
    loadTheme()
  },
  mounted() {
    const locale = this.$db.getConfig('locale')
    this.$i18n.locale = locale
  }
}).$mount('#app')
