<template>
  <div class="writing_panel">
    <GroupTree />
    <ItemList @changeTo="changeTo" :menuList="menuList" />
    <ContentBar>
      <el-empty
        style="height: 100%"
        v-if="editableTabs.length === 0"
        :image-size="200"
        :description="$t('writing.nothingOpen')"
      ></el-empty>
      <el-tabs
        v-else
        class="tab_bar"
        v-model="editableTabsId"
        type="card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.id"
          :label="item.title"
          :name="item.id"
          @dblclick="removeTab(item.id)"
        >
          <Editor :item="item" />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar />
  </div>
</template>

<script>
import GroupTree from '@/views/Common/GroupTree'
import ItemList from '@/views/Common/ItemList'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'
import Editor from '@/views/WritingPanel/Editor'

export default {
  components: {
    GroupTree,
    ItemList,
    ContentBar,
    DetailBar,
    Editor
  },
  data() {
    return {
      editableTabsId: '2',
      editableTabs: [],
      tabIndex: 2,
      menuList: [
        {
          id: 'rename',
          title: '重命名',
          icon: 'el-icon-edit',
          func: targetItem => {
            console.log(this)
          }
        },
        {
          id: 'othter',
          title: '其他',
          // icon: 'el-icon-delete',
          func: targetItem => {
            // this.removeTab(targetItem.id)
          }
        },
        {
          id: 'delect',
          title: '删除',
          icon: 'el-icon-delete',
          func: targetItem => {
            this.removeTab(targetItem.id)
          }
        }
      ]
    }
  },
  methods: {
    changeTo(item) {
      this.$store.state.wrting.chapter.current = item
      this.editableTabsId = item.title
      const index = this.editableTabs.findIndex(_item => {
        return _item.id === item.id
      })
      if (index === -1) {
        this.editableTabs.push(item)
      }
      this.editableTabsId = item.id
    },
    removeTab(targetId) {
      const tabs = this.editableTabs
      let activeId = this.editableTabsId
      if (activeId === targetId) {
        tabs.forEach((tab, index) => {
          if (tab.id === targetId) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeId = nextTab.id
            }
          }
        })
      }

      this.editableTabsId = activeId
      this.editableTabs = tabs.filter(tab => tab.id !== targetId)
    }
  }
}
</script>

<style lang="scss" scoped>
.writing_panel {
  flex: 1;
  display: flex;
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
}
</style>
