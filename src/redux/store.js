import { createStore } from "redux";
import {
  firestoreReducer,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import fbConfig from "../firebase.js";
import { BUY, SELL, LOGIN } from "./types.js";

const initialState = {
  user: undefined,
  balance: 1000,
  uid: undefined,
};

export const store = createStore(stockReducer, initialState);

function stockReducer(state, { type, payload }) {
  switch (type) {
    case "BUY":
      return { ...state, balance: state.balance - payload };
    case "SELL":
      return { ...state, balance: state.balance + payload };
    case LOGIN:
      return { ...state, user: payload.name, balance: payload.balance, uid: payload.uid };
    default:
      return state;
  }
}
