<template>
  <div ref="popupBox" class="popup_box" :style="stylePopupBox">
    <div ref="header" class="header">
      <span class="left">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="right">
        <div class="icon" @click="toggleMinimize">
          <i :class="isMinimize ? 'el-icon-rank' : 'el-icon-minus'"></i>
        </div>
        <div class="icon" @click="appCommand('app:maximize')">
          <i class="el-icon-full-screen"></i>
        </div>
        <div class="icon close" @click="appCommand('app:close')">
          <i class="el-icon-close"></i>
        </div>
      </span>
    </div>
    <div class="body" v-show="!isMinimize">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dragging: false,
      stylePopupBox: {
        top: '650px',
        left: '65px',
        borderRadius: '4px'
      },
      lastMousePos: {
        x: 0,
        y: 0
      },
      isMinimize: true
    }
  },
  methods: {
    init() {
      this.addDragable()
    },
    // about drag -start
    addDragable() {
      this.$refs.header.addEventListener('mousedown', e => {
        this.lastMousePos = this.getMousePos(e)
        this.dragging = true
      })
      this.$refs.header.addEventListener('mousemove', e => {
        if (this.dragging === true) {
          const mousePos = this.getMousePos(e)

          const offset = {
            x: mousePos.x - this.lastMousePos.x,
            y: mousePos.y - this.lastMousePos.y
          }
          this.updatePopupBoxPos(offset)

          this.lastMousePos = mousePos
        }
      })
      this.$refs.header.addEventListener('mouseup', e => {
        this.dragging = false
      })
    },
    getMousePos(e) {
      return {
        x: e.pageX,
        y: e.pageY
      }
    },
    correctPos() {},
    updatePopupBoxPos({ x, y }) {
      let top = parseInt(this.stylePopupBox.top)
      let left = parseInt(this.stylePopupBox.left)
      top += y
      left += x

      this.stylePopupBox.top = top + 'px'
      this.stylePopupBox.left = left + 'px'
    },
    // about drag -end
    toggleMinimize() {
      this.isMinimize = !this.isMinimize
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.popup_box {
  position: fixed;
  z-index: 20;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .header {
    display: flex;
    height: 32px;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    user-select: none;
    color: aliceblue;
    background-color: #409eff;
    .left {
      margin-left: 7px;
    }
    .right {
      display: flex;
      margin-right: 7px;
      .icon {
        padding: 5px;
        cursor: pointer;
      }
      .icon:hover {
        background-color: #56aaff;
      }
      .icon.close:hover {
        background-color: #f34141;
      }
    }
  }
  .body {
    flex: 1;
  }
}
</style>
