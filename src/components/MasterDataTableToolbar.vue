<template>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        ref="search"
        v-model="search"
        @input="searchTable"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        autofocus
      ></v-text-field>
      <v-btn color="primary" dark class="mb-2" @click="create">Add Item</v-btn>
      <v-flex xs12 sm3>
        <v-btn flat icon color="green" @click="refresh">
          <v-icon>cached</v-icon>
        </v-btn>
      </v-flex>      
    </v-toolbar>       
</template>

<script>
import { bus } from '@/main';

export default {
  name: 'master-data-table-toolbar',
  props: ['title'],
  data() {
    return {
      search: '',
    }
  },
  mounted() {
    bus.$on('SET_FOCUS_ON_SEARCH', () => {
      console.log(this.$refs.search.$el);
      this.$refs.search.focus();
    });    
  },  
  methods: {
    searchTable() {
      this.$emit('search', this.search);
    },
    refresh() {
      this.$emit('refresh');
    },
    create() {
      this.$emit('create');
    }
  },
}
</script>

<style>

</style>
