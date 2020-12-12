import React, { useState, useEffect } from "react";
import SearchView from "../views/SearchView";
import { useSelector, useDispatch } from "react-redux";
import { StockSource } from "../redux/StockSource";
import usePromise from "./usePromise.js";
import promiseNoData from "../views/promiseNoData.js";

export default function Search() {
  const searchKeywords = useSelector((state) => state.searchKeywords);
  const [promise, setPromise] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setPromise(searchKeywords && StockSource.searchStock(searchKeywords));
    return () => {
      Promise.resolve(
        searchKeywords && StockSource.searchStock(searchKeywords)
      );
    };
  }, [searchKeywords]);

  const [data, error] = usePromise(promise);

  return (
    promiseNoData(promise, data, error) || <SearchView searchResults={data} currentStock={(symbol, stockName) => 
    dispatch({type: "SETSTOCK", payload: {symbol: symbol, stockName: stockName} })} />
  );
}
