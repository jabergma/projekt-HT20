import React from "react";
import HomeView from "../views/homeView.js";
import { useSelector, useDispatch } from "react-redux";
import firebase, { firestore, auth } from "../firebase.js";

export default function Home() {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  return <HomeView balance={balance} />;
}
