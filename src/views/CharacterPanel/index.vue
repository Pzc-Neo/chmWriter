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
        :enuListBar="menuListItemBar"
        :menuList="menuListItem"
        @changeTo="changeToItem"
        @updateSorts="updateItemSorts"
        :customStyle="styleItemBar"
      >
        <template v-slot="{ item }">
          <CharacterItem :item="item" />
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
          <RelationChart
            :relationData="relationData"
            :linkData="relationLink"
            :menuList="menulistRelation"
            :addRelationMode="addRelationMode"
            :relationTableName="relationTableName"
            @change-to-item="changeToItem"
            @new-relation="newRelation"
            @update-relation="updateRelation"
          />
        </el-tab-pane>
      </el-tabs>
    </ContentBar>
    <DetailBar :item="currentItem">
      <InfoBox
        :title="$t('detailBar.baseAttribute')"
        :isCollapse.sync="infoBoxCollapse.attributeBase"
      >
        <AttrBoxBase
          :item="currentItem"
          @updateAttr="updateAttrItem"
          @updateConfig="updateConfig"
        />
      </InfoBox>
      <InfoBox
        :title="$t('detailBar.otherAttribute')"
        :isCollapse.sync="infoBoxCollapse.attribute"
      >
        <AttrBoxOther
          :item="currentItem"
          :weightUnit="weightUnit"
          :heightUnit="heightUnit"
          @updateAttr="updateAttrItem"
          @updateConfig="updateConfig"
          @changeEditorWidth="
            width => {
              this.editorWidth = width + '%'
            }
          "
        />
      </InfoBox>
      <InfoBox
        :title="$t(panelName + '.description')"
        :isEmpty="!currentItem.description"
        :isCollapse.sync="infoBoxCollapse.description"
      >
        <QuillEditor
          slot-scope="{ isFixedMode }"
          :isFixedMode="isFixedMode"
          :content.sync="currentItem.description"
          @change="
            newContent => {
              updateAttrItem('description', newContent, currentItem)
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
import TextareaBox from '@/views/Common/components/DetailBar/TextareaBox'

import AttrBoxOther from './components/AttrBoxOther'
import AttrBoxBase from './components/AttrBoxBase'
import CharacterItem from './components/CharacterItem'
import RelationChart from './components/RelationChart'

import QuillEditor from '@/views/Common/components/QuillEditor'

import { menuListFactory } from './menuList/index'
import { getToolList } from './toolList'
import { convertToRelationData, convertToRelationLink } from './util/converter'
import {
  newRelation,
  updateRelation,
  getRelationDate,
  getRelationLink
} from './util/relation'

import {
  init,
  getGroups,
  getGroupFromDb,
  getGroupFromLocal,
  updateGroupSorts,
  updateAttrGroup,
  newGroup,
  refreshGroupList,
  deleteGroup,
  changeToGroup
} from '@/views/Common/script/group'
import {
  handleRemoveTab,
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
import { infoBoxCollapseHandler, makeLastId } from '@/views/Common/script/other'

export default {
  name: 'CharacterPanel',
  components: {
    GroupBar,
    ItemBar,
    ContentBar,
    DetailBar,
    InfoBox,
    CharacterItem,
    AttrBoxOther,
    AttrBoxBase,
    TextareaBox,
    RelationChart,
    QuillEditor
  },
  data() {
    return {
      // Group table's name on datebase
      groupTableName: 'character_groups',
      // Item table's name on datebase
      itemTableName: 'characters',
      relationTableName: 'character_relation',
      // Will use by event, i18n
      panelName: 'character',
      addRelationMode: {
        isOn: false,
        params: {}
      },

      currentTabId: '',
      tabList: [],
      menuListGroupBar: menuListFactory.call(this, 'groupBar'),
      menuListGroup: menuListFactory.call(this, 'group'),
      menuListItem: menuListFactory.call(this, 'item'),
      menuListItemBar: menuListFactory.call(this, 'itemBar'),
      menuListTab: menuListFactory.call(this, 'tab'),
      menulistRelation: menuListFactory.call(this, 'relationChart'),
      toolList: getToolList.call(this),
      groupList: [],
      itemList: [],
      currentGroup: {},
      currentItem: {},
      editorWidth: '100%',
      infoBoxCollapse: {
        attribute: false,
        note: false,
        description: false
      },
      relationData: [],
      // Inclue all character's relation link
      relationLink: [],
      weightUnit: 'kg',
      heightUnit: 'cm',
      // groupBar和itemBar组件容器的宽度
      widthGroupItemBarContainer: '170px'
    }
  },
  methods: {
    init() {
      this.weightUnit = this.$db.getConfig('weightUnit')
      this.heightUnit = this.$db.getConfig('heightUnit')

      const relations = this.$db.getGroups(this.relationTableName, false)
      this.relationLink = convertToRelationLink(relations)

      return init.call(this)
    },
    getGroups() {
      return getGroups.call(this)
    },
    changeToGroup(groupId) {
      return changeToGroup.call(this, groupId)
    },
    /**
     * Show current group's relation chart.
     * @param {*} groupId
     */
    showGroupChart(groupId) {
      const group = this.getGroupFromDb(groupId)
      const index = this.tabList.findIndex(_group => {
        return _group.id === group.id
      })
      if (index === -1) {
        this.tabList.push(group)
      } else {
        this.currentTabId = groupId
        return
      }

      this.relationData = getRelationDate.call(this, groupId)

      this.$db.setConfig(makeLastId(this.groupTableName), groupId)
      this.currentTabId = group.id

      this.$store.commit('HIDE_CONTEXTMENU')
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
      return changeToItem.call(this, itemId, false)
    },
    revealItem(item) {
      return revealItem.call(this, item)
    },
    updateItemSorts(diffData) {
      return updateItemSorts.call(this, diffData)
    },
    updateAttrItem(column, value, item, isShowMessage = true) {
      console.log(column, value, item)
      return updateAttrItem.call(this, column, value, item, isShowMessage)
    },
    updateConfig(property, value) {
      this[property] = value
      this.$db.setConfig(property, value)
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
    removeTab(targetId) {
      return removeTab.call(this, targetId, 'tab')
    },
    removeOtherTabs(tabId) {
      return removeOtherTabs.call(this, tabId)
    },
    switchTab(isNext = true, type = 'tab') {
      return switchTab.call(this, isNext, type)
    },
    handleTabClick(tab) {
      this.changeToGroup(tab.name)
    },
    showTabContextMenu(event, targetItem) {
      return showTabContextMenu.call(this, event, targetItem)
    },
    updateRelation(targetItem) {
      updateRelation.call(this, targetItem)
    },
    newRelation(relationItem) {
      newRelation.call(this, relationItem)
    },
    async deleteRelation(targetItem) {
      const result = await this.$confirmSync(targetItem.title)
      if (result === 'confirm') {
        this.$db.deleteById(this.relationTableName, targetItem.id)
      }
    },
    refreshRelationChart() {
      this.relationLink = getRelationLink.call(this)
    },
    renderAll() {
      const itemList = this.$db.getAllFromTable(this.itemTableName)
      this.relationData = convertToRelationData(itemList)
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
      console.log('writing:new-item')
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
      this.removeTab()
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
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
