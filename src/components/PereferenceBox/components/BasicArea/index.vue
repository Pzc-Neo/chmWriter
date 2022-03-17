<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item :label="$t('pereferences.theme')">
        <el-select
          v-model="themePath"
          @change="setTheme"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="theme in themesList"
            :key="theme.name"
            :label="theme.name"
            :value="theme.path"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="refreshThemeList">
          {{ $t('pereferences.refresh') }}
        </el-button>
        <el-button type="primary" @click="openThemeFolder">
          {{ $t('pereferences.openFolder') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getThemeList, setTheme } from '@/util/theme'
import path from 'path'
export default {
  data() {
    return {
      themesList: [],
      themePath: ''
    }
  },
  methods: {
    refreshThemeList() {
      this.themesList = getThemeList.call(this)
      this.$message(
        `${this.$t('pereferences.refresh')} ${this.$t('result.success')}`
      )
    },
    setTheme(themePath) {
      try {
        setTheme.call(this, themePath)
        localStorage.setItem('themePath', this.themePath)
      } catch (error) {
        this.$alert(error)
        console.error(error)
      }
    },
    openThemeFolder() {
      const themeFolder = path.join(this.$appFilePath, 'themes')
      require('child_process').exec(`start "" "${themeFolder}"`)
    }
  },
  mounted() {
    this.themesList = getThemeList.call(this)
    const themePath = localStorage.getItem('themePath')
    if (themePath !== null) {
      this.themePath = themePath
    } else {
      this.themePath = this.themesList[0].path
      localStorage.setItem('themePath', this.themePath)
    }
  }
}
</script>

<style></style>
