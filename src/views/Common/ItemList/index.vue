<template>
  <div class="item_list">
    <div
      shadow="hover"
      v-for="(item, index) in itemList"
      :key="item.id"
      @click="changeTo(item)"
      :class="{ item, active: isActive(item) }"
      @contextmenu="showContextmenu($event, item)"
    >
      {{ index }}. {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      itemList: [
        {
          id: 'chapter_id-1624770892000-BYaWFH',
          chapter_group_id: 'chapter_group_id-1624770816000-CkywP2',
          title: '用到的库',
          content: '用到的库',
          create_date: '2021-06-27 13:14:52',
          update_date: '2021-11-04 15:45:46',
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
          content: 'codemirror说明',
          create_date: '2021-06-29 13:54:57',
          update_date: '2021-07-29 02:24:54',
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
          content: '软件使用说明',
          create_date: '2021-06-30 20:36:45',
          update_date: '2021-11-02 19:14:10',
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
          content: 'vim模式说明',
          create_date: '2021-07-30 11:34:09',
          update_date: '2021-08-04 05:56:04',
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
        }
      ],
      activeItem: null
    }
  },
  methods: {
    changeTo(item) {
      this.$emit('changeTo', item)
      this.activeItem = item
    },
    isActive(item) {
      return this.activeItem && this.activeItem.id === item.id
    },
    showContextmenu(ev, targetItem) {
      const param = {
        ev,
        targetItem,
        menuList: this.menuList
      }

      this.$store.commit('SHOW_CONTEXTMENU', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.item_list {
  width: 200px;
  border-right: solid 1px #e6e6e6;
  .item {
    padding: 10px;
    cursor: pointer;
  }
  .item:hover {
    background-color: #f5f7fa;
  }
  .item.active {
    background-color: #f5f7fa;
  }
}
</style>
