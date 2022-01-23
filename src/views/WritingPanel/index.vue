<template>
  <div class="writing_panel" v-hotkey="keymap">
    <DialogBar />
    <GroupBar
      :itemList="groupList"
      :currentGroup="currentGroup"
      :menuList="menuListGroup"
      :menuListBar="menuListGroupBar"
      @changeTo="changeToGroup"
      @changeItemGroupId="changeItemGroupId"
      @updateSorts="updateGroupSorts"
    />
    <ItemBar
      :itemList="itemList"
      :currentItem="currentItem"
      :menuListBar="menuListItemBar"
      :menuList="menuListItem"
      @changeTo="changeToItem"
      @updateSorts="updateItemSorts"
    >
      <template v-slot="{ item }">
        <ChapterItem :item="item" />
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
        v-else
        closable
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
          :style="{ width: editorWidth }"
        >
          <span
            slot="label"
            @dblclick="removeTab(item.id)"
            @contextmenu.prevent="showTabContextMenu($event, item)"
          >
            <!-- <i v-show="item.isChanged" class="el-icon-date"></i> -->
            <span v-show="item.isChanged">*</span>
            {{ item.title }}
          </span>
          <CmEditor
            :item="item"
            @change="handleEditorChange"
            @countWord="
              words => {
                updateAttr('words', words, item, false)
              }
            "
          />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar :item="currentItem">
      <InfoBox :title="$t('detailBar.attribute')">
        <AttrBox
          :item="currentItem"
          @updateAttr="updateAttr"
          @changeEditorWidth="
            width => {
              this.editorWidth = width + '%'
            }
          "
        />
      </InfoBox>
      <InfoBox :title="$t('detailBar.note')" :isEmpty="!currentItem.note">
        <TextareaBox
          :content.sync="currentItem.note"
          @change="
            newContent => {
              updateAttr('note', newContent, currentItem)
            }
          "
        />
      </InfoBox>
      <InfoBox
        :title="$t('writing.foreshadowing')"
        :isEmpty="!currentItem.foreshadowing"
      >
        <TextareaBox
          :content.sync="currentItem.foreshadowing"
          @change="
            newContent => {
              updateAttr('foreshadowing', newContent, currentItem)
            }
          "
        />
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
import TextareaBox from '@/views/Common/DetailBar/TextareaBox'
import CmEditor from '@/views/Common/CmEditor'

import AttrBox from './components/AttrBox'
import ChapterItem from './components/ChapterItem'

import { menuListGroupBarFactory, menuListGroupFactory } from './menuList/group'
import { menuListItemBarFactory, menuListItemFactory } from './menuList/item'
import { menuListTabFactory } from './menuList/tab'

import { getItemFactory } from '@/db/module/itemFactory'

import { listToTree } from '@/util/base'

import { scrollToView } from '@/util/dom'
export default {
  components: {
    GroupBar,
    ItemBar,
    ContentBar,
    DetailBar,
    InfoBox,
    CmEditor,
    ChapterItem,
    DialogBar,
    AttrBox,
    TextareaBox
  },
  data() {
    return {
      // Group table's name on datebase
      groupTableName: 'chapter_groups',
      // Item table's name on datebase
      itemTableName: 'chapters',

      currentTabId: '',
      tabList: [],
      menuListGroupBar: menuListGroupBarFactory.call(this),
      menuListGroup: menuListGroupFactory.call(this),
      menuListItem: menuListItemFactory.call(this),
      menuListItemBar: menuListItemBarFactory.call(this),
      menuListTab: menuListTabFactory.call(this),
      groupList: [],
      itemList: [],
      currentGroup: {},
      currentItem: {},
      editorWidth: '100%'
    }
  },
  methods: {
    init() {
      this.groupList = this.getGroups()

      const config = this.$db.getConfig('last_chapter_group_id')
      this.changeToGroup(config.value)
    },
    handleEditorChange(item, newContent) {
      item.isChanged = true
    },
    getGroups() {
      const temp = this.$db.getGroups(this.groupTableName)
      return listToTree(temp)
    },
    getGroupFromDb(groupId) {
      return this.$db.getGroup(this.groupTableName, groupId)
    },
    getGroupFromLocal(groupId) {
      const index = this.groupList.findIndex(group => {
        return group.id === groupId
      })
      if (index !== -1) {
        return this.groupList[index]
      } else {
        return this.getGroupFromDb(groupId)
      }
    },
    getItems(groupId) {
      return this.$db.getItems(this.itemTableName, groupId)
    },
    getItemFromDb(itemId) {
      return this.$db.getItem(this.itemTableName, itemId)
    },
    getItemFromLocal(itemId) {
      const index = this.itemList.findIndex(item => {
        return item.id === itemId
      })
      if (index !== -1) {
        return this.itemList[index]
      } else {
        return this.getItemFromDb(itemId)
      }
    },
    changeToGroup(groupId) {
      this.itemList = this.getItems(groupId)
      const group = this.getGroupFromDb(groupId)
      if (group === undefined) {
        this.$alert('group: ', group)
        return
      }

      this.currentGroup = group
      this.$db.setConfig('last_chapter_group_id', groupId)
      this.$store.commit('HIDE_CONTEXTMENU')
    },
    /**
     * @param {String | Object} item item object or item's id
     */
    changeToItem(itemId) {
      if (this.currentTabId === itemId) return

      const item = this.getItemFromDb(itemId)
      if (item === undefined) {
        this.$alert('item is undefined. id: ' + itemId)
        return
      }

      this.$set(item, 'isChanged', false)

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
    revealItem(item) {
      this.changeToGroup(item.group_id)
      // this.changeToItem(item.id)
      scrollToView('#' + item.id)
    },
    updateItemSorts(paramData) {
      this.$db.updateItemSorts(this.itemTableName, paramData)
      this.changeToGroup(this.currentGroup.id)
    },
    updateGroupSorts(paramData) {
      this.$db.updateGroupSorts(this.groupTableName, paramData)
    },
    updateAttr(column, value, item, isShowMessage = true) {
      // If item is an empty object then do nothing
      if (Object.keys(item).length === 0) return

      this.$db.update(this.itemTableName, column, value, item.id)
      item[column] = value
      item.updated = Date.now()
      if (isShowMessage) {
        this.$message(`update ${column} success`)
      }
    },
    changeItemGroupId(groupId, itemId) {
      this.$db.update(this.itemTableName, 'group_id', groupId, itemId)
      this.refreshItemList()
    },
    refreshGroupList() {
      this.groupList = this.getGroups()
    },
    refreshItemList() {
      this.changeToGroup(this.currentGroup.id)
    },
    deleteGroup(targetItem) {
      this.$confirm(() => {
        this.$db.deleteById(this.groupTableName, targetItem.id)
        this.refreshGroupList()
      }, targetItem)
    },
    deleteItem(targetItem) {
      this.$confirm(() => {
        this.$db.deleteById(this.itemTableName, targetItem.id)
        this.removeTab(targetItem.id)
        this.changeToGroup(this.currentGroup.id)
      }, targetItem)
    },
    // unfinished
    handleRemoveTab(targetId) {
      const index = this.itemList.findIndex(item => {
        return item.id === targetId
      })
      if (index !== -1) {
        if (this.itemList[index].isChanged === true) {
          this.$confirm(() => {})
        }
      }
    },
    // targetId is item's id
    removeTab(targetId) {
      targetId = targetId || this.currentTabId
      const tabs = this.tabList
      let activeId = this.currentTabId
      if (activeId === targetId) {
        tabs.forEach((tab, index) => {
          if (tab.id === targetId) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeId = nextTab.id
              this.changeToItem(activeId)
            }
          }
        })
      }

      this.currentTabId = activeId
      this.tabList = tabs.filter(tab => tab.id !== targetId)
      if (this.tabList.length === 0) {
        this.currentItem = {}
      }
    },
    removeOtherTabs(tabId) {
      this.tabList = this.tabList.filter(tab => tab.id === tabId)
      this.changeToItem(tabId)
    },
    handleTabClick(tab) {
      const itemId = tab.name
      this.changeToItem(itemId)
    },
    showTabContextMenu(event, targetItem) {
      // //  Event.srcElement.id: tab-ZwyPpPUkPT2aZPPFfGINn,
      // //  Remove 'tab-' will get item's id.
      // const itemId = event.srcElement.id.substr(4)
      // if (itemId === '') return

      const param = {
        event,
        targetItem,
        menuList: this.menuListTab
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    newGroup(pid, sort) {
      this.$prompt(title => {
        const Factory = getItemFactory(this.groupTableName)
        const item = new Factory(title, pid, sort)
        this.$db.insert(item)
        this.refreshGroupList()
      })
    },
    newItem(sort) {
      this.$prompt(title => {
        const Factory = getItemFactory(this.itemTableName)
        const item = new Factory(title, this.currentGroup.id, sort)
        this.$db.insert(item)
        this.refreshItemList()
      })
    },
    saveChapter(content, itemId) {
      if (content === undefined || itemId === undefined) {
        this.$alert(`content: ${content}; itemId: ${itemId}`, 'error')
        return
      }
      this.$db.update(this.itemTableName, 'content', content, itemId)

      this.$message(this.$t('writing.saved'))

      const index = this.itemList.findIndex(item => {
        return item.id === itemId
      })
      this.itemList[index].content = content
      this.itemList[index].isChanged = false
    }
  },
  mounted() {
    this.init()

    this.$bus.$on('writing.cmEditor:save_content', (content, itemId) => {
      this.saveChapter(content, itemId)
    })
    this.$bus.$on('writing.cmEditor:close_current_tab', () => {
      this.removeTab()
    })
  },
  beforeDestroy() {
    this.$bus.$off('writing.cmEditor:save_content', (content, itemId) => {
      this.saveChapter(content, itemId)
    })
  },
  computed: {
    keymap() {
      return {
        // 'ctrl+s': {
        //   keyup: this.saveChapter
        // },
        // 'ctrl+w': {
        //   keyup: event => {
        //     this.removeTab()
        //   }
        // }
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
