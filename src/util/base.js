import { dbUpdate } from '@/db'

/**
 * Rename an item.
 * @param {String} tableName The Table's name of database which you want to modify
 * @param {Object} targetItem The item that you want to rename
 */
export const rename = function (tableName, targetItem) {
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
        dbUpdate.call(this, tableName, 'title', targetItem.title, targetItem.id)
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
