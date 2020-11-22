import { createStore } from "redux";
import { BUY, SELL, LOGIN, SETSTOCK, SEARCH } from "./types.js";

const initialState = {
  user: undefined,
  balance: undefined,
  uid: undefined,
  currentStock: undefined,
  searchKeywords: undefined,
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
    case "SEARCH":
      return { ...state, searchKeywords: payload };
    default:
      return state;
  }
}
