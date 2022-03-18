<template>
  <div class="side_bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <!-- data -->
      <el-menu-item index="/data">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{ $t('sideBar.data') }}</span>
      </el-menu-item>
      <!-- writing -->
      <el-menu-item index="/writing">
        <i class="el-icon-edit"></i>
        <span slot="title">{{ $t('sideBar.writing') }}</span>
      </el-menu-item>
      <!-- world -->
      <el-menu-item index="/world">
        <i class="el-icon-map-location"></i>
        <span slot="title">{{ $t('sideBar.world') }}</span>
      </el-menu-item>
      <!-- character -->
      <el-menu-item index="/character">
        <i class="el-icon-user"></i>
        <span slot="title">{{ $t('sideBar.character') }}</span>
      </el-menu-item>
      <!-- plot -->
      <el-menu-item index="/plot">
        <el-badge :value="200" :max="99" class="badge">
          <i class="el-icon-chat-line-round"></i>
        </el-badge>
        <span slot="title">{{ $t('sideBar.plot') }}</span>
      </el-menu-item>
      <!-- analysis -->
      <el-menu-item index="/analysis">
        <i class="el-icon-s-data"></i>
        <span slot="title">{{ $t('sideBar.analysis') }}</span>
      </el-menu-item>
    </el-menu>
    <div class="other_command">
      <div class="btn_group">
        <!-- toggle group bar -->
        <el-button
          plain
          :type="barVisible.groupBar ? 'primary' : ''"
          size="mini"
          @click="toggleBarVisible('groupBar')"
        >
          {{ $t('sideBar.group') }}
        </el-button>
        <!-- toggle item bar -->
        <el-button
          plain
          :type="barVisible.itemBar ? 'primary' : ''"
          size="mini"
          @click="toggleBarVisible('itemBar')"
        >
          {{ $t('sideBar.item') }}
        </el-button>
        <!-- toggle detail bar -->
        <el-button
          plain
          :type="barVisible.detailBar ? 'primary' : ''"
          size="mini"
          @click="toggleBarVisible('detailBar')"
        >
          {{ $t('sideBar.detail') }}
        </el-button>
      </div>
      <div class="btn_group">
        <!-- toggle simple mode -->
        <!-- <el-button
          plain
          :type="isDoubleBar ? 'primary' : ''"
          size="mini"
          @click="toggleDoubleBar()"
        >
          {{ $t('sideBar.doubleBar') }}
        </el-button> -->
        <!-- toggle simple mode -->
        <el-button
          plain
          :type="isSimpleMode ? 'primary' : ''"
          size="mini"
          @click="toggleSimpleMode()"
        >
          {{ $t('sideBar.simple') }}
        </el-button>
        <!-- toggle collapse sidebar -->
        <el-tooltip
          class="item"
          effect="dark"
          :content="collapseText"
          placement="right"
        >
          <el-button
            plain
            :type="!isCollapse ? 'primary' : ''"
            size="mini"
            @click="isCollapse = !isCollapse"
            :title="collapseText"
          >
            <i
              :class="
                isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
              "
            ></i>
            <!-- {{ collapseText }} -->
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    // index: route
    handleSelect(index) {
      this.$changePanel(index)
    },
    toggleBarVisible(bar) {
      this.$store.commit('TOGGLE_BAR_VISIBILITY', bar)
    },
    toggleSimpleMode() {
      this.$store.commit('TOGGLE_SIMPLE_MODE')
    },
    toggleDoubleBar() {
      this.$store.commit('TOGGLE_DOUBLE_BAR')
    }
  },
  computed: {
    collapseText() {
      return this.isCollapse
        ? this.$t('sideBar.expand')
        : this.$t('sideBar.collapse')
    },
    ...mapState({
      barVisible: state => state.barVisible,
      isSimpleMode: state => state.isSimpleMode,
      isDoubleBar: state => state.isDoubleBar
    })
  }
}
</script>

<style lang="scss" scoped>
.side_bar {
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-right: solid 1px #e6e6e6;
  .el-menu-vertical {
    border-right: 0;
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
  .el-menu-vertical:not(.el-menu--collapse) {
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
    padding: 5px 2px;
    margin: 2px auto;
  }
  .btn_group {
    display: flex;
    flex-direction: column;
    margin-bottom: 7px;
  }
}
</style>
