import { clipboard } from 'electron'
export const cmEditorMenuList = function () {
  return [
    {
      type: 'group',
      title: 'editor.preview',
      // isI18n: false, // If true, title will be wrapper by $t()
      menuItems: [
        {
          type: 'item',
          menuItem: {
            id: 'showPreviewBox_pureText',
            title: 'editor.pureText',
            icon: 'fa fa-file-powerpoint-o',
            disable: false,
            func: () => {
              this.showPreviewBox('pureText')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'showPreviewBox_markdown',
            title: 'Markdown',
            isI18n: false, // If true, title will be wrapper by $t()
            icon: 'fa fa-file-text-o',
            disable: false,
            func: () => {
              this.showPreviewBox('markdown')
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'hidePreviewBox',
            title: 'editor.hidePreviewBox',
            icon: 'el-icon-arrow-down',
            func: () => {
              this.hidePreviewBox()
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'toggleEditorLayout',
            title: 'editor.toggleEditorLayout',
            icon: 'fa fa-columns',
            func: () => {
              this.toggleEditorLayout()
            }
          }
        }
      ]
    },
    {
      type: 'divider',
      menuItem: {}
    },
    {
      type: 'toggle',
      menuItem: {
        id: 'toggleOutlineBox',
        title: 'editor.toggleOutlineBox',
        icon: 'fa fa-list-alt',
        isOn: this.isShowOutlineBox,
        hideOnClick: false,
        func: (targetItem, menuItem) => {
          this.toggleOutlineBox()
          menuItem.isOn = !menuItem.isOn
        }
      }
    },
    {
      type: 'divider',
      menuItem: {}
    },
    {
      type: 'group',
      title: 'editor.text',
      menuItems: [
        {
          type: 'item',
          menuItem: {
            id: 'cut',
            title: 'editor.cut',
            icon: 'fa fa-cut',
            func: () => {
              const editor = this.cmEditor
              let selectedText = editor.getSelection()
              // If nothing select, cut hold line
              if (selectedText === '') {
                const cursor = editor.getCursor()
                selectedText = editor.getLine(cursor.line)
                this.selectLine(cursor.line)
              }
              clipboard.writeText(selectedText)
              editor.replaceSelection('')
              this.$message(
                `${this.$t('editor.cut')} ${this.$t('result.success')}`
              )
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'copy',
            title: 'editor.copy',
            icon: 'fa fa-copy',
            func: () => {
              const editor = this.cmEditor
              let selectedText = editor.getSelection()
              // If nothing select, copy hold line
              if (selectedText === '') {
                const cursor = editor.getCursor()
                selectedText = editor.getLine(cursor.line)
              }
              clipboard.writeText(selectedText)
              this.$message(
                `${this.$t('editor.copy')} ${this.$t('result.success')}`
              )
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'paste',
            title: 'editor.paste',
            icon: 'fa fa-paste',
            func: () => {
              const text = clipboard.readText()
              this.cmEditor.replaceSelection(text)
              this.$message(
                `${this.$t('editor.paste')} ${this.$t('result.success')}`
              )
            }
          }
        },
        {
          type: 'item',
          menuItem: {
            id: 'selectAll',
            title: 'editor.selectAll',
            icon: 'fa fa-file-text',
            func: () => {
              this.cmEditor.execCommand('selectAll')
            }
          }
        }
      ]
    }
  ]
}
