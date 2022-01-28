<template>
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
    @input="
      newContent => {
        onCmCodeChange(newContent, item)
      }
    "
    @keyHandled="onKeyHandled"
  />
</template>

<script>
import { codemirror } from 'vue-codemirror'
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
    codemirror
  },
  data() {
    return {
      isChanged: false,
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
        letterSpacing: '-1px',
        fontSize: '15px',
        lineHeight: '24px',
        textAlign: 'justify'
      }
    }
  },
  methods: {
    onCmReady(cm) {},
    onCmFocus(cm) {},
    wordCounter: debounce(countWords, 1000, function (words) {
      this.$emit('countWord', words)
    }),
    onCmCodeChange(newContent, item) {
      if (this.isCountWord) {
        this.wordCounter(newContent, item.language)
      }
      this.$emit('change', item, newContent)
    },
    onKeyHandled(cm, name, event) {
      // console.log(cm, name, event)
    }
  },
  mounted() {
    this.wordCounter(this.item.content, this.item.language)
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  }
}
</script>

<style lang="scss" scoped>
.cm_editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #e6e6e6;
  /deep/.vue-codemirror {
    height: 100%;
  }
  /deep/ .CodeMirror {
    height: 100%;
  }
}
</style>
