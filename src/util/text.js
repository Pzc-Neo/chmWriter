/**
 * Count words
 * @param {String} content text content
 * @param {Number} languageMode 0: Chiness, 1: English, 2: Japanese
 * @returns
 */
export const countWords = function (content, languageMode = 0) {
  // 匹配的值数组
  let matchWords = []
  switch (languageMode) {
    // 中文
    case 0:
      matchWords = content?.match(/[\u4e00-\u9fa5]/g) || []
      break
    // 英文
    case 1:
      matchWords = content?.match(/\w+/g) || []
      break
    // 日文
    case 2:
      matchWords = content?.match(/[\u0800-\u4e00]/g) || []
      break
  }
  if (matchWords != null) {
    return matchWords.length
  } else {
    return 0
  }
}
