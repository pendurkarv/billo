<template>
  <transporter-form title="Add" :transporter="transporter" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import TransporterForm from '@/components/transporter/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-transporter-form',
  components: {
    TransporterForm
  },
  data() {
    return {
      transporter: {
        code: '',
        name: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('transporters', this.transporter).then((data) => {
        this.$emit('create', { name: this.transporter.name });
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
