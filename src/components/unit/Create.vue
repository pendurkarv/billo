<template>
  <unit-form title="Add" :unit="unit" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import UnitForm from '@/components/unit/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-unit-form',
  components: {
    UnitForm
  },
  data() {
    return {
      unit: {
        code: '',
        name: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('units', this.unit).then((data) => {
        this.$emit('create', { name: this.unit.name });
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
