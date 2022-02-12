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
