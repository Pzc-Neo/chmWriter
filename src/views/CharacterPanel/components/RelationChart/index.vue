<template>
  <div class="relation_chart">
    <div></div>
  </div>
</template>

<script>
import { convertToRelationLink } from '@/views/CharacterPanel/util/converter'
import getOption from './getOption'
export default {
  mounted() {
    this.chartRender()
    window.addEventListener('resize', this.chartResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize)
    // destroy chart
    this.chart.dispose()
  },
  props: {
    relationData: {
      type: Array,
      default() {
        return []
      }
    },
    linkData: {
      type: Array,
      default() {
        return []
      }
    },
    addRelationMode: {
      type: Object,
      require: true
    },
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    relationTableName: {
      type: String,
      default: ''
    }
  },
  watch: {
    relationData: {
      handler() {
        this.chartRender()
      },
      deep: true
    },
    linkData: {
      handler() {
        this.chartRender()
      },
      deep: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    getLink(relationData) {
      const temp = this.$db.getGroups(this.relationTableName, false)
      this.relationLink = convertToRelationLink(temp)

      // relationData.forEach(data => {
      //   const temp = this.$db.getItems('character_relation')
      //   this.links = convertToRelationLink(temp)
      // })
    },
    chartRender() {
      // this.getLink()
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(this.$el, null, { renderer: 'svg' })
      const option = getOption.call(this)
      // 绘制图表
      this.chart.setOption(option)
      this.chart.on('click', params => {
        // const targetItem = params.data
        // console.log(targetItem)
        if (!this.addRelationMode.isOn) {
          if (params.dataType === 'node') {
            this.$emit('change-to-item', params.data.id)
          }
          if (params.dataType === 'edge') {
            this.$emit('update-relation', params.data)
          }
        } else {
          const source = this.addRelationMode.params.data
          const target = params.data
          const date = Date.now()

          this.$prompt(
            relation => {
              const relationItem = {
                id: source.id + target.id,
                source_id: source.id,
                target_id: target.id,
                relation: relation,
                created: date,
                updated: date
              }
              this.$emit('new-relation', relationItem)
            },
            '',
            false
          )
        }
      })
      this.chart.on('contextmenu', params => {
        const param = {
          event: params.event.event,
          targetItem: params,
          menuList: this.menuList
        }
        console.log(param)
        this.$store.commit('SHOW_CONTEXTMENU', param)
      })
    },
    chartResize() {
      this.chart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.relation_chart {
  width: 100%;
  height: 100%;
}
</style>
