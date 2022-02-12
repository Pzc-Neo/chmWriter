import { group, groupBar } from './group'
import { item, itemBar } from './item'
import { tab, tabBar } from './tab'

export const menuListFactory = function (type) {
  switch (type) {
    case 'group':
      return group.call(this)
    case 'groupBar':
      return groupBar.call(this)
    case 'itemBar':
      return itemBar.call(this)
    case 'item':
      return item.call(this)
    case 'tab':
      return tab.call(this)
    case 'tabBar':
      return tabBar.call(this)
    default:
      break
  }
}
