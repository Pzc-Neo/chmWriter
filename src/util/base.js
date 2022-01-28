import { nanoid } from 'nanoid'
/**
 * I don't use nanoid directly,
 * because sometime I will use the random string as dom's id
 * which can't start with number
 * @param {String} preFix
 * @returns
 */
export const randomStr = function (preFix = 'id') {
  return preFix + nanoid()
}
/**
 *
 * @param {Function} func Target Function
 * @param {Number} time Debounce time
 * @param {Function} callback If you need VC's this, Do not use Arrow Function
 * @returns {Function}
 */
export const debounce = function (func, time, callback) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      const result = func.apply(this, arguments)
      if (callback) {
        callback.call(this, result)
      }
      timer = null
    }, time)
  }
}
export const debounceVue = function (funcName, time, callback) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      const result = this[funcName].apply(this, arguments)
      if (callback) {
        callback.call(this, result)
      }
      timer = null
    }, time)
  }
}

/**
 * Convert list to json tree
 * @param {Array} list The array you want to convert
 * @param {String} root Tree root's id
 * @param {String} parentId The column key of item's parent's id
 * @returns result json tree
 */
export const listToTree = (list, root, parentId) => {
  root = root || 'root'
  parentId = parentId || 'pid'

  const map = list.reduce((pre, cur) => {
    pre[cur.id] = cur
    return pre
  }, {})

  const result = []
  list.map(item => {
    if (item[parentId] === root) {
      result.push(item)
    } else {
      // Item's parentId not in map means item's parent may be delete,
      // so set item's parentId to 'default',
      // every group table from db have a colum that id and title's value is `default`
      if (!(item[parentId] in map)) {
        item[parentId] = 'default'
      }
      const parent = map[item[parentId]]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  })
  return result
}
