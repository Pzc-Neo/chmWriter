/**
 * title: Use i18n's string.
 */
export const itemBar = function () {
  return [
    {
      id: 'new',
      title: 'contextMenuBar.new',
      icon: 'el-icon-document-add',
      func: targetItem => {
        const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
        console.log(sort)
        this.newItem(sort)
      }
    }
  ]
}

export const item = function () {
  return [
    {
      id: 'new',
      title: 'contextMenuBar.new',
      icon: 'el-icon-document-add',
      func: targetItem => {
        this.newItem(targetItem.sort + 1)
      }
    },
    {
      id: 'rename',
      title: 'contextMenuBar.rename',
      icon: 'el-icon-edit',
      func: targetItem => {
        this.$prompt(newTitle => {
          this.$db.update(this.itemTableName, 'title', newTitle, targetItem.id)
          targetItem.title = newTitle
        }, targetItem.title)
      }
    },
    {
      id: 'delect',
      title: 'contextMenuBar.delete',
      icon: 'el-icon-delete',
      func: targetItem => {
        this.deleteItem(targetItem)
      }
    },
    {
      id: 'info',
      title: 'contextMenuBar.detail',
      icon: 'el-icon-info',
      func: targetItem => {
        console.log(targetItem)
        // this.deleteItem(targetItem)
      }
    }
  ]
}
