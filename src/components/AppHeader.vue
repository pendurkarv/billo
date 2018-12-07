<template>
  <v-layout row class="align-center px-1 pt-2">
    <div class="page-header-left">
      <h3 class="pr-3">{{title}}</h3>
    </div>
    <v-breadcrumbs :items="breadcrumbs" divider="-"></v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>  
</template>

<script>
import menu from '@/data/menu';
export default {
  data () {
    return {
      title: ''
    };
  },
  computed: {
    breadcrumbs: function () {
      console.log(this.$route.path);
      // console.log(this.$route.matched);
      let breadcrumbs = [
        // {
        //   text: 'Dashboard',
        //   disabled: false,
        //   href: '/breadcrumbs_dashboard'
        // },
        // {
        //   text: 'Link 1',
        //   disabled: true,
        //   href: '/breadcrumbs_link_1'
        // },        
      ];

      // const routes = this.$route.path.split("/");
      // routes.shift();
      // const route_count = routes.length;
      // let i = 1;
      // routes.forEach(route => {
      //   let link = {};
      //   if(route == "") {
      //     link.text = 'Home';
      //     link.href = '/';
      //   }
         
      //   link.disabled = route_count == i ? true : false;

      //   breadcrumbs.push(link);
      //   i++;
      // });
      // console.log(routes);
      return breadcrumbs;
    },    
  }
};
</script>
