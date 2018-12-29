<template>
  <bank-form title="Edit" autofocus="name" :bank="bank" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import BankForm from '@/components/bank/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-bank-form',
  components: {
    BankForm
  },
  props: ['id'],
  data() {
    return {
      bank: {
        code: '',
        name: '',
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
      return fetchMasterItem('banks', id).then(bank => {
        this.bank = bank.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('banks', this.id, this.bank).then((data) => {
        this.$emit('update', { name: this.bank.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>