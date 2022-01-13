<template>
  <div v-show="isShow" class="detail_bar">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
  width: 210px;
  border-left: solid 1px #e6e6e6;
  .one_row {
    display: flex;
    margin-bottom: 4px;
    .el-tag {
      width: 76px;
      text-align: center;
      height: $dtb-height;
      line-height: $dtb-height;
    }
    .el-select {
      flex: 1;
    }
    .el-input__inner {
      height: $dtb-height;
      line-height: $dtb-height;
      padding: 0 10px;
      margin-left: $dtb-margin;
    }
    .el-input__suffix {
      .el-input__icon {
        height: $dtb-height;
        line-height: $dtb-height;
      }
    }
    .el-switch {
      height: $dtb-height;
      line-height: $dtb-height;
      margin-left: $dtb-margin;
    }
    .el-slider {
      flex: 1;
      height: $dtb-height;
      line-height: $dtb-height;
      margin-left: $dtb-margin;
    }
    .el-progress {
      flex: 1;
      margin-left: $dtb-margin;
    }
  }
  textarea {
    width: 100%;
    line-height: 20px;
  }
}
</style>
