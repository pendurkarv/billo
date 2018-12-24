import Vue from 'vue';
// import Axios from 'axios';
// import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// Vue.use(Vuelidate);
Vue.use(VeeValidate);

// Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
