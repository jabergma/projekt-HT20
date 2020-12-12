import React from "react";
import LoginView from "../views/LoginView.js";
import {  useDispatch } from "react-redux";
import { LOGIN } from "../redux/types.js";
import  { firestore, auth } from "../firebase.js";

export default function Login() {
  const dispatch = useDispatch();

  function setUser() {
    const ref = firestore.collection("users").doc(auth.currentUser.uid);
    ref.get().then(function (doc) {
      if (doc.exists) {
        dispatch({
          type: LOGIN,
          payload: {
            uid: auth.currentUser.uid,
            name: doc.data().name,
            balance: doc.data().balance,
          },
        });
      } else {
        console.log("error");
      }
    });
    firestore
      .collection(auth.currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.data();
          dispatch({
            type: "NEWUSERSTOCKS",
            payload: {
              amount: doc.data().amount,
              symbol: doc.data().symbol,
              STname: doc.data().STname
            },
          });
        });
      });
  }

  return <LoginView loginUser={setUser} />;
}
