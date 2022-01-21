import Vue from 'vue'
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
  Empty,
  Message,
  MessageBox,
  Dialog,
  Input,
  Form,
  FormItem,
  Option,
  Tag,
  Switch,
  Slider,
  Progress,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  CheckboxButton
} from 'element-ui'

Vue.use(Button)
  .use(Select)
  .use(Container)
  .use(Aside)
  .use(Header)
  .use(Main)
  .use(RadioButton)
  .use(RadioGroup)
  .use(Submenu)
  .use(Menu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Col)
  .use(Row)
  .use(Card)
  .use(Table)
  .use(TableColumn)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Tree)
  .use(Tabs)
  .use(TabPane)
  .use(Badge)
  .use(Empty)
  .use(Dialog)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Option)
  .use(Tag)
  .use(Switch)
  .use(Slider)
  .use(Progress)
  .use(Tooltip)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(CheckboxButton)

Vue.prototype.$ELmessage = Message
Vue.prototype.$ELconfirm = MessageBox.confirm
Vue.prototype.$ELprompt = MessageBox.prompt
Vue.prototype.$ELalert = MessageBox.alert

Vue.prototype.$message = function (message, duration = 1000, type = 'success') {
  this.$ELmessage({
    showClose: true,
    duration,
    message,
    type
  })
}

Vue.prototype.$prompt = function (callback, targetItem) {
  MessageBox.prompt(
    this.$t('message.pleaseInput'),
    this.$t('action.getInput'),
    {
      inputValue: targetItem?.title || '',
      confirmButtonText: this.$t('message.confirm'),
      cancelButtonText: this.$t('message.cancel'),
      inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/, // nonempty
      inputErrorMessage: this.$t('message.nonempty')
    }
  )
    .then(({ value }) => {
      try {
        callback(value.trim())
        Message({
          type: 'success',
          message: this.$t('result.success')
        })
      } catch (e) {
        Message({
          type: 'error',
          message: e
        })
      }
    })
    .catch(() => {
      Message({
        type: 'info',
        message: this.$t('message.cancel')
      })
    })
}

Vue.prototype.$confirm = function (callback, targetItem) {
  MessageBox.confirm(
    `${this.$t('action.delete')} ${targetItem?.title}?`,
    this.$t('result.warning'),
    {
      confirmButtonText: this.$t('message.confirm'),
      cancelButtonText: this.$t('message.cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      try {
        callback()
        Message({
          type: 'success',
          message: this.$t('result.success')
        })
      } catch (e) {
        Message({
          type: 'error',
          message: e
        })
      }
    })
    .catch(() => {
      Message({
        type: 'info',
        message: this.$t('result.cancel')
      })
    })
}

Vue.prototype.$alert = function (info, type = 'warning') {
  MessageBox.alert(info, this.$t(`result.${type}`), {
    confirmButtonText: this.$t('message.confirm')
    // callback: action => {
    //   Message({
    //     type: 'warning',
    //     message: `action: ${action}`
    //   })
    // }
  })
}
