<template>
  <div :class="'panel ' + panelName + '_panel'">
    <div
      class="group_and_item_bar_container"
      :style="styleGroupItemBarContainer"
    >
      <GroupBar
        :itemList="groupList"
        @updateAttr="updateAttrGroup"
        :currentGroup="currentGroup"
        :menuList="menuListGroup"
        :menuListBar="menuListGroupBar"
        @changeTo="changeToGroup"
        @changeItemGroupId="changeItemGroupId"
        @updateSorts="updateGroupSorts"
        :customStyle="styleGroupBar"
      />
      <ItemBar
        :itemList="itemList"
        :currentItem="currentItem"
        :menuListBar="menuListItemBar"
        :menuList="menuListItem"
        :itemBarTitle="$t('writing.chapter')"
        @changeTo="changeToItem"
        @updateSorts="updateItemSorts"
        :customStyle="styleItemBar"
      >
        <template v-slot="{ item }">
          <ChapterItem :item="item" />
        </template>
      </ItemBar>
    </div>
    <ContentBar>
      <el-empty
        :image-size="200"
        :description="$t('info.empty')"
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
            @update:content="saveContent"
            @switch:tab="isNext => switchTab(isNext)"
            @close="handleRemoveTab"
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
        <QuillEditor
          slot-scope="{ isFixedMode }"
          :isFixedMode="isFixedMode"
          :content.sync="currentItem.note"
          @change="
            newContent => {
              updateAttrItem('note', newContent, currentItem)
            }
          "
        />
      </InfoBox>
      <InfoBox
        :title="$t(panelName + '.foreshadowing')"
        :isEmpty="!currentItem.foreshadowing"
        :isCollapse.sync="infoBoxCollapse.foreshadowing"
      >
        <QuillEditor
          slot-scope="{ isFixedMode }"
          :isFixedMode="isFixedMode"
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
import { mapState } from 'vuex'

import GroupBar from '@/views/Common/components/GroupBar'
import ItemBar from '@/views/Common/components/ItemBar'
import ContentBar from '@/views/Common/components/ContentBar'
import DetailBar from '@/views/Common/components/DetailBar'
import InfoBox from '@/views/Common/components/DetailBar/InfoBox'
// import TextareaBox from '@/views/Common/components/DetailBar/TextareaBox'
import CmEditor from '@/views/Common/components/CmEditor'
import QuillEditor from '@/views/Common/components/QuillEditor'

import AttrBox from './components/AttrBox'
import ChapterItem from './components/ChapterItem'

import { menuListFactory } from './menuList/index'
import { getToolList } from './toolList'

import {
  init,
  getGroups,
  changeToGroup,
  getGroupFromDb,
  getGroupFromLocal,
  updateGroupSorts,
  updateAttrGroup,
  newGroup,
  refreshGroupList,
  deleteGroup
} from '@/views/Common/script/group'
import {
  handleRemoveTab,
  handleTabClick,
  removeOtherTabs,
  removeTab,
  showTabContextMenu,
  switchTab
} from '@/views/Common/script/tab'
import {
  changeItemGroupId,
  changeToItem,
  deleteItem,
  getItemFromDb,
  getItemFromLocal,
  getItems,
  newItem,
  refreshItemList,
  revealItem,
  updateAttrItem,
  updateItemSorts
} from '@/views/Common/script/item'
import { infoBoxCollapseHandler } from '@/views/Common/script/other'

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
    AttrBox,
    // TextareaBox,
    QuillEditor
  },
  data() {
    return {
      // Group table's name on datebase
      groupTableName: 'chapter_groups',
      // Item table's name on datebase
      itemTableName: 'chapters',
      // Will use by event, i18n
      panelName: 'writing',

      currentTabId: '',
      tabList: [],
      menuListGroupBar: menuListFactory.call(this, 'groupBar'),
      menuListGroup: menuListFactory.call(this, 'group'),
      menuListItem: menuListFactory.call(this, 'item'),
      menuListItemBar: menuListFactory.call(this, 'itemBar'),
      menuListTab: menuListFactory.call(this, 'tab'),
      toolList: getToolList.call(this),
      groupList: [],
      itemList: [],
      currentGroup: {},
      currentItem: {},
      editorWidth: '100%',
      infoBoxCollapse: {
        attribute: false,
        note: false,
        foreshadowing: false
      },
      // groupBar和itemBar组件容器的宽度
      widthGroupItemBarContainer: '170px'
    }
  },
  methods: {
    init() {
      return init.call(this)
    },
    getGroups() {
      return getGroups.call(this)
    },
    changeToGroup(groupId) {
      return changeToGroup.call(this, groupId)
    },
    getGroupFromDb(groupId) {
      return getGroupFromDb.call(this, groupId)
    },
    getGroupFromLocal(groupId) {
      return getGroupFromLocal.call(this, groupId)
    },
    updateGroupSorts(diffData) {
      return updateGroupSorts.call(this, diffData)
    },
    updateAttrGroup(column, value, group, isShowMessage = true) {
      return updateAttrGroup.call(this, column, value, group, isShowMessage)
    },
    newGroup(pid, sort) {
      return newGroup.call(this, pid, sort)
    },
    deleteGroup(targetItem) {
      return deleteGroup.call(this, targetItem)
    },
    refreshGroupList() {
      return refreshGroupList.call(this)
    },

    getItems(groupId) {
      return getItems.call(this, groupId)
    },
    getItemFromDb(itemId) {
      return getItemFromDb.call(this, itemId)
    },
    getItemFromLocal(itemId) {
      return getItemFromLocal.call(this, itemId)
    },
    changeToItem(itemId) {
      return changeToItem.call(this, itemId)
    },
    revealItem(item) {
      return revealItem.call(this, item)
    },
    updateItemSorts(diffData) {
      return updateItemSorts.call(this, diffData)
    },
    updateAttrItem(column, value, item, isShowMessage = true) {
      return updateAttrItem.call(this, column, value, item, isShowMessage)
    },
    changeItemGroupId(groupId, itemId) {
      return changeItemGroupId.call(this, groupId, itemId)
    },
    refreshItemList() {
      return refreshItemList.call(this)
    },
    newItem(sort) {
      return newItem.call(this, sort)
    },
    deleteItem(targetItem) {
      return deleteItem.call(this, targetItem)
    },
    handleEditorContentChange(item, newContent) {
      item.newContent = newContent
      item.isChanged = true
    },
    handleRemoveTab(targetId) {
      return handleRemoveTab.call(this, targetId)
    },
    // targetId is item's id
    removeTab(targetId) {
      return removeTab.call(this, targetId)
    },
    removeOtherTabs(tabId) {
      return removeOtherTabs.call(this, tabId)
    },
    switchTab(isNext = true) {
      return switchTab.call(this, isNext)
    },
    handleTabClick(tab) {
      return handleTabClick.call(this, tab)
    },
    showTabContextMenu(event, targetItem) {
      return showTabContextMenu.call(this, event, targetItem)
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
      if (item?.isChanged === undefined) {
        this.$set(item, 'isChanged', false)
      } else {
        item.isChanged = false
      }
    }
  },
  watch: {
    infoBoxCollapse: {
      deep: true,
      handler(newData) {
        infoBoxCollapseHandler.call(this, newData)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.$store.commit('SET_PANEL_TOOL_LIST', _this.toolList)
    })
  },
  mounted() {
    this.init()

    this.$bus.$on(this.panelName + ':new-group', () => {
      this.newGroup()
    })
    this.$bus.$on(this.panelName + ':new-item', () => {
      this.newItem()
    })
    this.$bus.$on(this.panelName + ':change-to-group', targetItem => {
      this.changeToGroup(targetItem.id)
    })
    this.$bus.$on(this.panelName + ':change-to-item', targetItem => {
      this.changeToItem(targetItem.id)
      this.revealItem(targetItem)
    })
    this.$bus.$on(this.panelName + ':switch-tab', isNext => {
      this.switchTab(isNext)
    })
    this.$bus.$on(this.panelName + ':remove-tab', () => {
      this.handleRemoveTab()
    })

    this.$bus.$on(this.panelName + ':save-content', () => {
      this.saveContent()
    })
  },
  beforeDestroy() {
    this.$bus.$off(this.panelName + ':new-group')
    this.$bus.$off(this.panelName + ':new-item')
    this.$bus.$off(this.panelName + ':change-to-group')
    this.$bus.$off(this.panelName + ':change-to-item')
    this.$bus.$off(this.panelName + ':switch-tab')
    this.$bus.$off(this.panelName + ':remove-tab')

    this.$bus.$off(this.panelName + ':save-content')
  },
  computed: {
    ...mapState({
      isDoubleBar: state => state.isDoubleBar
    }),
    styleGroupBar() {
      if (this.isDoubleBar) {
        return {
          width: '170px'
        }
      } else {
        return {
          width: this.widthGroupItemBarContainer,
          flex: 1
        }
      }
    },
    styleItemBar() {
      if (this.isDoubleBar) {
        return {
          width: '200px'
        }
      } else {
        return {
          width: this.widthGroupItemBarContainer,
          flex: 1
        }
      }
    },
    styleGroupItemBarContainer() {
      if (this.isDoubleBar) {
        return {
          flexDirection: 'row'
        }
      } else {
        return {
          flexDirection: 'column',
          width: this.widthGroupItemBarContainer
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  flex: 1;
  display: flex;
  overflow: hidden;
  .group_and_item_bar_container {
    display: flex;
    flex-direction: column;
  }
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
        display: flex;
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
