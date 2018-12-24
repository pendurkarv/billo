import axios from 'axios';

axios.defaults.baseURL = 'http://localhost/billing-app/web/api/';

axios.interceptors.response.use(
  response => response,
  (error) => {
    // handle error
    if (error.response) {
      alert(error.response.data.message);
    }
  },
);

export const fetchMasterList = (master, q = '', page = 1, perPage = 10, sortBy = 'name', descending = false) => axios.get(master, {
  params: { q, page, 'per-page': perPage, 'sort-by': sortBy, descending },
}).then((res) => {
  return {
    data: res.data,
    curPage: parseInt(res.headers['x-pagination-current-page']),
    pageCount: parseInt(res.headers['x-pagination-page-count']),
    perPage: parseInt(res.headers['x-pagination-per-page']),
    totalCount: parseInt(res.headers['x-pagination-total-count']),
  };
}).catch(err => console.log(err));

export const addMasterItem = (master, data) => axios.post(master, data);
export const updateMasterItem = (master, id, data) => axios.patch(`${master}/${id}`, data);
export const deleteMasterItem = (master, id) => axios.delete(`${master}/${id}`);


// export default {
//   fetchMasterList,
//   addMaster,
//   // addDocument,
//   // updateDocument,
// };
