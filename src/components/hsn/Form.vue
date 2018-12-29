<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} HSN</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          ref="code"
          @keyup.enter="setFocus('name')"
          :autofocus="!autofocus || autofocus === 'code'"
          label="Code"
          v-model="hsn.code"
          :rules="codeRules"
          required
          :disabled="disabledFields ? !disabledFields['code'] : false"
          :error="formErrors ? !!formErrors.code : false"
          :error-messages="formErrors ? formErrors.code : ''"
        ></v-text-field>
        <v-text-field
          :autofocus="autofocus === 'name'"
          ref="name"
          @keyup.enter="setFocus('tax_percentage')"
          label="Name"
          v-model="hsn.name"
          :rules="nameRules"
          required
          :error="formErrors ? !!formErrors.name : false"
          :error-messages="formErrors ? formErrors.name : ''"
        ></v-text-field>
        <v-text-field
          label="Tax Percentage"
          suffix="%"
          ref="tax_percentage"
          @keyup.enter="setFocus('submit')"
          v-model="hsn.tax_percentage"
          :rules="taxPercentageRules"
          required
          :error="formErrors ? !!formErrors.tax_percentage : false"
          :error-messages="formErrors ? formErrors.tax_percentage : ''"
        ></v-text-field>
        <v-btn ref="submit" id="frm_hsn_submit" @click="add">{{ title }}</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import mixin from '@/mixins/MasterFormMixin';

export default {
  name: 'hsn-form',
  props: ['title', 'hsn', 'formErrors', 'disabledFields', 'autofocus'],
  data() {
    return {
      valid: true,
      codeRules: [(code) => {
        if (code.trim() === '') return 'Code must not be empty.';
        if (code.length > 3) return 'Code must be 3 chars max.';
        return true;
      }],
      taxPercentageRules: [(tax_percentage) => {
        if (isNaN(tax_percentage)) return 'Tax Percentage must be a valid number.';
        if(tax_percentage.length > 4)  return 'Tax Percentage cannot be more than 2 digits';
        if (Number(tax_percentage) <= 0) return 'Tax Percentage must be greater than 0';
        return true;
      }],
      nameRules: [(name) => {
        if (name.trim() === '') return 'Name must not be empty.';
        return true;
      }],
    };
  },
  mixins: [mixin],
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.$emit('submit');
      }
    },
  },
};
</script>