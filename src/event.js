export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback(e) {
      this.$router.push({ path: '/' });
    },
  },
  {
    name: 'APP_LOGOUT',
    callback(e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logout successfully.',
      };
      this.$router.replace({ path: '/login' });
    },
  },
  {
    name: 'APP_PAGE_LOADED',
    callback(e) {
    },
  },
  {
    name: 'APP_AUTH_FAILED',
    callback(e) {
      this.$router.push('/login');
      this.$message.error('Token has expired');
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback(msg) {
      this.$message.error(msg);
    },
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback(msg) {
      this.$message.error(msg);
      this.$router.push('/forbidden');
    },
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback(msg) {
      this.$message.success(msg);
    },
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback(msg) {
      this.$message.success(msg);
    },
  },

];
