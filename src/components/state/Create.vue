<template>
  <state-form title="Add" :state="state" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import StateForm from '@/components/state/StateForm';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-state-form',
  components: {
    StateForm
  },
  data() {
    return {
      state: {
        code: '',
        gst_code: '',
        name: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('states', this.state).then((data) => {
        this.$emit('create', { name: this.state.name });
      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style>

</style>
