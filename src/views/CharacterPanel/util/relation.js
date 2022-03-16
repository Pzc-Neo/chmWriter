import { getItemFactory } from '@/db/module/itemFactory'

import { convertToRelationData, convertToRelationLink } from './converter'

import { getAllChildItems } from '@/views/Common/script/item'

export const updateRelation = function (relationItem) {
  const index = this.relationLink.findIndex(item => {
    return item.id === relationItem.id
  })
  this.$prompt(newName => {
    this.$db.update(
      this.relationTableName,
      'relation',
      newName,
      relationItem.id
    )
    relationItem.name = newName
    // const item = this.getItemFromLocal(relationItem.id)
    this.relationLink[index].name = newName
    // item.name = newName
  }, relationItem.name)
}

export const newRelation = function (_item) {
  const Factory = getItemFactory(this.relationTableName)
  const item = new Factory(_item)
  try {
    this.$db.insert(item)
    this.refreshRelationChart()
  } catch (error) {
    const pattern = /UNIQUE constraint failed/
    const { message } = error
    if (pattern.test(message)) {
      this.$alert('不能添加重复的关系')
    } else {
      throw error
    }
  }
}

export const getRelationLink = function () {
  const relations = this.$db.getGroups(this.relationTableName, false)
  return convertToRelationLink(relations)
}

export const getRelationDate = function (groupId) {
  const allChildItems = getAllChildItems.call(this, groupId)

  let resultList = []
  if (allChildItems.length === 0) {
    const tempItemList = this.getItems(groupId)
    resultList = convertToRelationData(tempItemList)
  } else {
    resultList = convertToRelationData(allChildItems)
  }
  return resultList
}
