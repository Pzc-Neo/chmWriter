/**
 * Generate an string that can use by Vue.$db.getConfig/setConfig
 * @param {String} tableName database's table name(example: chapters)
 * @returns example: last_id_chapter
 */
export const makeLastId = function (tableName) {
  return 'last_id_' + tableName.substring(0, tableName.length - 1)
}

export const infoBoxCollapseHandler = function (newData) {
  try {
    const jsonStr = JSON.stringify(newData)
    this.$db.setConfig('info_box_collapse_' + this.panelName, jsonStr)
  } catch (e) {
    this.$alert(e)
  }
}

export const updateCursor = function (cursor, selctionLen) {
  const cursorText = `${this.$t('editor.line')} ${cursor.line + 1}, ${this.$t(
    'editor.column'
  )} ${cursor.ch + 1} `
  const selectedText = selctionLen
    ? `(${selctionLen} ${this.$t('editor.selected')})`
    : ''

  this.$store.commit('UPDATE_BOTTOM_BAR_DATA', {
    key: 'right.cursor.content',
    value: cursorText + selectedText
  })
}
