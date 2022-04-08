export const blank = function () {
  return [
    {
      type: 'group',
      menuItems: [
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
            id: 'action.paste',
            title: 'action.paste',
            icon: 'el-icon-folder-add',
            func: targetItem => {
              this.paste()
            }
          }
        }
      ]
    },
    {
      type: 'group',
      menuItems: [
        {
          type: 'item',
          menuItem: {
            id: 'undo',
            title: 'contextMenuBar.undo',
            icon: 'el-icon-edit',
            func: () => {
              this.graph.undo()
            }
          }
        },

        {
          type: 'item',
          menuItem: {
            id: 'redo',
            title: 'contextMenuBar.redo',
            icon: 'el-icon-edit',
            func: () => {
              this.graph.redo()
            }
          }
        }
      ]
    },
    {
      type: 'item',
      menuItem: {
        id: 'toCenter',
        title: 'contextMenuBar.toCenter',
        icon: 'el-icon-edit',
        func: (targetitem, menuitem, event) => {
          this.graph.centerContent()
        }
      }
    }
  ]
}
