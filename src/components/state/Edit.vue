<template>
  <state-form title="Edit" :state="state" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import StateForm from '@/components/state/StateForm';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-state-form',
  components: {
    StateForm
  },
  props: ['id'],
  data() {
    return {
      state: {
        code: '',
        gst_code: '',
        name: '',
      },
      disabledFields: ['code', 'gst_code'],
      formErrors: {}
    }
  },
  mounted() {
    // const { id } = this.$route.params;
    this.load(this.id);
  },
  methods: {
    load(id) {
      return fetchMasterItem('states', id).then(state => {
        this.state = state.data;
      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('states', this.id, this.state).then((data) => {
        this.$emit('update', { name: this.state.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>