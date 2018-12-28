import axios from 'axios';
import store from '@/store';

// const token = localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost/billing-app/web/api/';
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.interceptors.request.use(
  (config) => {
    const { getters: { token } } = store;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  // response => response,
  undefined,
  (error) => {
    console.log(error.response);
    let text = 'Network error occured';
    let errData = error.response;
    if (error.response) {
      text = error.response.data.message;
      if (error.response.status === 404) {
        text = `${error.response.status} - Requested resource not found`;
      } else if (error.response.status === 401) {
        text = 'Invalid username or password';
      } else if (error.response.status === 422) {
        text = 'Data validation failed';
        errData = {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        };
      }
    }

    const snackbar = {
      text,
      show: true,
      color: 'error',
    };
    store.commit('showSnackbar', snackbar);

    return Promise.reject(errData);
  },
);

// ------ User Operations ------ //
export const loginUser = credentials => axios.post('user/login', credentials).then((res) => {
  return res.data;
});

// ------ Master CRUD Operations ------ //
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
