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
    barVisible: {
      groupBar: true,
      itemBar: true,
      detailBar: true
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
    TOGGLE_BAR_VISIBILITY(state, bar) {
      state.barVisible[bar] = !state.barVisible[bar]
    }
  },
  actions: {},
  modules: {
    writing
  }
})
