import Vue from 'vue'
import Database from 'better-sqlite3'

/**
 * connect sqlite3 database
 * @param {String} dbPath database's path
 * @param {Object} option database's option
 * @returns database reference
 */
export const dbConnect = function (dbPath, option) {
  if (dbPath === undefined) {
    dbPath = 'D:\\data\\default_datebase.db'
  }
  option = option || {
    verbose: console.log
  }
  const db = new Database(dbPath, option)
  Vue.prototype.$db = db
}

/**
 * Update column
 * @param {String} tableName table's name
 * @param {String} column The column which you want to update
 * @param {String} value The value that you want to update to
 * @param {String} id column's id
 */
export const dbUpdate = function (tableName, column, value, id) {
  var updateQuery = `UPDATE ${tableName} SET ${column} = ?  WHERE id = ? `
  this.$db.prepare(updateQuery).run([value, id])
}

export const dbDeleteItem = function (param) {}

export const dbUpdateGroupSorts = function (tableName, paramData) {
  var updateQuery = `UPDATE ${tableName} SET sort = ?, pid = ?  WHERE id = ? `
  const stmt = this.$db.prepare(updateQuery)
  for (let index = 0; index < paramData.length; index++) {
    const { sort, pid, targetId } = paramData[index]
    stmt.run([sort, pid, targetId])
  }
}

export const dbChangeToGroup = function (tableName, groupId) {
  const stmt = this.$db.prepare(`SELECT * FROM  ${tableName} WHERE group_id=?`)
  return stmt.all([groupId])
}
