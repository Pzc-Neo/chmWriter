<template>
  <div class="side_bar">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">资料</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-edit"></i>
        <span slot="title">写作</span>
      </el-menu-item>
      <el-menu-item index="4">
        <!-- <i class="el-icon-office-building"></i> -->
        <i class="el-icon-map-location"></i>
        <span slot="title">世界</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-user"></i>
        <span slot="title">角色</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">情节</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-s-data"></i>
        <span slot="title">分析</span>
      </el-menu-item>

      <el-menu-item class="collapse_btn" @click="isCollapse = !isCollapse">
        <i :class="'el-icon-d-arrow-' + (isCollapse ? 'right' : 'left')"></i>
        <span slot="title">{{ isCollapse ? '展开' : '折叠' }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.side_bar {
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    height: 100%;
  }
}
</style>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
// .side_bar {
//   .collapse_btn {
//   }
// }
</style>
