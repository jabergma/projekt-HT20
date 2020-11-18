import React from "react";
import "./App.css";
import Home from "./presenter/home.js";
import Navigation from "./presenter/navigation.js";
import Details from "./presenter/details.js";
import Profile from "./presenter/profile.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DetailsView from "./views/DetailsView";

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

function App({ model }) {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
      </header>
      <section>
        <Navigation />
      </section>
      <Router>
        <Switch>
          <Route path="/home">
            <section className="Main">
              {user ? <Home model={model} /> : <SignIn />}
            </section>
          </Route>
          <Route path="/details">
            <section className="Main">
              <Details />
            </section>
          </Route>
          <Route path="/your-stock">
            <section className="Main">
              <Profile />
            </section>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
