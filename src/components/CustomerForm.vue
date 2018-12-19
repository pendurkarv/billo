<template>
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
                  <v-list-tile-title>Select All</v-list-tile-title>
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

</template>

<script>
import { fetchCustomers } from '@/api';

export default {
  name: 'customer-form',
  props: [
    'formTitle',
  ],
  data() {
    return {
      agents: [],
      states: [],
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
    };
  }
}
</script>

<style>

</style>
