<template>
  <v-card hover>
    <v-card-title>
      <h2 class="heading">{{ title }}</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3" ref="form">
        <v-text-field v-model="formData.code" label="Code" required :rules="codeRules"></v-text-field>
        <v-text-field v-model="formData.name" label="Name" required :rules="nameRules"></v-text-field>
        <v-layout>
          <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">{{ this.id == '' ? 'Add' : 'Edit' }} Unit</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="close" class="default mx-0 mt-3">Close</v-btn>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import db from '@/fb';

export default {
  name: 'unit-master-form',
  props: {
    title: { type: String, required: true },
    id: String,
  },
  data() {
    return {
      formData: {
        code: '',
        name: '',
      },
      loading: false,
      codeRules: [
        v => !!v || 'This field is required',
        v => v.length <= 10 || 'Maximum length is 10 characters'
      ],      
      nameRules: [
        v => !!v || 'This field is required',
        v => v.length <= 20 || 'Maximum length is 20 characters'
      ],      
    }
  },
  watch: {
    id: function(id) {
      if(id !== '') {
        db.collection('units').doc(id).get().then(doc => {
          if(doc.exists) {
            const docData = doc.data();
            this.formData.code = docData.code;
            this.formData.name = docData.name;
          } else {
            alert('Error fetching data for document - ' + id);
          }
        });      
      } 
    }
  },
  mounted: function () {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.$emit('closed');
      }
    });
  },  
  created() {
    this.clearForm();
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        if(this.id == '') {
          db.collection('units').add(this.formData).then(() => {
            this.loading = false
            this.dialog = false
            const snackbar = {
              text: `New "${this.formData.name}" Unit created`,
              show: true,
              color: 'success'
            };
            this.clearForm();
            this.$store.commit('showSnackbar', snackbar);
            this.$emit('saved');
          })
        } else {
          db.collection('units').doc(this.id).update(this.formData).then(() => {
            this.loading = false
            this.dialog = false
            const snackbar = {
              text: `Unit "${this.formData.name}" Unit updated`,
              show: true,
              color: 'success'
            };
            this.clearForm();
            this.$store.commit('showSnackbar', snackbar);
            this.$emit('saved');
          })
        }
      }
    },
    clearForm() {
      this.formData.code = '';
      this.formData.name = '';
      this.loading = false;
    },
    close() {
      this.clearForm();
      this.$emit('closed');
    }
  }
}
</script>
