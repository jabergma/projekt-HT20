import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import firebase, { auth, firestore } from "../firebase.js";

export default function LoginView({ loginUser }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Card className="bg-dark">
        <Card.Body>
          <h2 className="loginHeader">Log In</h2>
          <Form>
            <Form.Group>
              <Form.Label className="loginText">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                login(email, password);
              }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div class="signupText">
        Need an account?{""}
        <Link class="signupLink" to="/register">Sign Up</Link>
      </div>
    </>
  );

  async function login(email, password) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      loginUser();
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }
}
