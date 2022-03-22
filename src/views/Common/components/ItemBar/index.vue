<template>
  <div class="item_bar" v-show="isShow" :style="customStyle">
    <div class="header">
      <span class="title">
        <span>{{ itemBarTitle }}</span>
        <!-- toggle simple mode -->
        <el-button
          class="fa fa-columns"
          plain
          :type="isDoubleBar ? 'primary' : ''"
          size="mini"
          @click="toggleDoubleBar()"
        ></el-button>
      </span>
      <span class="count">{{ itemList.length }}项</span>
    </div>
    <ul
      class="item_list"
      ref="itemList"
      @contextmenu="showContextmenu"
      @click="handleClick"
      :style="customStyleList"
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
  </div>
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
    itemBarTitle: {
      type: String,
      default() {
        return '子项'
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
    },
    customStyleList: {
      type: Object,
      default() {
        return {}
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
      const rootDom = this.$refs.itemList
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
      this.$emit('changeTo', item.id)
    },
    showContextmenu(event) {
      let target = event.target
      if (target === this.$refs.itemList) {
        this.showBarMenu(event)
      } else {
        while (target !== this.$refs.itemList) {
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
    },
    toggleDoubleBar() {
      this.$store.commit('TOGGLE_DOUBLE_BAR')
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.barVisible.itemBar,
      isDoubleBar: state => state.isDoubleBar
    })
  }
}
</script>

<style lang="scss" scoped>
.item_bar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: solid 1px #e6e6e6;
  .header {
    height: 2em;
    line-height: 2em;
    display: flex;
    padding: 0px 5px;
    border: solid 1px #e6e6e6;
    border-left: 0;
    border-right: 0;
    .title {
      display: flex;
      flex: 2;
      overflow: hidden;
      span {
        padding: 0px 5px;
      }
      .el-button {
        border: 0px;
        margin: 0px;
        padding: 5px;
      }
    }
    .count {
      flex: 1;
      text-align: right;
    }
  }
  .item_list {
    height: 100%;
    // border-right: solid 1px #e6e6e6;
    overflow: auto;
    flex: 1;
    .item {
      cursor: pointer;
      overflow: hidden;
    }
    .item:hover {
      background-color: #f0f7ff;
    }
    .item.active {
      background-color: #f0f7ff;
    }
  }
}
</style>
