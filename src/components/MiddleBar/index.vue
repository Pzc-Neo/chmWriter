<template>
  <div class="middle_bar">
    <ContextMenuBar />
    <SideBar />
    <div class="right">
      <div class="main_tool_bar">123123</div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
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
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    .main_tool_bar {
      flex: 0 0 30px;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
