export const handleRemoveTab = function (targetId) {
  targetId = targetId || this.currentTabId
  return new Promise((resolve, reject) => {
    const item = this.getItemFromLocal(targetId)
    if (item?.isChanged) {
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
            this.saveContent(item?.newContent, item.id)
            this.removeTab(targetId)
            break
          // not save
          case 'cancel':
            this.$message(this.$t('action.notSave'), 'info')
            this.removeTab(targetId)
            // if not set to false, it will have `*` on the tab title when you reopen it.
            item.isChanged = false
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
}

// targetId is item's id
export const removeTab = function (targetId, type = 'item') {
  targetId = targetId || this.currentTabId
  const tabs = this.tabList
  let activeId = this.currentTabId

  if (activeId === targetId) {
    tabs.forEach((tab, index) => {
      if (tab.id === targetId) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeId = nextTab.id
          if (type === 'item') {
            this.changeToItem(activeId)
          } else {
            this.changeToGroup(activeId)
          }
        }
      }
    })
  }
  this.currentTabId = activeId
  this.tabList = tabs.filter(tab => tab.id !== targetId)

  if (this.tabList.length === 0) {
    this.currentItem = {}
  }
}

export const switchTab = function (isNext = true) {
  const index = this.tabList.findIndex(tab => tab.id === this.currentTabId)
  let nextTab
  if (isNext) {
    nextTab = this.tabList[index + 1] || this.tabList[0]
  } else {
    nextTab = this.tabList[index - 1] || this.tabList[this.tabList.length - 1]
  }
  if (nextTab) {
    const activeId = nextTab.id
    this.changeToItem(activeId)
  }
}

export const handleTabClick = function (tab) {
  const itemId = tab.name
  this.changeToItem(itemId)
}

export const removeOtherTabs = async function (tabId) {
  const tabsNeedToRemove = this.tabList.filter(tab => tab.id !== tabId)
  for (let i = 0; i < tabsNeedToRemove.length; i++) {
    const tab = tabsNeedToRemove[i]
    await this.handleRemoveTab(tab.id)
  }
  this.changeToItem(tabId)
}

export const showTabContextMenu = function (event, targetItem) {
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
