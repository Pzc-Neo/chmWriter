<template>
  <div class="middle_bar">
    <ContextMenuBar />
    <CommandBox />
    <el-drawer title="我是标题" :visible.sync="drawer" direction="ltr">
      <span>我来啦!</span>
    </el-drawer>
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
  },
  data() {
    return {
      drawer: false
    }
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
