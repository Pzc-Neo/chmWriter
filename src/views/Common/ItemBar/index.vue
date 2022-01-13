<template>
  <div class="item_bar">
    <div
      shadow="hover"
      v-for="(item, index) in itemList"
      :key="item.id"
      @click="changeTo(item)"
      :class="{ item, active: isActive(item) }"
      @contextmenu="showContextmenu($event, item)"
      draggable="true"
      @dragstart="dragStart($event, item)"
      @dragover="handleDragover($event)"
    >
      {{ index }}. {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    menuList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeItem: null
    }
  },
  methods: {
    dragStart: function (event, item) {
      // var drap_type = event.target.attributes.drap_type.nodeValue
      // var drap_index = event.target.attributes.index.nodeValue
      event.dataTransfer.setData('itemId', item.id)
      // event.dataTransfer.setData('drap_index', drap_index)
    },
    handleDragover: function (event) {
      event.preventDefault()
    },
    changeTo(item) {
      this.$emit('changeTo', item)
      this.activeItem = item
    },
    isActive(item) {
      return this.activeItem && this.activeItem.id === item.id
    },
    showContextmenu(event, targetItem) {
      const param = {
        event,
        targetItem,
        menuList: this.menuList
      }

      this.$store.commit('SHOW_CONTEXTMENU', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.item_bar {
  width: 200px;
  border-right: solid 1px #e6e6e6;
  overflow: auto;
  .item {
    padding: 5px 10px;
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
