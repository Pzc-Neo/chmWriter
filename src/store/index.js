import Vue from 'vue'
import Vuex from 'vuex'
import writing from './module/writing'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contextmenu: {
      isShow: false,
      type: null,
      prama: {}
    },

    /* Panel's name ('/' + Panel's name === Panel's path  === route) */
    currentPanel: 'writing',
    panelToolList: [],
    historyItemList: [],

    barVisible: {
      groupBar: true,
      itemBar: true,
      detailBar: true
    },
    /* 是否显示itembar项目前面的序 */
    isShowIndex: false,
    /* 是否itemBar项目的详细信息 */
    isSimpleMode: true,
    /* groupBar和itemBar是不是个各占一栏，还是在同一栏显示 */
    isDoubleBar: false,
    isShowPereferenceBox: false,

    commandBox: {
      isShow: false,
      type: 'search',
      param: {}
    },

    currentEditor: null,
    headList: [],

    bottomBarData: null
  },
  mutations: {
    SHOW_CONTEXTMENU(state, prama) {
      state.contextmenu.isShow = true
      state.contextmenu.prama = prama
    },
    HIDE_CONTEXTMENU(state) {
      state.contextmenu.isShow = false
    },
    SHOW_COMMANDBOX(state, type) {
      state.commandBox.isShow = true
      state.commandBox.type = type
      // state.commandBox.prama = prama
    },
    HIDE_COMMANDBOX(state) {
      state.commandBox.isShow = false
    },
    TOGGLE_BAR_VISIBILITY(state, bar) {
      state.barVisible[bar] = !state.barVisible[bar]
    },
    CHANGE_CURRENT_PANEL(state, panelPath) {
      state.currentPanel = panelPath
    },
    SET_PANEL_TOOL_LIST(state, panelToolList) {
      state.panelToolList = panelToolList
    },
    SET_HISTORY_LIST(state, historyItemList) {
      state.historyItemList = historyItemList
    },
    SET_BOTTOM_BAR_DATA(state, bottomBarData) {
      state.bottomBarData = bottomBarData
    },
    UPDATE_BOTTOM_BAR_DATA(state, { key, value }) {
      const [area, item, _key] = key.split('.')
      state.bottomBarData[area][item][_key] = value
    },
    TOGGLE_SIMPLE_MODE(state) {
      state.isSimpleMode = !state.isSimpleMode
    },
    TOGGLE_DOUBLE_BAR(state) {
      state.isDoubleBar = !state.isDoubleBar
    },
    TOGGLE_EXPAND(state) {
      state.barVisible.groupBar = !state.barVisible.groupBar
      state.barVisible.itemBar = !state.barVisible.itemBar
      state.barVisible.detailBar = !state.barVisible.detailBar
    },
    SET_HEAD_LIST(state, headList) {
      state.headList = headList
    },
    SET_CURRENT_EDITOR(state, editor) {
      state.currentEditor = editor
    }
  },
  actions: {},
  modules: {
    writing
  }
})
