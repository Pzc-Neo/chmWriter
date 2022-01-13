<template>
  <div class="group_bar" :style="{ width }">
    <el-tree
      :data="itemList"
      node-key="id"
      :expand-on-click-node="false"
      default-expand-all
      :highlight-current="true"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      @node-click="changeTo"
      @node-contextmenu="showContextmenu"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span
        :style="{ width }"
        class="group_tree_node"
        slot-scope="{ data }"
        :title="data.title"
        @drop="drop($event, data)"
      >
        {{ data.title }}
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: String,
      default: '170px'
    }
  },
  mounted() {},
  data() {
    return {}
  },
  methods: {
    changeTo(data, clickedNode) {
      this.$emit('changeTo', data)
    },
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop1(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', draggingNode, dropNode, dropType)
      console.log(this.itemList)
      switch (dropType) {
        case 'before':
          break
        case 'after':
          break
        case 'inner':
          break
        default:
      }
    },
    // 拖拽事件 参数依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    handleDrop: function (draggingNode, dropNode, dropType, ev) {
      var paramData = []
      // 当拖拽类型不为inner,说明只是同级或者跨级排序，只需要寻找目标节点的父ID，获取其对象以及所有的子节点，并为子节点设置当前对象的ID为父ID即可
      // 当拖拽类型为inner，说明拖拽节点成为了目标节点的子节点，只需要获取目标节点对象即可
      var data = dropType !== 'inner' ? dropNode.parent.data : dropNode.data
      console.log(data)
      var nodeData =
        dropNode.level === 1 && dropType !== 'inner' ? data : data.children
      // 设置父ID,当level为1说明在第一级，pid为空
      nodeData.forEach(element => {
        // element.pid = dropNode.level === 1 ? 'root' : data.id
        element.pid = data.id || 'root'
      })
      nodeData.forEach((element, i) => {
        var dept = {
          targetId: element.id,
          pid: element.pid,
          sort: i
        }
        paramData.push(dept)
      })
      console.log(paramData)
      this.$emit('updateSorts', paramData)
      // for (let index = 0; index < paramData.length; index++) {
      //   const item = paramData[index]
      //   console.log(item)
      //   console.log('this', this)
      //   updateDb.call(this, 'chapter_groups', 'sort', item.sort, item.targetId)
      //   updateDb.call(this, 'chapter_groups', 'pid', item.pid, item.targetId)
      // }

      this.loading = true
      // 得到这次操作需要变更的数据范围，请求后台批量处理即可...
      // DeptAPI.updateDeptTreeOrder(JSON.stringify(paramData)).then(res => {
      //   console.log(res)
      //   // 自行逻辑，可以加提示框message
      //   this.loading = false
      // })
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(123)
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      // draggingNode.data.label.indexOf('三级 3-2-2') === -1
      return 1
    },
    drop(ev, data) {
      const itemId = ev.dataTransfer.getData('itemId')
      console.log(data, itemId)
      this.$emit('changePid', data.id, itemId)
    },
    showContextmenu(event, targetItem) {
      console.log(event, targetItem)
      const param = {
        event,
        targetItem,
        menuList: this.menuList
      }

      this.$store.commit('SHOW_CONTEXTMENU', param)
    }
  }
}
</script>
<style lang="scss" scoped>
.group_bar {
  border-right: solid 1px #e6e6e6;
  /deep/.group_tree_node {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
