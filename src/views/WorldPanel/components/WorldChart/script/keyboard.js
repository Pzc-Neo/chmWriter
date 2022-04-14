const keymaps = [
  {
    key: 'ctrl+x',
    funcName: 'cut',
    pramas: []
  },
  {
    key: 'ctrl+c',
    funcName: 'copy',
    pramas: []
  },
  {
    key: 'ctrl+v',
    funcName: 'paste',
    pramas: []
  },
  {
    key: ['ctrl+d', 'delete'],
    funcName: 'removeCells',
    pramas: []
  },
  {
    key: 'ctrl+z',
    funcName: 'undo',
    pramas: []
  },
  {
    key: 'ctrl+shift+z',
    funcName: 'redo',
    pramas: []
  },
  {
    key: 'ctrl+1',
    funcName: 'centerContent',
    pramas: []
  }
]
export const registerKey = function (graph) {
  keymaps.forEach(key => {
    graph.bindKey(key.key, e => {
      this[key.funcName](...key.pramas)
    })
  })
}
