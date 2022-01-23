<template>
  <div class="info_box">
    <div class="header" @click="isShowContent = !isShowContent">
      <span>{{ title }}</span>
      <i v-if="!isEmpty" class="el-icon-tickets"></i>
    </div>
    <div class="content" v-show="isShowContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Info'
    },
    isEmpty: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowContent: true
    }
  }
}
</script>

<style lang='scss' scoped>
.info_box {
  border: 1px solid $border-color;
  margin: 3px;
  border-radius: $border-radius;
  .header {
    height: $dtb-height;
    line-height: $dtb-line-height;
    text-align: center;
    user-select: none;
    i {
      margin-left: $dtb-margin;
    }
  }
  .content {
    padding: 2px 6px;
    textarea {
      border: 1px solid $border-color;
    }
  }
}
</style>
