/**
 * title: Use i18n's string.
 */
export const tabBar = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        func: targetItem => {
          const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
          this.newItem(sort)
        }
      }
    }
  ]
}

export const tab = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'close',
        title: 'contextMenuBar.close',
        icon: 'el-icon-circle-close',
        func: targetItem => {
          this.handleRemoveTab(targetItem.id)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'closeOthers',
        title: 'contextMenuBar.closeOthers',
        icon: 'el-icon-circle-close',
        func: targetItem => {
          this.removeOtherTabs(targetItem.id)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'reveal',
        title: 'contextMenuBar.reveal',
        icon: 'el-icon-position',
        func: targetItem => {
          this.revealItem(targetItem)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        func: targetItem => {
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
        func: targetItem => {
          console.log(targetItem)
          // this.deleteItem(targetItem)
        }
      }
    }
  ]
}
