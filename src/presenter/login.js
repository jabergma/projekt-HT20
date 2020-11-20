import React from "react";
import LoginView from "../views/loginView.js";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../redux/types.js";

export default function Login() {
  const dispatch = useDispatch();

  return (
    <LoginView setUser={(uid) => dispatch({ type: LOGIN, payload: uid })} />
  );
}
