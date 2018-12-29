<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} State</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          :autofocus="!autofocus || autofocus === 'code'"
          label="Code"
          v-model="state.code"
          :rules="codeRules"
          required
          :disabled="disabledFields ? !disabledFields['code'] : false"
          :error="formErrors ? !!formErrors.code : false"
          :error-messages="formErrors ? formErrors.code : ''"
        ></v-text-field>
        <v-text-field
          label="GST Code"
          v-model="state.gst_code"
          :rules="gstCodeRules"
          required
          :disabled="disabledFields ? !disabledFields['gst_code'] : false"
          :error="formErrors ? !!formErrors.gst_code : false"
          :error-messages="formErrors ? formErrors.gst_code : ''"
        ></v-text-field>
        <v-text-field
          :autofocus="autofocus === 'name'"
          label="Name"
          v-model="state.name"
          :rules="nameRules"
          required
          :error="formErrors ? !!formErrors.name : false"
          :error-messages="formErrors ? formErrors.name : ''"
        ></v-text-field>
        <v-btn @click="add">{{ title }}</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
        <!-- <v-btn @click="clear">Clear</v-btn> -->
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'state-form',
  props: ['title', 'state', 'formErrors', 'disabledFields', 'autofocus'],
  data() {
    return {
      valid: true,
      codeRules: [(code) => {
        if (code.trim() === '') return 'Code must not be empty.';
        if (code.length > 3) return 'Code must be 3 chars max.';
        return true;
      }],
      gstCodeRules: [(gst_code) => {
        if (isNaN(gst_code)) return 'GST Code must be a valid number.';
        if (Number(gst_code) <= 0) return 'GST Code must be greater than 0';
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