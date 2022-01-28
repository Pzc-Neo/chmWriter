<template>
  <div class="middle_bar">
    <ContextMenuBar />
    <CommandBox />
    <SideBar />
    <div class="right">
      <ToolBar />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/MiddleBar/SideBar'
import ContextMenuBar from '@/components/MiddleBar/ContextMenuBar'
import ToolBar from '@/components/MiddleBar/ToolBar'
import CommandBox from '@/components/CommandBox'
export default {
  components: {
    SideBar,
    ContextMenuBar,
    ToolBar,
    CommandBox
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
  }
}
</style>
