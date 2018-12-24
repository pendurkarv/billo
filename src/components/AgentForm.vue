<template>
  <form>
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-sm>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field v-model="formData.code" label="Code" autofocus></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field v-model="formData.name" label="Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field v-model="formData.commision" label="Commision"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>   
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
export default {
  name: 'agent-form',
  props: {
    title: String,
  },
  data() {
    return {
      formData: {
        code: '',
        name: '',
        commision: 0,
      }
    };
  },
  methods: {
    save() {
      console.log('save agent form');
      this.$emit('save')
    },
    close() {
      console.log('close agent form');
      this.$emit('close')
    }   
  }
}
</script>

<style>

</style>
