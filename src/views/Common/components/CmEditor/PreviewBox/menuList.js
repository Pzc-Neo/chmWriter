export const previewBoxMenuList = function () {
  return [
    {
      id: 'hidePreviewBox',
      title: 'editor.hidePreviewBox',
      icon: 'el-icon-arrow-left',
      func: () => {
        this.hidePreviewBox()
      }
    },
    {
      id: 'showPreviewBox_markdown',
      title: 'editor.previewMarkdown',
      icon: 'fa fa-file-text-o',
      func: () => {
        this.$emit('update:previewType', 'markdown')
      }
    },
    {
      id: 'showPreviewBox_pureText',
      title: 'editor.previewPureText',
      icon: 'fa fa-file-powerpoint-o',
      func: () => {
        this.$emit('update:previewType', 'pureText')
      }
    }
  ]
}
