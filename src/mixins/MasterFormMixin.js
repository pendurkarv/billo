export default {
  methods: {
    setFocus(element) {
      if (this.$refs[element].type === 'button') {
        document.getElementById(this.$refs[element].$attrs.id).focus();
      } else {
        this.$refs[element].focus();
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
