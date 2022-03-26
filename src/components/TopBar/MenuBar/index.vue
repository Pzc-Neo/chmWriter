<template>
  <div class="menu_bar">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu index="file">
        <template slot="title">{{ $t('menuBar.file') }}</template>
        <el-menu-item index="new-file">新建</el-menu-item>
        <el-menu-item index="pereferences">
          {{ $t('menuBar.pereferences') }}
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">{{ $t('menuBar.edit') }}</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项1</el-menu-item>
          <el-menu-item index="3-4-2">选项2</el-menu-item>
          <el-menu-item index="3-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="history">
        <template slot="title">{{ $t('menuBar.history') }}</template>
        <el-menu-item
          v-for="history in historyItemList"
          :index="history.id"
          :key="history.id"
        >
          <div class="history_item">
            <div class="left">{{ history.title }}</div>
            <div class="right">{{ $formatTime(history.openTime) }}</div>
          </div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="help">
        <template slot="title">{{ $t('menuBar.help') }}</template>
        <el-menu-item index="about">{{ $t('menuBar.about') }}</el-menu-item>
        <el-submenu index="language">
          <template slot="title">{{ $t('menuBar.language') }}</template>
          <el-menu-item index="ch">中文简体</el-menu-item>
          <el-menu-item index="en">English</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    historyItemList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      const [index0, index1] = keyPath
      switch (index0) {
        case 'file':
          switch (index1) {
            case 'new-file':
              console.log('new file')
              break
            case 'pereferences':
              this.$bus.$emit('pereferences-box:show')
              break
          }
          break
        case 'history':
          this.$bus.$emit(`${this.$store.state.currentPanel}:change-to-item`, {
            id: index1
          })
          break
        case 'help':
          switch (index1) {
            case 'language':
              this.changeLocale(key)
              break
          }
          break

        default:
          break
      }
      // const menuMap = {
      //   file: {
      //     'new-file': () => {
      //       console.log('new file ')
      //     },
      //     pereferences: () => {
      //       this.$bus.$emit('pereferences-box:show')
      //     }
      //   },
      //   history: {},
      //   help: {
      //     language: () => {
      //       this.changeLocale(key)
      //     }
      //   }
      // }
      // menuMap[index0][index1]()
    },
    changeLocale(local) {
      this.$i18n.locale = local
      this.$db.setConfig('locale', local)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_bar {
  display: inline-block;
  margin-left: 7px;
  .el-menu {
    color: #ffffff;
    background-color: transparent;
  }
  /deep/ .el-menu--horizontal {
    border-bottom: 0px;
    .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 30px;
      line-height: 30px;
    }
    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover,
    .el-submenu .el-submenu__title:hover {
      background-color: #56aaff;
    }
    .el-menu-item {
      color: #ffffff;
    }
    .el-menu-item.is-active {
      color: #ffffff;
    }
    .el-submenu {
      .el-submenu__title {
        padding: 0 10px;
        color: #ffffff;
        i {
          color: #ffffff;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
    .el-submenu.is-active {
      .el-submenu__title {
        border-bottom: 2px solid transparent;
      }
    }
  }
}
.el-menu--horizontal {
  .history_item {
    display: flex;
    justify-content: space-between;
    .left {
      max-width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 8px;
    }
  }
}
</style>
