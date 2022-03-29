import { randomStr, showContextmenu } from '@/util/base'

export const openAddSettingTagMenu = function (targetItem, menuItem, event) {
  const menuList = makeAddSettingTagMenuList.call(this)
  setTimeout(() => {
    showContextmenu.call(this, event, menuList, targetItem)
  }, 0)
}

export const addSettingTag = function (setting) {
  const settingTag = {
    id: randomStr(),
    sid: setting.id,
    value: ''
  }
  this.settingTagList.push(settingTag)
}
export const makeAddSettingTagMenuList = function () {
  const menuList = []
  for (const key in this.settingTree) {
    if (Object.hasOwnProperty.call(this.settingTree, key)) {
      const setting = this.settingTree[key]
      const temp = {
        type: 'item',
        menuItem: {
          id: setting.id,
          isI18n: false,
          title: setting.title,
          func: () => {
            this.addSettingTag(setting)
          }
        }
      }
      menuList.push(temp)
    }
  }
  return menuList
}

export const getSettingTag = function (tagId) {
  const index = this.settingTagList.findIndex(settingTag => {
    return settingTag.id === tagId
  })
  if (index !== -1) {
    return this.settingTagList[index]
  } else {
    return {}
  }
}

export const delectSettingTag = async function (settingTag) {
  const result = await this.$confirmSync(settingTag.title)
  if (result === 'confirm') {
    this.settingTagList = this.settingTagList.filter(_tag => {
      return _tag.id !== settingTag.id
    })
    this.updateSetting(this.settingTagList)
  }
}
