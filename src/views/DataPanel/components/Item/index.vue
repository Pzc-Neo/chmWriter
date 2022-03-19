<template>
  <div
    v-if="$store.state.isSimpleMode"
    class="simple_mode_item"
    :title="item.title"
  >
    {{ item.title }}
  </div>
  <div v-else class="item">
    <span class="left" :title="item.title">{{ item.title }}&nbsp;</span>
    <span class="center">
      {{ item.content }}
    </span>
    <span class="right">
      <!-- <span>{{ $formatTime(item.updated) }}</span> -->
      <el-tag
        :class="'el-tag--' + tagTypes[item.source]"
        :title="types[item.source]"
      >
        {{ types[item.source] }}
      </el-tag>
    </span>
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
      tagTypes: ['primary', 'success', 'warning', 'danger']
    }
  },
  computed: {
    types() {
      return [
        this.$t('data.sources.original'),
        this.$t('data.sources.internet'),
        this.$t('data.sources.book'),
        this.$t('data.sources.other')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.simple_mode_item {
  padding: 7px 8px;
  border-bottom: 1px solid #f3f3f3;
  width: 184px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item {
  display: flex;
  align-items: center;
  padding: 0px 6px;
  margin: 3px 0px;
  overflow: hidden;
  .left {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    .el-tag {
      height: 20px;
      line-height: 18px;
      padding: 0px 5px;
    }
  }
  .center {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .right {
    width: 60px;
    display: flex;
    margin-left: 3px;
    text-align: right;
    overflow: hidden;
    flex-direction: row;
    justify-content: space-around;
    .el-tag {
      width: 59px;
      height: 100%;
      padding: 2px;
      margin: 0px;
      text-align: center;
      line-height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
