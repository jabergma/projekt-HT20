import React from "react";
import "./App.css";
import Home from "./presenter/home.js";
import Navigation from "./presenter/navigation.js";
import Details from "./presenter/details.js";
import Profile from "./presenter/profile.js";
import Login from "./presenter/login.js";
import Search from "./presenter/search.js";
import Register from "./presenter/register.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

function App() {
  const user = useSelector((state) => state.user);
  const stock = useSelector((state) => state.currentStock);

  return (
    <Router>
      <div className="Main">
        <header></header>
        <Switch>
          {user ? (
            <>
              <Navigation />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/details">
                {stock ? <Details /> : <Redirect to="/" />}
              </Route>
              <Route path="/your-stock">
              <div className="w-100" style={{ maxWidth: "600px" }}>
                <Profile />
                </div>
              </Route>
              <Route path="/search">
                <Search />
              </Route>
            </>
          ) : (
            <>
              <Redirect to="/" />
              <Route exact path="/">
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
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
