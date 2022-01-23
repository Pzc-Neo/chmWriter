<template>
  <div class="nav_menu">
    <template v-for="menu in menuList">
      <!-- 最后一级菜单 -->
      <el-menu-item
        v-if="!menu.children"
        :key="menu.id"
        :data="menu"
        :index="menu.title"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="menu.children"
        :key="menu.id"
        :data="menu"
        :index="menu.title"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :menuList="menu.children"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['menuList'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>
