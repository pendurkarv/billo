<template>
  <branch-form title="Edit" autofocus="name" :branch="branch" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import BranchForm from '@/components/branch/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-branch-form',
  components: {
    BranchForm
  },
  props: ['id'],
  data() {
    return {
      branch: {
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
      return fetchMasterItem('branches', id).then(branch => {
        this.branch = branch.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('branches', this.id, this.branch).then((data) => {
        this.$emit('update', { name: this.branch.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>