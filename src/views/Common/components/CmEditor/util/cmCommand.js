import CodeMirror from 'codemirror'
// codemirro自定义命令(作用：光标所在内容滚动到编辑器中间)
CodeMirror.commands.editorScrollSelectionToCenter = function (cm) {
  if (cm.getOption('disableInput')) {
    return CodeMirror.Pass
  }
  // 获取当前光标所在位置
  const top = cm.cursorCoords(true, 'local').top
  // 获取当前编辑器高度
  const editorHeight = cm.getWrapperElement().offsetHeight
  // 获取当前行高
  const lh = cm.defaultTextHeight()
  const scrollY = Math.round(top - editorHeight / 2 + lh / 2)
  cm.scrollTo(null, scrollY)
}
// codemirro自定义命令(作用：光标所在内容滚动到编辑器顶部)
CodeMirror.commands.editorCurrentLineScrollToTop = function (cm) {
  // 获取当前光标所在位置
  const top = cm.cursorCoords(true, 'local').top
  const scrollY = Math.round(top)
  cm.scrollTo(null, scrollY)
}
