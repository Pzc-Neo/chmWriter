<template>
  <div :class="'panel ' + panelName + '_panel'">
    <GroupBar
      :itemList="groupList"
      @updateAttr="updateAttrGroup"
      :currentGroup="currentGroup"
      :menuList="menuListGroup"
      :menuListBar="menuListGroupBar"
      @changeTo="changeToGroup"
      @updateSorts="updateGroupSorts"
    />
    <!-- :customStyle="{ width: '200px' }" -->
    <div class="middle">
      <ContentBar :customStyle="{ flex: 2 }">
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
              <span>{{ item.title }}</span>
            </span>
            <CmEditor
              :item="item"
              contentKey="description"
              @change="handleEditorContentChange"
              @update:content="saveContent"
              @switch:tab="isNext => switchTab(isNext)"
              @close="handleRemoveTab"
              @countWord="
                words => {
                  updateAttrGroup('words', words, item, false)
                }
              "
            />
          </el-tab-pane>
        </el-tabs>
      </ContentBar>
    </div>
    <DetailBar :item="currentGroup">
      <InfoBox
        :title="$t('detailBar.attribute')"
        :isCollapse.sync="infoBoxCollapse.attribute"
      >
        <AttrBox
          :item="currentGroup"
          @updateAttr="updateAttrGroup"
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
          :content.sync="currentGroup.note"
          @change="
            newContent => {
              updateAttrGroup('note', newContent, currentGroup)
            }
          "
        />
      </InfoBox>
    </DetailBar>
  </div>
</template>

<script>
import GroupBar from '@/views/Common/components/GroupBar'
import ContentBar from '@/views/Common/components/ContentBar'
import DetailBar from '@/views/Common/components/DetailBar'
import InfoBox from '@/views/Common/components/DetailBar/InfoBox'
import CmEditor from '@/views/Common/components/CmEditor'
import QuillEditor from '@/views/Common/components/QuillEditor'

import AttrBox from './components/AttrBox'

import { menuListFactory } from './menuList/index'
import { getToolList } from './toolList'

import {
  init,
  getGroups,
  getGroupFromDb,
  getGroupFromLocal,
  updateGroupSorts,
  updateAttrGroup,
  newGroup,
  refreshGroupList,
  deleteGroup
} from '@/views/Common/script/group'
import {
  addToTab,
  handleRemoveTab,
  handleTabClick,
  removeOtherTabs,
  removeTab,
  showTabContextMenu,
  switchTab
} from '@/views/Common/script/tab'

import { infoBoxCollapseHandler, makeLastId } from '@/views/Common/script/other'

export default {
  name: 'SettingPanel',
  components: {
    GroupBar,
    ContentBar,
    DetailBar,
    InfoBox,
    CmEditor,
    AttrBox,
    QuillEditor
  },
  data() {
    return {
      // Group table's name on datebase
      groupTableName: 'settings',
      // Item table's name on datebase
      itemTableName: 'data1s',
      // Will use by event, i18n
      panelName: 'setting',

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
      }
    }
  },
  computed: {
    styleItemList() {
      let _style = {
        width: '100%'
      }

      if (this.$store.state.isSimpleMode) {
        _style = {
          ..._style,
          display: 'flex',
          flexFlow: 'row wrap',
          alignContent: 'flex-start'
        }
      }
      return _style
    }
  },
  methods: {
    init() {
      return init.call(this, 'group')
    },
    getGroups() {
      return getGroups.call(this)
    },
    changeToGroup(groupId, force = false) {
      // return changeToGroup.call(this, groupId)
      if (this.currentGroup.id === groupId && !force) return

      let group = this.getGroupFromDb(groupId)
      if (group === undefined) {
        group = this.getGroupFromDb('default')
        if (group !== undefined) {
          // this.changeToGroup('default')
          console.log('undefined')
        } else {
          this.$alert(
            `${this.$t('sideBar.group')}: ${this.$t('info.notExist')}`
          )
        }
        return
      }
      addToTab.call(this, group)
      this.currentGroup = group
      this.$db.setConfig(makeLastId(this.groupTableName), groupId)
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
    handleEditorContentChange(item, newContent) {
      item.newContent = newContent
      item.isChanged = true
    },
    handleRemoveTab(targetId) {
      return handleRemoveTab.call(this, targetId, 'group')
    },
    // targetId is item's id
    removeTab(targetId) {
      return removeTab.call(this, targetId, 'group')
    },
    removeOtherTabs(tabId) {
      return removeOtherTabs.call(this, tabId, 'group')
    },
    switchTab(isNext = true) {
      return switchTab.call(this, isNext, 'group')
    },
    handleTabClick(tab) {
      return handleTabClick.call(this, tab, 'group')
    },
    showTabContextMenu(event, targetItem) {
      return showTabContextMenu.call(this, event, targetItem)
    },

    saveContent(content, itemId) {
      let item = {}
      if (itemId === undefined) {
        item = this.currentGroup
      } else {
        item = this.getGroupFromDb(itemId)
      }

      if (content === undefined) {
        content = item.newContent
      }

      this.updateAttrGroup('description', content, item)
      item.isChanged = false
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
    this.$bus.$on(this.panelName + ':change-to-group', targetItem => {
      this.changeToGroup(targetItem.id)
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
    this.$bus.$off(this.panelName + ':change-to-group')
    this.$bus.$off(this.panelName + ':switch-tab')
    this.$bus.$off(this.panelName + ':remove-tab')

    this.$bus.$off(this.panelName + ':save-content')
  }
}
</script>

<style lang="scss" scoped>
.panel {
  flex: 1;
  display: flex;
  overflow: hidden;
  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
