<template>
  <div class="attr_box">
    <div class="one_row">
      <el-tag class="chmST_sidbar_btn">
        {{ $t('writing.type.name') }}
      </el-tag>
      <el-select v-model="item.type" placeholder="">
        <el-option :label="$t('writing.type.normal')" :value="0"></el-option>
        <el-option :label="$t('writing.type.transform')" :value="1"></el-option>
        <el-option :label="$t('writing.type.important')" :value="2"></el-option>
      </el-select>
    </div>
    <div class="one_row">
      <el-tag>{{ $t('writing.status.name') }}</el-tag>
      <el-select v-model="item.status" placeholder="">
        <el-option :label="$t('writing.status.first')" :value="0"></el-option>
        <el-option :label="$t('writing.status.second')" :value="1"></el-option>
        <el-option :label="$t('writing.status.final')" :value="2"></el-option>
      </el-select>
    </div>
    <div class="one_row">
      <el-tag>{{ $t('writing.language') }}</el-tag>
      <el-select v-model="item.language" placeholder="">
        <el-option label="中文" :value="0"></el-option>
        <el-option label="English" :value="1"></el-option>
        <el-option label="日本語" :value="2"></el-option>
      </el-select>
    </div>
    <div class="one_row">
      <el-tag>{{ $t('writing.is_export') }}</el-tag>
      <el-switch :value="Boolean(item.is_export)"></el-switch>
    </div>
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.rate') }}</el-tag>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="item.rate"
      ></el-progress>
    </div>
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.created') }}</el-tag>
      <span class="date">{{ item.created }}</span>
    </div>
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.updated') }}</el-tag>
      <span class="date">{{ item.updated }}</span>
    </div>
    <div class="one_row">
      <el-tag class="text">{{ $t('writing.width') }}</el-tag>
      <el-slider v-model="editorWidth"></el-slider>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      editorWidth: 50
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  },
  watch: {
    item(item) {
      console.log(item.is_export)
    }
  }
}
</script>

<style lang="scss" scoped>
.attr_box {
  .one_row {
    .text {
      //   width: 44px;
    }
    .date {
      font-size: 11px;
      height: $dtb-height;
      line-height: $dtb-height;
      margin-left: $dtb-margin;
    }
  }
}
</style>
