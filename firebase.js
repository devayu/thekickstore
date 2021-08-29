import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDWBRlsKMYXinVu-KsptaAkkAJJZOXdx0A',
  authDomain: 'the-kicks-store.firebaseapp.com',
  projectId: 'the-kicks-store',
  storageBucket: 'the-kicks-store.appspot.com',
  messagingSenderId: '26096709816',
  appId: '1:26096709816:web:ad31ccf26203b643a4844d',
  measurementId: 'G-K2PCBHWB0X',
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const emailProvider = new firebase.auth.EmailAuthProvider();
const signOut = auth.signOut();
export { auth, googleProvider, emailProvider, signOut, db };
