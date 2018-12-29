<template>
  <category-form title="Add" :category="category" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import CategoryForm from '@/components/category/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-category-form',
  components: {
    CategoryForm
  },
  data() {
    return {
      category: {
        code: '',
        name: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('categories', this.category).then((data) => {
        this.$emit('create', { name: this.category.name });
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
