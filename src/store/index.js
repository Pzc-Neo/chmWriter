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
    currentPanel: '/writing',
    barVisible: {
      groupBar: true,
      itemBar: true,
      detailBar: true
    },
    isShowIndex: false,
    isSimpleMode: false
  },
  mutations: {
    SHOW_CONTEXTMENU(state, prama) {
      state.contextmenu.isShow = true
      state.contextmenu.prama = prama
    },
    HIDE_CONTEXTMENU(state) {
      state.contextmenu.isShow = false
    },
    TOGGLE_BAR_VISIBILITY(state, bar) {
      state.barVisible[bar] = !state.barVisible[bar]
    },
    CHANGE_CURRENT_PANEL(state, panel) {
      state.currentPanel = panel
      console.log(state.currentPanel)
    }
  },
  actions: {},
  modules: {
    writing
  }
})
