<template>
  <unit-form title="Edit" autofocus="name" :unit="unit" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import UnitForm from '@/components/unit/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-unit-form',
  components: {
    UnitForm
  },
  props: ['id'],
  data() {
    return {
      unit: {
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
      return fetchMasterItem('units', id).then(unit => {
        this.unit = unit.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('units', this.id, this.unit).then((data) => {
        this.$emit('update', { name: this.unit.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>