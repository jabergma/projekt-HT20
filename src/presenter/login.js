import React, { useState } from "react";
import LoginView from "../views/LoginView.js";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../redux/types.js";
import firebase, { firestore, auth } from "../firebase.js";


export default function Login() {
  const dispatch = useDispatch();

  function setUser() {
    const balansRef = firestore.collection("users");
    balansRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data();
        if (doc.data().uid === auth.currentUser.uid) {
          dispatch({
            type: LOGIN,
            payload: {
              uid: auth.currentUser.uid,
              name: doc.data().name,
              balance: doc.data().balance,
            },
          });
        }
      });
    });
  }

  return <LoginView loginUser={setUser} />;
}
