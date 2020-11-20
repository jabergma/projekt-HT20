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
import { Container } from "react-bootstrap";

function App() {
  const user = useSelector((state) => state.user);
  
  return (
    <Router>
      <div className="Main">
        <header></header>
        {user ? (
          <section>
            <Navigation />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/details">
                <Details />
              </Route>
              <Route path="/your-stock">
                <Profile />
              </Route>
            </Switch>
          </section>
        ) : (
          <>
            <Switch>
              <Route path="/login">
                <Container className="loginContainer">
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Login />
                  </div>
                </Container>
              </Route>
              <Route path="/register">
                <Container className="loginContainer">
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Register />
                  </div>
                </Container>
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
