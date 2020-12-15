import React, { useEffect, useState } from "react";
import c3 from "c3";
import "../../node_modules/c3/c3.css"; //<link href="/path/to/c3.css" rel="stylesheet"

export default function DetailsView({
  currentStock,
  balance,
  sell,
  buy,
  stockName,
  userStocks,
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


  function oneDayStatus(){
    const latestValueOneDay = stockChartYValues[1];
    const ValueOneDay = stockChartYValues[2];
    return (((latestValueOneDay - ValueOneDay)/ValueOneDay)*100).toFixed(2);
  }

  function weekStatus(){
    const latestValueWeek = stockChartYValues[1];
    const valueSevendays = stockChartYValues[6];
    return (((latestValueWeek - valueSevendays)/valueSevendays)*100).toFixed(2);
  }

  function monthStatus(){
    const latestValueMonth = stockChartYValues[1];
    const valueMonth = stockChartYValues[21];
    return (((latestValueMonth - valueMonth)/valueMonth)*100).toFixed(2);
  }
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
      <div>Change of the stock last 24 hours is: {oneDayStatus()}%</div>
      <div>Change of the stock last 7 days is: {weekStatus()}%</div>
      <div>Change of the stock last Month is: {monthStatus()}%</div>
      <div className="DVpriceStock">
        {" "}
        Todays price per stock is: {stockPrice}
      </div>
      <div className="DVbuttons">
        <button
          class="buYbutton"
          onClick={() => errorHandlingBuyButton()}
          disabled={isBuyDisabled()}
        >
          BUY
        </button>
        <input type="number" id="nrStocks" defaultValue="1"></input>
        <button
          onClick={() => errorHandlingSellButton()}
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
    const stockIndex = userStocks.findIndex((x) => x.symbol === stockSymbol);
    if (stockIndex === -1) {
      return  true;
    } else {  
       return userStocks[stockIndex].amount < 1 ? true : false;
    } 
  }

  function errorHandlingBuyButton (){
    const nrStocksBuy= parseInt(document.getElementById("nrStocks").value, 10);
    if(nrStocksBuy*stockPrice > balance){
      alert("You don't have enough money to buy that")
    }
    else{
      buy(stockPrice, stockSymbol)
    }
  }

  function errorHandlingSellButton (){
    const nrStocksSell = parseInt(document.getElementById("nrStocks").value, 10);
    const stockIndex = userStocks.findIndex((x) => x.symbol === stockSymbol);
    if(nrStocksSell > userStocks[stockIndex].amount ){
      alert("You don't have this many Stocks, you have: "+userStocks[stockIndex].amount+" stocks left" ) 
    }
    else{
      sell(stockPrice, stockSymbol)
    }
    
  }


}
