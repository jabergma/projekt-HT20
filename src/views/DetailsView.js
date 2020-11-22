import React from 'react'
import {StockSource} from "../redux/StockSource";

export default function DetailsView({ balance, sell, buy }) {
    return (
        <div>
      Balance: {balance}{" "}
      <div>
        <button onClick={() => buy(100)}>BUY</button>
        <button onClick={() => sell(100)}>SELL</button>
      </div>
    </div>
    )
}
