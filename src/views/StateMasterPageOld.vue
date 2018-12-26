<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>State</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="300px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-sm>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.code" label="Code"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :total-items="totalItems"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.code }}</td>
        <td>{{ props.item.name }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getDataFromApi">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import db from '@/fb';
import { fetchMasterList } from '@/api';

  export default {
    data() {
      return {
        totalItems: 0,
        items: [],
        dialog: false,
        pagination: {},
        headers: [
          {
            text: 'Code',
            align: 'left',
            sortable: false,
            value: 'code'
          },
          { text: 'Name', value: 'name' },
          { text: 'Actions', value: 'name', align: 'center', sortable: false }
        ],
        search: '',
        loading: false,
        editedIndex: -1,
        editedItem: {
          code: '',
          name: '',
        },
        defaultItem: {
          code: '',
          name: '',
        }
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New State' : 'Edit State'
      }
    },

    watch: {
      dialogComponent (val) {
        this.dialogComponent = val;
      },
      pagination: {
        handler () {
          this.getDataFromApi();
        },
        deep: true
      }
    },

    mounted() {
      // this.getDataFromApi()
    },

    methods: {
      getDataFromApi() {
        this.loading = true
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        return fetchMasterList('states', this.search, page, rowsPerPage, sortBy, descending ).then(response => {
          this.loading = false;
          this.items = response.data;
          this.totalItems = response.totalCount;
        });
      },

      // initialize () {
      //   this.loading = true;
      //   db.collection('states').orderBy('name').get().then(snapshot => {
      //     this.items = [];      
      //     snapshot.docs.forEach(doc => {
      //       this.items.push({
      //         ...doc.data(),
      //         id: doc.id
      //       })
      //       this.loading = false;
      //     })
      //   })
      // },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        const id = this.items[index].id;
        if(confirm('Are you sure you want to delete this item?')) {
          this.loading = true;            
          db.collection('states').doc(id).delete().then(() => {
            const snackbar = {
              text: `State "${id}" deleted`,
              show: true,
              color: 'success'
            };
            this.items.splice(index, 1)
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
          }).catch((error) => {
            const snackbar = {
              text: `State "${id}" could not be deleted`,
              show: true,
              color: 'error'
            };
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
          });        

          
        }
      },

      close () {
        this.dialog = false;
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      save () {
        this.loading = true;
        if (this.editedIndex > -1) {
          const id = this.items[this.editedIndex].id;
          const name = this.items[this.editedIndex].name;
          db.collection('states').doc(id).update(this.editedItem).then(() => {
            const snackbar = {
              text: `State "${name}" updated`,
              show: true,
              color: 'success'
            };

            Object.assign(this.items[this.editedIndex], this.editedItem);
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
            this.close()
          })
        } else {
          db.collection('states').add(this.editedItem).then((docRef) => {
            const snackbar = {
              text: `State "${this.editedItem.name}" created`,
              show: true,
              color: 'success'
            };
            this.items.push({ ...this.editedItem, id: docRef.id });
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
            this.close()
          })          
        }
      }
    }
  }
</script>
