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
  color: #303133;
  font-size: 15px;
  ul {
    margin: 0px;
    padding: 0px;
    li {
      list-style: none;
    }
  }
}
</style>
