export const getToolList = function () {
  return [
    {
      id: 'renderAll',
      title: 'action.renderAll',
      icon: 'fa fa-cubes',
      func: () => {
        this.renderAll()
      }
    },
    {
      id: 'copy',
      title: 'action.copy',
      icon: 'fa fa-files-o',
      func: () => {
        console.log('copy')
      }
    }
  ]
}
