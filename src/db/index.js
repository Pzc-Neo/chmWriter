// import Vue from 'vue'
import Database from 'better-sqlite3'
import { tableChapter } from './module/tables'
class Db {
  constructor(dbPath, option) {
    this.db = this.connect(dbPath, option)
    this.dbPath = dbPath
  }

  /**
   * connect sqlite3 database
   * @param {String} dbPath database's path
   * @param {Object} option database's option
   * @returns database reference
   */
  connect(dbPath, option) {
    dbPath = dbPath || 'D:\\data\\default_datebase.db'
    this.dbPath = dbPath
    option =
      option ||
      {
        // verbose: console.log
      }
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
    return stmt.all([property])[0]
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
}
export default Db
