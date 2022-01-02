<template>
  <div class="middle_bar">
    <SideBar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <ContextMenuBar />
  </div>
</template>

<script>
import SideBar from '@/components/MiddleBar/SideBar'
import ContextMenuBar from '@/components/MiddleBar/ContextMenuBar'
export default {
  components: {
    SideBar,
    ContextMenuBar
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
