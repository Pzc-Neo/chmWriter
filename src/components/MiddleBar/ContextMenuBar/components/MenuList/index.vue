<template>
  <div class="menu_list">
    <div v-for="menuObj in menuList" :key="menuObj.id">
      <MenuItem
        v-if="menuObj.type === 'item'"
        :menuItem="menuObj.menuItem"
        :class="menuObj.type"
        @item-click="handleMenuItemClick"
      />

      <MenuItem
        v-if="menuObj.type === 'toggle'"
        :menuItem="menuObj.menuItem"
        :class="menuObj.type"
        @item-click="handleMenuItemClick"
      >
        <el-switch :value="menuObj.menuItem.isOn"></el-switch>
      </MenuItem>

      <div v-else-if="menuObj.type === 'group'" class="menu_group">
        <div class="group_title">
          {{ menuObj.isI18n !== false ? $t(menuObj.title) : menuObj.title }}
        </div>
        <MenuList :menuList="menuObj.menuItems" />
      </div>
      <div v-else-if="menuObj.type === 'divider'" class="menu_divider"></div>
    </div>
  </div>
</template>

<script>
import MenuItem from '../MenuItem'
export default {
  name: 'MenuList',
  components: {
    MenuItem
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    targetItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleMenuItemClick(menuItem) {
      if (menuItem?.disable === true) return

      menuItem.func(this.targetItem, menuItem)

      if (menuItem?.hideOnClick !== false) {
        this.$store.commit('HIDE_CONTEXTMENU')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_list {
  background-color: #fff;
  .menu_toggle {
    display: flex;
    align-items: center;
  }
  .menu_group {
    .group_title {
      padding: 0px 9px;
      padding-top: 4px;
      margin-bottom: 3px;
      font-size: 0.95em;
      color: #7a7a7a;
    }
    .menu_list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .menu_divider {
    height: 1px;
    margin: 2px;
    background-color: #e6e6e6;
  }
}
</style>
