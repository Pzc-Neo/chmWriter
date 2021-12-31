<template>
  <div class="top_bar">
    <span class="left">城墨写作</span>
    <span class="center">默认文件</span>
    <span class="right">一 口 X</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.top_bar {
  -webkit-app-region: drag;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  color: aliceblue;
  background-color: #409eff;
  .right {
    -webkit-app-region: no-drag;
  }
}
</style>
