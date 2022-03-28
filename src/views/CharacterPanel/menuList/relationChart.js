/**
 * title: Use i18n's string.
 */
export const arelationChart = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        func: targetItem => {
          const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
          console.log(sort)
          this.newItem(sort)
        }
      }
    }
  ]
}

export const relationChart = function () {
  return [
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
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'addRelation',
        title: 'contextMenuBar.addEdge',
        icon: 'el-icon-plus',
        func: targetItem => {
          this.addRelationMode = {
            isOn: true,
            params: targetItem
          }
        }
      }
    },

    {
      type: 'item',
      menuItem: {
        id: 'delete',
        title: 'contextMenuBar.delete',
        icon: 'el-icon-delete',
        func: params => {
          if (params.dataType === 'node') {
            this.deleteItem(params.data)
          } else if (params.dataType === 'edge') {
            this.deleteRelation(params.data)
          } else {
            const msg = "Can't deal with dataType: " + params.dataType
            this.$alert(msg)
            console.error(new Error(msg))
          }
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
