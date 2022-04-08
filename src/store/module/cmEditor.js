import {
  TOGGLE_AUTO_OPEN_OUTLINE_BOX,
  TOGGLE_AUTO_OPEN_PREVIEW_BOX,
  TOGGLE_SHOW_OUTLINE_BOX_ON_LEFT
} from '../mutationType'

export default {
  state: {
    isAutoOpenOutlineBox: false,
    isAutoOpenPreviewBox: false,
    isShowOutLineBoxOnLeft: false
  },
  mutations: {
    [TOGGLE_AUTO_OPEN_OUTLINE_BOX](state) {
      state.isAutoOpenOutlineBox = !state.isAutoOpenOutlineBox
    },
    [TOGGLE_AUTO_OPEN_PREVIEW_BOX](state) {
      state.isAutoOpenPreviewBox = !state.isAutoOpenPreviewBox
    },
    [TOGGLE_SHOW_OUTLINE_BOX_ON_LEFT](state) {
      state.isShowOutLineBoxOnLeft = !state.isShowOutLineBoxOnLeft
    }
  },
  actions: {}
}
