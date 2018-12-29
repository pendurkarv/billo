<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} Bank</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          ref="code"
          @keyup.enter="setFocus('name')"
          :autofocus="!autofocus || autofocus === 'code'"
          label="Code"
          v-model="bank.code"
          :rules="codeRules"
          required
          :disabled="disabledFields ? !disabledFields['code'] : false"
          :error="formErrors ? !!formErrors.code : false"
          :error-messages="formErrors ? formErrors.code : ''"
        ></v-text-field>
        <v-text-field
          :autofocus="autofocus === 'name'"
          @keyup.enter="setFocus('submit')"
          ref="name"
          label="Name"
          v-model="bank.name"
          :rules="nameRules"
          required
          :error="formErrors ? !!formErrors.name : false"
          :error-messages="formErrors ? formErrors.name : ''"
        ></v-text-field>
        <v-btn ref="submit" id="frm_bank_submit" @click="add">{{ title }}</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
        <!-- <v-btn @click="clear">Clear</v-btn> -->
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import mixin from '@/mixins/MasterFormMixin';

export default {
  name: 'bank-form',
  props: ['title', 'bank', 'formErrors', 'disabledFields', 'autofocus'],
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