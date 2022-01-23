/**
 * title: Use i18n's string.
 */
export const menuListTabBarFactory = function () {
  return [
    {
      id: 'new',
      title: 'contextMenuBar.new',
      icon: 'el-icon-document-add',
      func: targetItem => {
        const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
        this.newItem(sort)
      }
    }
  ]
}

export const menuListTabFactory = function () {
  return [
    {
      id: 'close',
      title: 'contextMenuBar.close',
      icon: 'el-icon-circle-close',
      func: targetItem => {
        this.removeTab(targetItem.id)
      }
    },
    {
      id: 'closeOthers',
      title: 'contextMenuBar.closeOthers',
      icon: 'el-icon-circle-close',
      func: targetItem => {
        this.removeOtherTabs(targetItem.id)
      }
    },
    {
      id: 'reveal',
      title: 'contextMenuBar.reveal',
      icon: 'el-icon-position',
      func: targetItem => {
        this.revealItem(targetItem)
      }
    },
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
        }, targetItem)
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
