import { createStore } from "redux";
import {
  firestoreReducer,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import fbConfig from "../firebase.js";
import { BUY, SELL, LOGIN, SETSTOCK } from "./types.js";

const initialState = {
  user: undefined,
  balance: undefined,
  uid: undefined,
  currentStock: undefined,
};

export const store = createStore(stockReducer, initialState);

function stockReducer(state, { type, payload }) {
  switch (type) {
    case "BUY":
      return { ...state, balance: state.balance - payload };
    case "SELL":
      return { ...state, balance: state.balance + payload };
    case LOGIN:
      return {
        ...state,
        user: payload.name,
        balance: payload.balance,
        uid: payload.uid,
      };
    case "SETSTOCK":
      return { ...state, currentStock: payload };
    default:
      return state;
  }
}
