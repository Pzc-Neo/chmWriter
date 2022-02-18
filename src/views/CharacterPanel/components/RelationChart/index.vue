<template>
  <div class="relation_chart">
    <div></div>
  </div>
</template>

<script>
import { convertToRelationLink } from '@/views/CharacterPanel/util'
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
    }
  },
  data() {
    return {
      chart: null
      // relationLink: []
    }
  },
  methods: {
    getLink(relationData) {
      const temp = this.$db.getGroups('character_relation', false)
      this.relationLink = convertToRelationLink(temp)

      // relationData.forEach(data => {
      //   const temp = this.$db.getItems('character_relation')
      //   this.links = convertToRelationLink(temp)
      // })
    },
    chartRender() {
      // this.getLink()
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(this.$el)
      var categories = []
      for (var i = 0; i < 2; i++) {
        categories[i] = {
          name: '类目' + i
        }
      }
      const option = {
        // 图的标题
        // title: {
        //   text: 'ECharts 关系图'
        // },
        // 提示框的配置
        tooltip: {
          formatter: function (x) {
            return x.data.des
          }
        },
        // 工具箱
        toolbox: {
          // 显示工具箱
          show: true,
          feature: {
            mark: {
              show: true
            },
            // 还原
            restore: {
              show: true
            },
            // 保存为图片
            saveAsImage: {
              show: true
            }
          }
        },
        legend: [
          {
            // selectedMode: 'single',
            data: categories.map(function (a) {
              return a.name
            })
          }
        ],
        series: [
          {
            type: 'graph', // 类型:关系图
            layout: 'force', // 图的布局，类型为力导图
            symbolSize: 70, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            force: {
              repulsion: 2500,
              edgeLength: [5, 50]
            },
            draggable: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#4b565b'
              }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function (x) {
                  return x.data.name
                },
                textStyle: {
                  fontSize: 15
                }
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 15
                }
              }
            },
            data: this.relationData,
            // 数据
            links: this.linkData,
            categories: categories
          }
        ]
      }

      // 绘制图表
      this.chart.setOption(option)
      this.chart.on('click', params => {
        // 控制台打印数据的名称
        console.log(params)
        this.$bus.$emit('RelationChart:changeToItem', params.data.id)
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
