<template>
  <div
    :class="['menu_item', menuItem.disable ? 'disable' : '']"
    @click.stop="handleMenuItemClick(menuItem)"
  >
    <div v-if="menuItem.icon" class="icon">
      <i :class="menuItem.icon"></i>
      <!-- <i v-else class="el-icon-cloudy"></i> -->
    </div>
    <div class="title">
      {{ menuItem.isI18n !== false ? $t(menuItem.title) : menuItem.title }}
    </div>
    <div class="slot_wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleMenuItemClick(menuItem) {
      this.$emit('item-click', menuItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 5px;
  cursor: pointer;
  .icon {
    font-size: 1.3em;
    margin-right: 5px;
  }
  // .title {
  //   margin-left: 5px;
  // }
  .slot_wrapper {
    margin-left: 3px;
  }
}
.menu_item:hover {
  background-color: #cde3fd;
}
.menu_item.disable {
  color: #9c9c9c;
}
.menu_item.disable:hover {
  cursor: not-allowed;
  background-color: transparent;
}
.menu_item.toggle {
  /deep/.el-switch {
    margin-left: 3px;
  }
}
// .menu_item.toggle:hover {
//   background-color: transparent;
// }
</style>
