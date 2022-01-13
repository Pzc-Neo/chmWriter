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
  Progress
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

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
