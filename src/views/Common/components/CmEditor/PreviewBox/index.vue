<template>
  <div
    class="preview_box"
    v-html="previewContent"
    @contextmenu="showContextmenu"
  ></div>
</template>

<script>
import { marked } from 'marked'
import { previewBoxMenuList } from './menuList'
import { removeNote, removeSign } from '../util/markdown'
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    previewType: {
      type: String,
      default: 'pureText'
    }
  },
  data() {
    return {
      previewContent: '',
      menuList: previewBoxMenuList.call(this)
    }
  },
  watch: {
    content(newContent, oldContent) {
      if (newContent !== oldContent) {
        this.renderContent()
      }
    },
    previewType(newType, oldType) {
      if (newType !== oldType) {
        this.renderContent()
      }
    }
  },
  methods: {
    hidePreviewBox() {
      this.$emit('hide')
    },
    showContextmenu(event) {
      const param = {
        event,
        targetItem: this.codemirror,
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    renderContent(content) {
      content = content || this.content
      let resultContent = ''
      switch (this.previewType) {
        case 'markdown':
          resultContent = marked(content)
          break
        case 'pureText': {
          resultContent = removeNote.call(this, content)
          resultContent = removeSign.call(this, resultContent)
          resultContent = marked(resultContent)
          break
        }
      }
      this.previewContent = resultContent
    }
  },
  mounted() {
    this.renderContent()
  }
}
</script>

<style lang="scss" scoped>
.preview_box {
  flex: 1;
  min-width: 30px;

  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0px 10px 70px;

  font-size: 15px;
  line-height: 1.7em;
  letter-spacing: 0.1px;
  /* 文字两端对齐 */
  // text-align: justify;
  z-index: 15;
  user-select: text;

  color: #383838;
  background-color: #fafbfe;
  /deep/ {
    /* 标题 */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding-top: 0px;
      padding-bottom: 0px;
      margin-top: 0.6em;
      margin-bottom: 0.3em;
      line-height: 1.2em;
    }

    h1 {
      font-size: 1.8em;
    }
    h2 {
      font-size: 1.7em;
    }

    h3 {
      font-size: 1.6em;
    }

    h4 {
      font-size: 1.5em;
    }

    h5 {
      font-size: 1.4em;
    }

    h6 {
      font-size: 1.3em;
    }

    p {
      margin: 15px 0px;
      /* 行内代码 */
      code {
        color: #fafbfe;
        background: #505050;
        padding: 3px 6px;
        margin: 0px 2px;
        /* border: 1px solid #d5f2ff; */
        border-radius: 3px;
      }
    }
    pre {
      code {
        display: block;
        padding: 3px 6px;
        background: #eeeff3;
      }
    }

    /* 引用 */
    blockquote {
      color: #4d4e4e;
      border-left: 3px solid #505050;
      padding: 0px;
      padding-left: 11px;
      padding-right: 14px;
      margin: 2px 0px;
      // border-radius: 0px 5px 5px 0px;
      background: #eeeff3;
    }

    /*** Table Styles **/

    /* 整个表格 */
    table {
      background: white;
      border-radius: 3px;
      border-collapse: collapse;
      margin: auto;
      padding: 5px;
      width: 100%;
      animation: float 5s infinite;
      border: 1px solid #c1c3d1;
    }

    /* 表格标题 */
    th {
      color: #d5dde5;
      background: #24292f;
      border: 1px solid #343a45;
      border-bottom: 0;
      padding: 4px 11px;
      text-align: left;
      vertical-align: middle;
    }

    th:first-child {
      border-top-left-radius: 3px;
    }

    th:last-child {
      border-top-right-radius: 3px;
      /* border-right: none; */
    }

    tr {
      border-top: 1px solid #c1c3d1;
      border-bottom: 1px solid #c1c3d1;
      color: #666b85;
      /*font-size:16px;*/
      font-weight: normal;
      text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
    }

    tr:hover td {
      background: #4e5066;
      color: #ffffff;
      /* border-top: 1px solid #22262e; */
    }

    tr:first-child {
      border-top: none;
    }

    tr:last-child {
      border-bottom: none;
    }

    tr:nth-child(odd) td {
      background: #ebebeb;
    }

    tr:nth-child(odd):hover td {
      background: #4e5066;
    }

    tr:last-child td:first-child {
      border-bottom-left-radius: 3px;
    }

    tr:last-child td:last-child {
      border-bottom-right-radius: 3px;
    }

    td {
      background: #ffffff;
      padding: 4px 11px;
      text-align: left;
      vertical-align: middle;
      font-weight: 300;
      border-right: 1px solid #c1c3d1;
    }

    td:last-child {
      border-right: 0px;
    }

    p img {
      width: 100%;
    }

    ol,
    ul {
      padding-inline-start: 40px;
    }
  }
}

.preview_box.border_top {
  border-top: 1px solid #383838;
}
.preview_box.border_left {
  border-left: 1px solid #383838;
}
</style>
