export const node = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'copy',
        title: 'action.copy',
        icon: 'el-icon-folder-add',
        func: targetItem => {
          this.copy()
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'paste',
        title: 'action.paste',
        icon: 'el-icon-folder-add',
        func: targetItem => {
          this.paste()
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'delete',
        title: 'contextMenuBar.delete',
        icon: 'el-icon-edit',
        func: targetItem => {
          this.graph.removeNode(targetItem.id)
        }
      }
    }
  ]
}
