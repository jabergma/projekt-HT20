import React from "react";
import HomeView from "../views/HomeView.js";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const balance = useSelector((state) => state.balance);
  const userStocks = useSelector((state) => state.userStocks);
  const dispatch = useDispatch();

  return <HomeView balance={balance} userStocks={userStocks} currentStock={(symbol, stockName) => 
    dispatch({type: "SETSTOCK", payload: {symbol: symbol, stockName: stockName} })} />;
}
