import db from '@/fb';

export const fetchMasterList = master => db.collection(master).orderBy('name').get().then((snapshot) => {
  const list = [];
  snapshot.docs.forEach((doc) => {
    list.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return list;
});

export const updateDocument = (collection, id, data) => db.collection(collection).doc(id).update(data);
export const addDocument = (collection, data) => db.collection(collection).add(data);
export const deleteDocument = (collection, id) => db.collection(collection).doc(id).delete();

export default {
  fetchMasterList,
  addDocument,
  updateDocument,
};
