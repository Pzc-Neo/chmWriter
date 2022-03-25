<template>
  <div v-if="$store.state.isSimpleMode" class="simple_mode_item">
    {{ item.title }}
  </div>
  <div v-else class="detail_mode_item">
    <div class="col top">
      <div class="left">
        {{ item.title }}
      </div>
      <el-tag class="right" :type="tagTypes[item.type]">
        {{ item.identity }}
      </el-tag>
      <!-- <div class="right">
        {{ item.identity }}
      </div> -->
    </div>
    <div class="col middle">
      {{ item.descriptionText || item.description }}
    </div>
    <div class="col bottom">
      <div class="left">
        <el-tag :type="tagTypes[item.sex]">
          <span class="left">{{ sexs[item.sex] }}</span>
          <span class="right">{{ item.age }}</span>
        </el-tag>
      </div>
      <div class="right">{{ item.hobby }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tagTypes: ['success', 'primary', 'warning', 'success']
    }
  },
  computed: {
    types() {
      return [
        this.$t('writing.type.normal'),
        this.$t('writing.type.transition').substr(0, 5),
        this.$t('writing.type.important')
      ]
    },
    status() {
      return [
        this.$t('writing.status.first'),
        this.$t('writing.status.second'),
        this.$t('writing.status.final')
      ]
    },
    sexs() {
      return [
        this.$t('character.sex.girl'),
        this.$t('character.sex.boy'),
        this.$t('character.sex.unknow')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.simple_mode_item {
  padding: 7px 8px;
  border-bottom: 1px solid #f3f3f3;
}
.detail_mode_item {
  display: flex;
  flex-direction: column;
  padding: 5px 6px;
  border-bottom: 1px solid #e6e6e6;
  .col {
    display: flex;
    justify-content: space-between;
  }
  .top {
    font-size: 15px;
    > .left {
      color: #3e5f80;
      // color: #8cc5ff;
      font-weight: bold;
    }
    > .right {
      font-size: 13px;
      max-width: 115px;
      padding: 0px 5px;
      position: relative;
      top: -5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 22px;
      line-height: 22px;
      border-radius: 0px 0px 3px 3px;
      .right {
        margin-left: $dtb-margin;
        font-size: 12px;
      }
    }
  }
  .middle {
    margin-top: 2px;
    margin-bottom: 7px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.5em;
    overflow: hidden;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    > .left {
      .el-tag {
        height: 20px;
        line-height: 20px;
        padding: 0px 5px;
        .right {
          margin-left: $dtb-margin;
        }
      }
    }
    > .right {
      flex: 1;
      margin-left: $dtb-margin;
      text-align: right;
    }
  }
}
</style>
