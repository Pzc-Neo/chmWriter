<template>
  <div class="quill_editor_container" :style="{ height: editorHeight }">
    <div
      ref="quill_editor_toolbar"
      class="quill_editor_toolbar"
      v-show="isShowToolBar"
    >
      <button class="" @click="isShowMoreTool = !isShowMoreTool">
        <!-- {{ isShowMoreTool ? '《' : '》' }} -->
        <i :class="'el-icon-arrow-' + (isShowMoreTool ? 'left' : 'right')"></i>
      </button>
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>

      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>

      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>

      <select class="ql-color"></select>
      <select class="ql-background"></select>

      <select class="ql-align">
        <option value=""></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>

      <button class="ql-blockquote"></button>
      <button class="ql-clean"></button>

      <select class="ql-font">
        <option value="Microsoft-YaHei" selected></option>
        <option value="SimSun"></option>
        <option value="SimHei"></option>
        <option value="KaiTi"></option>
        <option value="FangSong"></option>
        <option value="Arial"></option>
        <option value="Times-New-Roman"></option>
        <option value="sans-serif"></option>
      </select>

      <button class="ql-indent" value="+1"></button>
      <button class="ql-indent" value="-1"></button>

      <button class="ql-strike"></button>

      <div v-show="isShowMoreTool">
        <!-- Add font size dropdown -->
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>

        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-video"></button>
        <button class="ql-code-block"></button>
        <button class="ql-formula"></button>

        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
        <!-- <button class="" style="width: 3em">测试</button> -->
      </div>
    </div>
    <div
      ref="quill_editor"
      class="quill_editor"
      style="flex: 1; overflow: hidden"
      spellcheck="false"
    ></div>
    <div v-show="isSHowBottomBar" class="bottom">
      <div class="left">
        <!-- {{ current_data.name }} -->
      </div>
      <div ref="counter" class="right"></div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import { Counter } from './lib/quill-text-counter/TextCounter'
import { QuillEditorMenuList } from './menuList'

Quill.register('modules/counter', Counter)

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    isFixedMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowMoreTool: false,
      quillEditor: null,
      isShowToolBar: false,
      isSHowBottomBar: false,
      isChange: false,
      menuList: QuillEditorMenuList.call(this)
    }
  },
  mounted() {
    this.quillEditor = this.initEditor(this.$refs.quill_editor)
    this.setContent(this.content)
    this.$refs.quill_editor.addEventListener('contextmenu', event => {
      this.showContextmenu(event)
    })
  },
  watch: {
    content(newValue) {
      this.setContent(newValue)
    },
    isFixedMode(newValue) {
      this.isShowToolBar = newValue
      this.isSHowBottomBar = newValue
    }
  },
  computed: {
    editorHeight() {
      return this.isFixedMode ? '561px' : '100px'
    }
  },
  methods: {
    /**
     * @param {String} target must use ref, if you want to reuse this component.
     */
    initEditor: function (target) {
      var options = {
        debug: 'error',
        modules: {
          // syntax: true,
          toolbar: this.$refs.quill_editor_toolbar,
          // imageResize: {},
          // imageDrop: true,
          // FileDrop: true,
          counter: {
            container: this.$refs.counter,
            unit: 'chiness'
          }
        },
        placeholder: '输入内容...',
        readOnly: false,
        theme: 'snow'
      }
      // Add fonts to whitelist
      var Font = Quill.import('formats/font')
      // We do not add Aref Ruqaa since it is the default
      Font.whitelist = [
        'SimSun',
        'SimHei',
        'Microsoft-YaHei',
        'KaiTi',
        'FangSong',
        'Arial',
        'Times-New-Roman',
        'sans-serif'
      ]
      Quill.register(Font, true)

      const quill = new Quill(target, options)
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          this.isChange = true
          // } else if (source === 'api') {
          //   // this.$emit('updata:content', this.getContents())
          //   console.log('api')
        }
      })

      quill.on('selection-change', (range, oldRange, source) => {
        // onBlur
        if (range === null && oldRange !== null) {
          if (this.isChange) {
            this.handleChange(this.getContents())
            this.isChange = false
          }
          // onFocus
          // } else if (range !== null && oldRange === null) {
          //   console.log('focus')
        }
      })

      return quill
    },
    setContent(content) {
      let _content = ''
      try {
        _content = JSON.parse(content)
      } catch (error) {
        _content = {
          ops: [
            {
              insert: content
            }
          ]
        }
      }
      this.quillEditor.setContents(_content)
    },
    getContents() {
      const temp = this.quillEditor.getContents()
      let content = ''
      try {
        content = JSON.stringify(temp)
      } catch (error) {
        content = this.quillEditor.getText()
      }
      return content
    },
    handleChange(newContent) {
      try {
        const oldContentStr = JSON.stringify(this.content)
        const newContentStr = JSON.stringify(newContent)
        if (oldContentStr !== newContentStr) {
          this.$emit('change', newContent)
        } else {
          return
        }
      } catch (error) {
        this.$alert(error)
      }
    },
    showContextmenu(event) {
      const param = {
        event,
        targetItem: this.quillEditor,
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.quill_editor_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 136px;
  .quill_editor_toolbar {
    border-radius: 5px 5px 0px 0px;
    border-bottom: 0;
  }
  .quill_editor.ql-container {
    // height: 115px;
    border: 1px solid #dcdfe6;
    /deep/.ql-editor {
      padding: 6px;
    }
    /deep/.ql-editor.ql-blank::before {
      left: 8px;
    }
  }
  .bottom {
    display: flex;
    position: relative;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-top: 0;
    border-radius: 0px 0px 5px 5px;
    // color: #4c4c4c;
    // font-size: 0.9em;
    .left {
      flex: 1;
      margin: auto 7px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right {
      margin: auto 7px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
