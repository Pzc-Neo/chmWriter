export const updateRelation = function (relationItem) {
  const index = this.relationLink.findIndex(item => {
    return item.id === relationItem.id
  })
  console.log(index)
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
