export const getToolList = function () {
  return [
    {
      id: 'saveContent',
      title: 'action.save',
      icon: 'fa fa-save',
      func: () => {
        console.log(this)
        this.saveContent()
      }
    }
  ]
}
