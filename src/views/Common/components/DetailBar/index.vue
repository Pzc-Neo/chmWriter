<template>
  <div v-show="isShow" class="detail_bar">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DetailBar',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.barVisible.detailBar
    })
  }
}
</script>

<style lang="scss">
.detail_bar {
  width: 205px;
  overflow: auto;
  border-left: solid 1px #e6e6e6;
  .one_row {
    display: flex;
    position: relative;
    margin-bottom: 4px;
    .el-tag {
      flex: 0 0 65px;
      padding: 0 4px;
      text-align: center;
      height: $dtb-height;
      line-height: $dtb-line-height;
    }
    .el-select,
    .el-input,
    .el-textarea {
      flex: 1;
    }
    .el-input__inner {
      height: $dtb-height;
      line-height: $dtb-line-height;
      padding: 0 6px;
      margin-left: $dtb-margin;
    }
    .el-input__suffix {
      .el-input__icon {
        height: $dtb-height;
        line-height: $dtb-line-height;
      }
    }
    .el-switch {
      margin-left: $dtb-margin;
    }
    .el-switch__core {
      // width: 35px !important;
      height: 15px;
      /*color:#409EFF;*/
    }
    /*设置圆*/
    .el-switch__core::after {
      width: 13px;
      height: 13px;
      margin-top: -1px;
      margin-bottom: 2px;
    }
    .el-switch.is-checked .el-switch__core::after {
      margin-left: -14px;
    }
    .el-slider {
      position: relative;
      top: -8px;
      // width: 50%;
      height: $dtb-height;
      line-height: $dtb-line-height;
      margin-left: $dtb-margin;
      flex: 1;
      padding-right: 10px;
    }
    .el-progress {
      flex: 1;
      margin-left: $dtb-margin;
      .el-progress-bar {
        .el-progress-bar__outer {
          height: 20px !important;
        }
      }
    }
    .el-button.round_btn {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 6px;
    }
  }
  textarea {
    width: 100%;
    line-height: 20px;
    padding: 5px;
  }
}
</style>
