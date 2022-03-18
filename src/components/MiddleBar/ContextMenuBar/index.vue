<template>
  <div v-show="isShow" class="contextmenu_bar" :style="styleMenu">
    <el-menu menu-trigger="hover">
      <el-menu-item
        :index="menu.id"
        v-for="menu in menuList"
        :key="menu.id"
        @click="handleClick(menu)"
      >
        <i v-if="menu.icon" :class="menu.icon"></i>
        <i v-else class="el-icon-cloudy"></i>
        <span slot="title">{{ $t(menu.title) }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    handleClick(menu) {
      menu.func(this.targetItem)
      this.$store.commit('HIDE_CONTEXTMENU')
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.contextmenu.isShow,
      menuList: state => state.contextmenu.prama.menuList,
      event: state => state.contextmenu.prama.event,
      targetItem: state => state.contextmenu.prama.targetItem
    }),
    /**
     * The style of ContextMenuBar about position
     */
    styleMenu() {
      const x = this.event?.pageX
      let y = this.event?.pageY

      // If mouse's position lower than half of clientHeight's height,then show the menu over mouse
      const height = document.body.clientHeight
      if (y > height / 2) {
        const menuBar = document.querySelector('.contextmenu_bar')
        if (menuBar !== null) {
          const h = window.getComputedStyle(menuBar, null).height
          if (h !== 'auto') {
            y = y - parseInt(h)
          }
        }
      }
      const menuStyle = {
        top: y + 'px',
        left: x + 'px'
      }
      return menuStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu_bar {
  display: inline-block;
  position: fixed;
  border-radius: 5px;
  z-index: 10;
  /deep/ .el-menu {
    border: solid 1px #e6e6e6;
    .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 30px;
      line-height: 30px;
    }
    .el-menu-item {
      i.not_show {
        color: transparent;
        background-color: transparent;
      }
    }
  }
}
</style>
