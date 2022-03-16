import { convertToRelationData, convertToRelationLink } from './util/converter'

import { getAllChildItems } from '@/views/Common/script/item'

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
