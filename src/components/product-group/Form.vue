<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} Product Group</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field 
                @keyup.enter="setFocus('name')"
                :autofocus="!autofocus || autofocus === 'code'"
                label="Code"
                v-model="productGroup.code"
                :rules="codeRules"
                required
                :disabled="disabledFields ? !disabledFields['code'] : false"
                :error="formErrors ? !!formErrors.code : false"
                :error-messages="formErrors ? formErrors.code : ''"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field 
                v-model="productGroup.name"
                label="Name"
                ref="name"
                :autofocus="autofocus === 'name'"
                @keyup.enter="setFocus('unit')"
                required
                :rules="nameRules"
                :error="formErrors ? !!formErrors.name : false"
                :error-messages="formErrors ? formErrors.name : ''"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-autocomplete
                ref="unit"
                @keyup.enter="setFocus('category')"
                label="Unit"
                v-model="productGroup.unit_id"
                :rules="unitRules"
                required
                :error="formErrors ? !!formErrors.unit : false"
                :error-messages="formErrors ? formErrors.unit : ''"

                :items="unitList"
                item-text="name"
                item-value="id"
             >
                <v-divider slot="append-item" class="mt-2" ></v-divider>                    
                <v-list-tile slot="append-item" ripple @click="openDialog('unit')" >
                  <v-list-tile-title>Add New</v-list-tile-title>
                </v-list-tile>
              </v-autocomplete>      
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-autocomplete
                ref="category"
                @keyup.enter="setFocus('equalRates')"
                label="Category"
                v-model="productGroup.category_id"
                :rules="categoryRules"
                required
                :error="formErrors ? !!formErrors.category : false"
                :error-messages="formErrors ? formErrors.category : ''"

                :items="categoryList"
                item-text="name"
                item-value="id"
             >
                <v-divider slot="append-item" class="mt-2" ></v-divider>                    
                <v-list-tile slot="append-item" ripple @click="openDialog('category')" >
                  <v-list-tile-title>Add New</v-list-tile-title>
                </v-list-tile>
              </v-autocomplete>      
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field 
                @keyup.enter="setFocus('sellingRates')"
                label="Equal Meters"
                ref="equalMeters"
                v-model="productGroup.equal_meters"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field 
                v-model="productGroup.selling_rates"
                label="Selling Rates"
                ref="sellingRates"
                @keyup.enter="setFocus('submit')"
              ></v-text-field>
            </v-flex>
          </v-layout>

        </v-container>

        <v-btn ref="submit" id="frm_product-group_submit" @click="add">{{ title }}</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-form>
    </v-card-text>

    <v-dialog v-model="unitDialog" max-width="300px">
      <create-unit-form @create="postUnitCreate" @cancel="closeDialog('unit')" />
    </v-dialog>

    <v-dialog v-model="categoryDialog" max-width="300px">
      <create-category-form @create="postCategoryCreate" @cancel="closeDialog('category')" />
    </v-dialog>

  </v-card>
</template>

<script>
import mixin from '@/mixins/MasterFormMixin';
import CreateUnitForm from '@/components/unit/Create';
import CreateCategoryForm from '@/components/category/Create';
import { fetchMasterList } from '@/api';

export default {
  components: {
    'create-unit-form': CreateUnitForm,
    'create-category-form': CreateCategoryForm,
  },
  name: 'product-group-form',
  props: ['title', 'productGroup', 'formErrors', 'disabledFields', 'autofocus'],
  data() {
    return {
      unitList: [],
      categoryList: [],
      unitDialog: false,
      categoryDialog: false,
      valid: true,
      codeRules: [(code) => {
        if (code.trim() === '') return 'Code must not be empty.';
        return true;
      }],
      nameRules: [(name) => {
        if (name.trim() === '') return 'Name must not be empty.';
        return true;
      }],
      unitRules: [(unit_id) => {
        if (unit_id.toString().trim() === '') return 'Unit must not be empty.';
        return true;
      }],
      categoryRules: [(category_id) => {
        if (category_id.toString().trim() === '') return 'category must not be empty.';
        return true;
      }],
    };
  },
  mixins: [mixin],
  mounted() {
    this.getUnitList();
    this.getCategoryList();
  },
  methods: {
    openDialog(ref) {
      if (ref === 'unit') {
        this.unitDialog = true;
      } else if (ref === 'category') {
        this.categoryDialog = true;
      }

      this.$refs[ref].isMenuActive = false;
    },

    closeDialog(ref) {
      if(ref === 'unit') {
        this.unitDialog = false;
      } else if(ref === 'category') {
        this.categoryDialog = false;
      }
      console.log(ref);
      this.setFocus(ref);
      console.log(this.$refs[ref].$el.querySelector('input'))
      this.$refs[ref].$el.querySelector('input').focus()
    },
    postUnitCreate(data) {
      this.getUnitList();
      console.log('Unit added');
      console.log(data);
      this.unitDialog = false;
    },
    getUnitList() {
      return fetchMasterList('units').then(unitList => {
        this.unitList = unitList.data;
      });      
    },
    postCategoryCreate(data) {
      this.getCategoryList();
      this.categoryDialog = false;
    },
    getCategoryList() {
      return fetchMasterList('categories').then(categoryList => {
        this.categoryList = categoryList.data;
      });      
    },
    add() {
      if (this.$refs.form.validate()) {
        this.$emit('submit');
      } else {
        console.log('failed');
      }
    },
  },
};
</script>