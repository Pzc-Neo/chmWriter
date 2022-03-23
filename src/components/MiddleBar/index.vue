<template>
  <div class="middle_bar">
    <ContextMenuBar />
    <CommandBox />
    <PereferenceBox :isShow.sync="isShowPereferenceBox" />
    <SideBar />
    <div class="main">
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
import PereferenceBox from '@/components/PereferenceBox'
export default {
  components: {
    SideBar,
    ContextMenuBar,
    ToolBar,
    CommandBox,
    PereferenceBox
  },
  data() {
    return {
      isShowPereferenceBox: false
    }
  },
  mounted() {
    this.$bus.$on('pereferences-box:show', () => {
      this.isShowPereferenceBox = true
    })
  }
}
</script>

<style lang="scss" scoped>
.middle_bar {
  display: flex;
  flex: 1;
  overflow: hidden;
  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
