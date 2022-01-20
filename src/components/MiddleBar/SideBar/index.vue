<template>
  <div class="side_bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="/data" @click="changePanel('/data')">
        <!-- <i class="el-icon-document"></i> -->
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{ $t('sideBar.data') }}</span>
      </el-menu-item>
      <el-menu-item index="/writing" @click="changePanel('/writing')">
        <i class="el-icon-edit"></i>
        <span slot="title">{{ $t('sideBar.writing') }}</span>
      </el-menu-item>
      <el-menu-item index="/world" @click="changePanel('/world')">
        <!-- <i class="el-icon-office-building"></i> -->
        <i class="el-icon-map-location"></i>
        <span slot="title">{{ $t('sideBar.world') }}</span>
      </el-menu-item>
      <el-menu-item index="/character" @click="changePanel('/character')">
        <i class="el-icon-user"></i>
        <span slot="title">{{ $t('sideBar.character') }}</span>
      </el-menu-item>
      <el-menu-item index="6">
        <el-badge :value="200" :max="99" class="badge">
          <i class="el-icon-chat-line-round"></i>
        </el-badge>
        <span slot="title">{{ $t('sideBar.plot') }}</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-s-data"></i>
        <span slot="title">{{ $t('sideBar.analysis') }}</span>
      </el-menu-item>

      <el-menu-item class="collapse_btn" @click="isCollapse = !isCollapse">
        <i :class="'el-icon-d-arrow-' + (isCollapse ? 'right' : 'left')"></i>
        <span slot="title">{{ collapseText }}</span>
      </el-menu-item>
      <div class="btn_group">
        <el-button
          plain
          :type="barVisible.groupBar ? 'primary' : ''"
          size="mini"
          @click="toggleBarVisible('groupBar')"
        >
          {{ $t('sideBar.group') }}
        </el-button>
        <el-button
          plain
          :type="barVisible.itemBar ? 'primary' : ''"
          size="mini"
          @click="toggleBarVisible('itemBar')"
        >
          {{ $t('sideBar.item') }}
        </el-button>
        <el-button
          plain
          :type="barVisible.detailBar ? 'primary' : ''"
          size="mini"
          @click="toggleBarVisible('detailBar')"
        >
          {{ $t('sideBar.detail') }}
        </el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: true,
      barList: ['group', 'item', 'detail'],
      barGroup: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    changePanel(panelPath) {
      this.$router.push(panelPath)
      this.$store.commit('CHANGE_CURRENT_PANEL', panelPath)
    },
    toggleBarVisible(bar) {
      this.$store.commit('TOGGLE_BAR_VISIBILITY', bar)
    }
  },
  computed: {
    collapseText() {
      return this.isCollapse
        ? this.$t('sideBar.expand')
        : this.$t('sideBar.collapse')
    },
    ...mapState({
      barVisible: state => state.barVisible
    })
  },
  watch: {
    barVisible(a) {
      console.log(a)
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
  /deep/ .el-checkbox-button__inner {
    display: inline-block;
    width: 52px;
    padding: 0px;
    margin: 2px 5px;
    height: 22px;
    line-height: 19px;
  }
  /deep/ .el-button {
    width: 75%;
    padding: 6px 2px;
    margin: 2px auto;
  }
  .btn_group {
    display: flex;
    flex-direction: column;
  }
}
</style>
