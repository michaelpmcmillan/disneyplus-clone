import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, collection, getDoc, getDocs } from 'firebase/firestore/lite';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2aqAdj4gQ_kiLJ3nQN5g5fYRIaAZuxjo",
  authDomain: "disneyplus-clone-f4676.firebaseapp.com",
  projectId: "disneyplus-clone-f4676",
  storageBucket: "disneyplus-clone-f4676.appspot.com",
  messagingSenderId: "347532539109",
  appId: "1:347532539109:web:15fdea35fe70853462d00c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const getSpecificDoc = async (collectionName, id) => {
  return getDoc(doc(db, collectionName, id));
};

const getAllDocs = async (collectionName) => {
  return getDocs(collection(db, collectionName));
};

export {
    auth,
    signInWithPopup,
    signOut,
    provider,
    getSpecificDoc,
    getAllDocs
};
export default db;

//https://firebase.google.com/docs/firestore/query-data/get-data