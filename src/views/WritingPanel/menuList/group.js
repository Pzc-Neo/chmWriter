export const menuListGroupBarFactory = function () {
  return [
    {
      id: 'new',
      title: '新建',
      icon: 'el-icon-folder-add',
      func: () => {
        let sort = 0
        if (this.groupList.length > 0) {
          sort = this.groupList[this.groupList.length - 1].sort + 1
        }
        this.newGroup('root', sort)
      }
    }
  ]
}

export const menuListGroupFactory = function () {
  return [
    {
      id: 'newChild',
      title: '新建同级',
      icon: 'el-icon-folder-add',
      func: targetItem => {
        const targetId = targetItem.pid === 'root' ? 'root' : targetItem.pid
        this.newGroup(targetId, targetItem.sort)
      }
    },
    {
      id: 'newSilbling',
      title: '新建子级',
      icon: 'el-icon-folder-add',
      func: targetItem => {
        let sort = 0
        if (targetItem.children) {
          const childs = targetItem.children
          sort = childs[childs.length - 1].sort + 1
        }
        this.newGroup(targetItem.id, sort)
      }
    },
    {
      id: 'rename',
      title: '重命名',
      icon: 'el-icon-edit',
      func: targetItem => {
        this.$prompt(newTitle => {
          this.$db.update(this.groupTableName, 'title', newTitle, targetItem.id)
          targetItem.title = newTitle
        }, targetItem)
      }
    },
    {
      id: 'delect',
      title: '删除',
      icon: 'el-icon-delete',
      func: targetItem => {
        this.deleteGroup(targetItem)
      }
    }
  ]
}
