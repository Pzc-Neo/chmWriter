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
      <el-tooltip
        class="item"
        effect="dark"
        :content="targetWordsBtnInfo"
        placement="bottom-start"
      >
        <el-button
          class="round_btn"
          type="primary"
          icon="el-icon-edit"
          size="mini"
          circle
          @click="getWords"
        ></el-button>
      </el-tooltip>
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
    <!-- editor width -->
    <!-- <div class="one_row">
      <el-tag class="text">{{ $t('writing.width') }}</el-tag>
      <el-slider
        v-model="editorWidth"
        :debounce="300"
        @input="changeEditorWidth"
      ></el-slider>
    </div> -->
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
  watch: {
    item(newItem, oldItem) {
      console.log(newItem, oldItem)
    }
  },
  methods: {
    updateAttr(column, value) {
      this.$emit('updateAttr', column, value, this.item)
    },
    getWords() {
      this.$prompt(value => {
        value = parseInt(value)
        if (isNaN(value)) {
          this.$alert('NaN')
          throw new Error()
        }
        this.$emit('updateAttr', 'target_words', value, this.item)
      }, this.item.target_words)
    },
    changeEditorWidth(width) {
      this.$emit('changeEditorWidth', width)
    }
  },
  computed: {
    targetWordsBtnInfo() {
      return (
        this.$t('action.modify') +
        ' ' +
        this.$t('writing.targetWords') +
        ': ' +
        this.item.target_words
      )
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
    .round_btn {
      // position: absolute;
      // top: -3px;
      // right: 0px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: $dtb-margin;
    }
  }
}
</style>
