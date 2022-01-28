<template>
  <div class="hot_key">
    <h1>快捷键展示组件</h1>
    <template v-for="(item, index) in hotKeyList">
      <div class="list-item" :key="`${item.tag}_${index}`">
        <div class="label">绑定的标签：</div>
        <el-select v-model="hotKeyList[index].tag" placeholder="请选择标签">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
        <div class="label">对应的快捷键：</div>
        <HotkeyInput
          class="hotkey"
          :hotkey.sync="hotKeyList[index].key"
          :verify="handleHotkeyVerify"
          placeholder="请按需要绑定的按键，支持组合按键"
        />
      </div>
    </template>
  </div>
</template>

<script>
import HotkeyInput from './components/HotKeyInput.vue'

export default {
  name: 'HotKey',
  components: {
    HotkeyInput
  },
  data() {
    return {
      options: [
        { label: 'tag1', value: '1' },
        { label: 'tag2', value: '2' },
        { label: 'tag3', value: '3' },
        { label: 'tag4', value: '4' },
        { label: 'tag5', value: '5' }
      ],
      hotKeyList: [
        {
          id: 'showCommandBoxSearch',
          key: 'ctrl+p',
          funcName: 'showCommandBox',
          prama: ['search']
        },
        {
          id: 'showCommandBoxCommand',
          key: 'shift+ctrl+p',
          funcName: 'showCommandBox',
          prama: ['command']
        },
        {
          id: 'swtichTab',
          key: 'ctrl+tab',
          funcName: 'switchTab',
          prama: []
        },
        {
          id: 'swtichTab',
          key: 'shift+ctrl+tab',
          funcName: 'switchTab',
          prama: [false]
        }
      ]
    }
  },
  methods: {
    handleHotkeyVerify(hotkey) {
      for (const item of this.hotKeyList) {
        for (const key of item.keys) {
          if (key.text === hotkey.text) {
            this.$notify({
              title: '提示',
              message: '此快捷键已被绑定',
              type: 'warning'
            })
            return false
          }
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.hot_key {
  // width: 60%;
  // height: 85%;
  padding: 15px;
  margin: 0 auto;
  z-index: 1000;
  background: white;
  border: solid 1px #e6e6e6;
}
.hot_key > h1 {
  font-size: 23px;
  text-align: center;
}
.list-item {
  margin-top: 30px;
}
.list-item > .label {
  color: #666;
  margin-top: 6px;
}
</style>
