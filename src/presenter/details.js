import React, { useState, useEffect } from "react";
import DetailsView from "../views/DetailsView.js";
import { useSelector, useDispatch } from "react-redux";
import { StockSource } from "../redux/StockSource";
import { firestore, auth } from "../firebase.js";
import usePromise from "./usePromise.js";
import promiseNoData from "../views/promiseNoData.js";

export default function Details() {
  const balance = useSelector((state) => state.balance);
  const currentStock = useSelector((state) => state.currentStock);
  const userStocks = useSelector((state) => state.userStocks);
  const [promise, setPromise] = useState(null);
  const dispatch = useDispatch();
  const stockName = useSelector((state) => state.stockName);

  useEffect(() => {
    setPromise(currentStock && StockSource.getStockDailyDetails(currentStock));
    return () => {
      Promise.resolve(
         currentStock && StockSource.getStockDailyDetails(currentStock)
      );
    };
  }, [currentStock]);

  const [data, error] = usePromise(promise);

  function setSell(price, symbol) {
    const currentAmountIndex = userStocks.findIndex(
      (obj) => obj.symbol === symbol
    );

  
   
    firestore
      .collection(auth.currentUser.uid)
      .doc(symbol)
      .set({
        amount: userStocks[currentAmountIndex].amount - 1,
        symbol: symbol,
        STname: stockName,
      });

    dispatch({
      type: "SETUSERSTOCKS",
      payload: {
        old: userStocks[currentAmountIndex],
        amount: userStocks[currentAmountIndex].amount - 1,
      },
    });

    const tempBalance = balance * 100;
    const tempAmount = price * 100;
    const newBalance = (tempBalance + tempAmount) / 100;
    firestore.collection("users").doc(auth.currentUser.uid).update({
      balance: newBalance,
    });

    dispatch({ type: "SELL", payload: price });
  }

  function setBuy(price, symbol) {
    const currentAmountIndex = userStocks.findIndex((x) => x.symbol === symbol);
    if (currentAmountIndex === -1) {
      firestore.collection(auth.currentUser.uid).doc(symbol).set({
        amount: 1,
        symbol: symbol,
        STname: stockName,
      });
      dispatch({
        type: "NEWUSERSTOCKS",
        payload: {
          symbol: symbol,
          amount: 1,
          STname: stockName,
        },
      });
    } else {
      firestore
        .collection(auth.currentUser.uid)
        .doc(symbol)
        .set({
          amount: userStocks[currentAmountIndex].amount + 1,
          symbol: symbol,
          STname: stockName,
        });

      dispatch({
        type: "SETUSERSTOCKS",
        payload: {
          old: userStocks[currentAmountIndex],
          amount: userStocks[currentAmountIndex].amount + 1,
        },
      });
    }

    const tempBalance = balance * 100;
    const tempAmount = price * 100;
    const newBalance = (tempBalance - tempAmount) / 100;
    firestore.collection("users").doc(auth.currentUser.uid).update({
      balance: newBalance,
    });
    dispatch({ type: "BUY", payload: price });
  }

  function findCurrentStockIndex(){
    return(
      userStocks.findIndex(
        (obj) => obj.symbol === currentStock)
    )
  }

  return (
    promiseNoData(promise, data, error) || (
      <DetailsView
        currentStock={data}
        balance={balance}
        sell={(price, symbol) => setSell(price, symbol)}
        buy={(price, symbol) => setBuy(price, symbol)}
        stockName = {stockName}
        numberOwned = {userStocks[findCurrentStockIndex()].amount}
      />
    )
  );
}
