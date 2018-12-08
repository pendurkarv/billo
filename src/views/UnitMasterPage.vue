<template>
  <div id="pageTable">
    <v-container id="unit-master-container" grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Units</h3>
        </v-flex>        
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-btn fab small depressed dark color="indigo" @click="addItem">
                <v-icon dark >add</v-icon>
              </v-btn>
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Units"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>     
              <v-btn @click="loadItems" icon>
                <v-icon success>refresh</v-icon>
              </v-btn>         
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :search="search"
                :items="items"
                :rows-per-page-items="[2,10,25,50,{text:'All','value':-1}]"
                class="elevation-0"
                item-key="name"
                select-all
                v-model="selected"
                :loading="loading"
                >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      v-model="props.selected"
                    ></v-checkbox>
                  </td>              
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.code }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>
                    <v-btn @click="editItem(props.item.id)" depressed outline icon fab dark color="primary" small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn @click="deleteItem(props.item.id)" depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>  
      </v-layout>

      <v-dialog v-model="formDialog" persistent max-width="400px">
        <unit-master-form 
          :title="form.title"
          :id="form.id"
          @saved="postSave" 
          @closed="closeForm" 
        />
      </v-dialog>

    </v-container>
  </div>
</template>

<script>
import db from '@/fb';
import UnitMasterForm from '@/components/UnitMasterForm';

export default {
  components: {
    UnitMasterForm
  },
  data () {
    return {
      formDialog: false,
      form: {
        title: '',
        id: '',
        data: {},
      },
      search: '',
      loading: false,
      selected: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' }, 
        { text: 'Actions', value: 'actions' },
      ],
      items: []
    };
  },
  created() {
    this.loadItems();
  },  
  methods: {
    loadItems() {
      this.loading = true;
      db.collection('units').get().then(snapshot => {
        this.items = [];      
        snapshot.docs.forEach(doc => {
          this.items.push({
            ...doc.data(),
            id: doc.id
          })
          this.loading = false;
        })
      })
    },
    addItem() {
      this.form.title = 'Add New Unit';
      this.form.id = '';
      this.formDialog = true;
    },
    editItem(id) {
      this.form.title = 'Edit Unit';
      this.form.id = id;
      this.formDialog = true;

      // db.collection('units').doc(id).get().then(doc => {
      //   let data = { id, code: '', name: '' };
      //   if(doc.exists) {
      //     const docData = doc.data();
      //     console.log(data);

      //     this.form.title = 'Edit Unit';
      //     this.form.id = id;
      //     this.formDialog = true;
      //   } else {
      //     alert('Error fetching data for document - ' + id);
      //   }
      // });
    },
    deleteItem(id) {
      db.collection('units').doc(id).delete().then(() => {
        const snackbar = {
          text: `Unit "${id}" deleted`,
          show: true,
          color: 'success'
        };

        this.items = this.items.filter(item => item.id != id);
        this.$store.commit('showSnackbar', snackbar);
      }).catch((error) => {
        const snackbar = {
          text: `Unit "${id}" could not be deleted`,
          show: true,
          color: 'error'
        };
        this.$store.commit('showSnackbar', snackbar);
      });
    },    
    postSave() {
      this.loadItems();
      this.closeForm();
    },
    closeForm() {
      this.formDialog = false;
    }
  }
};
</script>
