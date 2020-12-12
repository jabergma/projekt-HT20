import { createStore } from "redux";
import { BUY, SELL, LOGIN, SETSTOCK, SEARCH } from "./types.js";

const initialState = {
  user: undefined,
  balance: undefined,
  uid: undefined,
  currentStock: undefined,
  searchKeywords: undefined,
  userStocks: [],
  stockName: undefined,
  stockAmount: 0,
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
      return { ...state, currentStock: payload.symbol, stockName: payload.stockName};
    case "SEARCH":
      return { ...state, searchKeywords: payload };
    case "SETUSERSTOCKS":
      return {
        ...state,
        userStocks: state.userStocks
          .filter((obj) => obj.symbol !== payload.old.symbol)
          .concat({
            symbol: payload.old.symbol,
            amount: payload.amount,
            STname: payload.old.STname,
          }),
      };
    case "NEWUSERSTOCKS":
      return {
        ...state,
        userStocks: state.userStocks.concat({
          symbol: payload.symbol,
          amount: payload.amount,
          STname: payload.STname,
        }),
      };
    default:
      return state;
  }
}
