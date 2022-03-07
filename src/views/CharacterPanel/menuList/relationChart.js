/**
 * title: Use i18n's string.
 */
export const arelationChart = function () {
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

export const relationChart = function () {
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
      func: params => {
        const targetItem = params.data
        const index = this.relationData.findIndex(item => {
          console.log(item.id, targetItem.id)
          return item.id === targetItem.id
        })
        if (index !== -1) {
          const relationItem = this.relationData[index]
          this.$emit('update-relation', relationItem)
        }
      }
    },
    {
      id: 'addRelation',
      title: 'contextMenuBar.addEdge',
      icon: 'el-icon-plus',
      func: targetItem => {
        this.addRelationMode = {
          isOn: true,
          params: targetItem
        }
      }
    },

    {
      id: 'delete',
      title: 'contextMenuBar.delete',
      icon: 'el-icon-delete',
      func: targetItem => {
        console.log(targetItem)
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
