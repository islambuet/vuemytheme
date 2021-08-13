import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/system-global/systemHtmlElementsAction';
import '@/system-global/SystemFunctions';

//axios
import axios from 'axios';
Vue.prototype.$axios = axios;

// For Alerts
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
    timeout: false,
    position: "top-center",
    transition: "Vue-Toastification__fade",
    maxToasts: 1,
};
Vue.use(Toast, options);
// For Alerts

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#system-app')
