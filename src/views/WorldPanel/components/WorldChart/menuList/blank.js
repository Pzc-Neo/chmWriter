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
              this.undo()
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
              this.redo()
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
          this.centerContent()
        }
      }
    },
    {
      type: 'toggle',
      menuItem: {
        id: 'toggleShowTools',
        title: 'contextMenuBar.showTools',
        icon: 'el-icon-edit',
        isOn: this.isShowTools,
        hideOnClick: false,
        func: (targetitem, menuItem, event) => {
          this.toggleIsShowTools()
          menuItem.isOn = !menuItem.isOn
        }
      }
    }
  ]
}
