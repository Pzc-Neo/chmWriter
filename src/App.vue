<template>
  <div id="app">
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
}
</style>
