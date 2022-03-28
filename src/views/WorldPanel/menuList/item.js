/**
 * title: Use i18n's string.
 */
export const itemBar = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new2', // v-for's key
        title: 'contextMenuBar.new', // will wrapper by i18n's $t(), example: $t('contextMenuBar.new')
        icon: 'el-icon-document-add', // can be empty
        disable: false,
        hideOnClick: true,
        func: (targetItem, menuItem) => {
          const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
          console.log(sort)
          this.newItem(sort)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'new2',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        disable: true,
        hideOnClick: false,
        func: (targetItem, menuItem) => {
          // const sort = this.itemList[this.itemList.length - 1]?.sort + 1 || 0
          console.log('123')
          // this.newItem(sort)
        }
      }
    },
    {
      type: 'divider',
      menuItem: {}
    },
    {
      type: 'group',
      title: '按钮组',
      menuItems: [
        {
          type: 'item',
          menuItem: {
            id: 'new1',
            title: 'contextMenuBar.new',
            // icon: 'el-icon-document-add',
            disable: false,
            func: (targetItem, menuItem) => {
              const sort =
                this.itemList[this.itemList.length - 1]?.sort + 1 || 0
              console.log(sort)
              this.newItem(sort)
            }
          }
        },
        {
          type: 'toggle',
          menuItem: {
            id: 'newt2',
            title: 'contextMenuBar.new',
            icon: 'el-icon-document-add',
            disable: false,
            hideOnClick: false,
            isOn: false, // for el-switch
            func: (targetItem, menuItem) => {
              menuItem.isOn = !menuItem.isOn
            }
          }
        },
        {
          type: 'group',
          title: '按钮组',
          menuItems: [
            {
              type: 'item',
              menuItem: {
                id: 'new1',
                title: 'contextMenuBar.new',
                // icon: 'el-icon-document-add',
                disable: false,
                func: (targetItem, menuItem) => {
                  const sort =
                    this.itemList[this.itemList.length - 1]?.sort + 1 || 0
                  console.log(sort)
                  this.newItem(sort)
                }
              }
            }
          ]
        }
      ]
    },
    {
      type: 'toggle',
      menuItem: {
        id: 'new2',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        disable: false,
        hideOnClick: false,
        isOn: false, // for el-switch
        func: (targetItem, menuItem) => {
          menuItem.isOn = !menuItem.isOn
        }
      }
    }
  ]
}

export const item = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: 'contextMenuBar.new',
        icon: 'el-icon-document-add',
        disable: false,
        hideOnClick: true,
        func: (targetItem, menuItem) => {
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
        disable: false,
        hideOnClick: true,
        func: targetItem => {
          this.$prompt(newTitle => {
            this.$db.update(
              this.itemTableName,
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
        disable: false,
        hideOnClick: true,
        func: targetItem => {
          this.deleteItem(targetItem)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'info',
        title: 'contextMenuBar.detail',
        icon: 'el-icon-info',
        disable: false,
        hideOnClick: true,
        func: targetItem => {
          console.log(targetItem)
          // this.deleteItem(targetItem)
        }
      }
    }
  ]
}
