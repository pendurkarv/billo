<template>
  <product-group-form title="Edit" autofocus="name" :product-group="productGroup" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import ProductGroupForm from '@/components/product-group/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-product-group-form',
  components: {
    ProductGroupForm
  },
  props: ['id'],
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
      disabledFields: ['code'],
      formErrors: {}
    }
  },
  mounted() {
    this.load(this.id);
  },
  methods: {
    load(id) {
      return fetchMasterItem('product-groups', id).then(productGroup => {
        this.productGroup = productGroup.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('product-groups', this.id, this.productGroup).then((data) => {
        this.$emit('update', { name: this.productGroup.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>