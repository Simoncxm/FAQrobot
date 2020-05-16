// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import echarts from 'echarts'
import VueCookies from 'vue-cookies'

Vue.use(ViewUI)
Vue.use(VueCookies)
Vue.prototype.$axios=axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
