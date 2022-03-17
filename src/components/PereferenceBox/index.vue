<template>
  <!-- 设置面板 -->
  <el-dialog
    :title="$t('menuBar.pereferences')"
    class="preference_box"
    v-if="isShow"
    :visible="true"
    :close-on-click-modal="false"
    :close-on-pr!ess-escape="false"
    @close="changeShow(false)"
    width="700px"
  >
    <el-tabs tab-position="left" style="height: 300px">
      <el-tab-pane :label="$t('pereferences.basic')">
        <BasicArea />
      </el-tab-pane>
      <el-tab-pane :label="$t('pereferences.backup')">Backup</el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeShow(false)">
        {{ $t('pereferences.close') }}
      </el-button>
      <!-- <el-button type="primary" @click="handleConfirm">确 定</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import BasicArea from './components/BasicArea'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BasicArea
  },
  methods: {
    changeShow(type) {
      this.$emit('update:isShow', type)
    }
  }
}
</script>

<style></style>
