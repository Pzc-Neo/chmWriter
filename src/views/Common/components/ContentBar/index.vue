<template>
  <div class="content_bar" :style="customStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContentBar',
  props: {
    customStyle: {
      type: Object,
      default: function () {
        return {
          flex: 1
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content_bar {
  // codemirror编辑器文本长的时候会溢出，不知道为啥把这个的width改成0就可以了。
  align-items: center;
  align-content: center;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
