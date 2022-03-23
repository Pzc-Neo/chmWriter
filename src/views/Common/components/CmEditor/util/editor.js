/**
 * 获取markdown的大纲列表
 * @param {boolean} isAddSerialNumber 是否添加序号
 * @returns {object | Array} 大纲列表
 */
export const getHeadList = function (cmEditor, isAddSerialNumber = false) {
  // const headerRegex = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
  if (cmEditor == null) {
    return
  }

  // let headNumList = [0, 0, 0, 0, 0, 0]
  // 标题列表
  const headList = []

  const headerRegex = /^#+ [\s\S]+/g
  cmEditor.eachLine(line => {
    const result = line.text.match(headerRegex)
    if (result) {
      const posLine = cmEditor.lineInfo(line).line // 链接的行号
      // const posStart = line.text.indexOf(result) // 链接的起始字符位置
      // const posEnd = posStart + result.length // 结束字符位置
      const head = {}

      // 源标题
      const sourceTitle = line.text

      // 获取标题前面的 #
      const sharpeMatchs = sourceTitle.match(/^#+ /)
      // 去除#后的空格
      const sharpe = sharpeMatchs[0].trim()
      // 几级标题
      const headType = sharpe.split('').length

      // headNumList[headType] += 1
      // let headNum = headNumList.join('.').replace('\.0','')
      // head.num = headNum

      head.title = sourceTitle.replace(/^#+ /, '')

      head.level = headType
      head.lineNumber = posLine

      headList.push(head)
    }
  })
  console.log(headList)
  return headList
}

export const getHeadNum = function (headNumList) {
  let headNum = ''
  for (let index = 0; index < headNumList.length; index++) {
    const num = headNumList[index]
    if (num !== 0) {
      headNum = headNum + '.' + num
    }
  }
  return headNum
}
/**
 * 搜索并设置当前文章的大纲
 * @param {string} searchValue 要搜索的字符串
 */
export const searchHeadList = function (searchValue) {
  const headList = this.get_head_list()

  searchValue = searchValue.split('').join('.+')

  const editorHeadList = headList.filter((head, index, array) => {
    var reg = RegExp(searchValue)
    return reg.test(head.title)
  })
  return editorHeadList
}

export const jumpToLine = function (editor, head) {
  const line = head.lineNumber
  const cm = editor
  cm.setCursor(line)
  cm.execCommand('editorCurrentLineScrollToTop')
  shiningLine(cm, line)
}

export const shiningLine = function (
  cm,
  line,
  className = 'editor_focus_line'
) {
  // 标题闪烁-start
  let count = 0
  const interval = setInterval(() => {
    if (count % 2 === 0) {
      //  为某一行添加class样式
      cm.addLineClass(line, 'text', className)
    } else {
      //  为某一行删除class样式
      cm.removeLineClass(line, 'text', className)
    }
    count++
    if (count >= 4) {
      clearInterval(interval)
      cm.removeLineClass(line, 'text', className)
    }
  }, 100)

  // 标题闪烁-end
}
