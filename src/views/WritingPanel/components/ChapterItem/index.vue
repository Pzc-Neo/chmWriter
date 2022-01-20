<template>
  <div v-if="$store.state.isSimpleMode" class="chapter_item_simple">
    {{ item.title }}
  </div>
  <div v-else class="chapter_item">
    <div class="col top">
      <div class="left">
        {{ status[item.status] }}
      </div>
      <div class="right">
        <span class="left">{{ item.words }}</span>
        <span class="right">{{ item.rate }}%</span>
      </div>
    </div>
    <div class="col middle">
      {{ item.title }}
    </div>
    <div class="col bottom">
      <div class="left">
        <el-tag :type="tagTypes[item.type]">{{ types[item.type] }}</el-tag>
      </div>
      <div class="right">{{ item.updated }}</div>
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
  },
  computed: {
    types() {
      return [
        this.$t('writing.type.normal'),
        this.$t('writing.type.transition').substr(0, 5),
        this.$t('writing.type.important')
      ]
    },
    status() {
      return [
        this.$t('writing.status.first'),
        this.$t('writing.status.second'),
        this.$t('writing.status.final')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter_item_simple {
  padding: 4px 8px;
}
.chapter_item {
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
  .middle {
    margin-top: 2px;
    margin-bottom: 7px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    .left {
      .el-tag {
        height: 20px;
        line-height: 20px;
        padding: 0px 5px;
      }
    }
    .right {
      flex: 1;
      margin-left: $dtb-margin;
      text-align: right;
    }
  }
}
</style>
