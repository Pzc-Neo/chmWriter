<template >
  <div class="content_bar">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.content_bar {
  flex: 1;
  // codemirror编辑器文本长的时候会溢出，不知道为啥把这个的width改成0就可以了。
  align-items: center;
  align-content: center;
  width: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
