// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSLgFNRpsFCpjYu8iBC1zlhmu9eaWLo-U",
  authDomain: "car-learn-170c7.firebaseapp.com",
  projectId: "car-learn-170c7",
  databaseURL: "https://car-learn-170c7-default-rtdb.firebaseio.com/",
  storageBucket: "car-learn-170c7.firebasestorage.app",
  messagingSenderId: "262915784690",
  appId: "1:262915784690:web:bceff0ee5d7144481fb56b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);