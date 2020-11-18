import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavigationView() {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="home">Stockify</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="home">Home</Nav.Link>
        <Nav.Link href="details">Details</Nav.Link>
        <Nav.Link href="your-stock">Your stock</Nav.Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Nav>
      <Nav>
        <Nav.Link href="home"> Logout </Nav.Link>
      </Nav>
    </Navbar>
  );
}
