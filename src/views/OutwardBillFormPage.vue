<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container grid-list-sm>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-autocomplete
                :items="customerList"
                item-text="name"
                item-value="id"
                label="Customer"
                v-model="customer"
                required
                v-validate="'required'"
                :error-messages="errors.collect('customer')"                      
                data-vv-name="customer"
              >
                <v-divider slot="append-item" class="mt-2" ></v-divider>                    
                <v-list-tile slot="append-item" ripple @click="openNewCustomerDialog" >
                  <v-list-tile-title>Create New</v-list-tile-title>
                </v-list-tile>
              </v-autocomplete>               
              <!-- <v-text-field v-model="customer" label="Customer"></v-text-field> -->
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select :items="billTypeList" item-text="name" item-value="code" v-model="billType" label="Bill Type"></v-select>              
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn color="primary" @click="e1 = 2" >Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
    <v-stepper-items>
      <v-stepper-content step="2">
        
      <v-dialog v-model="dialog" max-width="300px">
        <v-btn slot="activator" color="success darken-1" >Add Product</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Add Product</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-sm>
              <v-layout wrap row>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="currentProduct.id" label="ID"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="currentProduct.code" label="Code"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="currentProduct.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="currentProduct.quantity" label="Quanity"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="currentProduct.rate" label="Rate"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 lg2>
                  <v-text-field v-model="currentProduct.amount" label="Amount"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="addProduct">Add</v-btn>
            <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <v-container grid-list-sm>
          <template v-for="item in products">
            <v-layout :key="item.id" align-center justify-center row fill-height wrap >
              <input type="hidden" :value="item.id" />
              <v-flex xs12 sm6 md4 lg2>
                <v-text-field label="Code" :value="item.code" ></v-text-field>
              </v-flex>            
              <v-flex xs12 sm6 md4 lg2>
                <v-text-field label="Name" :value="item.name" ></v-text-field>
              </v-flex>            
              <v-flex xs12 sm6 md4 lg2>
                <v-text-field label="Rate" :value="item.rate" ></v-text-field>
              </v-flex>            
              <v-flex xs12 sm6 md4 lg2>
                <v-text-field label="Quantity" :value="item.quantity" ></v-text-field>
              </v-flex>            
              <v-flex xs12 sm6 md4 lg2>
                <v-text-field label="Amount" :value="item.amount" ></v-text-field>
              </v-flex>            
              <v-flex xs12 sm6 md4 lg2>
              <v-btn flat icon color="pink" @click="removeProduct(item.id)">
                <v-icon>close</v-icon>
              </v-btn>              
              </v-flex>            
            </v-layout>
          </template>     
          <v-layout row v-if="subTotal > 0">
            <v-flex xs8></v-flex>
            <v-flex xs2 class="text-xs-right">
              <v-text-field label="Subtotal" :value="subTotal" ></v-text-field>
            </v-flex>
          </v-layout>       
        </v-container>
        <v-btn color="primary" @click="e1 = 3" >Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
    <v-stepper-items>
        <v-stepper-content step="3">
          <v-card class="mb-5" color="grey lighten-1" height="200px" ></v-card>
          <v-btn color="primary" @click="e1 = 1" >Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
    </v-stepper-items>
  </v-stepper>      
</template>

<script>
  import db from '@/fb';
  export default {
    name: 'outward-bill-form',
    data () {
      return {
        e1: 0,
        dialog: false,
        currentProduct: {
          id: '',
          code: '',
          name: '',
          rate: '',
          quantity: '',
          amount: '',
        },
        customer: '',
        billType: '',
        billTypeList: [],
        customerList: [],
        pos: '',
        products: [],
        grandTotal: 0
      }
    },
    mounted() {
      this.fetchBillTypeList();
      this.fetchCustomerList();
    },
    computed: {
      // customerList() {
      //   // let customerRef = db.ref("customers/").limitToFirst(5); 
      //   // customerRef.on("value", function(data) {
      //   //   console.log(data.val());
      //   // }, function (error) {
      //   //   console.log("Error: " + error.code);
      //   // });

      //   return [];
      // },
      subTotal() {
        return this.products.reduce((subtotal, cur) => parseFloat(subtotal) + parseFloat(cur.amount), 0);
      }
    },
    methods: {
      fetchCustomerList() {
        let name = 'Sa';
        db.collection('customers').orderBy('name').startAt(name).endAt(name+'\uf8ff').get().then(snapshot => {
          this.customerList = [];      
          snapshot.docs.forEach(doc => {
            this.customerList.push({
              ...doc.data(),
              id: doc.id
            })
            this.loading = false;
          })
        })             
      },
      fetchBillTypeList() {
        db.collection('bill-types').orderBy('name').get().then(snapshot => {
          this.billTypeList = [];      
          snapshot.docs.forEach(doc => {
            this.billTypeList.push({
              ...doc.data(),
              id: doc.id
            })
            this.loading = false;
          })
        })        
      },
      openNewCustomerDialog(){
        alert('openNewCustomerDialog');
      },
      openAddProductBox(){
        alert('openAddProductBox');
      },
      removeProduct(id) {
        this.products = this.products.filter(obj => obj.id != id );        
      },
      addProduct() {
        this.products.push(this.currentProduct);
        this.clearCurrentProduct();
      },
      close() {
        this.dialog = false;
        this.clearCurrentProduct();
      }, 
      clearCurrentProduct() {
        this.currentProduct = {
          id: '',
          code: '',
          name: '',
          rate: '',
          quantity: '',
          amount: '',
        };
      }
    }
  }
</script>