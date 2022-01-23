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
      callback.call(this, func.apply(this, arguments))
    }, time)
  }
}
/**
 * Rename an item.
 * @param {Function} callback Callback function will take the result value
 * @param {Object} targetItem The item that you want to rename
 */
export const getInput = function (callback, targetItem) {
  this.$prompt(this.$t('message.pleaseInput'), this.$t('action.getInput'), {
    inputValue: targetItem?.title || '',
    confirmButtonText: this.$t('message.confirm'),
    cancelButtonText: this.$t('message.cancel'),
    inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/, // nonempty
    inputErrorMessage: this.$t('message.nonempty')
  })
    .then(({ value }) => {
      callback(value.trim())
      this.$message({
        type: 'success',
        message: this.$t('message.rename') + ' ' + this.$t('result.success')
      })
    })
    .catch(() => {
      this.$message({
        type: 'info',
        message: this.$t('message.cancel')
      })
    })
}

export const getConfirm = function (callback, targetItem) {
  this.$confirm(
    `${this.$t('action.delete')} ${targetItem?.title}?`,
    this.$t('result.warning'),
    {
      confirmButtonText: this.$t('message.confirm'),
      cancelButtonText: this.$t('message.cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      callback()
      this.$message({
        type: 'success',
        message: this.$t('message.success')
      })
    })
    .catch(() => {
      this.$message({
        type: 'info',
        message: this.$t('message.cancel')
      })
    })
}
/**
 * Rename an item.
 * @param {String} tableName The Table's name of database which you want to modify
 * @param {Object} targetItem The item that you want to rename
 * @param {String} column The column of table (optional, default is 'title')
 */
export const rename = function (tableName, targetItem, column = 'title') {
  this.$prompt(this.$t('message.pleaseInput'), this.$t('message.rename'), {
    inputValue: targetItem.title,
    confirmButtonText: this.$t('message.confirm'),
    cancelButtonText: this.$t('message.cancel'),
    inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/, // nonempty
    inputErrorMessage: this.$t('message.nonempty')
  })
    .then(({ value }) => {
      if (value.trim() === targetItem.title) {
        this.$message({
          type: 'warning',
          message: this.$t('result.noChange')
        })
      } else {
        targetItem.title = value.trim()
        this.$db.update(tableName, column, targetItem.title, targetItem.id)
        this.$message({
          type: 'success',
          message: this.$t('message.rename') + ' ' + this.$t('result.success')
        })
      }
    })
    .catch(() => {
      this.$message({
        type: 'info',
        message: this.$t('message.cancel')
      })
    })
}

export const deleteGroup = function (targetItem) {
  this.$confirm(
    `此操作将永久删除章节：[${targetItem.title}], 是否继续?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    })
    .catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
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
      if (item[parentId] in map) {
        const parent = map[item[parentId]]
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  })
  return result
}

/**
 * unfinished
 * @param {*} list
 * @param {*} itemId
 */
export const removeItem = function (list, itemId) {
  const index = list.findIndex(item => {
    return item.id === itemId
  })
  console.log(index)
}
