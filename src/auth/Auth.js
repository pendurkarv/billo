export default function (Vue) {
  Vue.auth = {
    setToken: (user) => {
      localStorage.setItem('token', user.token);
      localStorage.setItem('expiration', user.expiration);
      localStorage.setItem('user', JSON.stringify(user.data));
    },

    getToken: () => {
      const token = localStorage.getItem('token');
      const expiration = localStorage.getItem('expiration');

      if (!token || !expiration) {
        return null;
      }

      if (Date.now() > parseInt(expiration, 10)) {
        this.destroyToken();
        return null;
      }

      return token;
    },

    destroyToken: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('user');
    },

    isAuthenticated: () => {
      if (this.getToken()) {
        return true;
      }
      return false;
    },
  };

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => Vue.auth,
    },
  });
}
