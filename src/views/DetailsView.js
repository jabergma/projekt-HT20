import React from "react";
import { StockSource } from "../redux/StockSource";

export default function DetailsView({ currentStock, balance, sell, buy }) {
  const lastRefreshed = currentStock["Meta Data"]["3. Last Refreshed"];
  const stockName = currentStock["Meta Data"]["2. Symbol"];
  const stockPrice = Number(
    currentStock["Time Series (Daily)"][lastRefreshed]["1. open"],
    10
  );
  return (
    <div>
      Balance: {balance}{" "}
      <div>
        <div>Stock: {stockName}</div>
        Price per stock: {stockPrice}
      </div>
      <div>
        <button onClick={() => buy(stockPrice)}>BUY</button>
        <button onClick={() => sell(stockPrice)}>SELL</button>
      </div>
    </div>
  );
}
