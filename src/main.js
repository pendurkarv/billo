import Vue from 'vue';
import VeeValidate from 'vee-validate';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Auth from './auth/Auth';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Auth);

export const bus = new Vue();

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


// console.log(app.$store.state);
