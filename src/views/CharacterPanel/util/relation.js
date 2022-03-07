import { getItemFactory } from '@/db/module/itemFactory'
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
