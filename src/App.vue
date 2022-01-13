<template>
  <div id="app" @click="$store.commit('HIDE_CONTEXTMENU')">
    <TopBar />
    <MiddleBar />
    <BottomBar />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import MiddleBar from '@/components/MiddleBar'
import BottomBar from '@/components/BottomBar'

import 'normalize.css'

export default {
  components: {
    TopBar,
    BottomBar,
    MiddleBar
  }
}
</script>
<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #464a52;
  font-size: 14px;
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
  textarea,
  input,
  button,
  select,
  canvas,
  .vis-network {
    outline: none;
  }

  textarea:focus,
  input:focus,
  button:focus,
  select:focus,
  canvas:focus,
  .vis-network:focus {
    /* outline: 1px solid #3068ad; */
    outline: 1px solid var(--main_btn_bg_color_hover);
  }

  ul {
    margin: 0px;
    padding: 0px;
    li {
      list-style: none;
    }
  }
}
</style>
