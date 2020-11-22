import React from "react";
import DetailsView from "../views/detailsView";
import { useSelector, useDispatch } from "react-redux";
import firebase, { firestore, auth } from "../firebase.js";

export default function Details() {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  function setSell(amount) {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        balance: balance + amount,
      });
    dispatch({ type: "SELL", payload: amount });
  }

  function setBuy(amount) {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        balance: balance - amount,
      });
    dispatch({ type: "SELL", payload: amount });
  }

  return (
    <DetailsView
      balance={balance}
      sell={(amount) => setSell(amount)}
      buy={(amount) => setBuy(amount)}
    />
  );
}

//setBalance={(trade, amount) => dispatch({ type: trade, payload: amount })}
//.where("uid", "==", auth.currentUser.uid)

/* function setSell(amount) {
        firestore
          .collection("users")
          .doc(auth.currentUser.uid)
          .update({
            balance: balance + amount,
          });
        dispatch({ type: "SELL", payload: amount });
      }*/
