export const newChapter = function (db) {
  const tableName = 'chapters'
  const fields = `(
      id TEXT PRIMARY KEY
              NOT NULL
              UNIQUE ,
      title TEXT,
      content TEXT,
      group_id TEXT,
      created INTEGER,
      updated INTEGER,
      words INTEGER
      target_words INTEGER
      status INTEGER
      is_export INTEGER
      language INTEGER
      note_content TEXT,
      foreshadowing TEXT,
      )`
  const SQLquery = `CREATE TABLE IF NOT EXISTS  ${tableName} ${fields}`
  console.log(SQLquery)
  const createTable = db.prepare(SQLquery)
  createTable.run()
}
