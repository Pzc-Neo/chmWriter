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

export const beforeRouteEnter = function (to, from, next) {
  next(_this => {
    _this.$store.commit('SET_PANEL_TOOL_LIST', _this.toolList)
    _this.$store.commit('SET_BOTTOM_BAR_DATA', _this.bottomBarData)
    _this.$store.commit('SET_HISTORY_LIST', _this.historyItemList)
  })
}

export const setHistoryList = function () {
  const historyItemStr = this.$db.getConfig(this.historyColumnName)
  if (historyItemStr !== undefined) {
    try {
      const historyItemList = JSON.parse(historyItemStr)
      this.historyItemList = historyItemList
      this.$store.commit('SET_HISTORY_LIST', historyItemList)
    } catch (error) {
      this.$alert(error)
      this.$db.setConfig(this.historyColumnName)
    }
  }
}
export const addToHistoryList = function (item) {
  const historyItem = {
    id: item.id,
    title: item.title,
    openTime: Date.now()
  }
  // 查询是否已在列表中
  const index = this.historyItemList.findIndex(_historyItem => {
    return _historyItem.id === historyItem.id
  })
  // 如果在就删除
  if (index !== -1) {
    this.historyItemList.splice(index, 1)
  }
  // 添加到列表
  this.historyItemList.unshift(historyItem)

  // 超过10的时候，删除最先添加的那个
  if (this.historyItemList.length > 10) {
    this.historyItemList.pop()
  }
  this.$store.commit('SET_HISTORY_LIST', this.historyItemList)
  const historyItemListStr = JSON.stringify(this.historyItemList)
  this.$db.setConfig(this.historyColumnName, historyItemListStr)
}
