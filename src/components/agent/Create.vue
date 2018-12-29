<template>
  <agent-form title="Add" :agent="agent" :formErrors="formErrors" @submit="submit" @cancel="cancel" />
</template>

<script>
import { addMasterItem } from '@/api';
import AgentForm from '@/components/agent/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'create-agent-form',
  components: {
    AgentForm
  },
  data() {
    return {
      agent: {
        code: '',
        name: '',
        commission: '',
      },
      formErrors: {}
    }
  },
  methods: {
    submit() {
      addMasterItem('agents', this.agent).then((data) => {
        this.$emit('create', { name: this.agent.name });
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
