import React from 'react'
import RegisterView from "../views/registerView.js"
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../redux/types.js";

export default function Register() {
    const dispatch = useDispatch()
    return (
        <RegisterView setUser={(uid) => dispatch({ type: LOGIN, payload: uid })} />
    )
}
