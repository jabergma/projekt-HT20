import React from 'react'
import {StockSource} from "../redux/StockSource";

export default function DetailsView({ balance, setBalance }) {
    return (
        <div>
      Balance: {balance}{" "}
      <div>
        <button onClick={() => setBalance("BUY", 100)}>BUY</button>
        <button onClick={() => setBalance("SELL", 100)}>SELL</button>
      </div>
    </div>
    )
}
