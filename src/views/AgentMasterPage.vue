<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Agent</v-toolbar-title>
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
                  <v-text-field v-model="editedItem.code" label="Code" autofocus></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.commision" label="Commision"></v-text-field>
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
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.code }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.commision }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import db from '@/fb';

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Code',
          align: 'left',
          sortable: false,
          value: 'code'
        },
        { text: 'Name', value: 'name' },
        { text: 'Code', value: 'code' },
        { text: 'Actions', value: 'name', align: 'center', sortable: false }
      ],
      //pagination: {},
      items: [],
      //totalItems: 0,
      search: '',
      loading: false,
      editedIndex: -1,
      editedItem: {
        code: '',
        name: '',
        commision: 0,
      },
      defaultItem: {
        code: '',
        name: '',
        commision: 0,
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Agent' : 'Edit Agent'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize();
    },

    methods: {
      initialize () {
        this.loading = true;
        db.collection('agents').orderBy('name').get().then(snapshot => {
          this.items = [];      
          if(snapshot.docs.length > 0) {
            snapshot.docs.forEach(doc => {
              this.items.push({
                ...doc.data(),
                id: doc.id
              })
            })

            this.loading = false;
          }
        }).catch(err => {
          console.log(err);
          this.loading = false;
        })
      },

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
          db.collection('agents').doc(id).delete().then(() => {
            const snackbar = {
              text: `Agent "${id}" deleted`,
              show: true,
              color: 'success'
            };
            this.items.splice(index, 1)
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
          }).catch((error) => {
            const snackbar = {
              text: `Agent "${id}" could not be deleted`,
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
          db.collection('agents').doc(id).update(this.editedItem).then(() => {
            const snackbar = {
              text: `Agent "${name}" updated`,
              show: true,
              color: 'success'
            };

            Object.assign(this.items[this.editedIndex], this.editedItem);
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
            this.close()
          })
        } else {
          db.collection('agents').add(this.editedItem).then((docRef) => {
            const snackbar = {
              text: `Agent "${this.editedItem.name}" created`,
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
