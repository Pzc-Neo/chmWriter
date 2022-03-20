import { getItemFactory } from '@/db/module/itemFactory'
import { scrollToView } from '@/util/dom'
import { makeLastId } from './other'
import { getAllChildGroups } from './group'

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
  console.log('groupIdList: ', groupIdList)
  groupIdList.forEach(_gorupId => {
    const tempItemList = this.getItems(_gorupId)
    resultItemList = [...resultItemList, ...tempItemList]
  })
  console.log(resultItemList)
  return resultItemList
}

export const getItemFromDb = function (itemId) {
  return this.$db.getItem(this.itemTableName, itemId)
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
    // Add to tabList
    const index = this.tabList.findIndex(_item => {
      return _item.id === item.id
    })
    if (index === -1) {
      this.tabList.push(item)
    }
    this.currentTabId = item.id
  }

  this.currentItem = item
  this.$db.setConfig(makeLastId(this.itemTableName), item.id)
}
export const revealItem = function (item) {
  this.changeToGroup(item.group_id)
  scrollToView('#' + item.id)
}
export const updateItemSorts = function (diffData) {
  this.$db.updateItemSorts(this.itemTableName, diffData)
  this.changeToGroup(this.currentGroup.id)
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
      if (column === 'note') {
        message = 'detailBar.note'
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
    const item = new Factory(title, this.currentGroup.id, sort)
    this.$db.insert(item)
    this.refreshItemList()
  })
}
export const deleteItem = async function (targetItem) {
  const result = await this.$confirmSync(targetItem.title)
  if (result === 'confirm') {
    this.$db.deleteById(this.itemTableName, targetItem.id)
    this.removeTab(targetItem.id)
    this.changeToGroup(this.currentGroup.id, true)
  }
}
