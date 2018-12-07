<template>
  <div>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
  </div>  
</template>
breadcrumbs vue routerbreadcrumbs vue router
<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    }),
    created() {
      console.log(this.$route.path)
    },
    computed: {
      links() {
        console.log(this.$route)
      }
    }
  }</script>

<style>

</style>
