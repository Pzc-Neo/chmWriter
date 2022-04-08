export const getBottomBarData = function () {
  return {
    isShowDefault: {
      left: false,
      middle: true,
      right: false
    },
    left: {
      item1: {
        content: 'Test1',
        hint: 'Go to line',
        func: () => {
          console.log('Test')
        }
      },
      item2: {
        content: 'Test2',
        hint: 'Go to line',
        func: () => {
          console.log('Test')
        }
      }
    },
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
