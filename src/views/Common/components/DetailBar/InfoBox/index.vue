<template>
  <div class="info_box">
    <div class="header" @click="handleClick">
      <span>{{ title }}</span>
      <i v-if="!isEmpty" class="el-icon-tickets"></i>
    </div>
    <div class="content" v-show="!isCollapse">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: {
    title: {
      type: String,
      default: 'Info'
    },
    isEmpty: {
      type: Boolean,
      default: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('update:isCollapse', !this.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.info_box {
  border: 1px solid $border-color;
  margin: 3px;
  border-radius: $border-radius;
  .header {
    height: 25px;
    line-height: 25px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    i {
      margin-left: $dtb-margin;
    }
  }
  .content {
    padding: 4px 6px;
    padding-top: 0px;
    textarea {
      border: 1px solid $border-color;
    }
  }
}
</style>
