import React from "react";
import DetailsView from "../views/detailsView";
import { useSelector, useDispatch } from "react-redux";

export default function Details() {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  return (
    <DetailsView
      balance={balance}
      setBalance={(trade, amount) => dispatch({ type: trade, payload: amount })}
    />
  );
}
