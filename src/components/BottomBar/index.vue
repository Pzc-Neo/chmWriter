<template>
  <div class="bottom_bar">
    <template v-if="getIsShowDefault('left')">
      <div class="default left">
        <div>default left</div>
      </div>
    </template>
    <template v-else>
      <SectionBox class="left" :data="getData('left')" />
    </template>

    <template v-if="getIsShowDefault('middle')">
      <div class="default middle">
        <div>default middle</div>
      </div>
    </template>
    <template v-else>
      <SectionBox class="middle" :data="getData('middle')" />
    </template>

    <template v-if="getIsShowDefault('right')">
      <div class="default right">
        <div>default right</div>
      </div>
    </template>
    <template v-else>
      <SectionBox class="right" :data="getData('right')" />
    </template>
  </div>
</template>

<script>
import SectionBox from './components/SectionBox.vue'
export default {
  components: {
    SectionBox
  },
  methods: {
    getIsShowDefault(type) {
      if (this.bottomBarData === null) {
        return true
      } else {
        return this.bottomBarData.isShowDefault[type]
      }
    },
    getData(type) {
      if (this.bottomBarData === null) {
        return {}
      } else {
        return this.bottomBarData[type]
      }
    }
  },
  computed: {
    bottomBarData() {
      return this.$store.state.bottomBarData
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom_bar {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  height: 25px;
  line-height: 25px;
  padding: 0px 8px;
  color: #fff;
  background-color: #409eff;
  .default {
    display: flex;
    overflow: hidden;
    flex: 1;
    div {
      padding: 0px 5px;
      margin-left: 3px;
      cursor: pointer;
    }
    div:hover {
      background-color: #61b0ff;
    }
  }
  .left {
    justify-content: flex-start;
  }
  .middle {
    justify-content: center;
  }
  .right {
    justify-content: flex-end;
  }
}
</style>
