<template>
  <category-form title="Edit" autofocus="name" :category="category" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import CategoryForm from '@/components/category/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-category-form',
  components: {
    CategoryForm
  },
  props: ['id'],
  data() {
    return {
      category: {
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
      return fetchMasterItem('categories', id).then(category => {
        this.category = category.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('categories', this.id, this.category).then((data) => {
        this.$emit('update', { name: this.category.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>