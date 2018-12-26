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
  { path: '/bill/outward', name: 'outward-bill ', component: () => import(/* webpackChunkName: "outward-bill" */ '@/views/OutwardBillFormPage.vue') },
  { path: '/payments', name: 'payments', component: () => import(/* webpackChunkName: "payments" */ '@/views/PaymentsPage.vue') },
  { path: '/reports', name: 'reports', component: () => import(/* webpackChunkName: "reports" */ '@/views/ReportsPage.vue') },
  { path: '/masters', name: 'masters', component: () => import(/* webpackChunkName: "masters" */ '@/views/MastersPage.vue') },
  { path: '/masters/unit', name: 'unit', component: () => import(/* webpackChunkName: "masters-unit" */ '@/views/UnitMasterPage.vue') },
  { path: '/masters/state', name: 'state', component: () => import(/* webpackChunkName: "masters-state" */ '@/views/StateMasterPage.vue') },
  { path: '/masters/bill-type', name: 'bill-type', component: () => import(/* webpackChunkName: "masters-bill-type" */ '@/views/BillTypeMasterPage.vue') },
  { path: '/masters/agent', name: 'agent', component: () => import(/* webpackChunkName: "masters-agent" */ '@/views/AgentMasterPage.vue') },
  { path: '/masters/customer', name: 'customer', component: () => import(/* webpackChunkName: "masters-customer" */ '@/views/CustomerMasterPage.vue') },
  { path: '/utilities', name: 'utilities', component: () => import(/* webpackChunkName: "utilities" */ '@/views/UtilitiesPage.vue') },
  { path: '/admin', name: 'admin', component: () => import(/* webpackChunkName: "admin" */ '@/views/AdminPage.vue') },
];
