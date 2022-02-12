<template>
  <div class="tool_bar">
    <el-button
      v-for="tool in commonToolList"
      size="mini"
      :icon="tool.icon"
      :title="$t(tool.title)"
      :key="tool.id"
      @click="e => tool.func(tool, e)"
    ></el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button
      v-for="tool in panelToolList"
      size="mini"
      :icon="tool.icon"
      :title="$t(tool.title)"
      :key="tool.id"
      @click="e => tool.func(tool, e)"
    ></el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      commonToolList: [
        {
          id: 'newGroup',
          title: 'contextMenuBar.newGroup',
          icon: 'el-icon-folder-add',
          func: () => {
            this.$bus.$emit(this.currentPanel + ':new-group')
          }
        },
        {
          id: 'newItem',
          title: 'contextMenuBar.new',
          icon: 'el-icon-document-add',
          func: () => {
            console.log(this.currentPanel)
            this.$bus.$emit(this.currentPanel + ':new-item')
          }
        },
        {
          id: 'commanBarSearch',
          title: 'action.search',
          icon: 'el-icon-search',
          func: () => {
            this.$store.commit('SHOW_COMMANDBOX', 'search')
          }
        },
        {
          id: 'commanBarCommand',
          title: 'action.command',
          icon: 'fa fa-file-code-o',
          func: () => {
            this.$store.commit('SHOW_COMMANDBOX', 'command')
          }
        },
        {
          id: 'toggleExpand',
          title: 'action.command',
          icon: 'fa fa-expand',
          func: tool => {
            if (tool.icon === 'fa fa-expand') {
              tool.icon = 'fa fa-compress'
            } else {
              tool.icon = 'fa fa-expand'
            }
            this.$store.commit('TOGGLE_EXPAND')
          }
        }
      ]
    }
  },
  methods: {
    init() {}
  },
  computed: {
    ...mapState({
      panelToolList: state => state.panelToolList,
      currentPanel: state => state.currentPanel
    })
  }
  // mounted() {
  //   this.$bus.$emit('writing:save-content')
  // }
}
</script>

<style lang="scss" scoped>
.tool_bar {
  display: flex;
  align-items: center;
  flex: 0 0 30px;
  overflow: hidden;
  padding-left: 5px;
  border-bottom: 1px solid #eee;
  /deep/ .el-button {
    border: 0px;
    padding: 4px 6px;
    .fa,
    [class*='el-icon-'],
    [class^='el-icon-'] {
      font-size: 18px;
    }
  }
  /deep/.el-button + .el-button {
    margin-left: 5px;
  }
}
</style>
