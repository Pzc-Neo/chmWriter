<template>
  <div class="attr_box">
    <div class="one_row">
      <!-- type -->
      <el-tag class="chmST_sidbar_btn">
        {{ $t('data.source') }}
      </el-tag>
      <el-select
        :value="item.source"
        @change="value => updateAttr('source', value)"
      >
        <el-option :label="$t('data.sources.original')" :value="0"></el-option>
        <el-option :label="$t('data.sources.internet')" :value="1"></el-option>
        <el-option :label="$t('data.sources.book')" :value="2"></el-option>
        <el-option :label="$t('data.sources.other')" :value="3"></el-option>
      </el-select>
    </div>
    <!-- language -->
    <div class="one_row">
      <el-tag>{{ $t('writing.language') }}</el-tag>
      <el-select
        :value="item.language"
        @change="value => updateAttr('language', value)"
      >
        <el-option label="中文" :value="0"></el-option>
        <el-option label="English" :value="1"></el-option>
        <el-option label="日本語" :value="2"></el-option>
      </el-select>
    </div>
    <div class="one_row">
      <el-tag>{{ $t('writing.words') }}</el-tag>
      <div class="words">{{ item.words }}</div>
    </div>
    <!-- created -->
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.created') }}</el-tag>
      <span class="date">{{ $formatTime(item.created) }}</span>
    </div>
    <!-- updated -->
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.updated') }}</el-tag>
      <span class="date">{{ $formatTime(item.updated) }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AttrBox',
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
      editorWidth: 100
    }
  },
  // watch: {
  //   item(newItem, oldItem) {
  //     console.log(newItem, oldItem)
  //   }
  // },
  methods: {
    updateAttr(column, value) {
      this.$emit('updateAttr', column, value, this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
.attr_box {
  .one_row {
    .date {
      font-size: 11px;
      height: $dtb-height;
      line-height: $dtb-line-height;
      // line-height: $dtb-line-height;
      margin-left: $dtb-margin;
    }
    .words {
      flex: 1;
      height: $dtb-height;
      line-height: $dtb-line-height;
      margin-left: $dtb-margin;
      font-size: 17px;
      font-weight: bold;
      color: #409eff;
    }
  }
}
</style>
