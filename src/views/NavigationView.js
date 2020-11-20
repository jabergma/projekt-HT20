import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { firestore, auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function NavigationView({ balance }) {
  const [user] = useAuthState(auth);
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="/">Stockify</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="details">Details</Nav.Link>
        <Nav.Link href="your-stock">Your stock</Nav.Link>
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
