import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import {auth } from "../firebase.js";
import { Link } from "react-router-dom";

export default function NavigationView({ balance, name, search }) {
  const [keywords, setKeywords] = useState("");
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
          <Button variant="dark">XD</Button>
        </Link>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
          />
          <Link to="search">
            <Button
              variant="outline-info"
              onClick={() => {
                search(keywords);
              }}
            >
              Search
            </Button>
          </Link>
        </Form>
      </Nav>
      <Nav>
        <Navbar.Text>
          Signed in as {name} <br />
          Balance: {balance.toFixed(2)}$
        </Navbar.Text>
        <Nav.Link href="/" onClick={() => auth.signOut()}>
          {" "}
          Logout{" "}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
