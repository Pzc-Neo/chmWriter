<template>
  <ul class="item_list">
    <li v-for="(item, index) in itemList" :key="item.id">{{ index }}. {{ item.title }}</li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      itemList: [
        {
          id: 'chapter_id-1624770892000-BYaWFH',
          chapter_group_id: 'chapter_group_id-1624770816000-CkywP2',
          title: '用到的库',
          create_date: '2021-06-27 13:14:52',
          update_date: '2021-11-04 15:45:46',
          content:
            '## Vue 2.6.12\n许可:  MIT  [官网](https://github.com/vuejs/vue)\n\n## node-sqlite3\n许可:  BSD-3-Clause  [官网](https://github.com/mapbox/node-sqlite3)\n\n## codemirror 5.58.0\n许可：MIT  [官网](https://github.com/codemirror/CodeMirror)\n\n## diff-match-patch\n许可：APACHE-2.0  [官网](https://github.com/google/diff-match-patch)\n\n## vis-network 9.0.4\n许可：APACHE-2.0  [官网](https://github.com/visjs/vis-network)\n\n## winbox\n 许可：APACHE-2.0  [官网](https://github.com/nextapps-de/winbox)\n\n## pickr 1.8.1\n许可：MIT  [官网](https://github.com/Simonwep/pickr)\n\n## marked\n 许可：MIT  [官网](https://github.com/markedjs/marked)\n\n## hightlight.js\n许可：BSD 3-Clause  [官网](https://github.com/highlightjs/highlight.js)\n\n## node-html-to-text\n许可：MIT  [官网](https://github.com/html-to-text/node-html-to-text)\n\n## markdown-pdf\n许可：MIT  [官网](https://github.com/alanshaw/markdown-pdf)\n\n## normalize.css\n 许可：MIT  [官网](https://github.com/necolas/normalize.css)',
          language_mode: 0,
          words: 48,
          target_words: 2000,
          type: 0,
          status: 0,
          is_export: 1,
          note_content: '',
          foreshadowing_content: '',
          rate: '2%',
          sign: '[]',
          other: '[]',
          sort_num: 18
        },
        {
          id: 'chapter_id-1624946097000-XJCz2w',
          chapter_group_id: 'chapter_group_id-1624770816000-CkywP2',
          title: 'codemirror说明',
          create_date: '2021-06-29 13:54:57',
          update_date: '2021-07-29 02:24:54',
          content:
            "# vim.js文件修改\n\n## 取消ctrl+f，ctrl+b\n\n1. 99 { keys: '\\<C-f>', type: 'motion', motion: 'moveByPage', motionArgs: { forward: true }},\n\n2. 100 { keys: '\\<C-b>', type: 'motion', motion: 'moveByPage', motionArgs: { forward: false }},",
          language_mode: 0,
          words: 6,
          target_words: 2000,
          type: 0,
          status: 0,
          is_export: 1,
          note_content: '',
          foreshadowing_content: '',
          rate: '0%',
          sign: '[]',
          other: null,
          sort_num: 19
        },
        {
          id: 'chapter_id-1625056605000-tSZpMK',
          chapter_group_id: 'chapter_group_id-1624770816000-CkywP2',
          title: '软件使用说明',
          create_date: '2021-06-30 20:36:45',
          update_date: '2021-11-02 19:14:10',
          content:
            '# 全局快捷键\n\n命令输入框：`Ctrl+/`  \n设置面板：`Ctrl+Shift+a`  \n\n# 写作面板\n\n 禅模式：`F11`  \n 预览markdown：`Ctrl+T`  \n 折叠标题内容：`Ctrl+E`  \n 定位章节所在位置：`右键点击章节标签`\n\n\n# 快捷功能\n拖拽文件到左侧的`选项栏`，可以直接打开文件。\n',
          language_mode: 0,
          words: 68,
          target_words: 2000,
          type: 0,
          status: 0,
          is_export: 1,
          note_content: '',
          foreshadowing_content: '',
          rate: '3%',
          sign: '[]',
          other: '[]',
          sort_num: 21
        },
        {
          id: 'chapter_id-1627616049000-MfyKXG',
          chapter_group_id: 'chapter_group_id-1624770816000-CkywP2',
          title: 'vim模式说明',
          create_date: '2021-07-30 11:34:09',
          update_date: '2021-08-04 05:56:04',
          content: '#  留下一行空行\nvim模式下，删除最后一行的时候，经常会出错。所以最好在最后面留下一行。',
          language_mode: 0,
          words: 35,
          target_words: 2000,
          type: 0,
          status: 0,
          is_export: 1,
          note_content: '',
          foreshadowing_content: '',
          rate: '1%',
          sign: '[]',
          other: null,
          sort_num: 29
        },
        {
          id: 'chapter_id-1628549176000-ADNz6k',
          chapter_group_id: 'chapter_group_id-1624770816000-CkywP2',
          title: '我为什么想写小说？',
          create_date: '2021-08-10 06:46:16',
          update_date: '2021-10-24 08:44:54',
          content:
            '## 写小说的原因\n这些年我学过很多东西，比如武术、吉他、设计、做视频等等。刚开始学的时候感觉很有趣，可以花很多很多的时间去学习、研究，学得不亦乐乎。\n\n可是，学着学着就感觉有点无趣了。就是觉得学了没什么用，越学越有一种空虚的感觉。好像把时间花在那些地方很不值得，\n\n# 文字的力量\n文字的力量那可大了去了。短短的一篇故事，就能让人的情绪起起伏伏的。\n\n## 看小说和写小说的感觉是很不一样的\n\n**看小说**的时候，剧情是按照作者的想法发展的。如果你把自己代入进去的话，其实也就是过着被别人安排好的生活而已。\n\n更何况，几乎所有的小说都存在的问题是——有些剧情，你根本就不想它往某个方向发展，然后作者的想法偏偏与你相反。\n\n**写小说**的时候，你就是神！你可以创造万物，也可以操纵万物，何乐而不为呢？\n\n\n## 基本原则\n',
          language_mode: 0,
          words: 294,
          target_words: 2000,
          type: 0,
          status: 0,
          is_export: 1,
          note_content: '',
          foreshadowing_content: '',
          rate: '14%',
          sign: '[]',
          other: '[]',
          sort_num: 37
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.item_list {
  width: 200px;
}
</style>
