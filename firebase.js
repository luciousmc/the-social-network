import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCywxlm07JE7kjrDD9SK5l4vpY-uIkzZ40",
  authDomain: "thesocialnetwork-2d29e.firebaseapp.com",
  projectId: "thesocialnetwork-2d29e",
  storageBucket: "thesocialnetwork-2d29e.appspot.com",
  messagingSenderId: "541455340695",
  appId: "1:541455340695:web:34be3eb25c5758a46c45d2"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };