import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = 'http://localhost/billing-app/web/api/';

axios.interceptors.response.use(
  response => response,
  (error) => {
    // handle error
    if (error.response) {
      let text = error.response.data.message;

      if (error.response.status === 404) {
        text = `${error.response.status} - Requested resource not found`;
      }

      const snackbar = {
        text,
        show: true,
        color: 'error',
      };
      store.commit('showSnackbar', snackbar);

      // console.log(error.response);
    }

    // return error;
  },
);

export const fetchMasterList = (master, q = '', page = 1, perPage = 10, sortBy = 'name', descending = false) => axios.get(master, {
  params: { q, page, 'per-page': perPage, 'sort-by': sortBy, descending },
}).then((res) => {
  return {
    data: res.data,
    curPage: parseInt(res.headers['x-pagination-current-page'], 10),
    pageCount: parseInt(res.headers['x-pagination-page-count'], 10),
    perPage: parseInt(res.headers['x-pagination-per-page'], 10),
    totalCount: parseInt(res.headers['x-pagination-total-count'], 10),
  };
});

export const addMasterItem = (master, data) => axios.post(master, data);
export const fetchMasterItem = (master, id) => axios.get(`${master}/${id}`);
export const updateMasterItem = (master, id, data) => axios.patch(`${master}/${id}`, data);
export const deleteMasterItem = (master, id) => axios.delete(`${master}/${id}`);

// export default {
//   fetchMasterList,
//   addMaster,
//   // addDocument,
//   // updateDocument,
// };
