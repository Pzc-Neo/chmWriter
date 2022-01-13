<template>
  <div class="menu_bar">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu index="2">
        <template slot="title">{{ $t('menuBar.file') }}</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
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
          v-for="history in historys"
          :index="history.id"
          :key="history.id"
        >
          {{ history.title }}
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
    historys: {
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
.menu_bar {
  display: inline-block;
  margin-left: 7px;
  .el-menu {
    color: #ffffff;
    background-color: transparent;
  }
  /deep/ .el-menu--horizontal {
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
        padding: 0 15px;
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
</style>
