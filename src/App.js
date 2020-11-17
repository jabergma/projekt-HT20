import React from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBT4r_JoMcQodd1N30Bf6eZnlOmXNgeiR0",
  authDomain: "project-stockify.firebaseapp.com",
  databaseURL: "https://project-stockify.firebaseio.com",
  projectId: "project-stockify",
  storageBucket: "project-stockify.appspot.com",
  messagingSenderId: "104577641235",
  appId: "1:104577641235:web:bcdba796687f59660548e6",
  measurementId: "G-PLM181PJ08",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
