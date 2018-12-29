<template>
  <product-group-form title="Add" :product-group="productGroup" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import ProductGroupForm from '@/components/product-group/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-product-group-form',
  components: {
    ProductGroupForm
  },
  data() {
    return {
      productGroup: {
        code: '',
        name: '',
        unit_id: '',
        category_id: '',
        equal_meters: '',
        selling_rates: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('product-groups', this.productGroup).then((data) => {
        this.$emit('create', { name: this.productGroup.name });
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
