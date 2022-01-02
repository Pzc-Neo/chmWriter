<template>
  <div v-if="isShow" class="contextmenu_bar" :style="styleMenu">
    <el-menu>
      <el-menu-item
        :index="menu.id"
        v-for="menu in menuList"
        :key="menu.id"
        @click="handleClick(menu)"
      >
        <i v-if="menu.icon" :class="menu.icon"></i>
        <i v-else class="el-icon-cloudy"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.contextmenu.isShow,
      menuList: state => state.contextmenu.prama.menuList,
      ev: state => state.contextmenu.prama.ev,
      targetItem: state => state.contextmenu.prama.targetItem
    }),
    styleMenu() {
      const x = this.ev.pageX
      let y = this.ev.pageY
      // If mouse's position lower than half of clientHeight's height,then show the menu over mouse
      const height = document.body.clientHeight
      if (y > height / 2) {
        const myDiv = document.querySelector('.contextmenu_bar')
        const h = window.getComputedStyle(myDiv, null).height
        if (h !== 'auto') {
          y = y - parseInt(h)
        }
      }
      const menuStyle = {
        top: y + 'px',
        left: x + 'px'
      }
      return menuStyle
    }
  },
  methods: {
    handleClick(menu) {
      menu.func(this.targetItem)
      this.$store.commit('HIDE_CONTEXTMENU')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (keyPath[0] === 'help') {
        if (keyPath[1] === 'language') {
          this.changeLocale(key)
        }
      }
    },
    changeLocale(local) {
      this.$i18n.locale = local
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu_bar {
  display: inline-block;
  position: fixed;
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
