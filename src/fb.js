import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDq0NnwzbC1ZvUxbJ7UFu0LMYYGaRmmVNM',
  authDomain: 'blog-2b4cd.firebaseapp.com',
  databaseURL: 'https://blog-2b4cd.firebaseio.com',
  projectId: 'blog-2b4cd',
  storageBucket: 'blog-2b4cd.appspot.com',
  messagingSenderId: '907571477905',
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
