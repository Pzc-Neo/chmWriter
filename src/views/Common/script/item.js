import { getItemFactory } from '@/db/module/itemFactory'
import { scrollToView } from '@/util/dom'
import { makeLastId } from './other'
import { getAllChildGroups } from './group'
import { addToTab } from './tab'

export const getItems = function (groupId) {
  return this.$db.getItems(this.itemTableName, groupId)
}

/**
 * Get group's item , include all child group's item.
 * @param {String} groupId
 * @returns
 */
export const getAllChildItems = function (groupId) {
  let resultItemList = []
  const groupIdList = getAllChildGroups.call(this, groupId)
  groupIdList.forEach(_gorupId => {
    const tempItemList = this.getItems(_gorupId)
    resultItemList = [...resultItemList, ...tempItemList]
  })
  return resultItemList
}

export const getItemFromDb = function (itemId) {
  const item = this.$db.getItem(this.itemTableName, itemId)
  item.newContent = item.content
  item.isChanged = false
  return item
}
export const getItemFromLocal = function (itemId) {
  const index = this.itemList.findIndex(item => {
    return item.id === itemId
  })
  if (index !== -1) {
    return this.itemList[index]
  } else {
    return this.getItemFromDb(itemId)
  }
}

export const getItemFromTabList = function (tabId) {
  const index = this.tabList.findIndex(_tab => _tab.id === tabId)
  if (index !== -1) {
    const tab = this.tabList[index]
    return tab
  } else {
    this.$alert('tab not exit')
    return null
  }
}

/**
 * @param {String} itemId
 * @param {Boolean} isAddToTab Sometime you may want to add group to tab not item
 * @returns
 */
export const changeToItem = function (itemId, isAddToTab = true) {
  if (this.currentItem.id === itemId) return

  const item = this.getItemFromLocal(itemId)
  if (item === undefined) {
    this.$alert('item is undefined. id: ' + itemId)
    return
  }

  if (!Object.hasOwnProperty.call(item, 'isChanged')) {
    this.$set(item, 'isChanged', false)
  }
  if (!Object.hasOwnProperty.call(item, 'newContent')) {
    // Will update when editor content change
    this.$set(item, 'newContent', item.content)
  }

  if (isAddToTab) {
    addToTab.call(this, item)
  }

  this.currentItem = item
  this.$db.setConfig(makeLastId(this.itemTableName), item.id)

  this.addToHistoryList(item)
}
export const revealItem = function (item) {
  this.changeToGroup(item.group_id)
  scrollToView('#' + item.id)
}
export const updateItemSorts = function (diffData) {
  this.$db.updateItemSorts(this.itemTableName, diffData)
  this.refreshItemList()
}
export const updateAttrItem = function (
  column,
  value,
  item,
  isShowMessage = true
) {
  // If item is an empty object then do nothing
  if (Object.keys(item).length === 0) return

  // If item doesn't have target column then do nothing
  if (!Object.hasOwnProperty.call(item, column)) return

  try {
    // Update db
    this.$db.update(this.itemTableName, column, value, item.id)
    // Update local
    item[column] = value
    item.updated = Date.now()

    if (column === 'words' || column === 'target_words') {
      if (item.rate) {
        const rate = Math.floor((item.words / item.target_words) * 100)
        this.updateAttrItem('rate', rate, item, false)
      }
    }

    if (isShowMessage) {
      let message = this.panelName + '.' + column
      switch (column) {
        case 'note':
          message = 'detailBar.note'
          break
        case 'language':
          message = 'detailBar.language'
          break
      }
      this.$message(
        `${this.$t('action.update')} ${this.$t(message)} ${this.$t(
          'result.success'
        )} (${item.title})`
      )
    }
  } catch (err) {
    this.$alert(err, 'error')
  }
}
export const changeItemGroupId = function (groupId, itemId) {
  // Get item's max sort num of target group
  const sort = this.$db.getMaxSort(this.itemTableName, 'group_id', groupId)

  this.$db.update(this.itemTableName, 'group_id', groupId, itemId)
  this.$db.update(this.itemTableName, 'sort', sort + 1, itemId)

  this.refreshItemList()
}
export const refreshItemList = function () {
  this.itemList = this.getItems(this.currentGroup.id)
}
export const newItem = function (sort) {
  this.$prompt(title => {
    const Factory = getItemFactory(this.itemTableName)
    if (sort === undefined) {
      sort = this.$db.getMaxSort(
        this.itemTableName,
        'group_id',
        this.currentGroup.id
      )
    }
    const item4db = new Factory(title, this.currentGroup.id, sort)
    this.$db.insert(item4db)
    this.refreshItemList()
    this.changeToItem(item4db.data.id)
  })
}
export const deleteItem = async function (targetItem) {
  const result = await this.$confirmSync(targetItem.title)
  if (result === 'confirm') {
    this.$db.deleteById(this.itemTableName, targetItem.id)
    this.removeTab(targetItem.id)
    this.refreshItemList()
  }
}
export const saveContent = function (content, itemId) {
  let item = {}
  if (itemId === undefined) {
    item = this.currentItem
  } else {
    item = this.getItemFromTabList(itemId)
  }

  if (content === undefined) {
    content = item.newContent
  }

  this.updateAttrItem('content', content, item)

  item.isChanged = false
}
