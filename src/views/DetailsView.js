import React, { useEffect, useState } from "react";
import c3 from "c3";
import "../../node_modules/c3/c3.css"; //<link href="/path/to/c3.css" rel="stylesheet"

export default function DetailsView({
  currentStock,
  balance,
  sell,
  buy,
  stockName,
  numberOwned,
}) {
  const [chart, setChart] = useState();
  const lastRefreshed = currentStock["Meta Data"]["3. Last Refreshed"];
  const stockSymbol = currentStock["Meta Data"]["2. Symbol"];
  const stockPrice = Number(
    currentStock["Time Series (Daily)"][lastRefreshed]["1. open"],
    10
  );
  let stockChartXValues = [];
  let stockChartYValues = [];

  for (var key in currentStock["Time Series (Daily)"]) {
    stockChartXValues.push(key);
    stockChartYValues.push(currentStock["Time Series (Daily)"][key]["1. open"]);
  }
  stockChartXValues.unshift("Date: ");
  stockChartYValues.unshift(stockName);

  useEffect(() => {
    setChart(getChart);
  }, [currentStock]);

  function getChart() {
    c3.generate({
      bindto: "#chart",
      data: {
        x: "Date: ",
        Y: stockName,
        columns: [stockChartXValues, stockChartYValues],
        type: "area",
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
          },
        },
        Y: {
          type: "linear",
        },
      },
      size: {
        width: 500,
        height: 400,
      },
    });
    return <div id="chart" />;
  }

  return (
    <div>
      <div className="DVstockTitle">{stockName} </div>
      <div className="DVpriceStock">
        {" "}
        Todays price per stock is: {stockPrice}
      </div>
      <div className="DVbuttons">
        <button
          class="buYbutton"
          onClick={() => buy(stockPrice, stockSymbol)}
          disabled={isBuyDisabled()}
        >
          BUY
        </button>
        <button
          onClick={() => sell(stockPrice, stockSymbol)}
          disabled={isSellDisabled()}
        >
          SELL
        </button>
        Your current balance: {balance.toFixed(2)}${" "}
      </div>
      {<div id="chart">{chart}</div>}
    </div>
  );

  function isBuyDisabled() {
    return stockPrice > balance ? true : false;
  }
  function isSellDisabled() {
    return numberOwned < 1 ? true : false;
  }
}
