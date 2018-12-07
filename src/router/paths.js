import Home from '../views/Home.vue';

export default [
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404',
    },
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/NotFound.vue',
    ),
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/Deny.vue',
    ),
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/Error.vue',
    ),
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/Login.vue',
    ),
  },
  { path: '/', name: 'home', component: Home },
  { path: '/bill', name: 'bill', component: () => import(/* webpackChunkName: "bill" */ '@/views/BillPage.vue') },
  { path: '/bill/inward', name: 'inward-bill ', component: () => import(/* webpackChunkName: "bill" */ '@/views/InwardBillPage.vue') },
  { path: '/payments', name: 'payments', component: () => import(/* webpackChunkName: "payments" */ '@/views/PaymentsPage.vue') },
  { path: '/reports', name: 'reports', component: () => import(/* webpackChunkName: "reports" */ '@/views/ReportsPage.vue') },
  { path: '/masters', name: 'masters', component: () => import(/* webpackChunkName: "masters" */ '@/views/MastersPage.vue') },
  { path: '/utilities', name: 'utilities', component: () => import(/* webpackChunkName: "utilities" */ '@/views/UtilitiesPage.vue') },
  { path: '/admin', name: 'admin', component: () => import(/* webpackChunkName: "admin" */ '@/views/AdminPage.vue') },
];
