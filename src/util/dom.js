export const scrollToView = function (selector, delay = 50, className) {
  // 不延时的话，切换分组之后，可能不会定位到目标章节
  setTimeout(() => {
    const dom = document.querySelector(selector)
    if (dom === null) return

    dom.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    })
    if (className !== undefined) {
      dom.classList.add(className)
      setTimeout(() => {
        dom.classList.remove(className)
      }, 500)
    }
  }, delay)
}
