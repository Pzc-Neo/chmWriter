/**
 * Note: use call or apply when you use those function behide.
 */
import { listToTree } from '@/util/base'
import { getItemFactory } from '@/db/module/itemFactory'
import { makeLastId } from './other'

/**
 * Get groupList, ItemList and change to last one
 */
export const init = function () {
  this.$changePanel('/' + this.panelName)

  this.groupList = this.getGroups()
  const lastGroupId = this.$db.getConfig(makeLastId(this.groupTableName))
  this.changeToGroup(lastGroupId)

  const lastItemId = this.$db.getConfig(makeLastId(this.itemTableName))
  this.changeToItem(lastItemId)

  const jsonStr = this.$db.getConfig('info_box_collapse_' + this.panelName)
  this.infoBoxCollapse = JSON.parse(jsonStr)
}

export const getGroups = function () {
  const groups = this.$db.getGroups(this.groupTableName)
  return listToTree(groups)
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

export const changeToGroup = function (groupId) {
  if (this.currentGroup.id === groupId) return

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

  this.itemList = this.getItems(groupId)
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
    this.$message(
      `${this.$t('action.update')} ${this.$t(
        this.panelName + '.' + column
      )} ${this.$t('result.success')}`
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
