import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ApiService from "./common/api.service";
import { CHECK_AUTH } from './store/actions.type'

Vue.config.productionTip = false
ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(() => next())
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
