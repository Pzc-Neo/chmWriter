export const countWords = function (content, languageMode) {
  // 匹配的值数组
  let matchWords = []
  // 中文
  if (languageMode === 0) {
    matchWords = content.match(/[\u4e00-\u9fa5]/g)
    // 英文
  } else if (languageMode === 1) {
    matchWords = content.match(/\w+/g)
    // 日文
  } else if (languageMode === 2) {
    matchWords = content.match(/[\u0800-\u4e00]/g)
  } else {
    countWords(content, 0)
  }
  if (matchWords != null) {
    return matchWords.length
  } else {
    return 0
  }
}
