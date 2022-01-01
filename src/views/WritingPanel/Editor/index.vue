<template>
  <!-- Two-way Data-Binding -->
  <!-- <codemirror v-model="code" :options="cmOptions" /> -->

  <!-- Or manually control the data synchronization -->
  <codemirror
    class="editor"
    ref="cmEditor"
    :value="item.content"
    :options="cmOptions"
    @ready="onCmReady"
    @focus="onCmFocus"
    @input="onCmCodeChange"
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

// vim mode
import 'codemirror/keymap/vim'

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

export default {
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  components: {
    codemirror
  },
  data () {
    return {
      code: 'const a = 10',
      cmOptions: {
        tabSize: 4,
        mode: 'markdown',
        theme: 'base16-light',
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        continueComments: 'Enter',
        keyMap: 'vim',
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
          //       cw.view.style_editor_content.transform = 'translateX(-50%)'
          //       cw.view.style_editor_content.zIndex = 1
          //     } else {
          //       cw.view.style_editor_content.transform = ''
          //       cw.view.style_editor_content.zIndex = 100
          //     }
          //     cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          //   },

          // 如果当前行是列表，那么按enter的时候，下一行也会是列表，而且类型会和上一行一样(数字会自增)。
          Enter: 'newlineAndIndentContinueMarkdownList',

          //  toggle注释
          // 'Cmd-.': 'toggleComment',
          'Ctrl-/': 'toggleComment',

          'Ctrl-E': function (cm) {
            cm.foldCode(cm.getCursor())
          }
        }
      }
    }
  },
  methods: {
    onCmReady (cm) {},
    onCmFocus (cm) {},
    onCmCodeChange (newCode) {
      this.code = newCode
    }
  },
  computed: {
    codemirror () {
      return this.$refs.cmEditor.codemirror
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
  /deep/.vue-codemirror {
    height: 100%;
  }
  /deep/ .CodeMirror {
    height: 100%;
  }
}
</style>
