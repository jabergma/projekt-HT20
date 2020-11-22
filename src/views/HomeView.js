import React from "react";
import { Link } from "react-router-dom";

export default function HomeView({ balance, currentStock }) {
  return (
    <div>
      Balance: {balance}{" "}
      <div>
        <Link to="details">
          <button onClick={() => currentStock("IBM")}>
            IBM
          </button>
        </Link>
      </div>
    </div>
  );
}
