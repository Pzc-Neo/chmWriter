export const getGraphOption = function () {
  return {
    container: this.$refs.container,
    width: '100%',
    height: '100%',
    // grid: true, // 网格
    snapline: {
      enabled: true,
      sharp: true
    },
    resizing: {
      enabled: true
    },
    rotating: {
      enabled: true
      // grid: 15 // 角度
    },
    selecting: {
      enabled: true,
      // showNodeSelectionBox: true,
      rubberband: true, // 启用框选
      modifiers: 'shift'
    },
    scroller: {
      enabled: true,
      pageVisible: false,
      pageBreak: true,
      className: 'chart_scroller',
      // modifiers: 'shift',
      pannable: {
        enabled: true,
        eventTypes: ['leftMouseDown']
      }
    },
    clipboard: {
      enabled: true,
      useLocalStorage: true
    },
    history: {
      enabled: true
    },
    keyboard: {
      enabled: true
      // global: true
    },
    minimap: {
      enabled: true,
      width: 200,
      height: 180,
      container: this.$refs.minimapContainer
    },
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta']
    }
  }
}
