import Vue from 'vue'
import Vuex from 'vuex'
import wrting from './module/writing'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contextmenu: {
      isShow: false,
      type: null,
      prama: {}
    }
  },
  mutations: {
    SHOW_CONTEXTMENU(state, prama) {
      state.contextmenu.isShow = true
      state.contextmenu.prama = prama
    },
    HIDE_CONTEXTMENU(state) {
      state.contextmenu.isShow = false
    }
  },
  actions: {},
  modules: {
    wrting
  }
})
