<template>
  <div class="world_panel" v-hotkey="keymap">
    <DialogBar />
    <GroupBar
      :itemList="groupList"
      :currentGroupId="currentGroupId"
      :menuList="menuListGroup"
      @changeTo="changeToGroup"
      @changePid="changeItemGroupId"
      @updateSorts="updateGroupSorts"
    />
    <ItemBar
      itemType="chapters"
      :itemList="itemList"
      :menuList="menuListChapter"
      @changeTo="changeToItem"
    >
      <template v-slot="{ item }">
        <ChapterItem :item="item" />
      </template>
    </ItemBar>
    <ContentBar>
      <el-empty
        :image-size="200"
        :description="$t('writing.nothingOpen')"
        v-if="editableTabs.length === 0"
        style="height: 100%"
      ></el-empty>
      <el-tabs
        closable
        v-else
        v-model="editableTabsId"
        type="card"
        class="tab_bar"
        @tab-remove="removeTab"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.id"
          :label="item.title"
          :name="item.id"
          class="editor_container"
          @dblclick="removeTab(item.id)"
          :style="{ width: editorWidth }"
        >
          <WorldChart />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar :item="currentItem">
      <InfoBox :title="$t('detailBar.attribute')">
        <AttrBox :item="currentItem" />
      </InfoBox>
      <InfoBox :title="$t('detailBar.note')">
        <TextareaBox :content="currentItem.note_content" />
      </InfoBox>
    </DetailBar>
  </div>
</template>

<script>
import GroupBar from '@/views/Common/GroupBar'
import ItemBar from '@/views/Common/ItemBar'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'
import InfoBox from '@/views/Common/DetailBar/InfoBox'
import DialogBar from '@/views/Common/DialogBar'
import AttrBox from '@/views/WritingPanel/components/AttrBox'
import ChapterItem from '@/views/WritingPanel/components/ChapterItem'
import TextareaBox from '@/views/WritingPanel/components/TextareaBox'
import WorldChart from './components/WorldChart'

import { listToTree, rename, deleteGroup } from '@/util/base'

export default {
  components: {
    GroupBar,
    ItemBar,
    ContentBar,
    DetailBar,
    InfoBox,
    ChapterItem,
    DialogBar,
    AttrBox,
    TextareaBox,
    WorldChart
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
      currentGroupId: '',
      currentItem: {},
      editorWidth: '100%'
    }
  },
  methods: {
    /**
     * @param {String | Object} item item object or item's id
     */
    changeToItem(item) {
      const temp = Object.prototype.toString.call(item)
      // If true means item is id
      if (temp === '[object String]') {
        item = this.$db.getItem('chapters', item)
      }
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
    changeToGroup(groupId) {
      this.itemList = this.$db.getItems('chapters', groupId)
      this.currentGroupId = groupId
      this.$db.setConfig('last_chapter_group_id', groupId)
    },
    updateGroupSorts(paramData) {
      this.$db.updateGroupSorts('chapter_groups', paramData)
    },
    updateAttr(column, value, item) {
      this.$db.update('chapters', column, value, item.id)
      item[column] = value

      this.$message({
        showClose: true,
        duration: 1000,
        message: `updata ${column} success`,
        type: 'success'
      })
    },
    changeItemGroupId(groupId, itemId) {
      this.$db.update('chapters', 'group_id', groupId, itemId)
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
    },
    handleTabClick(tab) {
      this.changeToItem(tab.name)
    },
    saveChapter(content, itemId) {
      this.$db.update('chapters', 'content', content, itemId)

      this.$message({
        showClose: true,
        duration: 1000,
        message: this.$t('writing.saved'),
        type: 'success'
      })

      const index = this.itemList.findIndex(item => {
        return item.id === itemId
      })
      this.itemList[index].content = content
    }
  },
  mounted() {
    this.groupList = this.$db.db
      .prepare('SELECT * FROM  chapter_groups order by sort ASC')
      .all()
    this.groupList = listToTree(this.groupList)

    const config = this.$db.getConfig('last_chapter_group_id')
    this.changeToGroup(config.value)

    this.$bus.$on('chapter:save', (content, itemId) => {
      this.saveChapter(content, itemId)
    })

    this.$bus.$on('attrBar:changeEditorWidth', value => {
      this.editorWidth = value + '%'
    })

    this.$bus.$on('attrBar:updateAttr', (column, value, itemId) => {
      this.updateAttr(column, value, itemId)
    })
  },
  computed: {
    keymap() {
      return {
        'ctrl+s': this.saveChapter
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.world_panel {
  flex: 1;
  display: flex;
  .tab_bar {
    display: flex;
    flex-direction: column;
    height: 100%;
    /deep/.el-tabs__header {
      margin: 0px;
      .el-tabs__item {
        height: 34px;
        line-height: 34px;
      }
    }
    /deep/ .el-tabs__content {
      flex: 1;
      .el-tab-pane {
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
