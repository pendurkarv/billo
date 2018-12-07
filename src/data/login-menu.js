const menu = [
  {
    icon: 'account_circle',
    href: '#',
    title: 'Profile',
    click: (e) => {
      console.log(e);
    },
  },
  {
    icon: 'settings',
    href: '#',
    title: 'Settings',
    click: (e) => {
      console.log(e);
    },
  },
  {
    icon: 'fullscreen_exit',
    href: '#',
    title: 'Logout',
    click: (e) => {
      console.log(e);
      window.getApp.$emit('APP_LOGOUT');
    },
  },
];

export default menu;
