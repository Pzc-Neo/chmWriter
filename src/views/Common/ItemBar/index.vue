<template>
  <div class="item_bar" v-show="isShow">
    <div
      shadow="hover"
      v-for="(item, index) in itemList"
      :key="item.id"
      :index="index"
      @click="changeTo(item)"
      :class="{ item, active: isActive(item) }"
      @contextmenu="showContextmenu($event, item)"
      draggable="true"
      @dragstart="dragStart($event, item, index)"
      @dragover="handleDragover($event)"
      @drop="handleDrop($event, index)"
    >
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    },
    activeItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    dragStart: function (event, item, index) {
      // const drapIndex = event.target.attributes.index.nodeValue
      // event.dataTransfer.setData('drapIndex', drapIndex)
      event.dataTransfer.setData('drapIndex', index)

      // Will use it when drop to group tree
      event.dataTransfer.setData('itemId', item.id)
    },
    handleDragover: function (event) {
      event.preventDefault()
    },
    handleDrop(event, index) {
      let drapIndex = event.dataTransfer.getData('drapIndex')
      let dropIndex = index
      // let dropIndex = event.target.attributes.index.nodeValue
      drapIndex = parseInt(drapIndex)
      dropIndex = parseInt(dropIndex)

      if (drapIndex === dropIndex) {
      } else {
        const diffData = []
        // drag down
        if (drapIndex < dropIndex) {
          const dropSort = this.itemList[dropIndex].sort
          for (let i = drapIndex; i <= dropIndex; i++) {
            let diff = {}
            if (i === drapIndex) {
              diff = {
                targetId: this.itemList[i].id,
                sort: dropSort
              }
            } else {
              diff = {
                targetId: this.itemList[i].id,
                sort: this.itemList[i - 1].sort
              }
            }
            diffData.push(diff)
          }
          // drag up
        } else if (drapIndex > dropIndex) {
          const dropSort = this.itemList[dropIndex].sort
          for (let i = dropIndex; i <= drapIndex; i++) {
            let diff = {}
            if (i === drapIndex) {
              diff = {
                targetId: this.itemList[i].id,
                sort: dropSort
              }
            } else {
              diff = {
                targetId: this.itemList[i].id,
                sort: this.itemList[i + 1].sort
              }
            }
            diffData.push(diff)
          }
        }
        this.$emit('updateSorts', diffData)
      }
    },
    changeTo(item) {
      this.$emit('changeTo', item)
      // this.activeItem = item
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
  },
  computed: {
    ...mapState({
      isShow: state => state.barVisible.itemBar
    })
  }
}
</script>

<style lang="scss" scoped>
.item_bar {
  width: 200px;
  border-right: solid 1px #e6e6e6;
  overflow: auto;
  .item {
    // padding: 5px 10px;
    cursor: pointer;
  }
  .item:hover {
    background-color: #f0f7ff;
  }
  .item.active {
    background-color: #f0f7ff;
  }
}
</style>
