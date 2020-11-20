import React from "react";
import NavigationView from "../views/navigationView.js";
import { useSelector, useDispatch } from "react-redux";

export default function Navigation() {
  const balance = useSelector((state) => state.balance);
  const name = useSelector(state => state.user)
  return <NavigationView balance={balance} name={name} />;
}
