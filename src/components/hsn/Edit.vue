<template>
  <hsn-form title="Edit" autofocus="name" :hsn="hsn" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import HsnForm from '@/components/hsn/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-hsn-form',
  components: {
    HsnForm
  },
  props: ['id'],
  data() {
    return {
      hsn: {
        code: '',
        name: '',
        tax_percentage: '',
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
      return fetchMasterItem('hsns', id).then(hsn => {
        this.hsn = hsn.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('hsns', this.id, this.hsn).then((data) => {
        this.$emit('update', { name: this.hsn.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>