export const node = function () {
  return [
    {
      type: 'group',
      // title: 'contextMenuBar.addPort',
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
            id: 'cut',
            title: 'action.cut',
            icon: 'el-icon-folder-add',
            func: targetItem => {
              this.cut()
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
              this.removeCells()
            }
          }
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      type: 'group',
      title: 'contextMenuBar.addPort',
      menuItems: [
        {
          type: 'item',
          menuItem: {
            id: 'addPortLeft',
            title: 'contextMenuBar.left',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.addPort(targetItem.node, 'left')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'addPortRight',
            title: 'contextMenuBar.right',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.addPort(targetItem.node, 'right')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'addPortTop',
            title: 'contextMenuBar.top',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.addPort(targetItem.node, 'top')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'addPortBottom',
            title: 'contextMenuBar.bottom',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.addPort(targetItem.node, 'bottom')
            }
          }
        }
      ]
    },
    {
      type: 'group',
      title: 'contextMenuBar.removePort',
      menuItems: [
        {
          type: 'item',
          menuItem: {
            id: 'addPortLeft',
            title: 'contextMenuBar.left',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.removePort(targetItem.node, 'left')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'addPortRight',
            title: 'contextMenuBar.right',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.removePort(targetItem.node, 'right')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'addPortTop',
            title: 'contextMenuBar.top',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.removePort(targetItem.node, 'top')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'addPortBottom',
            title: 'contextMenuBar.bottom',
            // icon: 'el-icon-edit',
            func: targetItem => {
              this.removePort(targetItem.node, 'bottom')
            }
          }
        }
      ]
    }
  ]
}
