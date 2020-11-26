import React from "react";
import c3 from 'c3';
import d3 from 'd3';
import "../../node_modules/c3/c3.css"//<link href="/path/to/c3.css" rel="stylesheet"

export default function DetailsView({ currentStock, balance, sell, buy}) {
  const lastRefreshed = currentStock["Meta Data"]["3. Last Refreshed"];
  const stockName = currentStock["Meta Data"]["2. Symbol"];
  const stockPrice = Number(
    currentStock["Time Series (Daily)"][lastRefreshed]["1. open"],
    10
  );
  let stockChartXValues = [];
  let stockChartYValues = [];

  for (var key in currentStock["Time Series (Daily)"]){
    stockChartXValues.push(key);
    stockChartYValues.push(currentStock["Time Series (Daily)"][key]["1. open"]);
  }
  stockChartXValues.unshift('Date: ');
  stockChartYValues.unshift('Price: ');
   
const Chart = () => {
  React.useEffect(() => {
    c3.generate({
      bindto: "#chart",
      data: {
        x: 'Date: ',
        Y: 'Price: ',
        columns: [
          stockChartXValues,
          stockChartYValues
        ],
       type: 'area' 
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        },
        Y: {
          type: 'linear'
        }
    },
      size: {
        width: 500,
        height: 400
      }
    });
  }, []);
    
    return <div id="chart" />;
  };
  

  return (
    <div>
      Balance: {balance.toFixed(2)}${" "}
      <div>
        <div>Stock: {stockName}</div>
        Price per stock: {stockPrice}
      </div>
      <Chart />
      <div>
        <button onClick={() => buy(stockPrice)}>BUY</button>
        <button onClick={() => sell(stockPrice)}>SELL</button>
      </div>
     
    </div>
    
  );
}
