<template>
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
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
