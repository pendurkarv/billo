<template>
  <bank-form title="Add" :bank="bank" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import BankForm from '@/components/bank/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-bank-form',
  components: {
    BankForm
  },
  data() {
    return {
      bank: {
        code: '',
        name: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('banks', this.bank).then((data) => {
        this.$emit('create', { name: this.bank.name });
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
