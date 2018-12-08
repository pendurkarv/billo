<template>
  <div>
    <template v-if="!$route.meta.public">
      <v-app>
        <nav-bar />
        <v-content class="mx-3 mt-3">
          <!-- <app-header /> -->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
          <!-- <button @click="checkApi">Click Me</button> -->
        </v-content>
        <app-footer />
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>    

    <v-snackbar
      :timeout="3000"
      bottom
      center
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>      
  </div>    
</template>

<script>
import Navbar from '@/components/Navbar';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import AppEvents from  './event';

export default {
  name: 'App',
  components: {
    'nav-bar': Navbar,
    'app-header': AppHeader,
    'app-footer': AppFooter
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    // snackbar: {
    //   show: false,
    //   text: '',
    //   color: '',
    // }
  }),
  computed: {
    snackbar() {
      // return this.$store.getters.loadedSnackbar;
      return this.$store.state.snackbar;
    }
  },
  methods: {
    checkApi() {
      this.$http.get('http://localhost:5000/api/posts?page=1')
        .then(res => {
          console.log(res);
        })
    }
  },
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },  
}
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .2s ease;
}

.fade-leave {}

.fade-leave-active {
  transition: opacity .2s ease;
  opacity: 0;
}
</style>
