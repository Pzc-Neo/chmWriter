/**
 * title: Use i18n's string.
 */
export const settingBar = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'addSettingTag',
        title: 'contextMenuBar.addSettingTag',
        icon: 'el-icon-folder-add',
        func: (targetItem, menuItem, event) => {
          this.openAddSettingTagMenu(targetItem, menuItem, event)
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'refreshSettingTree',
        title: 'contextMenuBar.refreshSettingTree',
        icon: 'el-icon-refresh-right',
        func: (targetItem, menuItem, event) => {
          this.refreshSettingTree()
        }
      }
    }
  ]
}

export const settingTag = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'viewDetail',
        title: 'contextMenuBar.detail',
        icon: 'el-icon-info',
        func: targetItem => {
          this.$router.push('/setting')
          this.$bus.$emit('setting:change-to-group', {
            id: targetItem.value[targetItem.value.length - 1]
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'delect',
        title: 'contextMenuBar.delete',
        icon: 'el-icon-delete',
        func: (targetItem, menuItem, event) => {
          this.deleteSettingTag(targetItem)
        }
      }
    }
  ]
}
