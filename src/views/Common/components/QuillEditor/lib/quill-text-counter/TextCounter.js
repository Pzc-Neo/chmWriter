export class Counter {
  constructor(quill, options) {
    this.quill = quill
    this.options = options
    if (typeof options.container === 'object') {
      if (options.container instanceof HTMLElement) {
        this.container = options.container
      } else {
        alert('container is illegal')
        console.error('container is illegal')
      }
    } else {
      this.container = document.querySelector(options.container)
    }
    quill.on('text-change', this.update.bind(this))
    this.update() // Account for initial contents
  }

  calculate() {
    let text = this.quill.getText()
    if (this.options.unit === 'Chiness') {
      text = text.trim()
      // Splitting empty text returns a non-empty array
      const count = this.countChiness(text)
      // return text.length > 0 ? text.split(/\s+/).length : 0;
      return count
    } else {
      return text.length
    }
  }

  update() {
    var length = this.calculate()
    var label = '字'
    if (this.options.unit === 'Chiness') {
      label = '字'
    }
    this.container.innerText = length + ' ' + label
  }

  countChiness(text) {
    const pattern = /[\u4e00-\u9fa5]/g
    const words = text.match(pattern)
    let count = 0
    if (words === null) {
      return count
    }
    count = words.length
    return count
  }

  countWord(allContent, languageMode = 0) {
    let wordsCount = 0
    // 匹配的值数组
    let matchWords = []
    // 中文
    if (languageMode === 0) {
      matchWords = allContent.match(/[\u4e00-\u9fa5]/g)
      if (matchWords != null) {
        wordsCount = matchWords.length
      }
    } else if (languageMode === 1) {
      // 英文
      matchWords = allContent.match(/\w+/g)
      if (matchWords != null) {
        wordsCount = matchWords.length
      }
    } else if (languageMode === 2) {
      // 日文
      matchWords = allContent.match(/[\u0800-\u4e00]/g)
      if (matchWords != null) {
        wordsCount = matchWords.length
      }
    } else {
      alert('Language mode not support!')
    }
    return wordsCount
  }
}
