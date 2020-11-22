import React from "react";

export default function promiseNoData(promise, data, error) {
  return (
    (!promise && "no data") || // case "0"
    (error && <h1>console.error()</h1>) || // case 3
    (!data && <h1>loading...</h1>)
  ); // case 1
}
