<template>
    <div>
      <master-data-table-toolbar title="Agents" @search="setSearch" @create="openDialog('create')" @refresh="getItems" />
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
            <td class="text-capitalize">{{ props.item.name }}</td>
            <td>{{ props.item.commission }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="openDialog('edit', props.item)">edit</v-icon>
              <v-icon small @click="openDeleteDialog(props.item)">delete</v-icon>
            </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="getItems">Reset</v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="300px" lazy persistent>
        <create-agent-form v-if="dialogComponent === 'create'" @create="postItemCreate" @cancel="close" />
        <edit-agent-form v-else-if="dialogComponent === 'edit'" :id="editedId" @update="postItemUpdate" @cancel="close" />
      </v-dialog>

      <delete-alert :dialog="deleteDialog" :item="deleteItem" @yes="onItemDelete" @no="deleteDialog = false" />

      <GlobalEvents
        @keyup.alt.r="getItems"
        @keyup.alt.s="setFocusOnSearch"
        @keyup.insert="openDialog('create')"
        @keyup.page-up="prevPage"
        @keyup.page-down="nextPage"
        @keyup.esc="close"
      />      
    </div>
</template>

<script>
// https://github.com/shentao/vue-global-events
import GlobalEvents from 'vue-global-events';
import { fetchMasterList, deleteMasterItem } from '@/api';
import MasterDataTableToolbar from '@/components/MasterDataTableToolbar';
import CreateAgentForm from '@/components/agent/Create';
import EditAgentForm from '@/components/agent/Edit';
import DeleteAlert from '@/components/DeleteAlert';
import { bus } from '@/main';

export default {
  name: 'agent-master',
  components: {
    MasterDataTableToolbar,
    CreateAgentForm,
    EditAgentForm,
    DeleteAlert,
    GlobalEvents
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
        { text: 'Name', value: 'name' },
        { text: 'Comission', value: 'commission' },
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
      return this.editedIndex === -1 ? 'New Agent' : 'Edit Agent'
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
  methods: {
    setFocusOnSearch() {
      bus.$emit('SET_FOCUS_ON_SEARCH');
    },
    prevPage() {
      if(this.pagination.page > 1) {
        this.pagination.page -= 1;
      }
      
      console.log('Prev Page');
    },
    nextPage() {
      const pages = this.totalItems / this.pagination.rowsPerPage;
      if(this.pagination.page < pages) {
        this.pagination.page += 1;
      }
      
      console.log('Next Page');
    },
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

      return fetchMasterList('agents', this.search, page, rowsPerPage, sortBy, descending ).then(response => {
        this.items = response.data;
        this.totalItems = response.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });
    },

    postItemCreate(data) {
      const snackbar = {
        text: `Agent "${data.name}" created`,
        show: true,
        color: 'success'
      };
      
      this.loading = false;
      this.$store.commit('showSnackbar', snackbar);
      this.close();
      this.getItems();
    },

    postItemUpdate(data) {
      this.getItems();
      this.loading = false;

      const snackbar = {
        text: `Agent "${data.name}" updated`,
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
      deleteMasterItem('agents', id).then(() => {
        const snackbar = {
          text: `Agent "${id}" deleted`,
          show: true,
          color: 'success'
        };
        this.items.splice(index, 1)
        this.totalItems--;
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