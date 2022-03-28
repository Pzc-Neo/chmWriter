/**
 * title: Use i18n's string.
 */
export const groupBar = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: 'contextMenuBar.new',
        icon: 'el-icon-folder-add',
        func: () => {
          let sort = 0
          if (this.groupList.length > 0) {
            sort = this.groupList[this.groupList.length - 1].sort + 1
          }
          this.newGroup('root', sort)
        }
      }
    }
  ]
}

export const group = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'newSilbling',
        title: 'contextMenuBar.newSilbling',
        icon: 'el-icon-folder-add',
        func: targetItem => {
          const targetId = targetItem.pid === 'root' ? 'root' : targetItem.pid
          this.newGroup(targetId, targetItem.sort)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'newChild',
        title: 'contextMenuBar.newChild',
        icon: 'el-icon-folder-add',
        func: targetItem => {
          let sort = 0
          if (targetItem.children) {
            const childs = targetItem.children
            sort = childs[childs.length - 1].sort + 1
          }
          this.newGroup(targetItem.id, sort)
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
              this.groupTableName,
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
          this.deleteGroup(targetItem)
        }
      }
    }
  ]
}
