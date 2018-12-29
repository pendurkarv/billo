<template>
  <bill-type-form title="Edit" autofocus="name" :bill-type="billType" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import BillTypeForm from '@/components/bill-type/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-bill-type-form',
  components: {
    BillTypeForm
  },
  props: ['id'],
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
      disabledFields: ['code'],
      formErrors: {}
    }
  },
  mounted() {
    this.load(this.id);
  },
  methods: {
    load(id) {
      return fetchMasterItem('bill-types', id).then(billType => {
        this.billType = billType.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('bill-types', this.id, this.billType).then((data) => {
        this.$emit('update', { name: this.billType.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>