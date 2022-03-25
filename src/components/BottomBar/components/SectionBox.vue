<template>
  <div class="section_box">
    <el-tooltip
      v-for="(item, index) in data"
      :key="index"
      effect="dark"
      :content="item.hint"
      placement="top"
    >
      <div @click="item.func">
        {{ item.content }}
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section_box {
  display: flex;
  overflow: hidden;
  flex: 1;
  div {
    padding: 0px 5px;
    margin-left: 3px;
    cursor: pointer;
  }
  div:hover {
    background-color: #61b0ff;
  }
}
</style>
