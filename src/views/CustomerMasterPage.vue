<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Customer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Customer</v-btn>
        <form>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6>
                    <v-text-field 
                      v-model="editedItem.code" 
                      label="Code" 
                      autofocus
                      v-validate="'required|max:10'"
                      :counter="10"
                      :error-messages="errors.collect('code')"                      
                      data-vv-name="code"
                      required                      
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-text-field 
                      v-model="editedItem.name" 
                      label="Name"
                      v-validate="'required|max:50'"
                      :counter="50"
                      :error-messages="errors.collect('name')"                      
                      data-vv-name="name"
                      required                      
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6>
                    <v-autocomplete
                      :items="agents"
                      item-text="name"
                      item-value="id"
                      label="Agents"
                      v-model="editedItem.agent"
                      required
                      v-validate="'required'"
                      :error-messages="errors.collect('agent')"                      
                      data-vv-name="agent"
                    >
                      <v-divider slot="append-item" class="mt-2" ></v-divider>                    
                      <v-list-tile slot="append-item" ripple @click="openAddAgentDialog" >
                        <v-list-tile-title>Add Agent</v-list-tile-title>
                        <v-dialog v-if="dialog == 'agent'" v-model="dialog" persistent max-width="800px">
                          <agent-form title="Agent Form" />
                        </v-dialog>
                      </v-list-tile>
                    </v-autocomplete>                    
                    
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-autocomplete
                      :items="states"
                      item-text="name"
                      item-value="id"
                      label="States"
                      v-model="editedItem.state"
                      required
                      v-validate="'required'"
                      :error-messages="errors.collect('state')"                      
                      data-vv-name="state"
                    >
                    </v-autocomplete> 
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="editedItem.address_line_1" label="Address Line 1"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="editedItem.address_line_2" label="Address Line 3"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="editedItem.address_line_3" label="Address Line 3"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="editedItem.gst_no" label="GST No."></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="editedItem.reference" label="Reference"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field v-model="editedItem.telephone" label="Telephone"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                  <v-checkbox
                        v-validate="'required'"
                        v-model="editedItem.os_party"
                        :error-messages="errors.collect('os_party')"
                        value="1"
                        label="OS Party"
                        data-vv-name="os_party"
                        type="checkbox"
                        required
                      ></v-checkbox>                    
                    <!-- <v-text-field v-model="editedItem.os_party" label="OS Party"></v-text-field> -->
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field 
                      v-model="editedItem.opening_balance" 
                      label="Opening Balance"
                      v-validate="'required|decimal|max:10'"
                      :error-messages="errors.collect('opening_balance')"                      
                      data-vv-name="opening_balance"
                      required                      
                    ></v-text-field>                    
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <v-text-field 
                      v-model="editedItem.os_balance" 
                      label="OS Balance"
                      v-validate="'required|decimal|max:10'"
                      :error-messages="errors.collect('os_balance')"                      
                      data-vv-name="os_balance"
                      required                      
                    ></v-text-field>                    
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
        </form>        
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :custom-filter="customFilter"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.code }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.gst_no }}</td>
        <td>{{ props.item.telephone }}</td>
        <td>{{ props.item.os_balance }}</td>
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
import AgentForm from '@/components/AgentForm';
import { fetchMasterList, addDocument, updateDocument, deleteDocument } from '@/api';
import DialogMixin from '@/mixins/DialogMixin';

export default {
    components: {
      AgentForm
    },
    $_veeValidate: {
      validator: 'new'
    },
    mixins: [DialogMixin],
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
        { text: 'GST No.', value: 'gst_no' },
        { text: 'Telephone', value: 'telephone' },
        { text: 'OS Balance', value: 'os_balance' },
        { text: 'Actions', value: 'name', align: 'center', sortable: false }
      ],
      //pagination: {},
      items: [],
      agents: [],
      states: [],
      //totalItems: 0,
      search: '',
      loading: false,
      editedIndex: -1,
      editedItem: {
        code: '',
        name: '',
        agent: '',
        state: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        gst_no: '',
        os_party: '',
        telphone: '',
        reference: '',
        opening_balance: '',
        os_balance: '',
      },
      defaultItem: {
        code: '',
        name: '',
        agent: '',
        state: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        gst_no: '',
        os_party: '',
        telphone: '',
        reference: '',
        opening_balance: '',
        os_balance: '',
      },
      dictionary: {
        attributes: {
          custom: {
            code: {
              required: () => 'Code can not be empty',
              max: 'The code field may not be greater than 10 characters'
            },
            name: {
              required: () => 'Name can not be empty',
              max: 'The name field may not be greater than 50 characters'
            },
            agent: {
              required: 'Agent is required'
            },
            state: {
              required: 'Agent is required'
            },
            os_party: {
              required: 'Agent is required'
            },
            opening_balance: {
              required: () => 'Opening balance can not be empty',
              decimal: 'Opening balance must be number',
              max: 'Opening balance may not be greater than 10 digits'
            },
            os_balance: {
              required: () => 'OS balance can not be empty',
              decimal: 'OS balance must be number',
              max: 'OS balance may not be greater than 10 digits'
            },
          }
        } 
      }
    }),
    mounted() {
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.loadStates();
      this.loadAgents();
      this.initialize();
    },

    methods: {
      customFilter(items, search, filter) {
        return items.filter(item => {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
      },
      initialize () {
        this.loading = true;
        this.loadCustomers();
      },
      loadCustomers() {
        this.loading = true;
        fetchMasterList('customers').then(customers => {
          this.items = customers;
          this.loading = false;
        })
      },
      loadStates() {
        this.loading = true;
        fetchMasterList('states').then(states => {
          this.states = states;
          this.loading = false;
        })
      },
      loadAgents() {
        this.loading = true;
        fetchMasterList('agents').then(agents => {
          this.agents = agents;
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
          deleteDocument('customers', id).then(() => {
            const snackbar = {
              text: `Customer "${id}" deleted`,
              show: true,
              color: 'success'
            };
            this.items.splice(index, 1)
            this.loading = false;
            this.$store.commit('showSnackbar', snackbar);
          }).catch((error) => {
            const snackbar = {
              text: `Customer "${id}" could not be deleted`,
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

      clear () {
        this.editItem = {
          code: '',
          name: '',
          agent: '',
          state: '',
          address_line_1: '',
          address_line_2: '',
          address_line_3: '',
          gst_no: '',
          os_party: '',
          telphone: '',
          reference: '',
          opening_balance: '',
          os_balance: '',
        }
        this.$validator.reset();
      },
      save () {
        this.$validator.validateAll().then((valid) => {
          if(valid) {
            this.loading = true;
            if (this.editedIndex > -1) {
              const id = this.items[this.editedIndex].id;
              const name = this.items[this.editedIndex].name;
              updateDocument('customers', id, this.editedItem).then(() => {
                const snackbar = {
                  text: `Customer "${name}" updated`,
                  show: true,
                  color: 'success'
                };

                Object.assign(this.items[this.editedIndex], this.editedItem);
                this.loading = false;
                this.$store.commit('showSnackbar', snackbar);
                this.close()
              })
            } else {
              addDocument('customers', this.editedItem).then((docRef) => {
                const snackbar = {
                  text: `Customer "${this.editedItem.name}" created`,
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
        }).catch(err => console.log());
      },
      openAddAgentDialog() {
        this.dialog = 'agent';
      }
    }
  }
</script>
