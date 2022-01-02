import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import i18n from './i18n'

import {
  Button,
  Select,
  Container,
  Aside,
  Header,
  Main,
  RadioButton,
  RadioGroup,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tree,
  Tabs,
  TabPane,
  Badge,
  Empty
} from 'element-ui'

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// 或写为

Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tree)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Badge)
Vue.use(Empty)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
