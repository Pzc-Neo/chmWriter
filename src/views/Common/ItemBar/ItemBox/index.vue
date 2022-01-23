<template>
  <div v-if="$store.state.isSimpleMode" class="simple_mode">
    {{ item.title }}
  </div>
  <div v-else class="item_box">
    <div class="col top">
      {{ item.title }}
    </div>
    <div class="col bottom">
      <div class="left">
        <el-tag>{{ item.source }}</el-tag>
      </div>
      <div class="right">
        {{ item.updated }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tagTypes: ['', 'success', 'danger', 'warning']
    }
  }
}
</script>

<style lang="scss" scoped>
.simple_mode {
  padding: 4px 8px;
}
.item_box {
  display: flex;
  flex-direction: column;
  padding: 5px 6px;
  border-bottom: 1px solid #e6e6e6;
  .col {
    display: flex;
    justify-content: space-between;
  }
  .top {
    font-size: 13px;
    > .left {
      color: #3e5f80;
      // color: #8cc5ff;
    }
    > .right {
      color: #409eff;
      background-color: #ecf5ff;
      padding: 2px 5px;
      position: relative;
      top: -5px;
      border-radius: 0px 0px 3px 3px;
      border: 1px solid #c8e3ff;
      .right {
        margin-left: $dtb-margin;
        font-size: 12px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-top: 6px;
    .left {
      .el-tag {
        height: 20px;
        max-width: 54px;
        line-height: 20px;
        padding: 0px 5px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      // margin-left: $dtb-margin;
      // align-self: flex-end;
    }
    .right {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
