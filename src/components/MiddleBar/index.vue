<template>
  <div class="middle_bar">
    <SideBar />
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '@/components/MiddleBar/SideBar'
export default {
  components: {
    SideBar
    // MainBar
  }
}
</script>

<style lang="scss" scoped>
.middle_bar {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
