<template>
  <div class="side_bar">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="2" @click="changePanel('/data')">
        <!-- <i class="el-icon-document"></i> -->
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{ $t('panel.data') }}</span>
      </el-menu-item>
      <el-menu-item index="3" @click="changePanel('/')">
        <i class="el-icon-edit"></i>
        <span slot="title">{{ $t('panel.writing') }}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <!-- <i class="el-icon-office-building"></i> -->
        <i class="el-icon-map-location"></i>
        <span slot="title">{{ $t('panel.world') }}</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-user"></i>
        <span slot="title">{{ $t('panel.character') }}</span>
      </el-menu-item>
      <el-menu-item index="6">
        <el-badge :value="200" :max="99" class="badge">
          <i class="el-icon-chat-line-round"></i>
        </el-badge>
        <span slot="title">{{ $t('panel.plot') }}</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-s-data"></i>
        <span slot="title">{{ $t('panel.analysis') }}</span>
      </el-menu-item>

      <el-menu-item class="collapse_btn" @click="isCollapse = !isCollapse">
        <i :class="'el-icon-d-arrow-' + (isCollapse ? 'right' : 'left')"></i>
        <span slot="title">{{ collapseText }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

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
    },
    changePanel (panelPath) {
      this.$router.push(panelPath)
      console.log(this.$router)
    }
  },
  computed: {
    collapseText () {
      return this.isCollapse ? this.$t('panel.expand') : this.$t('panel.collapse')
    }
  }
}
</script>

<style lang="scss" scoped>
.side_bar {
  .el-menu-vertical-demo {
    height: 100%;
    .el-menu-item {
      .badge {
        /deep/ .el-badge__content.is-fixed {
          top: 5px;
          right: 18px;
        }
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 138px;
    height: 100%;
    .el-menu-item {
      .badge {
        /deep/ .el-badge__content.is-fixed {
          top: 5px;
          right: -24px;
        }
      }
    }
  }
}
</style>
