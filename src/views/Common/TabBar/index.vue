<template>
  <el-tabs
    class="tab_bar"
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <Editor :item="item" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Editor from '@/views/WritingPanel/Editor'
export default {
  components: {
    Editor
  },
  data () {
    return {
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content 1'
        },
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content 2'
        }
      ],
      tabIndex: 2
    }
  },
  methods: {
    addTab (targetName) {
      const newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    removeTab (targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab_bar {
  display: flex;
  flex-direction: column;
  height: 100%;
  /deep/.el-tabs__header {
    margin: 0px;
  }
  /deep/ .el-tabs__content {
    flex: 1;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
