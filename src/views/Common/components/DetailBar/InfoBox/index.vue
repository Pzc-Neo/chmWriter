<template>
  <div class="info_box" :style="isFixedMode ? styleFixedMode : styleNormalMode">
    <div class="header" @click="handleClick">
      <span class="FixedModeIcon" @click.stop="toggleFixedMode">
        <i
          :class="'el-icon-' + (isFixedMode ? 'bottom-right' : 'top-left')"
        ></i>
      </span>
      <span>{{ title }}</span>
      <i v-if="!isEmpty" class="el-icon-tickets"></i>
    </div>
    <div class="content" v-show="!isCollapse">
      <slot :isFixedMode="isFixedMode"></slot>
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
  data() {
    return {
      isFixedMode: false,
      styleFixedMode: {
        position: 'fixed',
        width: '652px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 10,
        boxShadow: '0 2px 12px 0 rgb(0 0 0 / 10%)'
      },
      styleNormalMode: {
        display: 'relative'
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('update:isCollapse', !this.isCollapse)
    },
    toggleFixedMode() {
      this.isFixedMode = !this.isFixedMode
      console.log(this.isFixedMode)
      console.log('el-icon-' + (this.isFixedMode ? 'top-left' : 'bottom-right'))
    }
  }
}
</script>

<style lang="scss" scoped>
.info_box {
  border: 1px solid $border-color;
  margin: 3px;
  border-radius: $border-radius;
  background: #fff;
  .header {
    position: relative;
    height: 25px;
    line-height: 25px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    i {
      margin-left: $dtb-margin;
    }
    .FixedModeIcon {
      display: none;
      position: absolute;
      left: 5px;
      width: 15px;
      height: 100%;
    }
  }
  .header:hover {
    .FixedModeIcon {
      display: inline-block;
    }
  }
  .content {
    overflow: hidden;
    padding: 4px 6px;
    padding-top: 0px;
    /deep/ .el-textarea {
      height: 100%;
      textarea {
        height: 100%;
        border: 1px solid $border-color;
      }
    }
  }
}
</style>
