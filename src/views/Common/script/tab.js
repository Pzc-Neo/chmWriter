export const addToTab = function (item) {
  // Add to tabList
  const index = this.tabList.findIndex(_item => {
    return _item.id === item.id
  })
  if (index === -1) {
    this.tabList.push(item)
  }
  this.currentTabId = item.id
}

export const handleRemoveTab = function (targetId, type = 'item') {
  targetId = targetId || this.currentTabId
  return new Promise((resolve, reject) => {
    const item = getTab.call(this, targetId)
    if (item?.isChanged) {
      switch (type) {
        case 'item':
          this.changeToItem(item.id)
          break
        case 'group':
          this.changeToGroup(item.id)
          break
      }

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

/**
 * Remove tab by id
 * @param {*} targetId item's id
 * @param {*} type can be `item` `group` `tab`
 */
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
          switch (type) {
            case 'item':
              this.changeToItem(activeId)
              break
            case 'group':
              this.changeToGroup(activeId)
              break
            case 'tab':
              this.switchTab(false, 'tab')
              break
            default:
              break
          }
        }
      }
    })
  }
  this.currentTabId = activeId
  this.tabList = tabs.filter(tab => tab.id !== targetId)

  if (this.tabList.length === 0) {
    switch (type) {
      case 'group':
        this.currentGroup = {}
        break
      case 'item':
        this.currentItem = {}
        break
      default:
        break
    }
  }
}

export const switchTab = function (isNext = true, type = 'item') {
  const index = this.tabList.findIndex(tab => tab.id === this.currentTabId)
  let nextTab
  if (isNext) {
    nextTab = this.tabList[index + 1] || this.tabList[0]
  } else {
    nextTab = this.tabList[index - 1] || this.tabList[this.tabList.length - 1]
  }
  if (nextTab) {
    const activeId = nextTab?.id
    switch (type) {
      case 'item':
        this.changeToItem(activeId)
        break
      case 'group':
        this.changeToGroup(activeId)
        break
      case 'tab':
        // do nothing
        break
      default:
        break
    }
  }
}

export const handleTabClick = function (tab, type = 'item') {
  const itemId = tab.name
  switch (type) {
    case 'item':
      this.changeToItem(itemId)
      break
    case 'group':
      this.changeToGroup(itemId)
      break
  }
}

export const removeOtherTabs = async function (tabId, type = 'item') {
  const tabsNeedToRemove = this.tabList.filter(tab => tab.id !== tabId)
  for (let i = 0; i < tabsNeedToRemove.length; i++) {
    const tab = tabsNeedToRemove[i]
    await this.handleRemoveTab(tab.id)
  }
  switch (type) {
    case 'item':
      this.changeToItem(tabId)
      break
    case 'group':
      this.changeToGroup(tabId)
      break
  }
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

export const getTab = function (tabId) {
  const index = this.tabList.findIndex(_tab => _tab.id === tabId)
  if (index !== -1) {
    const tab = this.tabList[index]
    return tab
  } else {
    this.$alert('tab not exit')
    return null
  }
}
