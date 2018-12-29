<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} Bill Type</span>
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
                v-model="billType.code"
                :rules="codeRules"
                required
                :disabled="disabledFields ? !disabledFields['code'] : false"
                :error="formErrors ? !!formErrors.code : false"
                :error-messages="formErrors ? formErrors.code : ''"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field 
                v-model="billType.name"
                label="Name"
                ref="name"
                :autofocus="autofocus === 'incomeCode'"
                @keyup.enter="setFocus('submit')"
                required
                :rules="nameRules"
                :error="formErrors ? !!formErrors.name : false"
                :error-messages="formErrors ? formErrors.name : ''"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field 
                v-model="billType.income_code" 
                label="Income Code"
                ref="incomeCode"
                @keyup.enter="setFocus('expenseCode')"
                required
                :rules="incomeCodeRules"
                :error="formErrors ? !!formErrors.income_code : false"
                :error-messages="formErrors ? formErrors.income_code : ''"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field 
                v-model="billType.expense_code" 
                label="Expense Code"
                ref="expenseCode"
                @keyup.enter="setFocus('gstPercentage')"
                required
                :rules="expenseCodeRules"
                :error="formErrors ? !!formErrors.expense_code : false"
                :error-messages="formErrors ? formErrors.expense_code : ''"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field 
                v-model="billType.gst_tax_percentage" 
                label="GST Tax Percentage"
                ref="gstPercentage"
                @keyup.enter="setFocus('charge_1_header')"
                required
                :rules="nameRules && gstPercentageRules"
                :error="formErrors ? !!formErrors.gst_tax_percentage : false"
                :error-messages="formErrors ? formErrors.gst_tax_percentage : ''"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md8>
              <v-text-field 
                v-model="billType.charge_1_header" 
                label="Additional Charge 1 Header"
                ref="charge_1_header"
                @keyup.enter="setFocus('charge_1_percentage')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field 
                ref="charge_1_percentage"
                @keyup.enter="setFocus('charge_2_header')"
                v-model="billType.charge_1_percentage" 
                label="Additional Charge 1 Percentage"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md8>
              <v-text-field 
                ref="charge_2_header"
                @keyup.enter="setFocus('charge_2_percentage')"
                v-model="billType.charge_2_header" 
                label="Additional Charge 2 Header"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field 
                ref="charge_2_percentage"
                @keyup.enter="setFocus('charge_3_header')"
                v-model="billType.charge_2_percentage" 
                label="Additional Charge 2 Percentage"></v-text-field>
            </v-flex>
            </v-layout>                
          <v-layout wrap>
            <v-flex xs12 sm12 md8>
              <v-text-field 
                ref="charge_3_header"
                @keyup.enter="setFocus('charge_3_percentage')"
                v-model="billType.charge_3_header" 
                label="Additional Charge 3 Header"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field 
                ref="charge_3_percentage"
                @keyup.enter="setFocus('submit')"
                v-model="billType.charge_3_percentage" 
                label="Additional Charge 3 Percentage"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>

        <v-btn ref="submit" id="frm_bill_type_submit" @click="add">{{ title }}</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import mixin from '@/mixins/MasterFormMixin';

export default {
  name: 'bill-type-form',
  props: ['title', 'billType', 'formErrors', 'disabledFields', 'autofocus'],
  data() {
    return {
      valid: true,
      codeRules: [(code) => {
        if (code.trim() === '') return 'Code must not be empty.';
        if (code.length > 3) return 'Code must be 3 chars max.';
        return true;
      }],
      nameRules: [(name) => {
        if (name.trim() === '') return 'Name must not be empty.';
        return true;
      }],
      incomeCodeRules: [(income_code) => {
        if (income_code.toString().trim() === '') return 'Income Code must not be empty.';
        return true;
      }],
      expenseCodeRules: [(expense_code) => {
        if (expense_code.toString().trim() === '') return 'Expense Code must not be empty.';
        return true;
      }],
      gstPercentageRules: [(gst_tax_percentage) => {
        if (isNaN(gst_tax_percentage)) return 'GST Percentage must be a valid number.';
        if(gst_tax_percentage.length > 4)  return 'GST Percentage cannot be more than 2 digits';
        if (Number(gst_tax_percentage) <= 0) return 'GST Percentage must be greater than 0';
        return true;
      }],
    };
  },
  mixins: [mixin],
  methods: {
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