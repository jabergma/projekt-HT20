import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { firestore, auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

export default function NavigationView({ balance }) {
  const [user] = useAuthState(auth);
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>Stockify</Navbar.Brand>
      </Link>
      <Nav className="mr-auto">
        <Link to="/">
          <Button variant="dark">Home</Button>
        </Link>
        <Link to="/details">
          <Button variant="dark">Details</Button>
        </Link>
        <Link to="/your-stock">
          <Button variant="dark">Your stock</Button>
        </Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Nav>
      <Nav>
        <Navbar.Text>
          Signed in as User <br />
          Balance: {UserBalance()}$
        </Navbar.Text>
        <Nav.Link href="/" onClick={() => auth.signOut()}>
          {" "}
          Logout{" "}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

function UserBalance() {
  const balansref = firestore.collection("users");
  const [balans] = useCollectionData(balansref, { idField: "id" });
}
