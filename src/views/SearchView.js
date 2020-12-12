import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

export default function SearchView({ searchResults, currentStock }) {
  return (
    <Link to="details">
      {searchResults["bestMatches"].map((matches) => (
        <ListGroup.Item
          action
          className="stockList"
          variant="dark"
          style={{ margin: "1px" }}
          eventKey={matches["1. symbol"]}
          onClick={() => currentStock(matches["1. symbol"], matches["2. name"])}
        >
          {matches["2. name"]}
        </ListGroup.Item>
      ))}{" "}
    </Link>
  );
}
