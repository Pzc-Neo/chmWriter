<template>
  <div class="writing_panel">
    <DialogBar />
    <GroupBar
      :itemList="groupList"
      @changeTo="changeToGroup"
      :menuList="menuListGroup"
      @changePid="changeItemGroupId"
      @updateSorts="updateGroupSorts"
    />
    <ItemBar
      :itemList="itemList"
      @changeTo="changeTo"
      :menuList="menuListChapter"
    />
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
    <DetailBar :item="currentItem">
      <InfoBox title="信息">
        <AttrBox :item="currentItem" />
      </InfoBox>
      <InfoBox title="备注">
        <TextareaBox :content="currentItem.content" />
      </InfoBox>
    </DetailBar>
  </div>
</template>

<script>
import GroupBar from '@/views/Common/GroupBar'
import ItemBar from '@/views/Common/ItemBar'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'
import Editor from '@/views/WritingPanel/Editor'
import InfoBox from '@/views/Common/DetailBar/InfoBox'
import DialogBar from '@/views/Common/DialogBar'
import AttrBox from '@/views/WritingPanel/AttrBox'
import TextareaBox from '@/views/WritingPanel/TextareaBox'

import { dbUpdate, dbUpdateGroupSorts, dbChangeToGroup } from '@/db'
import { listToTree, rename, deleteGroup } from '@/util/base'

export default {
  components: {
    GroupBar,
    ItemBar,
    ContentBar,
    DetailBar,
    InfoBox,
    Editor,
    DialogBar,
    AttrBox,
    TextareaBox
  },
  data() {
    return {
      editableTabsId: '2',
      editableTabs: [],
      tabIndex: 2,
      menuListGroup: [
        {
          id: 'rename',
          title: '重命名',
          icon: 'el-icon-edit',
          func: targetItem => {
            rename.call(this, 'chapter_groups', targetItem)
          }
        },
        {
          id: 'delect',
          title: '删除',
          icon: 'el-icon-delete',
          func: targetItem => {
            deleteGroup.call(this, targetItem)
          }
        }
      ],
      menuListChapter: [
        {
          id: 'rename',
          title: '重命名',
          icon: 'el-icon-edit',
          func: targetItem => {
            rename.call(this, 'chapters', targetItem)
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
            this.removeChapter(targetItem)
          }
        },
        {
          id: 'info',
          title: '信息',
          icon: 'el-icon-info',
          func: targetItem => {
            console.log(targetItem)
            // this.removeChapter(targetItem)
          }
        }
      ],
      groupList: [],
      itemList: [],
      currentItem: {}
    }
  },
  methods: {
    changeTo(item) {
      this.$store.state.writing.chapter.current = item
      this.currentItem = item
      this.editableTabsId = item.title
      const index = this.editableTabs.findIndex(_item => {
        return _item.id === item.id
      })
      if (index === -1) {
        this.editableTabs.push(item)
      }
      this.editableTabsId = item.id
    },
    changeToGroup(group) {
      this.itemList = dbChangeToGroup.call(this, 'chapters', group.id)
    },
    updateGroupSorts(paramData) {
      dbUpdateGroupSorts.call(this, 'chapter_groups', paramData)
    },
    changeItemGroupId(groupId, itemId) {
      dbUpdate.call(this, 'chapters', 'group_id', groupId, itemId)
    },
    removeChapter(targetItem) {
      this.$confirm(
        `此操作将永久删除章节：[${targetItem.title}], 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.removeTab(targetItem.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
  },
  mounted() {
    this.groupList = this.$db
      .prepare('SELECT * FROM  chapter_groups order by sort ASC')
      .all()
    this.groupList = listToTree(this.groupList)
    this.itemList = this.$db.prepare('SELECT * FROM  chapters').all()
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
