<template>
  <ul
    class="item_bar"
    ref="itemBar"
    v-show="isShow"
    @contextmenu="showContextmenu"
    @click="handleClick"
    :style="customStyle"
  >
    <el-empty
      v-if="itemList.length === 0"
      :image-size="120"
      :description="$t('info.empty')"
      style="height: 100%"
    ></el-empty>
    <!-- li's id willl use by `scrollToView` method  -->
    <li
      shadow="hover"
      v-for="(item, index) in itemList"
      :key="item.id"
      :id="item.id"
      :index="index"
      :class="{ item, active: currentItem.id === item.id }"
      draggable="true"
      @dragstart="dragStart($event, item, index)"
      @dragover="handleDragover($event)"
      @drop="handleDrop($event, index)"
    >
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ItemBar',
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    menuListBar: {
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
    currentItem: {
      type: Object,
      default() {
        return {}
      }
    },
    customStyle: {
      type: Object,
      default() {
        return {
          width: '200px'
        }
      }
    }
  },
  methods: {
    /**
     * Change to item.
     * Use Event Delegation to find the actual click li(which have item's id)
     * emit `changeTo` event.
     */
    handleClick(event) {
      const rootDom = this.$refs.itemBar
      let target = event.target
      while (target !== rootDom) {
        if (target.tagName.toLowerCase() === 'li') {
          this.$emit('changeTo', target.id)
          break
        }
        target = target.parentNode
      }
    },
    dragStart: function (event, item, index) {
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
      drapIndex = parseInt(drapIndex)
      dropIndex = parseInt(dropIndex)

      if (drapIndex === dropIndex) {
      } else {
        let diffData = []
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
        let startSort = diffData[0].sort
        diffData = diffData.map(data => {
          data.sort = startSort
          startSort++
          return data
        })
        this.$emit('updateSorts', diffData)
      }
    },
    changeTo(item) {
      this.$emit('changeTo', item.id)
    },
    showContextmenu(event) {
      let target = event.target
      if (target === this.$refs.itemBar) {
        this.showBarMenu(event)
      } else {
        while (target !== this.$refs.itemBar) {
          if (target.tagName.toLowerCase() === 'li') {
            this.showItemMenu(event, target.id)
            break
          }
          target = target.parentNode
        }
      }
    },
    showBarMenu(event) {
      const param = {
        event,
        targetItem: {},
        menuList: this.menuListBar
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    showItemMenu(event, targetItemId) {
      const index = this.itemList.findIndex(item => {
        return item.id === targetItemId
      })
      const param = {
        event,
        targetItem: this.itemList[index],
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
  height: 100%;
  border-right: solid 1px #e6e6e6;
  border-top: 1px solid #e6e6e6;
  overflow: auto;
  .item {
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
