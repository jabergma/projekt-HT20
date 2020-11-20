import React from "react";
import { StockSource } from "../redux/StockSource";
import { Link } from "react-router-dom";
import firebase, { firestore, auth } from "../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function HomeView({ balance }) {
  return (
    <div>
      Balance: {balance}{" "}
      <div>
        <Link to="details">
          <button onClick={() => StockSource.getStockDailyDetails("IBM")}>
            IBM
          </button>
        </Link>
        <div>
          <button onClick={() => userBalance()}>get balance</button>
        </div>
      </div>
    </div>
  );

  function userBalance() {
    const balansRef = firestore.collection("users");
    balansRef.onSnapshot((querySnapshot) => {
      var item = 0;
      querySnapshot.forEach((doc) => {
        doc.data();
        if (doc.data().uid === auth.currentUser.uid) {
          item = doc.data().balance;
        }
      });
      console.log(item);
    });
  }
}
  /*
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}*/



