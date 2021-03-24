// * For Firebase JS SDK v7.20.0 and later,
// * measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxyNg8JpMncfHlYTnarPbbQpvMneyw-JE",
  authDomain: "challenge-deb12.firebaseapp.com",
  projectId: "challenge-deb12",
  storageBucket: "challenge-deb12.appspot.com",
  messagingSenderId: "138682760015",
  appId: "1:138682760015:web:f54d79716ccaac8fa8633a",
  measurementId: "G-3Y9DP3S2D9",
};

// * initializing firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// * initializing database
// * firestore is the Realtime DB
// * these 2 lines provides a variable
// * to handle the signing in and other stuff
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
