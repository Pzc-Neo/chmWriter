import fs from 'fs'
import path from 'path'

/**
 * Get all theme
 * @param {String} themesPath The path that hava all theme.
 * @returns themeList
 */
export const getThemeList = function (themesPath) {
  // 存放主题的路径
  themesPath = themesPath || path.join(this.$appFilePath, '/themes')

  if (fs.existsSync(themesPath)) {
    const themeList = []
    try {
      const files = fs.readdirSync(themesPath)
      for (var i = 0; i < files.length; i++) {
        const theme = {
          name: files[i],
          path: path.join(themesPath, files[i], 'index.css')
        }
        themeList.push(theme)
      }
      return themeList
    } catch (error) {
      this.$alert(error)
      console.error(error)
      return []
    }
  } else {
    this.$alert("Can't get theme list, Theme folder is not exit.")
  }
}
// 设置主题
export const setTheme = function (themePath) {
  if (fs.existsSync(themePath)) {
    document.getElementById('customTheme').href = themePath
  } else {
    this.$alert('Theme is not not exist.')
  }
}
export const loadTheme = function () {
  let themePath = localStorage.getItem('themePath')
  if (themePath === null) {
    const tempThemeList = getThemeList.call(this)
    themePath = tempThemeList[0].path
  }
  setTheme.call(this, themePath)
  localStorage.setItem('themePath', themePath)
}
