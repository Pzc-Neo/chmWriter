<template>
  <div class="attr_box">
    <!-- height -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.height') }}
      </el-tag>
      <el-input
        v-model.number="item.height"
        @change="value => updateAttr('height', value)"
      ></el-input>
      <el-tooltip
        class="item"
        effect="dark"
        :content="'修改全局单位: ' + heightUnit"
        placement="bottom-start"
      >
        <el-button
          class="round_btn"
          type="primary"
          icon="el-icon-edit"
          size="mini"
          circle
          @click="changeUnit('heightUnit')"
        ></el-button>
      </el-tooltip>
    </div>
    <!-- weight -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.weight') }}
      </el-tag>
      <el-input
        v-model.number="item.weight"
        @change="value => updateAttr('weight', value)"
      ></el-input>
      <el-tooltip
        class="item"
        effect="dark"
        :content="'修改全局单位: ' + weightUnit"
        placement="bottom-start"
      >
        <el-button
          class="round_btn"
          type="primary"
          icon="el-icon-edit"
          size="mini"
          circle
          @click="changeUnit('weightUnit')"
        ></el-button>
      </el-tooltip>
    </div>
    <!-- created -->
    <div class="one_row">
      <el-tag class="text">{{ $t('common.created') }}</el-tag>
      <span class="date">{{ $formatTime(item.created) }}</span>
    </div>
    <!-- updated -->
    <div class="one_row">
      <el-tag class="text">{{ $t('common.updated') }}</el-tag>
      <span class="date">{{ $formatTime(item.updated) }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AttributeOther',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    weightUnit: {
      type: String,
      default: 'kg'
    },
    heightUnit: {
      type: String,
      default: 'cm'
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
    /**
     * column {String}  databasee's configs table's column name
     */
    changeUnit(column) {
      this.$prompt(value => {
        this.$emit('updateConfig', column, value)
      }, this[column])
    },
    changeEditorWidth(width) {
      this.$emit('changeEditorWidth', width)
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
