import Vue from 'vue';
import NProgress from 'nprogress';
import Router from 'vue-router';
import store from '../store';

import 'nprogress/nprogress.css';

import paths from './paths';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths,
});

// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (store.getters.isGuest && to.path !== '/login') {
    next('/login');
  } else if (!store.getters.isGuest && to.path === '/login') {
    next('/');
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});


export default router;
