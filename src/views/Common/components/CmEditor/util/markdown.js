import { loadJsonFile } from '@/util/file'
/**
 * Remove note. will remove sign and content.
 * example: # header1 => will remove hold line.
 * @param {String} md markdown format text
 * @returns
 */
export const removeNote = function (md) {
  const patterns = loadJsonFile.call(this, 'editor/pattern/note.json')
  for (let i = 0; i < patterns.length; i++) {
    const note = patterns[i]
    if (note.is_use) {
      const pattern = new RegExp(note.pattern, note.modifiers)
      md = md.replace(pattern, '')
    }
  }
  return md
}
/**
 * Remove sign, keep content.
 * example: `some content` => some content.
 * the ` sign will be remove.
 * Which sign whil be remove is depend on the sign.json file.
 * @param {String} md markdown format text
 * @returns
 */
export const removeSign = function (md) {
  const patterns = loadJsonFile.call(this, 'editor/pattern/sign.json')

  for (let i = 0; i < patterns.length; i++) {
    const note = patterns[i]
    if (note.is_use) {
      const pattern = new RegExp(note.pattern, note.modifiers)
      md = md.replace(pattern, note.result)
    }
  }
  return md
}
