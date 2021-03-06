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
      { icon: 'unit', title: 'HSN', name: 'hsn', route: '/masters/hsn' },
      { icon: 'unit', title: 'Transporter', name: 'transporter', route: '/masters/transporter' },
      { icon: 'unit', title: 'Category', name: 'category', route: '/masters/category' },
      { icon: 'unit', title: 'Branch', name: 'branch', route: '/masters/branch' },
      { icon: 'unit', title: 'Unit', name: 'unit', route: '/masters/unit' },
      { icon: 'bank', title: 'Bank', name: 'bank', route: '/masters/bank' },
      { icon: 'state', title: 'State', name: 'state', route: '/masters/state' },
      { icon: 'bill', title: 'Bill Type', name: 'bill-type', route: '/masters/bill-type' },
      { icon: 'bill', title: 'Product Group', name: 'product-group', route: '/masters/product-group' },
      { icon: 'bill', title: 'Agent', name: 'agent', route: '/masters/agent' },
      { icon: 'bill', title: 'Customer', name: 'customer', route: '/masters/customer' },
    ],
  },
  { divider: true },
  { icon: 'build', title: 'Utilities', name: 'utilities', route: '/utilities' },
  { icon: 'account_circle', title: 'Admin', name: 'admin', route: '/admin' },
];

export default Menu;
