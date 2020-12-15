import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import { StockSource } from "../redux/StockSource";
import { useSelector, useDispatch } from "react-redux";

export default function HomeView({ balance, currentStock, userStocks }) {
  return (
    <div>
    <div className="DVstockTitle">Your stocks </div>
    <div className="DVstockTitle">Your balance: {balance.toFixed(2)}$ </div>
    <div>
      <ListGroup>
        <Link to="details">
        {userStocks.map((stock) => (
          <ListGroup.Item
            action
            className="stockList"
            variant="dark"
            style={{ margin: "1px" }}
            eventKey={stock.symbol}
            onClick={() => currentStock(stock.symbol, stock.STname)}
          >
            {stock.STname}
            <div>Number of stocks: {stock.amount}</div>
          </ListGroup.Item>
        ))}
        </Link>
      </ListGroup>
      </div>
    </div>
  );
}

//<button onClick={() => currentStock("IBM")}>IBM</button>
//<div className="stockListItem">{stock.symbol}</div> 


/*
import React from "react";
import { Link } from "react-router-dom";

export default function HomeView({ balance, currentStock }) {
  return (
    <div>
      Balance: {balance.toFixed(2)}${" "}
      <div>
        <Link to="details">
          
        </Link>
      </div>
    </div>
  );
}
//<button onClick={() => currentStock("IBM")}>IBM</button> */