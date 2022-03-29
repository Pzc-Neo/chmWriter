<template>
  <div
    v-show="isShow"
    ref="contextmenuBar"
    class="contextmenu_bar"
    :style="styleMenuBar"
  >
    <MenuList :menuList="menuList" :targetItem="targetItem" :event="event" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuList from './components/MenuList'
export default {
  name: 'ContextmenuBar',
  components: {
    MenuList
  },
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
    getStyleMenuBar(event) {
      const elMenuBar = this.$refs.contextmenuBar

      let mouseX = event?.pageX || 0
      let mouseY = event?.pageY || 0

      const menuBarWidth = elMenuBar.offsetWidth
      const menuBarHeight = elMenuBar.offsetHeight

      const clientHeight = document.body.clientHeight
      const clienWidth = document.body.clientWidth

      // If mouse's position lower than half of clientHeight,then show the menu over mouse
      if (mouseY + menuBarHeight > clientHeight) {
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
  max-width: 200px;
  padding: 5px;
  display: inline-block;
  position: fixed;
  border-radius: 5px;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: $main-shadow;
}
</style>
