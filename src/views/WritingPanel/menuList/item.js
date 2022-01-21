export const menuListItemBarFactory = function () {
  return [
    {
      id: 'new',
      title: '新建',
      icon: 'el-icon-document-add',
      func: targetItem => {
        const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
        console.log(sort)
        this.newItem(sort)
      }
    }
  ]
}

export const menuListItemFactory = function () {
  return [
    {
      id: 'new',
      title: '新建',
      icon: 'el-icon-document-add',
      func: targetItem => {
        this.newItem(targetItem.sort + 1)
      }
    },
    {
      id: 'rename',
      title: '重命名',
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
      title: '删除',
      icon: 'el-icon-delete',
      func: targetItem => {
        this.deleteItem(targetItem)
      }
    },
    {
      id: 'info',
      title: '信息',
      icon: 'el-icon-info',
      func: targetItem => {
        console.log(targetItem)
        // this.deleteItem(targetItem)
      }
    }
  ]
}
