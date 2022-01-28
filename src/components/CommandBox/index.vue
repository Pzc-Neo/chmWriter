<template>
  <div class="command_box" v-if="isShow" @keyup.esc="hideCommandBox">
    <el-input
      ref="commandBox"
      placeholder="test"
      v-model="command"
      autofocus
      @change="handleChange"
      @input="handleInput"
      @keydown.native="handleKeyup"
    >
      <div slot="append">{{ $t('tables.' + tableName) }}</div>
    </el-input>
    <div class="no_result" v-show="resultList.length <= 0">
      {{ $t('result.noResult') }}
    </div>
    <ul
      class="result_list"
      ref="resultList"
      v-show="resultList.length > 0"
      @click.stop="handleResultClick"
    >
      <li v-for="(result, index) in resultList" :key="result.id" :index="index">
        <div :class="['item', { active: resultIndex === index }]">
          <span class="left">{{ result.title }}</span>
          <span class="right">{{ $formatTime(result.updated) }}</span>
        </div>
        <!-- <el-tag :type="resultIndex === index ? 'success' : ''">
          <span class="left">{{ result.title }}</span>
          <span class="right">{{ result.updated }}</span>
        </el-tag> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounceVue } from '@/util/base'
import { scrollToView } from '@/util/dom'
export default {
  data() {
    return {
      resultList: [],
      resultIndex: 0,
      tableName: 'chapters',
      panelName: 'writing',
      command: '',
      typeMap: {
        // S: search

        // Search all panel's groups and items
        // Sall: '',
        // // Search current panel's items
        // Scurrent: '@.',
        // // Search current panel's groups
        // ScurrentG: '@.g',

        // Search datas
        Sdata: '@d',
        // Search data_groups
        SdataG: '@dg',
        // Search chapters
        Swriting: '@w',
        // Search chapter_groups
        SwritingG: '@wg',
        // Search worlds (W is uppercase)
        Sworld: '@W',
        // Search world_groups (W is uppercase)
        SworldG: '@Wg',
        // Search characters
        Scharacter: '@c',
        // Search characters
        ScharacterG: '@cg',
        // Search plots
        Splot: '@p',
        // Search plot_groups
        SplotG: '@pg',

        // C: command
        Call: '>',
        Cdata: '>d',
        Cwriting: '>w',
        Cworld: '>W',
        Ccharacter: '>c',
        Cplot: '>p'
      },
      panelMap: {
        data: 'datas',
        dataG: 'data_groups',
        writing: 'chapters',
        writingG: 'chapter_groups',
        world: 'world_items',
        worldG: 'world_groups',
        character: 'characters',
        characterG: 'character_groups',
        plot: 'plots',
        plotG: 'plot_groups'
      }
    }
  },
  methods: {
    handleInput: debounceVue('parseCommand', 300),
    parseCommand() {
      // Replace multiple spaces to single space.
      this.command = this.command.replace(/[ ]+/g, ' ')

      // typeValue is typeMap's value.
      //     -example: @w
      // command is any string.
      const [typeValue, command] = this.command.split(' ', 2)
      if (typeValue === undefined) {
        this.tableName = 'no'
        return
      }

      if (command === undefined) return

      if (command === '') {
        this.resultList = []
      }

      // typeKey is typeMap's key
      // example: Swriting
      const typeKey = Object.keys(this.typeMap).find(
        key => this.typeMap[key] === typeValue
      )
      if (typeKey === undefined) return

      // example: writing
      this.panelName = typeKey.substring(1, typeKey.length)
      // example: chapters
      this.tableName = this.panelMap[this.panelName]
      console.log(this.tableName)
      // example: S
      const type = typeKey.substr(0, 1)
      this.resultIndex = 0
      if (type === 'S') {
        this.handleSearch(this.tableName, command)
      }
      if (type === 'C') {
        this.handleCommand(this.tableName, command)
      }
    },
    handleSearch(tableName, text) {
      text = '%' + text.split('').join('%') + '%'
      const query = `SELECT * FROM ${tableName} WHERE title like ?`
      // const query = `select c.id,c.title,c.updated,g.id,g.title from ${tableName} as c inner join ${
      //   tableName.substring(0, tableName.length - 1) + '_groups'
      // } as g on g.id=c.group_id  where c.title like ?;
      // `
      const stmt = this.$db.db.prepare(query)
      this.resultList = stmt.all([text])
    },
    handleCommand(tableName, text) {
      console.log(tableName, text)
    },
    hideCommandBox() {
      this.$store.commit('HIDE_COMMANDBOX')
      this.resultList = []
    },
    handleKeyup(e) {
      if (e.ctrlKey === true && e.key === 'j') {
        this.changeResultIndex()
      }
      if (e.ctrlKey === true && e.key === 'k') {
        this.changeResultIndex(false)
      }
    },
    changeResultIndex(isIncrease = true) {
      // increase
      if (isIncrease) {
        if (this.resultIndex < this.resultList.length - 1) {
          this.resultIndex++
        } else {
          this.resultIndex = 0
        }
        // decrease
      } else {
        if (this.resultIndex > 0) {
          this.resultIndex--
        } else {
          this.resultIndex = this.resultList.length - 1
        }
      }
      scrollToView('.item.active', 0)
    },
    handleChange() {
      const targetItem = this.resultList[this.resultIndex]
      if (targetItem === undefined) return

      let funcName = 'change-to-item'
      if (/G$/.test(this.panelName)) {
        funcName = 'change-to-group'
        this.panelName = this.panelName.replace(/G/, '')
      }

      // switch to target panel
      // example: /writing
      this.$router.push('/' + this.panelName)

      // Event example: 'writing:change-to-item'
      this.$bus.$emit(this.panelName + ':' + funcName, targetItem)
      this.$store.commit('HIDE_COMMANDBOX')

      // reset data
      this.resultList = []
      this.resultIndex = 0
    },
    handleResultClick(e) {
      let target = e.srcElement

      while (target.tagName !== 'LI') {
        target = target.parentNode
      }
      console.log(this.resultIndex)
      this.resultIndex = target.getAttribute('index') * 1
      console.log(this.resultIndex)
      this.handleChange()
      // console.log(target, target.getAttribute('index'))
    },
    handleClick() {}
  },
  computed: {
    ...mapState({
      isShow: state => state.commandBox.isShow,
      type: state => state.commandBox.type,
      currentPanel: state => state.currentPanel
    })
  },
  mounted() {
    this.command = this.typeMap[this.type]
  },
  watch: {
    isShow(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          let mode = null
          if (this.type === 'search') {
            mode = 'S'
          } else if (this.type === 'command') {
            mode = 'C'
          } else {
            return
          }
          // example: Swriting, Cwriting
          const typeMapKey = mode + this.currentPanel
          console.log(typeMapKey)
          // example: @w, >w
          this.command = this.typeMap[typeMapKey]
          this.$refs.commandBox.focus()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.command_box {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 500px;
  height: 60%;
  overflow: hidden;
  top: 35px;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);

  /deep/ .el-input {
    width: 100%;
  }
  .no_result {
    width: 100%;
    padding: 5px 8px;
    overflow: auto;
    border: 1px solid #dcdfe6;
    background: white;
  }
  .result_list {
    width: 100%;
    overflow: auto;
    border: 1px solid #dcdfe6;
    .item {
      display: flex;
      padding: 5px 8px;
      background: white;
      .left {
        width: 50%;
        text-align: left;
      }
      .right {
        width: 50%;
        text-align: right;
      }
    }
    .item.active {
      background: #ecf5ff;
      color: #409eff;
    }
  }
}
</style>
