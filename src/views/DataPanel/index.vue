<template>
  <div class="writing_panel" v-hotkey="keymap">
    <DialogBar />
    <GroupBar
      :itemList="groupList"
      :currentGroup="currentGroup"
      :menuList="menuListGroup"
      :menuListBar="menuListGroupBar"
      @changeTo="changeToGroup"
      @changePid="changeItemGroupId"
      @updateSorts="updateGroupSorts"
    />
    <ItemBar
      :itemList="itemList"
      :menuList="menuListChapter"
      @changeTo="changeToItem"
      @updateSorts="updateItemSorts"
    >
      <template v-slot="{ item }">
        <ItemBox :item="item" />
        <!-- <ChapterItem :item="item" /> -->
      </template>
    </ItemBar>
    <ContentBar>
      <el-empty
        :image-size="200"
        :description="$t('writing.nothingOpen')"
        v-if="tabList.length === 0"
        style="height: 100%"
      ></el-empty>
      <el-tabs
        closable
        v-else
        v-model="currentTabId"
        type="card"
        class="tab_bar"
        @tab-remove="removeTab"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :label="item.title"
          :name="item.id"
          class="editor_container"
          @dblclick="removeTab(item.id)"
          :style="{ width: editorWidth }"
        >
          <CmEditor :item="item" />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar :item="currentItem">
      <InfoBox :title="$t('detailBar.attribute')">
        <AttrBox :item="currentItem" />
      </InfoBox>
      <InfoBox :title="$t('detailBar.note')">
        <TextareaBox :content="currentItem.note" />
      </InfoBox>
    </DetailBar>
  </div>
</template>

<script>
import GroupBar from '@/views/Common/GroupBar'
import ItemBar from '@/views/Common/ItemBar'
import ItemBox from '@/views/Common/ItemBar/ItemBox'
import ContentBar from '@/views/Common/ContentBar'
import DetailBar from '@/views/Common/DetailBar'
import InfoBox from '@/views/Common/DetailBar/InfoBox'
import DialogBar from '@/views/Common/DialogBar'

import AttrBox from '@/views/WritingPanel/components/AttrBox'
import TextareaBox from '@/views/Common/DetailBar/TextareaBox'
import CmEditor from '@/views/Common/CmEditor'

import { getItemFactory } from '@/db/module/itemFactory'

import { getInput, getConfirm, listToTree, rename } from '@/util/base'

export default {
  components: {
    GroupBar,
    ItemBar,
    ItemBox,
    ContentBar,
    DetailBar,
    InfoBox,
    CmEditor,
    DialogBar,
    AttrBox,
    TextareaBox
  },
  data() {
    return {
      // Group table's name on datebase
      groupTableName: 'data_groups',
      // Item table's name on datebase
      itemTableName: 'data_items',

      currentTabId: '2',
      tabList: [],
      menuListGroupBar: [
        {
          id: 'new',
          title: '新建',
          icon: 'el-icon-new',
          func: targetItem => {
            if (targetItem.children) {
              const childs = targetItem.children
              const sort = childs[childs.length - 1].sort + 1
              // console.log('Create new group (Not finished)')
              this.newGroup('root', sort, newGroup => {
                this.groupList.push(newGroup)
              })
            }
          }
        }
      ],
      menuListGroup: [
        {
          id: 'newChild',
          title: '新建同级',
          icon: 'el-icon-new',
          func: targetItem => {
            const targetId = targetItem.pid === 'root' ? 'root' : targetItem.pid
            this.newGroup(targetId, targetItem.sort)
          }
        },
        {
          id: 'newSilbling',
          title: '新建子级',
          icon: 'el-icon-new',
          func: targetItem => {
            let sort = 0
            if (targetItem.children) {
              const childs = targetItem.children
              sort = childs[childs.length - 1].sort + 1
            }
            this.newGroup(targetItem.id, sort, newGroup => {
              targetItem.children = targetItem?.children || []
              targetItem.children.push(newGroup.data)
              console.log(targetItem.children)
            })
          }
        },
        {
          id: 'rename',
          title: '重命名',
          icon: 'el-icon-edit',
          func: targetItem => {
            rename.call(this, this.groupTableName, targetItem)
          }
        },
        {
          id: 'delect',
          title: '删除',
          icon: 'el-icon-delete',
          func: targetItem => {
            this.deleteGroup(targetItem)
          }
        }
      ],
      menuListChapter: [
        {
          id: 'new',
          title: '新建',
          icon: 'el-icon-edit',
          func: targetItem => {
            this.newItem()
          }
        },
        {
          id: 'rename',
          title: '重命名',
          icon: 'el-icon-edit',
          func: targetItem => {
            rename.call(this, this.itemTableName, targetItem)
          }
        },
        {
          id: 'other',
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
            this.deleteItem(targetItem)
          }
        },
        {
          id: 'info',
          title: '信息',
          icon: 'el-icon-info',
          func: targetItem => {
            console.log(targetItem)
            // this.deleteItem(targetItem)
          }
        }
      ],
      groupList: [],
      itemList: [],
      currentGroup: {},
      currentItem: {},
      editorWidth: '100%'
    }
  },
  methods: {
    getGroups() {
      const temp = this.$db.getGroups(this.groupTableName)
      return listToTree(temp)
    },
    getGroup(groupId) {
      return this.$db.getGroup(this.groupTableName, groupId)
    },
    getItems(groupId) {
      return this.$db.getItems(this.itemTableName, groupId)
    },
    changeToGroup(groupId) {
      this.itemList = this.getItems(groupId)
      const group = this.getGroup(groupId)
      this.currentGroup = group
      this.$db.setConfig('last_chapter_group_id', groupId)
      this.$store.commit('HIDE_CONTEXTMENU')
    },
    /**
     * @param {String | Object} item item object or item's id
     */
    changeToItem(item) {
      const temp = Object.prototype.toString.call(item)
      // If true means item is id
      if (temp === '[object String]') {
        item = this.$db.getItem(this.itemTableName, item)
      }
      this.$store.state.writing.chapter.current = item

      this.currentItem = item
      const index = this.tabList.findIndex(_item => {
        return _item.id === item.id
      })
      if (index === -1) {
        this.tabList.push(item)
      }
      this.currentTabId = item.id
    },
    updateItemSorts(paramData) {
      this.$db.updateItemSorts(this.itemTableName, paramData)
      this.changeToGroup(this.currentGroup.id)
    },
    updateGroupSorts(paramData) {
      this.$db.updateGroupSorts(this.groupTableName, paramData)
    },
    updateAttr(column, value, item) {
      this.$db.update(this.itemTableName, column, value, item.id)
      item[column] = value

      this.$message({
        showClose: true,
        duration: 1000,
        message: `updata ${column} success`,
        type: 'success'
      })
    },
    changeItemGroupId(groupId, itemId) {
      this.$db.update(this.itemTableName, 'group_id', groupId, itemId)
    },
    deleteGroup(targetItem) {
      getConfirm.call(
        this,
        () => {
          this.$db.deleteById(this.groupTableName, targetItem.id)
        },
        targetItem
      )
    },
    deleteItem(targetItem) {
      getConfirm.call(
        this,
        () => {
          this.$db.deleteById(this.itemTableName, targetItem.id)
          this.removeTab(targetItem.id)
          this.changeToGroup(this.currentGroup.id)
        },
        targetItem
      )
      // this.$confirm(
      //   `此操作将永久删除章节：[${targetItem.title}], 是否继续?`,
      //   '提示',
      //   {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // )
      //   .then(() => {
      //     this.$db.deleteById(this.itemTableName, targetItem.id)
      //     this.removeTab(targetItem.id)
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    },
    removeTab(targetId) {
      const tabs = this.tabList
      let activeId = this.currentTabId
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

      this.currentTabId = activeId
      this.tabList = tabs.filter(tab => tab.id !== targetId)
    },
    handleTabClick(tab) {
      this.changeToItem(tab.name)
    },
    newGroup(pid, sort, callback) {
      getInput.call(this, title => {
        const Factory = getItemFactory(this.groupTableName)
        const item = new Factory(title, pid, sort)
        this.$db.insert(item)
        callback(item)
      })
    },
    newItem() {
      getInput.call(this, title => {
        const Factory = getItemFactory(this.itemTableName)
        const item = new Factory(title, this.currentGroup.id)
        this.$db.insert(item)
        this.changeToGroup(this.currentGroup.id)
      })
    },
    saveChapter(content, itemId) {
      if (content === undefined || itemId === undefined) {
        const info = `content:${content} itemId: ${itemId}`
        this.$alert(info, this.$t('result.warning'), {
          confirmButtonText: this.$t('message.confirm'),
          callback: action => {
            this.$message({
              type: 'warning',
              message: `action: ${action}`
            })
          }
        })
        return
      }
      this.$db.update(this.itemTableName, 'content', content, itemId)

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
    this.groupList = this.getGroups()

    const config = this.$db.getConfig('last_chapter_group_id')
    this.changeToGroup(config.value)

    this.$bus.$on('writing.cmEditor:save_content', (content, itemId) => {
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
.writing_panel {
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
