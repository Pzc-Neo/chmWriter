<template>
  <div class="world_chart">
    <div></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.chartRender()
    window.addEventListener('resize', this.chartResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize)
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    chartRender() {
      console.log(this)
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(this.$el)
      // 绘制图表
      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    },
    chartResize() {
      this.chart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.world_chart {
  width: 100%;
  height: 100%;
}
</style>
