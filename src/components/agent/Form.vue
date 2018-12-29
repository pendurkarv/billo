<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} Agent</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          ref="code"
          @keyup.enter="setFocus('name')"
          :autofocus="!autofocus || autofocus === 'code'"
          label="Code"
          v-model="agent.code"
          :rules="codeRules"
          required
          :disabled="disabledFields ? !disabledFields['code'] : false"
          :error="formErrors ? !!formErrors.code : false"
          :error-messages="formErrors ? formErrors.code : ''"
        ></v-text-field>
        <v-text-field
          :autofocus="autofocus === 'name'"
          ref="name"
          @keyup.enter="setFocus('commission')"
          label="Name"
          v-model="agent.name"
          :rules="nameRules"
          required
          :error="formErrors ? !!formErrors.name : false"
          :error-messages="formErrors ? formErrors.name : ''"
        ></v-text-field>
        <v-text-field
          label="Commision"
          suffix="%"
          ref="commission"
          @keyup.enter="setFocus('submit')"
          v-model="agent.commission"
          :rules="commissionRules"
          required
          :error="formErrors ? !!formErrors.commission : false"
          :error-messages="formErrors ? formErrors.commission : ''"
        ></v-text-field>
        <v-btn ref="submit" id="frm_agent_submit" @click="add">{{ title }}</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
        <!-- <v-btn @click="clear">Clear</v-btn> -->
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import mixin from '@/mixins/MasterFormMixin';

export default {
  name: 'agent-form',
  props: ['title', 'agent', 'formErrors', 'disabledFields', 'autofocus'],
  data() {
    return {
      valid: true,
      codeRules: [(code) => {
        if (code.trim() === '') return 'Code must not be empty.';
        if (code.length > 3) return 'Code must be 3 chars max.';
        return true;
      }],
      commissionRules: [(commission) => {
        if (isNaN(commission)) return 'Commision must be a valid number.';
        if(commission.length > 4)  return 'Commission cannot be more than 2 digits';
        if (Number(commission) <= 0) return 'Commision must be greater than 0';
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