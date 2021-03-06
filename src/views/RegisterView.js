import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import  { auth} from "../firebase.js";

export default function RegisterView({ registerUser, createUser }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Card className="bg-dark">
        <Card.Body>
          <h2 className="loginHeader">Sign Up</h2>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="register-name-form"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
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
              onClick={(event) => {
                event.preventDefault();
                register(name, email, password);
              }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div class="signupText">
        Already have an account?{""}
        <Link class="signupLink" to="/">
          Log In
        </Link>
      </div>
    </>
  );

  async function register(name, email, password) {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      createUser(name);
      registerUser();
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }
}
