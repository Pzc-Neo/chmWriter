<template>
  <div
    v-show="isShow"
    ref="contextmenuBar"
    class="contextmenu_bar"
    :style="styleMenuBar"
  >
    <el-menu menu-trigger="hover">
      <el-menu-item
        v-for="menuItem in menuList"
        :index="menuItem.id"
        :key="menuItem.id"
        @click="handleMenuItemClick(menuItem)"
      >
        <i v-if="menuItem.icon" :class="menuItem.icon"></i>
        <i v-else class="el-icon-cloudy"></i>
        <span slot="title">{{ $t(menuItem.title) }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      /**
       * The style of ContextMenuBar about position
       */
      styleMenuBar: {
        top: 0,
        left: 0
      }
    }
  },
  methods: {
    handleMenuItemClick(menuItem) {
      menuItem.func(this.targetItem)
      this.$store.commit('HIDE_CONTEXTMENU')
    },
    getStyleMenuBar(event) {
      const elMenuBar = this.$refs.contextmenuBar

      let mouseX = event?.pageX || 0
      let mouseY = event?.pageY || 0

      const menuBarWidth = elMenuBar.offsetWidth
      const menuBarHeight = elMenuBar.offsetHeight

      const clientHeight = document.body.clientHeight
      const clienWidth = document.body.clientWidth

      // If mouse's position lower than half of clientHeight,then show the menu over mouse
      if (mouseY > clientHeight / 2) {
        mouseY = mouseY - menuBarHeight
      }
      // 右边溢出
      if (mouseX + menuBarWidth > clienWidth) {
        mouseX = mouseX - menuBarWidth
      }

      const menuStyle = {
        top: mouseY + 'px',
        left: mouseX + 'px'
      }
      return menuStyle
    }
  },
  watch: {
    event(newEvent) {
      this.$nextTick(() => {
        this.styleMenuBar = this.getStyleMenuBar(newEvent)
      })
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.contextmenu.isShow,
      menuList: state => state.contextmenu.prama.menuList,
      event: state => state.contextmenu.prama.event,
      targetItem: state => state.contextmenu.prama.targetItem
    })
  }
}
</script>

<style lang="scss" scoped>
.contextmenu_bar {
  display: inline-block;
  position: fixed;
  border-radius: 5px;
  z-index: 100;
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
