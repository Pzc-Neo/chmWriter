import Vue from 'vue'

Vue.prototype.$changePanel = function (panelPath) {
  if (panelPath === '/' + this.$store.currentPanel) return

  this.$router.push(panelPath)
  this.$store.commit(
    'CHANGE_CURRENT_PANEL',
    panelPath.substring(1, panelPath.length)
  )
}
/**
 * Format time
 * @param {Number|String} timestamp timestamp or string which can parse by `new Date()`
 * @returns Time format like: 2022-01-23 01:11:49
 */
Vue.prototype.$formatTime = function (timestamp) {
  if (timestamp === undefined) {
    return ''
  }
  const zeroize = function (num) {
    return (num < 10 ? '0' : '') + num
  }
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = zeroize(date.getMonth() + 1)
  const day = zeroize(date.getDate())
  const hour = zeroize(date.getHours())
  const minute = zeroize(date.getMinutes())
  const second = zeroize(date.getSeconds())
  const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return result
}
