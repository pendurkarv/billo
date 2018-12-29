<template>
  <agent-form title="Edit" autofocus="name" :agent="agent" :fromErrors="formErrors" :disabledFields="disabledFields" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import AgentForm from '@/components/agent/Form';
import { formatValidationErrors } from '@/util/api';

export default {
  name: 'edit-agent-form',
  components: {
    AgentForm
  },
  props: ['id'],
  data() {
    return {
      agent: {
        code: '',
        name: '',
        commission: '',
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
      return fetchMasterItem('agents', id).then(agent => {
        this.agent = agent.data;

      }).catch(err => {
        this.formErrors = formatValidationErrors(err);
      });
    },
    submit() {
      updateMasterItem('agents', this.id, this.agent).then((data) => {
        this.$emit('update', { name: this.agent.name });
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>