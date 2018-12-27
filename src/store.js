import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import { loginUser } from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    isGuest: !localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
    },
  },
  getters: {
    isGuest(state) {
      return state.isGuest;
    },
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    isLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {  
    showSnackbar: (state, snackbar) => {
      state.snackbar = snackbar;
      state.snackbar.show = true;
    },
    loginUser: (state, user) => {
      state.user = user.data;
      state.token = user.token;
      state.isGuest = false;
    },  
    logoutUser: (state) => {
      state.user = null;
      state.isGuest = true;
      state.token = null;
    },
    setLoading: (state, val) => {
      state.isLoading = val;
    },
  },
  actions: {
    login: (context, credentials) => {
      context.commit('setLoading', true);
      loginUser(credentials).then((userData) => {
        Vue.auth.setToken(userData);
        context.commit('loginUser', userData);
        router.replace({ path: '/' });
      }).catch((err) => {
        Vue.auth.destroyToken();
      }).finally(() => {
        context.commit('setLoading', false);
      });
    },
    logout: (context) => {
      Vue.auth.destroyToken();
      context.commit('logoutUser');
      const snackbar = {
        show: true,
        color: 'green',
        text: 'Logout successfully',
      };
      context.commit('showSnackbar', snackbar);
      router.replace({ path: '/login' });
    },
  },
});
