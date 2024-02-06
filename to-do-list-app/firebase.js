// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0u---gpMKWcqxf5-n4hEoFqS1xWkXN4Q",
  authDomain: "to-do-list-d80d8.firebaseapp.com",
  projectId: "to-do-list-d80d8",
  storageBucket: "to-do-list-d80d8.appspot.com",
  messagingSenderId: "153114391152",
  appId: "1:153114391152:web:aa4aee6bf39373c0abbab5",
  measurementId: "G-SN1LHZG1Z0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
