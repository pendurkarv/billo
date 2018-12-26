<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Delete Item</v-card-title>
        <v-card-text>
          Do you want to delete item "{{ item.name }}"?          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="yes">Yes</v-btn>
          <v-btn color="error" flat @click="no">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'delete-alert',
  props: ['dialog', 'item'],
  data() {
    return {
      // show: false
    };
  },
  methods: {
    yes() {
      this.$emit('yes', this.item);
    },
    no() {
      this.$emit('no');
    }
  }
}
</script>