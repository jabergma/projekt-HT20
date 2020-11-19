import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase, {auth, db} from "../firebase.js"

export default function LoginView() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" onClick={() => login()}>
          Login
        </Button>
        <Link to="/register">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Link>
      </Form>
    </Container>
  );

  async function login(){
      try{
          await auth.signInWithEmailAndPassword(email, password)
      } catch(error){
          alert(error.message)
      }
  }
}
