export const getBottomBarData = function () {
  return {
    isShowDefault: {
      left: true,
      middle: true,
      right: false
    },
    left: {},
    middle: {},
    right: {
      cursor: {
        content: 'Ln 1, Col 1',
        hint: 'Go to line',
        func() {},
        update() {}
      }
    }
  }
}
