/**
 * Note: use call or apply when you use those function behide.
 */
import { listToTree } from '@/util/base'
import { getItemFactory } from '@/db/module/itemFactory'
import { makeLastId } from './other'

/**
 * Get groupList, ItemList and change to last one
 * @param {String} mode can be 'all', 'group', 'item'
 */
export const init = function (mode = 'all') {
  this.$changePanel('/' + this.panelName)

  if (mode === 'all' || mode === 'group') {
    this.groupList = this.getGroups()
    const lastGroupId = this.$db.getConfig(makeLastId(this.groupTableName))
    this.changeToGroup(lastGroupId)
  }
  if (mode === 'all' || mode === 'item') {
    const lastItemId = this.$db.getConfig(makeLastId(this.itemTableName))
    this.changeToItem(lastItemId)
  }
  const jsonStr = this.$db.getConfig('info_box_collapse_' + this.panelName)
  try {
    this.infoBoxCollapse = JSON.parse(jsonStr)
  } catch (error) {
    this.infoBoxCollapse = {}
  }
}

export const getGroups = function () {
  const groups = this.$db.getGroups(this.groupTableName)
  return listToTree(groups)
}

/**
 * Get all child groups by id , include itself.
 * @param {String} groupId
 * @returns
 */
export const getAllChildGroups = function (groupId) {
  const resultGroupIdList = []
  const queue = [groupId]
  while (queue.length > 0) {
    const _groupId = queue.shift()
    resultGroupIdList.push(_groupId)
    const childGroupList = this.$db.getGroupsByPid(
      this.groupTableName,
      _groupId
    )
    childGroupList.forEach(childGroup => {
      queue.push(childGroup.id)
    })
  }
  return resultGroupIdList
}

export const getGroupFromDb = function (groupId) {
  return this.$db.getGroup(this.groupTableName, groupId)
}

export const getGroupFromLocal = function (groupId) {
  const index = this.groupList.findIndex(group => {
    return group.id === groupId
  })
  if (index !== -1) {
    return this.groupList[index]
  } else {
    return this.getGroupFromDb(groupId)
  }
}

/**
 *
 * @param {String} groupId
 * @param {Boolean} force If truly, change to group anyway.
 * even if target group is current group.
 * @param {Function} itemListHandler hava one param: itemList,
 * you can do something to it and you must return an itemList.
 * @returns
 */
export const changeToGroup = function (
  groupId,
  force = false,
  itemListHandler
) {
  if (this.currentGroup.id === groupId && !force) return

  let group = this.getGroupFromDb(groupId)
  if (group === undefined) {
    group = this.getGroupFromDb('default')
    if (group !== undefined) {
      this.changeToGroup('default')
    } else {
      this.$alert(this.$t('info.notExist'))
    }
    return
  }
  const tempItemList = this.getItems(groupId)
  if (itemListHandler instanceof Function) {
    this.itemList = itemListHandler(tempItemList)
  } else {
    this.itemList = tempItemList
  }
  this.currentGroup = group
  this.$db.setConfig(makeLastId(this.groupTableName), groupId)
  this.$store.commit('HIDE_CONTEXTMENU')
}

export const updateGroupSorts = function (diffData) {
  this.$db.updateGroupSorts(this.groupTableName, diffData)
}
export const updateAttrGroup = function (
  column,
  value,
  group,
  isShowMessage = true
) {
  // If item is an empty object then do nothing
  if (Object.keys(group).length === 0) return

  // Update db
  this.$db.update(this.groupTableName, column, value, group.id)
  // Update local
  group[column] = value
  group.updated = Date.now()

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
      )}`
    )
  }
}

export const newGroup = function (pid, sort) {
  this.$prompt(title => {
    const Factory = getItemFactory(this.groupTableName)
    if (pid === undefined) {
      pid = 'root'
    }
    if (sort === undefined) {
      sort = this.$db.getMaxSort(this.groupTableName, 'pid', 'root')
    }
    const item = new Factory(title, pid, sort)
    this.$db.insert(item)
    this.refreshGroupList()
  })
}

export const deleteGroup = async function (targetItem) {
  if (targetItem.id === 'default') {
    this.$alert(this.$t('info.canNotDelete'))
    return
  }
  const result = await this.$confirmSync(targetItem.title)
  if (result === 'confirm') {
    this.$db.deleteById(this.groupTableName, targetItem.id)
    this.$db.setItemsGroupIdToDefault(this.groupTableName, this.itemTableName)
    this.refreshGroupList()
  }
}

export const refreshGroupList = function () {
  this.groupList = this.getGroups()
}
