import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isGuest: false,
      id: 1,
      username: 'pendurkar',
      token: '1321afakfvfasdvff',
    },
    snackbar: {
      show: false,
      text: '',
      color: '',
    },
  },
  getters: {
  },
  mutations: {  
    showSnackbar: (state, snackbar) => {
      state.snackbar = snackbar;
      state.snackbar.show = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.user.isGuest = true;
    }
  },
  actions: {
    logout: (context) => {
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
