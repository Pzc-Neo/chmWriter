export const getToolList = function () {
  return [
    {
      id: 'saveContent',
      title: 'action.save',
      icon: 'fa fa-save',
      func: () => {
        this.$bus.$emit(this.panelName + ':save-content')
      }
    },
    {
      id: 'format',
      title: 'action.format',
      icon: 'fa fa-font',
      func: () => {
        console.log('format')
      }
    },
    {
      id: 'copy',
      title: 'action.copy',
      icon: 'fa fa-files-o',
      func: () => {
        console.log('copy')
      }
    },
    {
      id: 'copyPure',
      title: 'action.copyPure',
      icon: 'fa fa-clipboard',
      func: () => {
        console.log('copy pure')
      }
    }
  ]
}
