import { tableChapter } from './tables'
export const createDb = function (db) {
  db.createTable(tableChapter)
}
