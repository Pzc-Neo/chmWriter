<template>
  <div class="chart_stencil" ref="stencilContainer"></div>
</template>

<script>
import { Addon } from '@antv/x6'
import { loadGraph } from './graph'
const { Stencil } = Addon
// const { Rect, Circle, Path, Polygon, Ellipse } = Shape
export default {
  props: {
    graph: {
      require: true
    }
  },
  watch: {
    graph() {
      this.init()
    }
  },
  methods: {
    init() {
      const stencil = new Stencil({
        title: 'Components',
        target: this.graph,
        search(cell, keyword) {
          const isInclude = cell?.label?.indexOf(keyword)
          return isInclude !== undefined && isInclude !== -1
        },
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
          {
            name: 'basicGraphGroup',
            title: '基础图形',
            graphHeight: 165
          },
          {
            name: 'group2',
            title: 'Group'
          }
        ],
        layoutOptions: {
          columns: 2,
          // auto: 所有节点中最高节点的高度作为行高，compact: 该行中最高节点的高度作为行高。
          columnWidth: 100,
          rowHeight: 50,
          dx: 5,
          dy: 5,
          resizeToFit: true
        }
      })

      this.$refs.stencilContainer.appendChild(stencil.container)
      loadGraph.call(this, stencil)
    }
  }
}
</script>

<style lang="scss">
.chart_stencil {
  flex: 1;
  width: 200px;
  border: 1px solid $border-color;
  position: relative;
  /deep/.x6-widget-stencil {
    background-color: #fff;
    .x6-widget-stencil-title {
      color: #409eff;
      background: #ecf5ff;
    }
    .x6-widget-stencil-group {
      .x6-widget-stencil-group-title {
        color: #409eff;
        background: #ecf5ff;
      }
    }
  }
}
</style>
