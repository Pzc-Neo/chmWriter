<template>
  <div class="world_chart">
    <div class="main">
      <div class="chart_content" ref="container"></div>
      <ToolBar
        :currentCellType="currentCellType"
        :currentCell="currentCell"
        @setFillColor="setFillColor"
        @setStrokeColor="setStrokeColor"
        @setNodeAttr="setNodeAttr"
        @setTextColor="setTextColor"
        @setEdgeStrokeColor="setEdgeStrokeColor"
        @setEdgeAttr="setEdgeAttr"
        @setGraphAttr="setGraphAttr"
        @setEdgeConnector="setEdgeConnector"
      />
    </div>
    <div class="side">
      <StencilBar :graph="graph" />
      <div class="chart_minimap" ref="minimapContainer"></div>
    </div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import { getGraphOption } from './graphOption'
import { debounce, showContextmenu } from '@/util/base'

import { menuListFactory } from './menuList/index'
import { registerKey } from './script/keyboard'

import ToolBar from './components/ToolBar'
import StencilBar from './components/StencilBar'

export default {
  name: 'WorldChart',
  components: {
    ToolBar,
    StencilBar
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    // when switchTab it will change (for setScrollbarPos method)
    currentGroupId: {
      type: String,
      default: ''
    },
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
      isShowTools: false,
      menuListNode: menuListFactory.call(this, 'node'),
      menuListEdge: menuListFactory.call(this, 'edge'),
      menuListBlank: menuListFactory.call(this, 'graph'),
      currentCellType: '',
      currentCell: {},
      scrollerPosKey: 'scrollerPos-' + this.id
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
    },
    currentGroupId() {
      this.setScrollbarPos()
    }
  },
  mounted() {
    this.init()

    this.$bus.$on(this.panelName + ':save-content', () => {
      this.saveContent()
    })
  },
  methods: {
    init() {
      const graphOption = getGraphOption.call(this)
      const graph = new Graph(graphOption)
      this.graph = graph
      graph.lockScroller()

      registerKey.call(this, this.graph)

      graph.on('cell:click', ({ cell }) => {
        this.currentCellType = cell.shape
        this.currentCell = cell
      })
      graph.on('blank:click', () => {
        this.currentCellType = ''
        this.currentCell = {}
      })
      graph.on('blank:mouseup', () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length > 0) {
          this.currentCellType = 'node'
        } else {
          this.currentCellType = ''
        }
      })

      // 需要在鼠标按下后移动鼠标才能触发。
      graph.on('blank:mousemove', () => {
        this.saveScrollBarPos()
      })

      // 双击修改
      graph.on('cell:dblclick', ({ cell, e }) => {
        const isNode = cell.isNode()
        const name = isNode ? 'node-editor' : 'edge-editor'
        cell.removeTool(name)
        cell.addTools({
          name,
          args: {
            event: e
            // attrs: {
            //   backgroundColor: isNode ? '#EFF4FF' : '#FFF'
            // }
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

      graph.on('edge:contextmenu', ({ e, x, y, edge, view }) => {
        showContextmenu.call(this, e, this.menuListEdge, {
          id: edge.id,
          edge,
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
      // add tool
      graph.on('cell:mouseenter', ({ cell }) => {
        if (this.isShowTools) {
          if (cell.isNode()) {
            // add node tool
            cell.addTools([
              {
                name: 'button-remove',
                args: {
                  x: 0,
                  y: 0,
                  offset: { x: 10, y: 10 }
                }
              },
              {
                name: 'button',
                args: {
                  markup: [
                    {
                      tagName: 'circle',
                      selector: 'button',
                      attrs: {
                        r: 14,
                        stroke: '#fe854f',
                        'stroke-width': 3,
                        fill: 'white',
                        cursor: 'pointer'
                      }
                    },
                    {
                      tagName: 'text',
                      textContent: '>',
                      selector: 'icon',
                      attrs: {
                        fill: '#fe854f',
                        'font-size': 8,
                        'text-anchor': 'middle',
                        'pointer-events': 'none',
                        y: '0.3em'
                      }
                    }
                  ],
                  x: '100%',
                  y: '100%',
                  offset: { x: -18, y: -18 },
                  onClick({ view }) {
                    console.log(view)
                  }
                }
              }
            ])
          } else {
            // add edge tool
            cell.addTools([
              'vertices',
              'segments',
              'button-remove',
              {
                name: 'source-arrowhead',
                args: {
                  attrs: {
                    fill: '#266BB4'
                  }
                }
              },
              {
                name: 'target-arrowhead',
                args: {
                  attrs: {
                    fill: '#266BB4'
                  }
                }
              }
            ])
          }
        }
      })

      graph.on('cell:mouseleave', ({ cell }) => {
        if (this.isShowTools) {
          cell.removeTools()
        }
      })

      graph.fromJSON(this.chartData)

      graph.centerContent()
    },
    saveContent() {
      this.$emit('saveContent', JSON.stringify(this.graph.toJSON()))
    },
    cut() {
      const cells = this.graph.getSelectedCells()
      if (cells && cells.length) {
        this.graph.cut(cells, { deep: true })
        this.$message(this.$t('action.cut') + this.$t('result.success'))
      } else {
        this.$message('请先选中节点再复制')
      }
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
    },
    removeCells() {
      const cells = this.graph.getSelectedCells()
      if (cells && cells.length) {
        this.graph.removeCells(cells)
      }
    },
    undo() {
      this.graph.undo()
    },
    redo() {
      this.graph.redo()
    },
    centerContent() {
      this.graph.centerContent()
    },
    toggleIsShowTools() {
      this.isShowTools = !this.isShowTools
    },
    addPort(node, position) {
      const tempGroups = node?.port?.groups
      // A node Object have four port group: left, right, top, bottom
      // If group is not exist, then add it.
      if (tempGroups[position] === undefined) {
        node.prop('ports/groups', {
          [position]: {
            position: {
              name: position
            },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          }
        })
      }
      node.addPort({
        group: position,
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: '#409EFF',
            strokeWidth: 2,
            fill: '#fff'
          }
        }
      })
    },
    removePort(node, position) {
      const ports = node.getPortsByGroup(position)
      node.removePorts(ports)
    },
    setAttr(cells, attr, key, value) {
      cells.forEach(cell => {
        cell.attr(attr, {
          [key]: value
        })
      })
    },
    // setNodeAttr(attr, key, value) {
    //   const cells = this.graph.getSelectedCells()
    //   this.setAttr(cells, attr, key, value)
    // },

    // tool bar methods
    setFillColor(color) {
      const cells = this.graph.getSelectedCells()
      this.setAttr(cells, 'body', 'fill', color)
    },
    setStrokeColor(color) {
      const cells = this.graph.getSelectedCells()
      this.setAttr(cells, 'body', 'stroke', color)
    },
    setTextColor(color) {
      const cells = this.graph.getSelectedCells()
      this.setAttr(cells, 'text', 'fill', color)
    },
    setEdgeStrokeColor(color) {
      this.currentCell.attr('line', {
        stroke: color
      })
      this.currentCell.attr('line', {
        targetMarker: '',
        sourceMarker: ''
      })
    },
    setNodeAttr(type, value) {
      this.currentCell.attr('body', {
        [type]: value
      })
    },
    setEdgeAttr(type, value) {
      this.currentCell.attr('line', {
        [type]: value
      })
    },
    setGraphAttr(type, value) {
      if (type === 'bgColor') {
        this.graph.drawBackground({
          color: value
        })
      }
    },
    setEdgeConnector(type) {
      this.currentCell.setConnector(type)
    },
    // Save to localStorage
    saveScrollBarPos: debounce(function () {
      const pos = this.graph.getScrollbarPosition()
      const posStr = pos.left + ',' + pos.top
      console.log(this.scrollerPosKey)
      localStorage.setItem(this.scrollerPosKey, posStr)
    }, 300),
    // Remove from localStorage
    removeScrollbarPos() {
      localStorage.removeItem(this.scrollerPosKey)
    },
    setScrollbarPos() {
      const posStr = localStorage.getItem(this.scrollerPosKey)
      if (posStr !== null) {
        let pos = posStr.split(',')
        pos = pos.map(str => Number(str))
        this.graph.setScrollbarPosition(...pos)
      }
    }
  },
  activated() {
    this.setScrollbarPos()
  },
  beforeDestroy() {
    this.graph.dispose()
    this.removeScrollbarPos()
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
  .main {
    flex: 1;
    overflow: hidden;
    .chart_content {
      flex: 1;
      height: 520px;
      margin-left: 8px;
      margin-right: 8px;
      box-shadow: $box-shadow-1;
    }
  }
  .side {
    display: flex;
    flex-direction: column;
    .chart_minimap {
      border: 1px solid $border-color;
      box-shadow: 0px 0px 0px;
    }
  }
  .x6-graph-scroller {
    border: 1px solid #f0f0f0;
    margin-left: -1px;
  }
}
</style>
