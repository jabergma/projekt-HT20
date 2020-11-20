import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import firebase, { auth, db } from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth"

export default function LoginView({setUser}) {
  const history = useHistory()
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              onClick={() => login(email, password)}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Link to="/register">
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Link>
    </>
  );

  async function login() {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUser("uid")
      history.push("/")
    } catch (error) {
      alert(error);
    }
  }
}
