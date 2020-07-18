import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

import toast from 'components/common/toast'

import 'swiper/css/swiper.css'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)
// Vue.use(VueAwesomeSwiper)
// Vue.use(VueLazyLoad)
Vue.use(VueLazyLoad, {
  preload: 1.3,
  loading: require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
