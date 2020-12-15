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
    const nrStocksToSell = parseInt(document.getElementById("nrStocks").value, 10);
    const currentAmountIndex = userStocks.findIndex(
      (obj) => obj.symbol === symbol
    );

    firestore
      .collection(auth.currentUser.uid)
      .doc(symbol)
      .set({
        amount: userStocks[currentAmountIndex].amount - nrStocksToSell,
        symbol: symbol,
        STname: stockName,
      });

    dispatch({
      type: "SETUSERSTOCKS",
      payload: {
        old: userStocks[currentAmountIndex],
        amount: userStocks[currentAmountIndex].amount - nrStocksToSell,
      },
    });

    const tempBalance = balance * 100;
    const tempAmount = price*100*nrStocksToSell;
    const newBalance = (tempBalance + tempAmount) / 100;
    firestore.collection("users").doc(auth.currentUser.uid).update({
      balance: newBalance,
    });
    dispatch({ type: "SELL", payload: {price, nrStocksToSell} });
  }

  function setBuy(price, symbol) {
    const currentAmountIndex = userStocks.findIndex((x) => x.symbol === symbol);
    const nrStocksToBuy = parseInt(document.getElementById("nrStocks").value, 10);

    if (currentAmountIndex === -1) {
      firestore.collection(auth.currentUser.uid).doc(symbol).set({
        amount: nrStocksToBuy,
        symbol: symbol,
        STname: stockName,
      });
      dispatch({
        type: "NEWUSERSTOCKS",
        payload: {
          symbol: symbol,
          amount: nrStocksToBuy,
          STname: stockName,
        },
      });
    } else {
      firestore
        .collection(auth.currentUser.uid)
        .doc(symbol)
        .set({
          amount: userStocks[currentAmountIndex].amount + nrStocksToBuy,
          symbol: symbol,
          STname: stockName,
        });

      dispatch({
        type: "SETUSERSTOCKS",
        payload: {
          old: userStocks[currentAmountIndex],
          amount: userStocks[currentAmountIndex].amount + nrStocksToBuy,
        },
      });
    }

    const tempBalance = balance * 100;
    const tempAmount = price * 100 * nrStocksToBuy;
    const newBalance = (tempBalance - tempAmount) / 100;
    firestore.collection("users").doc(auth.currentUser.uid).update({
      balance: newBalance,
    });

    dispatch({ type: "BUY", payload: {price, nrStocksToBuy} });
  }

  /*function findCurrentStockIndex() {
    const numberOwnedIndex = userStocks.findIndex(
      (obj) => (obj.symbol = currentStock)
    );
    if (userStocks.length === 0) {
      return  userStocks[numberOwnedIndex]
    } else {
      return userStocks[numberOwnedIndex].amount;
    }
  }*/

  return (
    promiseNoData(promise, data, error) || (
      <DetailsView
        currentStock={data}
        balance={balance}
        sell={(price, symbol) => setSell(price, symbol)}
        buy={(price, symbol) => setBuy(price, symbol)}
        stockName={stockName}
        userStocks={userStocks}
      />
    )
  );
}
