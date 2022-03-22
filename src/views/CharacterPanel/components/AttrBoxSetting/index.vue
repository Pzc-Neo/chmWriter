<template>
  <div class="attr_box">
    <div class="one_row" v-for="item in itemList" :key="item.id">
      <!-- sex -->
      <el-tag class="chmST_sidbar_btn">
        {{ item.title }}
      </el-tag>
      <!-- <span class="demonstration">默认 click 触发子菜单</span> -->
      <el-cascader
        v-model="value"
        :options="item.children"
        @change="handleChange"
        :props="{ expandTrigger: 'hover', value: 'id', label: 'title' }"
      ></el-cascader>
      <!-- <el-select
        :value="item.children"
        @change="value => updateAttr('sex', value)"
      >
        <el-option
          v-for="child in item.children"
          :label="child.title"
          :value="child.title"
          :key="child.id"
        ></el-option>
      </el-select> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'AttributeBase',
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      value: [],
      editorWidth: 100
    }
  },
  methods: {
    updateAttr(column, value) {
      console.log(column, value)

      // this.$emit('updateAttr', column, value, this.item)
    },
    handleChange(value) {
      console.log(value)
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
    /deep/.el-cascader {
      line-height: inherit;
    }
  }
}
</style>
