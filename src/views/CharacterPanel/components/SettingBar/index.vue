<template>
  <div
    class="setting_bar"
    ref="settingBar"
    @contextmenu.prevent="showContextMenuSettingBar($event)"
  >
    <div
      class="setting_item"
      v-for="(setting, index) in settingTagList"
      :key="setting.id"
      :id="setting.id"
      type="setting_item"
      draggable="true"
      @dragstart="dragStart($event, setting, index)"
      @dragover="handleDragover($event)"
      @drop="handleDrop($event, index)"
    >
      <!-- sid: setting's id -->
      <el-tag>{{ settingTree[setting.sid].title }}</el-tag>
      <el-cascader
        filterable
        v-model="setting.value"
        :options="settingTree[setting.sid].children"
        :props="{ expandTrigger: 'hover', label: 'title', value: 'id' }"
        @change="handleChange"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import { showContextmenu } from '@/util/base'
export default {
  props: {
    menulistSettingBar: {
      type: Array,
      default() {
        return []
      }
    },
    menulistSettingTag: {
      type: Array,
      default() {
        return []
      }
    },
    settingTree: {
      type: Object,
      default() {
        return {}
      }
    },
    settingTagList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    showContextMenuSettingBar(event) {
      let target = event.target || event.srcElement
      if (target === this.$refs.settingBar) {
        showContextmenu.call(this, event, this.menulistSettingBar)
      } else {
        while (target !== this.$refs.settingBar) {
          if (target.getAttribute('type') === 'setting_item') {
            const settingTag = this.getSettingTag(target.id)
            showContextmenu.call(
              this,
              event,
              this.menulistSettingTag,
              settingTag
            )
            break
          } else {
            target = target.parentNode
          }
        }
      }
    },
    handleChange(value) {
      this.$emit('update-setting', this.settingTagList)
    },
    getSettingTag(tagId) {
      const index = this.settingTagList.findIndex(settingTag => {
        return settingTag.id === tagId
      })
      if (index !== -1) {
        return this.settingTagList[index]
      } else {
        return {}
      }
    },
    dragStart: function (event, setting, index) {
      event.dataTransfer.setData('drapIndex', index)

      // Will use it when drop to group tree
      event.dataTransfer.setData('settingId', setting.id)
    },
    handleDragover: function (event) {
      event.preventDefault()
    },
    handleDrop(event, index) {
      let drapIndex = event.dataTransfer.getData('drapIndex')
      let dropIndex = index
      drapIndex = parseInt(drapIndex)
      dropIndex = parseInt(dropIndex)
      const signList = this.settingTagList

      let resultList = []

      if (drapIndex === dropIndex) {
        return
      }
      // 往右拖拽
      if (drapIndex < dropIndex) {
        const list1 = signList.slice(0, drapIndex)
        const list2 = signList.slice(drapIndex, dropIndex + 1)
        list2.reverse()
        const list3 = signList.slice(dropIndex + 1)
        resultList = list1.concat(list2).concat(list3)

        // 往左拖拽
      } else if (drapIndex > dropIndex) {
        const list1 = signList.slice(0, dropIndex)
        const list2 = signList.slice(dropIndex, drapIndex + 1)
        list2.reverse()
        const list3 = signList.slice(drapIndex + 1)
        resultList = list1.concat(list2).concat(list3)
      }
      this.$emit('update-sorts', resultList)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting_bar {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-content: flex-start;
  padding: 3px;
  border-top: 1px solid $border-color;
  .setting_item {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 3px;
    margin: 3px;
    height: $dtb-height;
    line-height: $dtb-line-height;
    .el-tag {
      flex: 0 0 65px;
      padding: 0 4px;
      text-align: center;
      height: $dtb-height;
      line-height: $dtb-line-height;
      cursor: move;
      user-select: none;
    }
    /deep/.el-cascader {
      margin-left: 3px;
      flex: 1;
      .el-input {
        .el-input__inner {
          height: $dtb-height;
          line-height: $dtb-line-height;
        }
      }
    }
  }
}
</style>
