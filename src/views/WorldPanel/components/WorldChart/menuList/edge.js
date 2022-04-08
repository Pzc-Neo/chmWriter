export const edge = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        disable: false,
        hideOnClick: true,
        func: (targetItem, menuItem) => {
          this.newItem(targetItem.sort + 1)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'rename',
        title: 'contextMenuBar.rename',
        icon: 'el-icon-edit',
        disable: false,
        hideOnClick: true,
        func: targetItem => {
          this.$prompt(newTitle => {
            this.$db.update(
              this.itemTableName,
              'title',
              newTitle,
              targetItem.id
            )
            targetItem.title = newTitle
          }, targetItem.title)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'delect',
        title: 'contextMenuBar.delete',
        icon: 'el-icon-delete',
        disable: false,
        hideOnClick: true,
        func: targetItem => {
          this.deleteItem(targetItem)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'info',
        title: 'contextMenuBar.detail',
        icon: 'el-icon-info',
        disable: false,
        hideOnClick: true,
        func: targetItem => {
          console.log(targetItem)
          // this.deleteItem(targetItem)
        }
      }
    }
  ]
}
