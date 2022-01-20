<template>
  <div class="writing_panel">
    <GroupBar
      :itemList="groupList"
      @changeTo="changeToGroup"
      :menuList="menuList"
      @updateSorts="updateGroupSorts"
    />
    <ItemBar :itemList="itemList" @changeTo="changeTo" :menuList="menuList" />
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
          <CmEditor :item="item" />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar>
      <InfoBox title="信息">测试信息</InfoBox>
    </DetailBar>
  </div>
</template>

<script>
import GroupBar from '@/views/Common/GroupBar'
import ItemBar from '@/views/Common/ItemBar'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'
import CmEditor from '@/views/WritingPanel/components/CmEditor'
import InfoBox from '@/views/Common/DetailBar/InfoBox'

import { listToTree } from '@/util/base'

export default {
  components: {
    GroupBar,
    ItemBar,
    ContentBar,
    DetailBar,
    InfoBox,
    CmEditor
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
            // this.rename(targetItem)
            this.$rename(this.itemList, targetItem)
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
        }
      ],
      groupList: [],
      itemList: [],
      currentGroupId: ''
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
    changeToGroup(groupId) {
      this.itemList = this.$db.getItems('data_items', groupId)
      console.log(this.itemList)
      this.currentGroupId = groupId
      this.$db.setConfig('last_data_item_group_id', groupId)
    },
    updateGroupSorts(paramData) {
      for (let index = 0; index < paramData.length; index++) {
        const item = paramData[index]
        this.$db.update('data_item_groups', 'sort', item.sort, item.targetId)
        this.$db.update('data_item_groups', 'pid', item.pid, item.targetId)
      }
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
    this.groupList = this.$db.db
      .prepare('SELECT * FROM  data_item_groups order by sort ASC')
      .all()
    this.groupList = listToTree(this.groupList)
    this.itemList = this.$db.db.prepare('SELECT * FROM  data_items').all()
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
