import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
Vue.prototype.$ELmessage = Message
Vue.prototype.$ELconfirm = MessageBox.confirm
Vue.prototype.$ELprompt = MessageBox.prompt
Vue.prototype.$ELalert = MessageBox.alert

Vue.prototype.$message = function (message, type = 'success', duration = 1000) {
  this.$ELmessage({
    showClose: true,
    duration,
    message,
    type
  })
}

Vue.prototype.$prompt = function (callback, defaultValue = '') {
  MessageBox.prompt(
    this.$t('message.pleaseInput'),
    this.$t('action.getInput'),
    {
      inputValue: defaultValue,
      confirmButtonText: this.$t('message.confirm'),
      cancelButtonText: this.$t('message.cancel'),
      inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/, // nonempty
      inputErrorMessage: this.$t('message.nonempty')
    }
  )
    .then(({ value }) => {
      try {
        callback(value)
        Message({
          type: 'success',
          message: this.$t('result.success')
        })
      } catch (e) {
        Message({
          type: 'error',
          message: e
        })
      }
    })
    .catch(() => {
      Message({
        type: 'info',
        message: this.$t('message.cancel')
      })
    })
}

Vue.prototype.$confirmSync = function (
  defaultValue = '',
  type = 'delete',
  confirmButtonText,
  cancelButtonText
) {
  console.log('confirmSync')
  return new Promise((resolve, reject) => {
    MessageBox.confirm(
      `${this.$t('action.' + type)} ${defaultValue}?`,
      this.$t('result.warning'),
      {
        distinguishCancelAndClose: true,
        confirmButtonText: confirmButtonText || this.$t('message.confirm'),
        cancelButtonText: cancelButtonText || this.$t('message.cancel'),
        type: 'warning'
      }
    )
      .then(confirm => {
        resolve(confirm)
      })
      .catch(action => {
        resolve(action)
      })
  })
}
Vue.prototype.$confirm = function (
  callback,
  defaultValue = '',
  type = 'delete',
  confirmButtonText,
  cancelButtonText
) {
  MessageBox.confirm(
    `${this.$t('action.' + type)} ${defaultValue}?`,
    this.$t('result.warning'),
    {
      distinguishCancelAndClose: true,
      confirmButtonText: confirmButtonText || this.$t('message.confirm'),
      cancelButtonText: cancelButtonText || this.$t('message.cancel'),
      type: 'warning'
    }
  )
    .then(confirm => {
      try {
        callback(confirm)
      } catch (e) {
        Message({
          type: 'error',
          message: e
        })
      }
    })
    .catch(action => {
      callback(action)
    })
}

Vue.prototype.$alert = function (info, type = 'warning') {
  MessageBox.alert(info, this.$t(`result.${type}`), {
    confirmButtonText: this.$t('message.confirm'),
    callback: action => {
      console.log(action)
      // Message({
      //   type: 'warning',
      //   message: `action: ${action}`
      // })
    }
  })
}
