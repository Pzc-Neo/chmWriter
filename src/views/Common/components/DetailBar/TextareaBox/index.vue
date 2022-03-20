<template>
  <!-- <textarea
    :value="content"
    @change="handleInput"
    :style="{ height }"
  ></textarea> -->

  <!-- :placeholder="$t('message.pleaseInput')" -->
  <el-input
    type="textarea"
    :rows="5"
    :value="content"
    @input="handleInput"
    @change="handleChange"
    :style="{ height: editorHeight }"
  ></el-input>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '150px'
    },
    isFixedMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editorHeight() {
      return this.isFixedMode ? '561px' : '130px'
    }
  },
  methods: {
    handleChange(newContent) {
      this.$emit('change', newContent)
    },
    handleInput(newContent) {
      this.$emit('update:content', newContent)
    }
  }
}
</script>

<style lang="scss" scoped></style>
