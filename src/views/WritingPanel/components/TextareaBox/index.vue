<template>
  <textarea v-model="content" :style="{ height }"></textarea>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '150px'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
