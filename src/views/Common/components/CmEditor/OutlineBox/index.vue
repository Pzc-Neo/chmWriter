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
        :class="[itemId + '_editor_head_list_item', getClass(head)]"
      >
        <span :style="{ paddingLeft: 8 * head.level + 'px' }">
          {{ head.num }} {{ head.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
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
    },
    itemId: {
      type: String,
      default: ''
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
    },
    getClass(head) {
      if (
        this.currentLine >= head.startlineNumber &&
        this.currentLine < head.endLineNumber
      ) {
        return 'active'
      } else {
        return ''
      }
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
      padding-left: 3px;
      background-color: #f0f7ff;
    }
  }
}
</style>
