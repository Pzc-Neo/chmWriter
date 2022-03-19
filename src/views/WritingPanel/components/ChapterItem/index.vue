<template>
  <div v-if="$store.state.isSimpleMode" class="simple_mode_item">
    {{ item.title }}
  </div>
  <div v-else class="detail_mode_item">
    <div class="col top">
      <span class="left">
        {{ status[item.status] }}
      </span>
      <span class="right">
        <span class="left">{{ item.words }}</span>
        <span class="right">{{ item.rate }}%</span>
      </span>
    </div>
    <div class="col middle">
      {{ item.title }}
    </div>
    <div class="col bottom">
      <span class="left">
        <el-tag :type="tagTypes[item.type]">{{ types[item.type] }}</el-tag>
      </span>
      <span class="right">{{ $formatTime(item.updated) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChapterItem',
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
      tagTypes: ['primary', 'success', 'danger', 'warning']
    }
  },
  computed: {
    types() {
      return [
        this.$t('writing.types.normal'),
        this.$t('writing.types.transition').substr(0, 5),
        this.$t('writing.types.important')
      ]
    },
    status() {
      return [
        this.$t('writing.statuss.first'),
        this.$t('writing.statuss.second'),
        this.$t('writing.statuss.final')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.simple_mode_item {
  padding: 7px 8px;
  border-bottom: 1px solid #f3f3f3;
}
.detail_mode_item {
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
    margin-bottom: 4px;
    line-height: 1.4em;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    .left {
      .el-tag {
        height: 20px;
        line-height: 18px;
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
