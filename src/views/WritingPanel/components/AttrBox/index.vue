<template>
  <div class="attr_box">
    <div class="one_row">
      <!-- type -->
      <el-tag class="chmST_sidbar_btn">
        {{ $t('writing.type.name') }}
      </el-tag>
      <el-select
        :value="item.type"
        @change="value => updateAttr('type', value)"
      >
        <el-option :label="$t('writing.type.normal')" :value="0"></el-option>
        <el-option
          :label="$t('writing.type.transition')"
          :value="1"
        ></el-option>
        <el-option :label="$t('writing.type.important')" :value="2"></el-option>
      </el-select>
    </div>
    <!-- status -->
    <div class="one_row">
      <el-tag>{{ $t('writing.status.name') }}</el-tag>
      <el-select
        :value="item.status"
        @change="value => updateAttr('status', value)"
      >
        <el-option :label="$t('writing.status.first')" :value="0"></el-option>
        <el-option :label="$t('writing.status.second')" :value="1"></el-option>
        <el-option :label="$t('writing.status.final')" :value="2"></el-option>
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
    <!-- export -->
    <div class="one_row">
      <el-tag>{{ $t('writing.is_export') }}</el-tag>
      <!-- :value="Boolean(item.is_export)" -->
      <el-switch
        :value="item.is_export"
        :active-value="1"
        :inactive-value="0"
        @change="value => updateAttr('is_export', value)"
      ></el-switch>
    </div>
    <!-- words -->
    <div class="one_row">
      <el-tag>{{ $t('writing.words') }}</el-tag>
      <div class="words">{{ item.words }}</div>
      <el-tooltip
        class="item"
        effect="dark"
        content="修改目标字数"
        placement="bottom-start"
      >
        <el-button
          class="round_btn"
          type="primary"
          icon="el-icon-edit"
          size="mini"
          circle
        ></el-button>
      </el-tooltip>
    </div>
    <!-- rate -->
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.rate') }}</el-tag>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="item.rate > 100 ? 100 : item.rate"
      ></el-progress>
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
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.width') }}</el-tag>
      <!-- This slider will control the editor's width -->
      <el-slider
        v-model="editorWidth"
        :debounce="300"
        @input="changeEditorWidth"
      ></el-slider>
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
      editorWidth: 100
    }
  },
  methods: {
    updateAttr(column, value) {
      this.$emit('updateAttr', column, value, this.item)
    },
    changeEditorWidth(width) {
      this.$emit('changeEditorWidth', width)
    },
    formateTime(timeStamp) {}
  }
}
</script>

<style lang="scss" scoped>
.attr_box {
  .one_row {
    .date {
      font-size: 11px;
      height: $dtb-height;
      line-height: 12px;
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
