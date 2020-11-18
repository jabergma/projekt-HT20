import React from "react";

export default function HomeView({ balance, setBalance }) {
  return (
    <div>
      Balance: {balance}{" "}
      <div>
        <button onClick={() => setBalance("BUY", 100)}>BUY</button>
        <button onClick={() => setBalance("SELL", 100)}>SELL</button>
      </div>
    </div>
  );
}
