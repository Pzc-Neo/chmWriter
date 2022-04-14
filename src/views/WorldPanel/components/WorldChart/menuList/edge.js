export const edge = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'appendLabel',
        title: 'contextMenuBar.appendLabel',
        icon: 'el-icon-folder-add',
        func: targetItem => {
          targetItem.edge.appendLabel({
            attrs: {
              label: {
                text: 'label'
              }
            },
            position: {
              distance: 0.5
            }
          })
        }
      }
    },

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
          console.log(targetItem)
          this.graph.removeEdge(targetItem.id)
        }
      }
    }
  ]
}
