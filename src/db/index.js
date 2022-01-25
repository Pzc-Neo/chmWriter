// import Vue from 'vue'
import Database from 'better-sqlite3'
import { tableChapter } from './module/tables'
import fs from 'fs'
class Db {
  constructor(dbPath, option) {
    this.dbPath = dbPath
    this.defaultDbPath = 'D:\\data\\default_datebase.db'
    this.defaultOption = {
      // verbose: console.log
    }
    this.db = this.connect(dbPath, option)
  }

  /**
   * connect sqlite3 database
   * @param {String} dbPath database's path
   * @param {Object} option database's option
   * @returns database reference
   */
  connect(dbPath, option) {
    const isExist = fs.existsSync(dbPath)
    if (!isExist) {
      dbPath = this.defaultDbPath
    }

    this.dbPath = dbPath
    option = option || this.defaultOption
    const db = new Database(dbPath, option)
    return db
  }

  createDb() {
    this.createTable(tableChapter)
  }

  createTable(tableInfo) {
    const { tableName, fields } = tableInfo
    console.log(tableName, fields)
    const query = `CREATE TABLE IF NOT EXISTS  ${tableName} ${fields}`
    console.log(query)
    const createTable = this.db.prepare(query)
    createTable.run()
  }

  /**
   * Update column
   * @param {String} tableName table's name
   * @param {String} column The column which you want to update
   * @param {String} value The value that you want to update to
   * @param {String} id column's id
   */
  update(tableName, column, value, id) {
    const date = Date.now()
    const query = `UPDATE ${tableName} SET ${column} = ? , updated= ${date}  WHERE id = ? `
    this.db.prepare(query).run([value, id])
  }

  getConfig(property) {
    const query = 'SELECT * FROM configs WHERE property=?'
    const stmt = this.db.prepare(query)
    return stmt.all([property])[0]?.value
  }

  setConfig(property, value) {
    const query = 'UPDATE configs SET value = ? WHERE property = ?'
    const stmt = this.db.prepare(query)
    stmt.run([value, property])
  }

  getGroups(tableName, isOrder = true) {
    const query = `SELECT * FROM ${tableName} 
    ${isOrder ? 'order by sort ASC' : ''}`
    const stmt = this.db.prepare(query)
    return stmt.all()
  }

  getGroup(tableName, groupId) {
    const query = `SELECT * FROM ${tableName} WHERE id=?`
    const stmt = this.db.prepare(query)
    return stmt.all([groupId])[0]
  }

  getItems(tableName, groupId) {
    const query = `SELECT * FROM ${tableName} WHERE group_id=? order by sort ASC`
    const stmt = this.db.prepare(query)
    return stmt.all([groupId])
  }

  getItem(tableName, itemId) {
    const query = `SELECT * FROM ${tableName} WHERE id=?`
    const stmt = this.db.prepare(query)
    return stmt.all([itemId])[0]
  }

  /**
   * Get items that doesn't belong to anygroup
   * @param {String} groupTableName
   * @param {String} itemTableName
   * @returns
   */
  getItemsNoGroup(groupTableName, itemTableName) {
    const query = `SELECT * FROM ${itemTableName} WHERE group_id NOT IN (SELECT id FROM ${groupTableName})`
    const stmt = this.db.prepare(query)
    return stmt.all()
  }

  setItemsGroupIdToDefault(groupTableName, itemTableName) {
    const itemList = this.getItemsNoGroup(groupTableName, itemTableName)

    const date = Date.now()
    const query = `UPDATE ${itemTableName} SET group_id = ?, updated = ?  WHERE id = ? `
    const stmt = this.db.prepare(query)

    itemList.forEach(item => {
      stmt.run(['default', date, item.id])
    })
  }

  deleteById(tableName, itemId) {
    const query = `DELETE FROM ${tableName} where id=?`
    this.db.prepare(query).run([itemId])
  }

  updateGroupSorts(tableName, paramData) {
    const query = `UPDATE ${tableName} SET sort = ?, pid = ?  WHERE id = ? `
    const stmt = this.db.prepare(query)
    for (let index = 0; index < paramData.length; index++) {
      const { sort, pid, targetId } = paramData[index]
      stmt.run([sort, pid, targetId])
    }
  }

  updateItemSorts(tableName, paramData) {
    const query = `UPDATE ${tableName} SET sort = ? WHERE id = ? `
    const stmt = this.db.prepare(query)
    for (let index = 0; index < paramData.length; index++) {
      const { sort, targetId } = paramData[index]
      stmt.run([sort, targetId])
    }
  }

  changeToGroup(tableName, groupId) {
    const stmt = this.db.prepare(
      `SELECT * FROM  ${tableName} WHERE group_id=? ORDER BY sort ASC`
    )
    return stmt.all([groupId])
  }

  /**
   * Insert a column to database
   * @param {Object} item An object that generate by itemFactory
   */
  insert(item) {
    const { query, values } = this.generateQuery(item)
    this.db.prepare(query).run(values)
  }

  /**
   * Convert obj to query string (for `insert` method)
   * @param {Object} obj Data format is like: {tableName:'chapters', data:{id:'001'} }
   * @returns {Object} {query:"INSERT INTO chapters(id)", VALUES:['001']}
   */
  generateQuery(obj) {
    const keys = []
    const values = []
    const emptys = []
    for (const key in obj.data) {
      keys.push(key)
      values.push(obj.data[key])
      emptys.push('?')
    }
    let query = ''
    query += `INSERT INTO ${obj.tableName}(${keys.join(',')})`
    query += `VALUES(${emptys.join(',')})`
    const temp = {
      query,
      values
    }
    return temp
  }

  reorganizeSort(itemList) {
    const list = []
    list.unshift(itemList)

    while (list.length > 0) {
      const tempList = list.pop()
      tempList.forEach((item, index) => {
        console.log(index, item.sort)
        if (item.children) {
          list.push(item.children)
        }
      })
      console.log('---------------------')
    }
  }
}
export default Db
