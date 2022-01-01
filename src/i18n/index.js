import Vue from 'vue'
import ch from './locales/ch'
import en from './locales/en'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
// 准备翻译的语言环境信息
const messages = {
  ch,
  en
}

// 通过选项创建 VueI18n 实例
export default new VueI18n({
  locale: 'ch', // 设置地区
  messages // 设置地区信息
})
