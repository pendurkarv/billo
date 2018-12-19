export default {
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.close();
      }
    });
  },
};
