import Vue from 'vue'
import './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import UploadButton from 'vuetify-upload-button'
Vue.use(UploadButton)
VueCookies.config('60m')
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
