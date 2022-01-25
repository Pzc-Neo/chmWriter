<template>
  <div class="middle_bar">
    <ContextMenuBar />
    <SideBar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import SideBar from '@/components/MiddleBar/SideBar'
import ContextMenuBar from '@/components/MiddleBar/ContextMenuBar'
export default {
  components: {
    SideBar,
    ContextMenuBar
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
