import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  const toastContructor = Vue.extend(Toast)

  const toast = new toastContructor()

  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj