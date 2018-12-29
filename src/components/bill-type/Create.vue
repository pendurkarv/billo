<template>
  <bill-type-form title="Add" :bill-type="billType" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import BillTypeForm from '@/components/bill-type/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-bill-type-form',
  components: {
    BillTypeForm
  },
  data() {
    return {
      billType: {
        code: '',
        name: '',
        income_code: '',
        expense_code: '',
        gst_tax_percentage: '',
        charge_1_header: '',
        charge_1_percentage: 0,
        charge_2_header: '',
        charge_2_percentage: 0,
        charge_2_header: '',
        charge_2_percentage: 0,
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('bill-types', this.billType).then((data) => {
        this.$emit('create', { name: this.billType.name });
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
