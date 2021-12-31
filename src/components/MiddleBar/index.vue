<template>
  <div class="middle_bar">
    <SideBar />
    <MainBar />
  </div>
</template>

<script>
import SideBar from '@/components/MiddleBar/SideBar'
import MainBar from '@/components/MiddleBar/MainBar'
export default {
  components: {
    SideBar,
    MainBar
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
