<template>
  <branch-form title="Add" :branch="branch" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import BranchForm from '@/components/branch/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-branch-form',
  components: {
    BranchForm
  },
  data() {
    return {
      branch: {
        code: '',
        name: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('branches', this.branch).then((data) => {
        this.$emit('create', { name: this.branch.name });
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
