<template lang="html">
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }} State</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          label="Code"
          v-model="state.code"
          :rules="codeRules"
          required
        ></v-text-field>
        <v-text-field
          label="GST Code"
          v-model="state.gst_code"
          :rules="gstCodeRules"
          required
        ></v-text-field>
        <v-text-field
          label="Name"
          v-model="state.name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-btn @click="add">{{ title }}</v-btn>
        <!-- <v-btn @click="clear">Clear</v-btn> -->
        <v-btn @click="cancel">Cancel</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'state-form',
  props: ['title', 'state', 'onSubmit'],
  data() {
    return {
      valid: true,
      codeRules: [(code) => {
        if (code.trim() === '') return 'Code must not be empty.';
        return true;
      }],
      gstCodeRules: [(gst_code) => {
        if (isNaN(gst_code)) return 'GST Code must be a valid number.';
        if (Number(gst_code) <= 0) return 'GST Code must be greater than $0';
        return true;
      }],
      nameRules: [(name) => {
        if (name.trim() === '') return 'Name must not be empty.';
        return true;
      }],
    };
  },
  methods: {
    add() {
      if (this.valid) {
        this.$emit('submit');
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    cancel() {
      this.$emit('cancel');
    }
  },
};
</script>