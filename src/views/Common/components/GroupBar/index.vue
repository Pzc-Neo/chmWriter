<template>
  <div
    class="group_bar"
    v-show="isShow"
    textmenu="showBarMenu"
    :style="customStyle"
  >
    <el-empty
      v-if="itemList.length === 0"
      :image-size="120"
      :description="$t('info.empty')"
      style="height: 100%"
    ></el-empty>
    <el-tree
      ref="tree"
      :data="itemList"
      :style="customStyle"
      node-key="id"
      :expand-on-click-node="false"
      :default-expanded-keys="expandedKeys"
      :highlight-current="true"
      :current-node-key="currentGroup.id"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      @node-drop="handleDrop"
      @node-click="changeTo"
      @node-contextmenu="showContextmenu"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span
        class="group_tree_node"
        slot-scope="{ data }"
        :title="data.title"
        @drop="handleItemDrop($event, data)"
      >
        <template v-if="data.id === 'default'">
          <i class="el-icon-folder"></i>
          <span>{{ $t('info.' + data.title) }}</span>
        </template>
        <template v-else>{{ data.title }}</template>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GroupBar',
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    menuListBar: {
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
    currentGroup: {
      type: Object,
      default() {
        return {}
      }
    },
    customStyle: {
      type: Object,
      default() {
        return {
          width: '170px'
        }
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.tree.setCurrentKey(this.currentGroup.id)
    })
  },
  watch: {
    currentGroup() {
      this.$refs.tree.setCurrentKey(this.currentGroup.id)
    }
  },
  methods: {
    changeTo(data, clickedNode) {
      this.$emit('changeTo', data.id)
    },

    // 拖拽事件 参数依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    handleDrop: function (draggingNode, dropNode, dropType, ev) {
      var diffData = []
      // 当拖拽类型不为inner,说明只是同级或者跨级排序，只需要寻找目标节点的父ID，获取其对象以及所有的子节点，并为子节点设置当前对象的ID为父ID即可
      // 当拖拽类型为inner，说明拖拽节点成为了目标节点的子节点，只需要获取目标节点对象即可
      var data = dropType !== 'inner' ? dropNode.parent.data : dropNode.data
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
        diffData.push(dept)
      })
      this.$emit('updateSorts', diffData)
      this.loading = true
    },
    allowDrop(draggingNode, dropNode, type) {
      return true
    },
    allowDrag(draggingNode) {
      if (draggingNode.data.id === 'default') {
        return false
      } else {
        return true
      }
    },
    handleItemDrop(ev, data) {
      const itemId = ev.dataTransfer.getData('itemId')
      this.$emit('changeItemGroupId', data.id, itemId)
    },
    showBarMenu(event) {
      const param = {
        event,
        targetItem: {},
        menuList: this.menuListBar
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    showContextmenu(event, targetItem) {
      const param = {
        event,
        targetItem,
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    handleNodeExpand(data) {
      this.$emit('updateAttr', 'is_expand', 1, data, false)
    },
    handleNodeCollapse(data) {
      this.$emit('updateAttr', 'is_expand', 0, data, false)
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.barVisible.groupBar
    }),
    expandedKeys() {
      const keyList = []
      this.itemList.forEach(item => {
        if (item?.is_expand) {
          keyList.push(item.id)
        }
      })
      return keyList
    }
  }
}
</script>
<style lang="scss" scoped>
.group_bar {
  height: 100%;
  flex-direction: column;
  position: relative;
  border-right: solid 1px #e6e6e6;
  // overflow-y: scroll;
  overflow: hidden;

  /deep/.el-tree {
    height: 100%;
    overflow: auto;
    .group_tree_node {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i {
        margin-right: 3px;
      }
    }
  }
}
</style>
