import React from "react";
import NavigationView from "../views/NavigationView.js";
import { useSelector, useDispatch } from "react-redux";

export default function Navigation() {
  const balance = useSelector((state) => state.balance);
  const name = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  return <NavigationView balance={balance} name={name} search={(keywords) => dispatch({type: "SEARCH", payload: keywords})}/>;
}
