<template>
  <div class="cm_editor_container" :style="styleEditorContainer">
    <!-- Two-way Data-Binding -->
    <!-- <codemirror v-model="content" :options="cmOptions" /> -->

    <!-- Or manually control the data synchronization -->
    <codemirror
      class="cm_editor"
      ref="cmEditor"
      :style="styleEditorContent"
      :value="item.content"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @changes="onCmChange"
      @input="
        newContent => {
          onCmInput(newContent, item)
        }
      "
      @beforeSelectionChange="onCmbeforeSelectionChange"
      @keyHandled="onKeyHandled"
      @contextmenu.native="showContextmenu"
    />
    <PreviewBox
      ref="previewBox"
      v-if="isShowPreviewBox"
      :class="[classPreviewBox]"
      :previewType.sync="previewType"
      :content="item.content"
      @hide="hidePreviewBox"
    />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import './util/cmCommand'

// import base style
import 'codemirror/lib/codemirror.css'
// import language js
import 'codemirror/mode/markdown/markdown'
// import theme style
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/mdn-like.css'
import 'codemirror/theme/eclipse.css'
// vim mode
/**
 * Changed:
 *  1.Add some code to `charIdxInLine` function,
 *    let vim's `f` commmand suport Chiness.
 *    such as 城(cheng)：c; 墨(mo)：m.
 *    use `fc` jump to 城.
 *    use `fm` jump to 墨.
 *  2.Delete some shortcutkey that conflct with chmWriter.
 *  Note: If you don't need those changed. Please import the original vim.js.
 *  By Pzc_Neo
 */
import './keyMap/vim.js'
// import 'codemirror/keymap/vim'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
// fold
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'
// import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/markdown-fold'
// others
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/continuelist'

import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'

import 'codemirror/addon/edit/trailingspace'
// Need to set the shortcutkey on opttion->extraKeys to toggle comment
import 'codemirror/addon/comment/comment'
// Hightlight active line
import 'codemirror/addon/selection/active-line'

// Autorefresh can solve the content hidden problem
import 'codemirror/addon/display/autorefresh'

import { countWords } from '@/util/text'
import { debounce } from '@/util/base'
import { cmEditorMenuList } from './menuList'
import PreviewBox from './PreviewBox'

export default {
  name: 'CmEditor',
  props: {
    item: {
      type: Object,
      require: true
    },
    isCountWord: {
      type: Boolean,
      default: true
    }
  },
  components: {
    codemirror,
    PreviewBox
  },
  data() {
    return {
      isChanged: false,
      isShowPreviewBox: false,
      previewType: 'pureText',
      styleEditorContainer: {
        flexDirection: 'row'
      },
      menuList: cmEditorMenuList.call(this),
      cmOptions: {
        tabSize: 4,
        mode: 'markdown',
        // theme: 'base16-light',
        theme: 'eclipse',
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        continueComments: 'Enter',
        keyMap: 'vim',
        autofocus: true,
        // highlightFormatting: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        matchBrackets: true,
        matchTags: true,
        // placeholder: '',
        highlightSelectionMatches: {
          showToken: /\w/,
          annotateScrollbar: true
        },
        styleActiveLine: true,
        // need to customize it style，class name is：cm-trailingspace
        showTrailingSpace: true,
        autoRefresh: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        extraKeys: {
          // "Ctrl-/": "toggleComment",

          // Insert two space when press Tab
          Tab: function (cm) {
            const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
            cm.replaceSelection(spaces)
          },
          // Toggle Fullscreen
          //   F11: function (cm) {
          //     if (cm.getOption('fullScreen')) {
          //       cw.view.styleEditorContent.transform = 'translateX(-50%)'
          //       cw.view.styleEditorContent.zIndex = 1
          //     } else {
          //       cw.view.styleEditorContent.transform = ''
          //       cw.view.styleEditorContent.zIndex = 100
          //     }
          //     cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          //   },

          // 如果当前行是列表，那么按enter的时候，下一行也会是列表，而且类型会和上一行一样(数字会自增)。
          Enter: 'newlineAndIndentContinueMarkdownList',

          //  toggle注释
          'Ctrl-/': 'toggleComment',
          'Ctrl-E': function (cm) {
            cm.foldCode(cm.getCursor())
          },
          'Ctrl-S': (cm, a, b) => {
            this.$emit('update:content', cm.getValue(), this.item.id)
            // cm.foldCode(cm.getCursor())
          },
          'Ctrl-W': cm => {
            this.$emit('close')
          },
          'Ctrl-Tab': cm => {
            this.$emit('switch:tab')
          },
          'Shift-Ctrl-Tab': cm => {
            this.$emit('switch:tab', false)
          },
          'Ctrl-P': cm => {
            this.$store.commit('SHOW_COMMANDBOX', 'search')
          },
          'Shift-Ctrl-P': cm => {
            this.$store.commit('SHOW_COMMANDBOX', 'command')
          }
        }
      },
      styleEditorContent: {
        letterSpacing: '0.3px',
        fontSize: '15px',
        lineHeight: '24px',
        textAlign: 'left'
      }
    }
  },
  methods: {
    onCmReady(cm) {},
    onCmFocus(cm) {},
    wordCounter: debounce(countWords, 1000, function (words) {
      this.$emit('countWord', words)
    }),
    onCmChange(cm, changes) {
      console.log(changes)
      this.updateByTypewriterMode(cm, changes)
    },
    onCmInput(newContent, item) {
      if (this.isCountWord) {
        this.wordCounter(newContent, item.language)
      }
      this.$emit('change', item, newContent)
    },
    onCmbeforeSelectionChange(cm, a) {},
    onKeyHandled(cm, name, event) {
      // console.log(cm, name, event)
    },
    showContextmenu(event) {
      const param = {
        event,
        targetItem: this.codemirror,
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    /**
     * Select hold line
     */
    selectLine(line) {
      const editor = this.codemirror
      if (line === undefined) {
        line = editor.getCursor().line
      }
      const selectedText = editor.getLine(line)
      // selection start
      const head = {
        line,
        ch: 0
      }
      // selction end
      const anchor = {
        line,
        ch: selectedText.length
      }
      // 设置选区
      editor.setSelection(anchor, head)
    },
    showPreviewBox(previewType = 'pureText') {
      this.isShowPreviewBox = true
      this.previewType = previewType
    },
    hidePreviewBox() {
      this.isShowPreviewBox = !this.isShowPreviewBox
    },
    toggleEditorLayout() {
      if (this.styleEditorContainer.flexDirection === 'row') {
        this.styleEditorContainer.flexDirection = 'column'
      } else {
        this.styleEditorContainer.flexDirection = 'row'
      }
    },
    // 按照打字机模式更新视图
    updateByTypewriterMode: function (cm, changes) {
      if (cm.getSelection().length !== 0) {
        return
      }
      const scrollOrigins = ['+input', '+delete', '*compose', 'paste']
      for (let i = 0, len = changes.length; i < len; i++) {
        const each = changes[i]
        const origin = each.origin
        if (scrollOrigins.includes(origin)) {
          cm.execCommand('editorScrollSelectionToCenter')
          return
        }
      }
    }
  },
  mounted() {
    this.wordCounter(this.item.content, this.item.language)
    // vim的输入模式改变的时候，切换输入法(这个方法特卡, 而且时不时失灵)
    /*
    CodeMirror.on(this.codemirror, 'vim-mode-change', function ({ mode }) {
      function changeIm(imId) {
        const child = require('child_process')
        child.exec(
          `C:\\im-select\\im-select.exe ${imId}`,
          (err, stdout, stderr) => {
            if (err) {
              alert(err)
            } else {
              console.log('change im sussces', stdout, stderr)
            }
          }
        )
      }
      if (mode === 'insert') {
        changeIm(2052)
      } else {
        changeIm(1033)
      }
    })
    */
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    },
    classPreviewBox() {
      if (this.styleEditorContainer.flexDirection === 'column') {
        return 'border_top'
      } else {
        return 'border_left'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cm_editor_container {
  display: flex;
  overflow: hidden;
  width: 100%;
  .cm_editor {
    flex: 1;
    // display: flex;
    // flex-direction: column;
    min-height: 10px;
    min-width: 30px;
    // border-right: 1px solid #e6e6e6;
    /deep/.vue-codemirror {
      height: 100%;
    }
    /deep/ .CodeMirror.cm-s-eclipse {
      height: 100%;
      // font-family: 'Microsoft YaHei';
      font-family: 'none';
      color: #383838;
      /* h1-h6 */
      span.cm-header-1 {
        font-size: 1.8em;
      }

      span.cm-header-2 {
        font-size: 1.7em;
      }

      span.cm-header-3 {
        font-size: 1.6em;
      }

      span.cm-header-4 {
        font-size: 1.5em;
      }

      span.cm-header-5 {
        font-size: 1.4em;
      }

      span.cm-header-6 {
        font-size: 1.3em;
      }
      /* 打字机模式，底下留白50% */
      .CodeMirror-lines {
        padding-bottom: 50%;
      }
    }
  }
}
</style>
