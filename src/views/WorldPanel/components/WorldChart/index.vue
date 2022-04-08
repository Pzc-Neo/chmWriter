<template>
  <div class="world_chart">
    <div class="chart_content" ref="container"></div>
    <div class="side">
      <div class="chart_stencil" ref="stencilContainer"></div>
      <div class="chart_minimap" ref="minimapContainer"></div>
    </div>
  </div>
</template>

<script>
import { Graph, Shape, Addon } from '@antv/x6'
import { getGraphOption } from './graphOption'
import { showContextmenu } from '@/util/base'

import { menuListFactory } from './menuList/index'

const { Stencil } = Addon
const { Rect, Circle } = Shape

export default {
  name: 'WorldChart',
  props: {
    panelName: {
      type: String,
      default: ''
    },
    chartDataStr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      graph: {},
      menuListNode: menuListFactory.call(this, 'node'),
      menuListEdge: menuListFactory.call(this, 'edge'),
      menuListBlank: menuListFactory.call(this, 'graph')
    }
  },
  computed: {
    chartData() {
      try {
        const tempObj = JSON.parse(this.chartDataStr)
        if (tempObj === null) {
          return { cells: [] }
        } else {
          return tempObj
        }
      } catch (error) {
        this.$alert(error)
        return { cells: [] }
      }
    }
  },
  watch: {
    chartData(newValue) {
      this.graph.fromJSON(newValue)
    }
  },
  mounted() {
    this.init()

    // this.$bus.$on('world-chart:centerContent', () => {
    //   this.graph.centerContent()
    // })

    this.$bus.$on(this.panelName + ':save-content', () => {
      this.saveContent()
    })
  },
  methods: {
    init() {
      const graphOption = getGraphOption.call(this)
      const graph = new Graph(graphOption)
      this.graph = graph

      // 双击修改
      graph.on('cell:dblclick', ({ cell, e }) => {
        const isNode = cell.isNode()
        const name = cell.isNode() ? 'node-editor' : 'edge-editor'
        cell.removeTool(name)
        cell.addTools({
          name,
          args: {
            event: e,
            attrs: {
              backgroundColor: isNode ? '#EFF4FF' : '#FFF'
            }
          }
        })
      })

      graph.on('node:contextmenu', ({ e, x, y, node, view }) => {
        showContextmenu.call(this, e, this.menuListNode, {
          id: node.id,
          node,
          x,
          y
        })
      })
      graph.on('blank:contextmenu', ({ e, x, y }) => {
        showContextmenu.call(this, e, this.menuListBlank, {
          x,
          y
        })
      })

      graph.fromJSON(this.chartData)

      graph.centerContent()

      const stencil = new Stencil({
        title: 'Components',
        target: graph,
        search: true,
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
          {
            name: 'group1',
            title: 'Group(Collapsable)'
          },
          {
            name: 'group2',
            title: 'Group',
            collapsable: false
          }
        ]
      })

      this.$refs.stencilContainer.appendChild(stencil.container)

      const r = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 2 },
          text: { text: 'rect', fill: 'white' }
        }
      })

      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#FE854F', strokeWidth: 2, stroke: '#4B4A67' },
          text: { text: 'ellipse', fill: 'white' }
        }
      })

      const c2 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#4B4A67', 'stroke-width': 2, stroke: '#FE854F' },
          text: { text: 'ellipse', fill: 'white' }
        }
      })

      const r2 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 2 },
          text: { text: 'rect', fill: 'white' }
        }
      })

      const r3 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 2 },
          text: { text: 'rect', fill: 'white' }
        }
      })

      const c3 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#FE854F', strokeWidth: 2, stroke: '#4B4A67' },
          text: { text: 'ellipse', fill: 'white' }
        }
      })

      stencil.load([r, c, c2, r2.clone()], 'group1')
      stencil.load([c2.clone(), r2, r3, c3], 'group2')
    },
    saveContent() {
      this.$emit('saveContent', JSON.stringify(this.graph.toJSON()))
    },
    copy() {
      const cells = this.graph.getSelectedCells()
      if (cells && cells.length) {
        this.graph.copy(cells, { deep: true })
        this.$message(this.$t('action.copy') + this.$t('result.success'))
      } else {
        this.$message('请先选中节点再复制')
      }
    },
    paste() {
      if (this.graph.isClipboardEmpty()) {
        this.$message('剪切板为空，不可粘贴')
      } else {
        const cells = this.graph.paste()
        this.graph.cleanSelection()
        this.graph.select(cells)
        this.$message(this.$t('action.paste') + this.$t('result.success'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.world_chart {
  /* font-family: sans-serif; */
  flex: 1;
  display: flex;
  overflow: hidden;
  .chart_scroller {
    flex: 1;
  }
  .chart_content {
    flex: 1;
    height: 520px;
    margin-left: 8px;
    margin-right: 8px;
    box-shadow: $box-shadow-1;
  }
  .side {
    display: flex;
    .chart_stencil {
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
    .chart_minimap {
      position: absolute;
      bottom: 0px;
      right: 198px;
      border: 1px solid $border-color;
      box-shadow: $box-shadow-1;
    }
  }
  .x6-graph-scroller {
    border: 1px solid #f0f0f0;
    margin-left: -1px;
  }
}
</style>
