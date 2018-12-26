<template>
    <div>
      <master-data-table-toolbar title="States" @search="setSearch" @create="openDialog('create')" @refresh="getItems" />
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        :total-items="totalItems"
        :loading="loading"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
            <td class="text-uppercase">{{ props.item.code }}</td>
            <td>{{ props.item.gst_code }}</td>
            <td class="text-capitalize">{{ props.item.name }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="openDialog('edit', props.item)">edit</v-icon>
              <v-icon small @click="openDeleteDialog(props.item)">delete</v-icon>
              <!-- <v-icon small @click="onItemDelete(props.item)">delete</v-icon> -->
            </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="getItems">Reset</v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="300px">
        <create-state-form v-if="dialogComponent === 'create'" @create="postItemCreate" @cancel="close" />
        <edit-state-form v-else-if="dialogComponent === 'edit'" :id="editedId" @update="postItemUpdate" @cancel="close" />
      </v-dialog>

      <delete-alert :dialog="deleteDialog" :item="deleteItem" @yes="onItemDelete" @no="deleteDialog = false" />
    </div>
</template>

<script>
import { fetchMasterList, deleteMasterItem } from '@/api';
import MasterDataTableToolbar from '@/components/MasterDataTableToolbar';
import CreateStateForm from '@/components/state/Create';
import EditStateForm from '@/components/state/Edit';
import DeleteAlert from '@/components/DeleteAlert';

export default {
  name: 'state-master',
  components: {
    MasterDataTableToolbar,
    CreateStateForm,
    EditStateForm,
    DeleteAlert
  },
  data () {
    return {
      dialogComponent: null,
      totalItems: 0,
      items: [],
      loading: true,
      pagination: {},
      headers: [
        {
          text: 'Code',
          align: 'left',
          sortable: false,
          value: 'code'
        },
        { text: 'GST Code', value: 'gst_code' },
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'name', align: 'center', sortable: false }
      ],
      dialog: false,
      deleteDialog: false,
      search: null,
      editedIndex: -1,
      editedItem: {
        code: '',
        gst_code: '',
        name: '',
      },
      deleteItem: {},
      defaultItem: {
        code: '',
        gst_code: '',
        name: '',
      }      
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New State' : 'Edit State'
    },
    editedId() {
      if(this.editedIndex > -1 ) {
        return this.items[this.editedIndex].id;
      } else {
        return 0;
      }
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getItems();
      },
      deep: true
    },
    search() {
      this.getItems();
    },
  },
  mounted () {
    // this.getItems();
  },
  methods: {
    setSearch(text) {
      this.search = text;
    },
    
    openDialog(component, item = false) {
      this.dialogComponent = component;

      if(component === 'create') {
        this.editedIndex = -1;
      } else {
        this.editedIndex = this.items.indexOf(item);
        this.editedItem = Object.assign({}, item)
      }

      this.dialog = true;
    },

    openDeleteDialog(item) {
      this.deleteItem = item;
      this.deleteDialog = true;
    },

    getItems() {
      this.loading = true;
      const { sortBy, descending, page, rowsPerPage } = this.pagination;

      return fetchMasterList('states', this.search, page, rowsPerPage, sortBy, descending ).then(response => {
        this.items = response.data;
        this.totalItems = response.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });
    },

    postItemCreate(data) {
      const snackbar = {
        text: `State "${data.name}" created`,
        show: true,
        color: 'success'
      };
      
      this.loading = false;
      this.$store.commit('showSnackbar', snackbar);
      this.close();
      this.getItems();
    },

    postItemUpdate(data) {
      Object.assign(this.items[this.editedIndex], data);
      this.loading = false;

      const snackbar = {
        text: `State "${data.name}" updated`,
        show: true,
        color: 'success'
      };
      this.$store.commit('showSnackbar', snackbar);

      this.close();
    },

    onItemDelete(item) {
      const index = this.items.indexOf(item)
      const id = this.items[index].id;

      this.loading = true;            
      deleteMasterItem('states', id).then(() => {
        const snackbar = {
          text: `State "${id}" deleted`,
          show: true,
          color: 'success'
        };
        this.items.splice(index, 1)
        this.totalItems--;
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
      this.deleteDialog = false;
      this.deleteItem = {};
    },

    close () {
      this.dialogComponent = null;
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1;
    },
  }
}  
</script>