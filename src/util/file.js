import fs from 'fs'
import path from 'path'
/**
 * read json file and convert to js object
 * @param {Boolean} isRelative use relative path. relative to this.$appFilePath
 * @param {String} filePath target json file path
 * @returns
 */
export const loadJsonFile = function (filePath, isRelative = true) {
  if (isRelative) {
    filePath = path.join(this.$appFilePath, filePath)
  }
  if (fs.existsSync(filePath)) {
    const jsonStr = fs.readFileSync(filePath).toString()
    try {
      const obj = JSON.parse(jsonStr)
      return obj
    } catch (err) {
      this.$alert('Parse json fail. detail:\n' + err)
      return {}
    }
  } else {
    this.$alert('File not exist. path: ' + filePath)
    return {}
  }
}
