import React, {useState, useEffect} from "react";
import DetailsView from "../views/DetailsView.js";
import { useSelector, useDispatch } from "react-redux";
import { StockSource } from "../redux/StockSource";
import firebase, { firestore, auth } from "../firebase.js";
import usePromise from "./usePromise.js"
import promiseNoData from "../views/promiseNoData.js"

export default function Details() {
  const balance = useSelector((state) => state.balance);
  const currentStock = useSelector((state) => state.currentStock);
  const [promise, setPromise] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setPromise(currentStock && StockSource.getStockDailyDetails(currentStock));
    return () => {
      Promise.resolve(currentStock && StockSource.getStockDailyDetails(currentStock));
    }
  }, [currentStock]);

  const [data, error] = usePromise(promise);

  function setSell(amount) {
    const tempBalance = balance*100;
    const tempAmount = amount*100;
    const newBalance = (tempBalance + tempAmount) / 100;
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        balance: newBalance,
      });
    dispatch({ type: "SELL", payload: amount });
  }

  function setBuy(amount) {
    const tempBalance = balance*100;
    const tempAmount = amount*100;
    const newBalance = (tempBalance - tempAmount) / 100;
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        balance: newBalance,
      });
    dispatch({ type: "SELL", payload: amount });
  }

  return (
    promiseNoData(promise, data, error) ||
    <DetailsView
      currentStock={data}
      balance={balance}
      sell={(amount) => setSell(amount)}
      buy={(amount) => setBuy(amount)}
    />
  );
}
