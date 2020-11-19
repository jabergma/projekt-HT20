import React, { useState } from "react";
import "./App.css";
import Home from "./presenter/home.js";
import Navigation from "./presenter/navigation.js";
import Details from "./presenter/details.js";
import Profile from "./presenter/profile.js";
import Login from "./presenter/login.js";
import Register from "./presenter/register.js";
import firebase from "firebase/app";
import { firestore, auth } from "./firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <div className="App">
        <header>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin="anonymous"
          />
        </header>
        {user ? (
          <section>
            <Navigation />
            <Switch>
              <Route path="/home">
                <section className="Main">
                  <Home />
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
          </section>
        ) : (
          <section>
            <Switch>
              <Route path="/home">
              <section className="Main">
                <Login />
              </section>
              </Route>
              <Route path="/register">
                <section className="Main">
                <Register/>
                </section>
              </Route>
            </Switch>
          </section>
        )}
      </div>
    </Router>
  );
}

export default App;


