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

    // route
    currentPanel: 'writing',
    panelToolList: [],

    barVisible: {
      groupBar: true,
      itemBar: true,
      detailBar: true
    },
    isShowIndex: false,
    isSimpleMode: false,

    commandBox: {
      isShow: false,
      type: 'search',
      param: {}
    }
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
    TOGGLE_SIMPLE_MODE(state) {
      state.isSimpleMode = !state.isSimpleMode
    },
    TOGGLE_EXPAND(state) {
      state.barVisible.groupBar = !state.barVisible.groupBar
      state.barVisible.itemBar = !state.barVisible.itemBar
      state.barVisible.detailBar = !state.barVisible.detailBar
    }
  },
  actions: {},
  modules: {
    writing
  }
})
