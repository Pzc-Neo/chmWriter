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
    <!-- birthplace -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.birthplace') }}
      </el-tag>
      <el-input
        v-model="item.birthplace"
        @change="value => updateAttr('birthplace', value)"
      ></el-input>
    </div>
    <!-- residence -->
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('character.residence') }}
      </el-tag>
      <el-input
        v-model="item.residence"
        @change="value => updateAttr('residence', value)"
      ></el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AttributeBase',
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
  }
}
</style>
