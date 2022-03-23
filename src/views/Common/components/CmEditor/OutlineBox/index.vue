<template>
  <div class="outline_box">
    <el-input
      :placeholder="$t('editor.searchOutline')"
      v-model="filterText"
    ></el-input>
    <ul>
      <li
        v-for="(head, index) in editorHeadList"
        :key="index"
        @click="jumpToLine(head)"
        :class="[
          'editor_head_list_item' + head.lineNumber,
          head.lineNumber === currentLine ? 'active' : ''
        ]"
      >
        <span :style="{ paddingLeft: 8 * head.level + 'px' }">
          {{ head.title }}
        </span>
      </li>
    </ul>

    <!-- <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
    ></el-tree> -->
  </div>
  <!-- <el-drawer
    title="我是标题"
    :visible.sync="drawer"
    direction="rtl"
    :modal="false"
    :append-to-body="false"
  >
    <span>我来啦!</span>
  </el-drawer> -->
</template>

<script>
// import { mapState } from 'vuex'
// import { jumpToLine } from '../util/editor'
export default {
  props: {
    headList: {
      type: Array,
      default() {
        return []
      }
    },
    currentLine: {
      type: Number,
      default: 0
    },
    editor: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      drawer: true,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    jumpToLine(head) {
      // return jumpToLine(this.editor, head)
      this.$emit('jump-to-line', head)
    }
  },
  computed: {
    editorHeadList() {
      const searchValue = this.filterText.split('').join('.+')

      const editorHeadList = this.headList.filter((head, index, array) => {
        var reg = RegExp(searchValue)
        return reg.test(head.title)
      })
      return editorHeadList
    }
    // ...mapState({
    //   headList: state => state.headList
    // })
  }
}
</script>

<style lang="scss" scoped>
.outline_box {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 200px;
  // background-color: #282c34ef;
  border: 1px solid #e6e6e6;
  border-right: 0;
  border-top: 0;
  // z-index: 10000;
  /deep/.el-input__inner {
    height: 32px;
    line-height: 32px;
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #e6e6e6;
  }
  ul {
    flex: 1;
    overflow: auto;
    li {
      padding: 5px;
      cursor: pointer;
    }
    li:hover {
      background-color: #f0f7ff;
    }
    li.active {
      border-left: 2px solid #409eff;
      background-color: #f0f7ff;
    }
  }
}
</style>
