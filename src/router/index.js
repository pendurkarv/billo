import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import NProgress from 'nprogress';
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
  if (to.meta.public === false && store.user.isGuest === true) {
    next('/login');
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});


export default router;
