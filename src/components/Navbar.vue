<template>
  <nav>
    <v-toolbar app height="50">
      <v-toolbar-side-icon @click="drawer= !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-spacer></v-spacer>

      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>

      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" right>
          <span slot="badge" small class="caption">3</span>
          <v-icon small>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>

      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/avatar/man_4.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in loginMenu" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" dark width="250" class="indigo darken-2">
      <v-toolbar color="primary darken-1" dark height="50">
        <img src="/m.png" height="36" alt="DAV-H Bill">
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light hidden-xs-and-down">DAV-H</span>
          <span class="hidden-xs-and-down">Billo</span>
        </v-toolbar-title>
      </v-toolbar>      

        <v-list dense expand>
          <template v-for="(item, i) in menu">
            <v-list-group v-if="item.items" :key="item.name" :prepend-icon="item.icon" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
    
              <v-list-tile v-for="subItem in item.items" :key="subItem.title" route :to="subItem.route" >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list-group>
            <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <v-list-tile v-else route :to="!item.href ? item.route : null" :href="item.href" :key="item.name" :disabled="item.disabled" :target="item.target" >
              <v-list-tile-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import menu from '@/data/menu';
import Util from '@/util';
import NotificationList from '@/components/widgets/list/NotificationList';

export default {
  name: 'nav-bar',
  components: {
    'notification-list': NotificationList
  },
  data() {
    return {
      drawer: true,
      menu: menu,
      loginMenu: [
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
      ]
    }
  },
  methods: {
    handleFullScreen() {
      Util.toggleFullScreen();
    }
  }
}
</script>

<style>

</style>
