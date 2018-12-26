<template>
  <state-form title="Add" :state="state" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import StateForm from '@/components/state/StateForm';

export default {
  name: 'create-state-form',
  components: {
    StateForm
  },
  data() {
    return {
      state: {
        code: '',
        gst_code: '',
        name: '',
      }
    }
  },
  methods: {
    submit() {
      addMasterItem('states', this.state).then((data) => {
        this.$emit('create', { name: this.state.name });
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
