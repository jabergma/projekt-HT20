import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBT4r_JoMcQodd1N30Bf6eZnlOmXNgeiR0",
  authDomain: "project-stockify.firebaseapp.com",
  databaseURL: "https://project-stockify.firebaseio.com",
  projectId: "project-stockify",
  storageBucket: "project-stockify.appspot.com",
  messagingSenderId: "104577641235",
  appId: "1:104577641235:web:bcdba796687f59660548e6",
  measurementId: "G-PLM181PJ08",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
