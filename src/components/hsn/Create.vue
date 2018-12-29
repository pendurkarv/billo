<template>
  <hsn-form title="Add" :hsn="hsn" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import HsnForm from '@/components/hsn/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-hsn-form',
  components: {
    HsnForm
  },
  data() {
    return {
      hsn: {
        code: '',
        name: '',
        tax_percentage: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('hsns', this.hsn).then((data) => {
        this.$emit('create', { name: this.hsn.name });
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
