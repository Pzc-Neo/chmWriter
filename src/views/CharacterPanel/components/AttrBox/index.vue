<template>
  <div class="attr_box">
    <div class="one_row">
      <!-- name -->
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.name') }}
      </el-tag>
      <el-input
        v-model="item.title"
        @change="value => updateAttr('title', value)"
      ></el-input>
    </div>
    <div class="one_row">
      <!-- sex -->
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.sex.name') }}
      </el-tag>
      <el-select
        v-model.number="item.sex"
        @change="value => updateAttr('sex', value)"
      >
        <el-option :label="$t('character.sex.girl')" :value="0"></el-option>
        <el-option :label="$t('character.sex.boy')" :value="1"></el-option>
        <el-option :label="$t('character.sex.unknow')" :value="2"></el-option>
      </el-select>
    </div>
    <!-- age -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.age') }}
      </el-tag>
      <el-input
        v-model.number="item.age"
        @change="value => updateAttr('age', value)"
      ></el-input>
    </div>
    <!-- identity -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.identity') }}
      </el-tag>
      <el-input
        v-model="item.identity"
        @change="value => updateAttr('identity', value)"
      ></el-input>
    </div>
    <!-- height -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.height') }}
      </el-tag>
      <el-input
        v-model.number="item.height"
        @change="value => updateAttr('height', value)"
      ></el-input>
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
        content="修改全局单位"
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
    <!-- hobby -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.hobby') }}
      </el-tag>
      <el-input
        v-model="item.hobby"
        @change="value => updateAttr('hobby', value)"
      ></el-input>
    </div>
    <!-- <div class="one_row">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="item.description"
      ></el-input>
    </div> -->
    <!-- created -->
    <div class="one_row">
      <el-tag class="text">{{ $t('common.created') }}</el-tag>
      <span class="date">{{ item.created }}</span>
    </div>
    <!-- updated -->
    <div class="one_row">
      <el-tag class="text">{{ $t('common.updated') }}</el-tag>
      <span class="date">{{ item.updated }}</span>
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
      console.log(123)
      this.$bus.$emit('character.AttrBar:updateAttr', column, value, this.item)
    },
    changeEditorWidth(width) {
      this.$bus.$emit('characterAttrBar:changeEditorWidth', width)
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
    }
  }
}
</style>
