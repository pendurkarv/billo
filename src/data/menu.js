const Menu = [
  { header: 'Apps' },
  {
    icon: 'home',
    title: 'Home',
    name: 'home',
    route: '/',
  },
  { divider: true },
  {
    icon: 'add_shopping_cart',
    title: 'Billing',
    name: 'bill',
    route: '/bill',
    items: [
      { icon: 'home', title: 'Inward Bill', name: 'inward-bill', route: '/bill/inward' },
      { icon: 'home', title: 'Outward Bill', name: 'outward-bill', route: '/bill/outward' },
    ],
  },
  { icon: 'credit_card', title: 'Payment / Adj.', name: 'payments', route: '/payments' },
  { divider: true },
  { icon: 'business_center', title: 'Reports', name: 'reports', route: '/reports' },
  { 
    icon: 'view_list',
    title: 'Masters',
    name: 'masters',
    route: '/masters',
    items: [
      { icon: 'unit', title: 'Unit', name: 'unit', route: '/masters/unit' },
      { icon: 'supplier', title: 'Supplier', name: 'supplier', route: '/masters/supplier' },
    ]
  },
  { divider: true },
  { icon: 'build', title: 'Utilities', name: 'utilities', route: '/utilities' },
  { icon: 'account_circle', title: 'Admin', name: 'admin', route: '/admin' },
];

export default Menu;
