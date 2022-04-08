module.exports = keyMirror({
  TOGGLE_AUTO_OPEN_OUTLINE_BOX: null,
  TOGGLE_AUTO_OPEN_PREVIEW_BOX: null,
  TOGGLE_SHOW_OUTLINE_BOX_ON_LEFT: null
})

/**
 * @param {Object} obj  {key1: null, key2: null}
 * @returns {Object} {key1: key1, key2: key2}
 */
function keyMirror(obj) {
  const _obj = {}
  if (obj instanceof Object) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        _obj[key] = key
      }
    }
    return _obj
  }
}
