<template>
  <div class="writing_panel" v-hotkey="keymap">
    <DialogBar />
    <GroupBar
      :itemList="groupList"
      @updateAttr="updateAttrGroup"
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
        @tab-remove="handleRemoveTab"
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
            @dblclick="handleRemoveTab(item.id)"
            @contextmenu.prevent="showTabContextMenu($event, item)"
          >
            <span v-show="item.isChanged">*</span>
            {{ item.title }}
          </span>
          <CmEditor
            :item="item"
            @change="handleEditorContentChange"
            @countWord="
              words => {
                updateAttrItem('words', words, item, false)
              }
            "
          />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar :item="currentItem">
      <InfoBox
        :title="$t('detailBar.attribute')"
        :isCollapse.sync="infoBoxCollapse.attribute"
      >
        <AttrBox
          :item="currentItem"
          @updateAttr="updateAttrItem"
          @changeEditorWidth="
            width => {
              this.editorWidth = width + '%'
            }
          "
        />
      </InfoBox>
      <InfoBox
        :title="$t('detailBar.note')"
        :isEmpty="!currentItem.note"
        :isCollapse.sync="infoBoxCollapse.note"
      >
        <TextareaBox
          :content.sync="currentItem.note"
          @change="
            newContent => {
              updateAttrItem('note', newContent, currentItem)
            }
          "
        />
      </InfoBox>
      <InfoBox
        :title="$t('writing.foreshadowing')"
        :isEmpty="!currentItem.foreshadowing"
        :isCollapse.sync="infoBoxCollapse.foreshadowing"
      >
        <TextareaBox
          :content.sync="currentItem.foreshadowing"
          @change="
            newContent => {
              updateAttrItem('foreshadowing', newContent, currentItem)
            }
          "
        />
      </InfoBox>
    </DetailBar>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

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
  name: 'WritingPanel',
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
      editorWidth: '100%',
      infoBoxCollapse: {
        attribute: false,
        note: false,
        foreshadowing: false
      }
    }
  },
  methods: {
    /**
     * Get groupList, ItemList and change to last one
     */
    init() {
      this.groupList = this.getGroups()
      const lastGroupId = this.$db.getConfig(this.last_id_group)
      this.changeToGroup(lastGroupId)

      const lastItemId = this.$db.getConfig(this.last_id_item)
      this.changeToItem(lastItemId)

      const jsonStr = this.$db.getConfig('info_box_collapse_writing')
      this.infoBoxCollapse = JSON.parse(jsonStr)
    },
    getGroups() {
      const groups = this.$db.getGroups(this.groupTableName)
      return listToTree(groups)
    },
    getItems(groupId) {
      return this.$db.getItems(this.itemTableName, groupId)
    },
    getGroupFromDb(groupId) {
      return this.$db.getGroup(this.groupTableName, groupId)
    },
    getItemFromDb(itemId) {
      return this.$db.getItem(this.itemTableName, itemId)
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
      if (this.currentGroup.id === groupId) return

      let group = this.getGroupFromLocal(groupId)
      if (group === undefined) {
        group = this.getGroupFromLocal('default')
        if (group !== undefined) {
          this.changeToGroup('default')
        } else {
          this.$alert(this.$t('info.notExist'))
        }
        return
      }

      this.itemList = this.getItems(groupId)
      this.currentGroup = group
      this.$db.setConfig(this.last_id_group, groupId)
      this.$store.commit('HIDE_CONTEXTMENU')
    },
    changeToItem(itemId) {
      if (this.currentItem.id === itemId) return

      const item = this.getItemFromLocal(itemId)
      if (item === undefined) {
        this.$alert('item is undefined. id: ' + itemId)
        return
      }

      this.$set(item, 'isChanged', false)
      // Will update when editor content change
      this.$set(item, 'newContent', item.content)

      // Add to tabList
      const index = this.tabList.findIndex(_item => {
        return _item.id === item.id
      })
      if (index === -1) {
        this.tabList.push(item)
      }

      this.currentItem = item
      this.$db.setConfig(this.last_id_item, item.id)
      this.currentTabId = item.id
      this.$store.state.writing.chapter.current = item
    },
    revealItem(item) {
      this.changeToGroup(item.group_id)
      scrollToView('#' + item.id)
    },
    updateItemSorts(diffData) {
      this.$db.updateItemSorts(this.itemTableName, diffData)
      this.changeToGroup(this.currentGroup.id)
    },
    updateGroupSorts(diffData) {
      this.$db.updateGroupSorts(this.groupTableName, diffData)
    },
    updateAttrGroup(column, value, group, isShowMessage = true) {
      // If item is an empty object then do nothing
      if (Object.keys(group).length === 0) return

      // Update db
      this.$db.update(this.groupTableName, column, value, group.id)
      // Update local
      group[column] = value
      group.updated = Date.now()

      if (isShowMessage) {
        this.$message(
          `${this.$t('action.update')} ${this.$t(
            'writing.' + column
          )} ${this.$t('result.success')}`
        )
      }
    },
    updateAttrItem(column, value, item, isShowMessage = true) {
      // If item is an empty object then do nothing
      if (Object.keys(item).length === 0) return

      // Update db
      this.$db.update(this.itemTableName, column, value, item.id)
      // Update local
      item[column] = value
      item.updated = Date.now()

      if (column === 'words' || column === 'target_words') {
        const rate = Math.floor((item.words / item.target_words) * 100)
        this.updateAttrItem('rate', rate, item, false)
      }
      if (isShowMessage) {
        this.$message(
          `${this.$t('action.update')} ${this.$t(
            'writing.' + column
          )} ${this.$t('result.success')}`
        )
      }
    },
    changeItemGroupId(groupId, itemId) {
      // Get item's max sort num of target group
      const query = `select max(sort) from ${this.itemTableName} where group_id=?`

      const stmt = this.$db.db.prepare(query)
      let sort = stmt.all([groupId])[0]['max(sort)']
      if (sort === null) {
        sort = 0
      }

      this.$db.update(this.itemTableName, 'group_id', groupId, itemId)
      this.$db.update(this.itemTableName, 'sort', sort + 1, itemId)

      this.refreshItemList()
    },
    refreshGroupList() {
      this.groupList = this.getGroups()
    },
    refreshItemList() {
      // this.changeToGroup(this.currentGroup.id)
      this.itemList = this.getItems(this.currentGroup.id)
    },
    newGroup(pid, sort) {
      this.$prompt(title => {
        const Factory = getItemFactory(this.groupTableName)
        const item = new Factory(title, pid, sort)
        this.$db.insert(item)
        this.refreshGroupList()
        this.$db.reorganizeSort(this.groupList)
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
    async deleteGroup(targetItem) {
      if (targetItem.id === 'default') {
        this.$alert(this.$t('info.canNotDelete'))
        return
      }
      const result = await this.$confirmSync(targetItem.title)
      if (result === 'confirm') {
        this.$db.deleteById(this.groupTableName, targetItem.id)
        this.$db.setItemsGroupIdToDefault(
          this.groupTableName,
          this.itemTableName
        )
        this.refreshGroupList()
      }
    },
    async deleteItem(targetItem) {
      const result = await this.$confirmSync(targetItem.title)
      if (result === 'confirm') {
        this.$db.deleteById(this.itemTableName, targetItem.id)
        this.removeTab(targetItem.id)
        this.changeToGroup(this.currentGroup.id)
      }
    },
    handleEditorContentChange(item, newContent) {
      item.newContent = newContent
      item.isChanged = true
    },
    saveContent(content, itemId) {
      let item = {}
      if (itemId === undefined) {
        item = this.currentItem
      } else {
        item = this.getItemFromLocal(itemId)
      }

      if (content === undefined) {
        content = item.newContent
      }

      this.updateAttrItem('content', content, item)
      item.isChanged = false
    },
    handleRemoveTab(targetId) {
      return new Promise((resolve, reject) => {
        const item = this.getItemFromLocal(targetId)
        if (item.isChanged === true) {
          this.changeToItem(item.id)
          ;(async function () {
            const result = await this.$confirmSync(
              item.title,
              'save',
              this.$t('action.save'),
              this.$t('action.notSave')
            )
            switch (result) {
              // save
              case 'confirm':
                this.saveContent(item.newContent, item.id)
                this.removeTab(targetId)
                break
              // not save
              case 'cancel':
                this.$message(this.$t('action.notSave'), 'info')
                this.removeTab(targetId)
                break
              // close MessageBox and cancel
              case 'close':
                this.$message(this.$t('message.cancel'), 'info')
                break
              default:
            }
            resolve()
          }.call(this))
        } else {
          this.removeTab(targetId)
          resolve()
        }
      })
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
              // this.changeToItem(activeId)
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
    async removeOtherTabs(tabId) {
      const tabsNeedToRemove = this.tabList.filter(tab => tab.id !== tabId)
      for (let i = 0; i < tabsNeedToRemove.length; i++) {
        const tab = tabsNeedToRemove[i]
        await this.handleRemoveTab(tab.id)
      }
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
    }
  },
  computed: {
    last_id_group() {
      return (
        'last_id_' +
        this.groupTableName.substring(0, this.groupTableName.length - 1)
      )
    },
    last_id_item() {
      return (
        'last_id_' +
        this.itemTableName.substring(0, this.itemTableName.length - 1)
      )
    },
    keymap() {
      return {
        'ctrl+s': {
          keyup: () => {
            if (this.$store.state.currentPanel === '/writing') {
              this.saveContent()
            } else {
              console.log(this.$store.state.currentPanel)
            }
          }
        }
        // 'ctrl+w': {
        //   keyup: event => {
        //     this.removeTab()
        //   }
        // }
      }
    }
  },
  watch: {
    shortcutKey(newValue) {
      console.log(newValue)
    },
    infoBoxCollapse: {
      deep: true,
      handler(newData) {
        try {
          const jsonStr = JSON.stringify(newData)
          this.$db.setConfig('info_box_collapse_writing', jsonStr)
        } catch (e) {
          this.$alert(e)
        }
      }
    }
  },
  mounted() {
    this.init()

    this.$bus.$on('writing:saveContent', (content, item) => {
      this.saveContent(content, item)
    })
    // this.$bus.$on('writing.cmEditor:save_content', (content, itemId) => {
    //   this.saveContent(content, itemId)
    // })
    // this.$bus.$on('writing.cmEditor:close_current_tab', () => {
    //   this.removeTab()
    // })
    ipcRenderer.on('save', (event, message) => {
      console.log(this.$store.state.currentPanel)
      console.log(this.$store.state.currentPanel === '/writing')
      console.log('save')
    })
  },
  beforeDestroy() {
    // this.$bus.$off('writing.cmEditor:save_content', (content, itemId) => {
    //   this.saveContent(content, itemId)
    // })
  }
}
</script>

<style lang="scss" scoped>
.writing_panel {
  flex: 1;
  display: flex;
  overflow: hidden;
  .tab_bar {
    display: flex;
    flex-direction: column;
    height: 100%;
    user-select: none;
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
