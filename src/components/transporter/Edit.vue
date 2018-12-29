<template>
  <transporter-form title="Edit" autofocus="name" :transporter="transporter" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import TransporterForm from '@/components/transporter/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-transporter-form',
  components: {
    TransporterForm
  },
  props: ['id'],
  data() {
    return {
      transporter: {
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
      return fetchMasterItem('transporters', id).then(transporter => {
        this.transporter = transporter.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('transporters', this.id, this.transporter).then((data) => {
        this.$emit('update', { name: this.transporter.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>