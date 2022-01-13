<template>
  <div class="top_bar">
    <span class="left">
      <img :src="logo" alt="logo" />
      <MenuBar />
    </span>
    <span class="center">
      <span class="file_name">默认文件</span>
      <span class="app_name">{{ $t('info.app_name') }}</span>
    </span>
    <span class="right">
      <div class="icon">
        <i class="el-icon-minus"></i>
      </div>
      <div class="icon">
        <i class="el-icon-full-screen"></i>
      </div>
      <div class="icon close">
        <i class="el-icon-close"></i>
      </div>
    </span>
  </div>
</template>

<script>
import MenuBar from './MenuBar'
export default {
  data() {
    return {
      logo: require('@/assets/logo.svg')
    }
  },
  components: {
    MenuBar
  }
}
</script>

<style lang="scss" scoped>
.top_bar {
  -webkit-app-region: drag;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  color: #ffffff;
  background-color: #409eff;
  .left {
    display: flex;
    height: 100%;
    align-items: center;
    -webkit-app-region: no-drag;
    img {
      height: 65%;
    }
  }
  .center {
    .app_name::before {
      padding: 0px 5px;
      content: '-';
    }
  }
  .right {
    display: flex;
    -webkit-app-region: no-drag;
    .icon {
      height: 30px;
      line-height: 30px;
      padding: 0px 7px;
    }
    .icon:hover {
      background-color: #56aaff;
    }
    .icon.close:hover {
      background-color: #f34141;
    }
  }
}
</style>
