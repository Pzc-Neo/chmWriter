import { clipboard } from 'electron'
export const QuillEditorMenuList = function () {
  return [
    {
      id: 'cut',
      title: 'editor.cut',
      icon: 'fa fa-cut',
      func: () => {
        const editor = this.quillEditor
        editor.focus()
        const range = editor.getSelection()
        const selectedText = editor.getText(range)
        // // If nothing select, cut hold line
        // if (selectedText === '') {
        //   const cursor = editor.getCursor()
        //   selectedText = editor.getLine(cursor.line)
        //   this.selectLine(cursor.line)
        // }
        clipboard.writeText(selectedText)
        editor.deleteText(range)
        // editor.replaceSelection('')
        this.$message(`${this.$t('editor.cut')} ${this.$t('result.success')}`)
      }
    },

    {
      id: 'copy',
      title: 'editor.copy',
      icon: 'fa fa-copy',
      func: () => {
        const editor = this.quillEditor
        editor.focus()
        const range = editor.getSelection()
        const selectedText = editor.getText(range)
        // // If nothing select, cut hold line
        // if (selectedText === '') {
        //   const cursor = editor.getCursor()
        //   selectedText = editor.getLine(cursor.line)
        //   this.selectLine(cursor.line)
        // }
        clipboard.writeText(selectedText)
        // editor.replaceSelection('')
        this.$message(`${this.$t('editor.copy')} ${this.$t('result.success')}`)
      }
    },
    {
      id: 'paste',
      title: 'editor.paste',
      icon: 'fa fa-paste',
      func: () => {
        const text = clipboard.readText()
        this.codemirror.replaceSelection(text)
        this.$message(`${this.$t('editor.paste')} ${this.$t('result.success')}`)
      }
    },
    {
      id: 'selectAll',
      title: 'editor.selectAll',
      icon: 'fa fa-file-text',
      func: () => {
        const editor = this.quillEditor
        const text = editor.getText()
        editor.setSelection(0, text.length)
      }
    }
  ]
}
