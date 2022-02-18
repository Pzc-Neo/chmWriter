<template>
  <div id="app" @click="hideStuffByClick" @keyup.esc="hideStuffByEsc">
    <!-- <PopupBox>
      <template slot="title">快捷键设置</template> -->
    <!-- <PopupBox title="快捷键设置">
      <HotKey />
    </PopupBox> -->

    <TopBar />
    <MiddleBar />
    <BottomBar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import hotkeys from 'hotkeys-js'
import 'normalize.css'
// import './hotkeys-js'
// import { ipcRenderer } from 'electron'

import TopBar from '@/components/TopBar'
import MiddleBar from '@/components/MiddleBar'
import BottomBar from '@/components/BottomBar'
// import PopupBox from '@/components/PopupBox'
// import HotKey from '@/components/HotKey'

export default {
  components: {
    TopBar,
    BottomBar,
    MiddleBar
    // HotKey,
    // PopupBox
  },
  data() {
    return {
      keyMap: {
        showCommandSearch: 'ctrl+p',
        showCommandCommand: 'shift+ctrl+p',
        save: 'ctrl+s',
        removeTab: 'ctrl+w'
      },
      hotKeyList: [
        {
          id: 'showCommandBoxSearch',
          key: 'ctrl+p',
          funcName: 'showCommandBox',
          prama: ['search']
        },
        {
          id: 'showCommandBoxCommand',
          key: 'shift+ctrl+p',
          funcName: 'showCommandBox',
          prama: ['command']
        },
        {
          id: 'removeTab',
          key: 'ctrl+w',
          funcName: 'removeTab',
          prama: []
        },
        {
          id: 'swtichTab',
          key: 'ctrl+tab',
          funcName: 'switchTab',
          prama: []
        },
        {
          id: 'swtichTabPrev',
          key: 'shift+ctrl+tab',
          funcName: 'switchTab',
          prama: [false]
        }
      ]
    }
  },
  methods: {
    hideStuffByClick() {
      this.$store.commit('HIDE_CONTEXTMENU')
      // this.$store.commit('HIDE_COMMANDBOX')
    },
    hideStuffByEsc() {
      this.$store.commit('HIDE_CONTEXTMENU')
      this.$store.commit('HIDE_COMMANDBOX')
    },
    showCommandBox(type) {
      this.$store.commit('SHOW_COMMANDBOX', type)
    },
    switchTab(isNext) {
      this.$bus.$emit(this.currentPanel + ':switch-tab', isNext)
    },
    removeTab() {
      this.$bus.$emit(this.currentPanel + ':remove-tab')
    }
  },
  mounted() {
    // const { showCommandSearch, showCommandCommand, save, removeTab } =
    //   this.keyMap

    this.hotKeyList.forEach(key => {
      hotkeys(key.key, () => {
        this[key.funcName](...key.prama)
      })
    })

    // hotkeys('ctrl+r', () => {
    //   alert('stopped reload!')
    //   return false
    // })
  },
  computed: {
    ...mapState({
      currentPanel: state => state.currentPanel
    })
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #464a52;
  font-size: 13px;
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 6px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }

  /* 元素获取焦点时，外框风格-start */
  // textarea,
  // input,
  // button,
  // select,
  // canvas,
  // .vis-network {
  //   outline: none;
  // }

  // textarea:focus,
  // input:focus,
  // button:focus,
  // select:focus,
  // canvas:focus {
  //   /* outline: 1px solid #3068ad; */
  //   outline: 1px solid var(--main_btn_bg_color_hover);
  // }

  // This sytle is the same as: .el-menu-item [class^=el-icon-]
  // Let Font Awesome display like elementUI's icon on `el-menu-item`
  .el-menu-item .fa {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
ul {
  margin: 0px;
  padding: 0px;
  li {
    list-style: none;
  }
}
</style>
