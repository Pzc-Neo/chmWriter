<template>
  <div class="tool_bar">
    <div class="tools" v-show="currentCellType === 'edge'">
      <span class="tool">
        <el-tag>颜色</el-tag>
        <el-color-picker
          v-model="edge.strokeColor"
          size="small"
          show-alpha
          :predefine="predefineColors"
          @active-change="setEdgeStrokeColor"
          @change="setEdgeStrokeColor"
        ></el-color-picker>
      </span>
      <span class="tool">
        <el-select v-model="edge.sourceMarker" placeholder="请选择">
          <el-option
            v-for="marker in edge.markerList"
            :key="marker.value"
            :label="marker.label"
            :value="marker.value"
          ></el-option>
        </el-select>
      </span>
      <span class="tool">
        <el-select v-model="edge.targetMarker" placeholder="请选择">
          <el-option
            v-for="marker in edge.markerList"
            :key="marker.value"
            :label="marker.label"
            :value="marker.value"
          ></el-option>
        </el-select>
      </span>
      <span class="tool">
        <el-tag>样式</el-tag>
        <el-select v-model="edge.connector" placeholder="请选择">
          <el-option
            v-for="connector in edge.connectorList"
            :key="connector.value"
            :label="connector.label"
            :value="connector.value"
          ></el-option>
        </el-select>
      </span>
      <span class="tool">
        <el-input-number
          v-model="edge.strokeWidth"
          @change="setEdgeStrokeWidth"
          :min="1"
          size="mini"
          label="描述文字"
        ></el-input-number>
      </span>
    </div>
    <div
      class="tools"
      v-show="currentCellType !== '' && currentCellType !== 'edge'"
    >
      <span class="tool">
        <el-tag>填充</el-tag>
        <el-color-picker
          v-model="node.fillColor"
          size="small"
          show-alpha
          :predefine="predefineColors"
          @active-change="setFillColor"
          @change="setFillColor"
        ></el-color-picker>
      </span>
      <span class="tool">
        <el-tag>描边</el-tag>
        <el-color-picker
          v-model="node.strokeColor"
          size="small"
          show-alpha
          :predefine="predefineColors"
          @active-change="setStrokeColor"
          @change="setStrokeColor"
        ></el-color-picker>
      </span>
      <span class="tool">
        <el-tag>文字</el-tag>
        <el-color-picker
          v-model="node.textColor"
          size="small"
          show-alpha
          :predefine="predefineColors"
          @active-change="setTextColor"
          @change="setTextColor"
        ></el-color-picker>
      </span>
      <span class="tool">
        <el-tag>描边宽度</el-tag>
        <el-input-number
          v-model="node.strokeWidth"
          @change="setNodeStrokeWidth"
          :min="1"
          size="mini"
          label="描述文字"
        ></el-input-number>
      </span>
    </div>
    <div class="tools" v-show="currentCellType === ''">
      <span class="tool">
        <el-tag>背景颜色</el-tag>
        <el-color-picker
          v-model="graph.fillColor"
          size="small"
          show-alpha
          :predefine="predefineColors"
          @active-change="setGraphBgColor"
          @change="setGraphBgColor"
        ></el-color-picker>
      </span>
    </div>
  </div>
</template>

<script>
import { Color } from '@antv/x6'
export default {
  props: {
    currentCellType: { type: String, default: '' },
    currentCell: {
      require: true
    }
  },
  watch: {
    currentCell(newCell) {
      switch (this.currentCellType) {
        case 'edge': {
          const line = newCell?.attrs?.line
          this.edge.targetMarker = line?.targetMarker || ''
          this.edge.sourceMarker = line?.sourceMarker || ''
          this.edge.connector = newCell?.connector?.name || 'normal'
          break
        }
        case 'path': {
          const target = newCell?.attrs?.body
          this.setToolColor(newCell, target)
          break
        }
        case 'rect': {
          const target = newCell?.attrs?.rect
          this.setToolColor(newCell, target)
          break
        }
        case 'circle': {
          const target = newCell?.attrs?.circle
          this.setToolColor(newCell, target)
          break
        }
        case 'polygon': {
          const target = newCell?.attrs?.polygon
          this.setToolColor(newCell, target)
          break
        }
        default:
          break
      }
    },
    'edge.targetMarker'(newMarker) {
      this.$emit('setEdgeAttr', 'targetMarker', newMarker)
    },
    'edge.sourceMarker'(newMarker) {
      this.$emit('setEdgeAttr', 'sourceMarker', newMarker)
    },
    'edge.connector'(newConnector) {
      this.$emit('setEdgeConnector', newConnector)
    },
    'edge.strokeWidth'(newStrokeWidth) {
      this.setEdgeStrokeWidth(newStrokeWidth)
    }
  },
  data() {
    return {
      edge: {
        strokeColor: 'rgba(255, 255, 255,1)',
        strokeWidth: 2,
        sourceMarker: 'block',
        targetMarker: 'block',
        markerList: [
          {
            value: '',
            label: 'none'
          },
          {
            value: 'block',
            label: 'block'
          },
          {
            value: 'classic',
            label: 'classic'
          },
          {
            value: 'diamond',
            label: 'diamond'
          },
          {
            value: 'cross',
            label: 'cross'
          },
          // {
          //   value: 'async',
          //   label: 'async'
          // },
          {
            value: 'circle',
            label: 'circle'
          },
          {
            value: 'circlePlus',
            label: 'circlePlus'
          },
          {
            value: 'ellipse',
            label: 'ellipse'
          },
          {
            value: 'async',
            label: 'async'
          }
        ],
        connector: 'normal',
        connectorList: [
          {
            value: 'normal',
            label: 'normal'
          },
          {
            value: 'smooth',
            label: 'smooth'
          },
          {
            value: 'rounded',
            label: 'rounded'
          },
          {
            value: 'jumpover',
            label: 'jumpover'
          }
        ]
      },
      node: {
        fillColor: 'rgba(85, 143, 249, 1)',
        strokeColor: 'rgba(255, 255, 255,1)',
        textColor: 'rgba(255, 255, 255,1)',
        strokeWidth: 2
      },
      graph: {
        fillColor: 'rgba(85, 143, 249, 1)'
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  methods: {
    // tool bar methods
    setFillColor(color, a) {
      this.$emit('setFillColor', color)
    },
    setStrokeColor(color) {
      this.$emit('setStrokeColor', color)
    },
    setNodeStrokeWidth(strokeWidth) {
      this.$emit('setNodeAttr', 'strokeWidth', strokeWidth)
    },
    setEdgeStrokeWidth(strokeWidth) {
      this.$emit('setEdgeAttr', 'strokeWidth', strokeWidth)
    },
    setTextColor(color) {
      this.$emit('setTextColor', color)
    },
    setEdgeStrokeColor(color) {
      this.$emit('setEdgeStrokeColor', color)
    },
    setEdgeConnector(type) {
      this.$emit('setEdgeConnector', type)
    },
    setToolColor(cell, target) {
      const body = cell?.attrs?.body
      const fill = body?.fill
      const stroke = body?.stroke
      const strokeWidth = body?.strokeWidth
      this.node.fillColor = fill || target?.fill
      this.node.strokeColor = stroke || target?.stroke
      this.node.strokeWidth = strokeWidth || target?.strokeWidth
      this.node.textColor = new Color(cell?.attrs?.text?.fill).toHex()
    },
    setGraphBgColor(color) {
      this.$emit('setGraphAttr', 'bgColor', color)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool_bar {
  position: absolute;
  bottom: 6px;
  left: 4px;
  .tools {
    display: flex;
    align-items: center;
    .tool {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
    .el-tag {
      flex: 0 0 40px;
      padding: 0 4px;
      text-align: center;
      height: $dtb-height;
      line-height: $dtb-line-height;
    }
    /deep/.el-color-picker.el-color-picker--small {
      height: 30px;
      .el-color-picker__trigger {
        height: 30px;
        width: 30px;
        border: 0;
      }
    }
    /deep/.el-select {
      .el-input {
        .el-input__inner {
          width: 100px;
          height: $dtb-height;
          line-height: $dtb-line-height;
          padding: 0 6px;
          margin-left: $dtb-margin;
        }
        .el-input__suffix {
          .el-input__icon {
            height: $dtb-height;
            line-height: $dtb-line-height;
          }
        }
      }
    }
    /deep/ .el-input-number.el-input-number--mini {
      width: 90px;
      height: 30px;
    }
  }
}
</style>
