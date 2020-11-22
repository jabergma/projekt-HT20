import React from "react";
import { StockSource } from "../redux/StockSource";
import { Link } from "react-router-dom";
import firebase, { firestore, auth } from "../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function HomeView({ balance }) {
  return (
    <div>
      Balance: {balance}{" "}
      <div>
        <Link to="details">
          <button onClick={() => StockSource.getStockDailyDetails("IBM")}>
            IBM
          </button>
        </Link>
        <div>
          <button>asd</button>
        </div>
      </div>
    </div>
  );
}
