<template>
  <state-form title="Edit" :state="state" @submit="submit" @cancel="cancel" />
</template>

<script>
import { fetchMasterItem, updateMasterItem } from '@/api';
import StateForm from '@/components/state/StateForm';

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
      }
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
        // console.log(err);
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