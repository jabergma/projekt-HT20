import React, { useState, useEffect } from "react";

export default function usePromise(promise) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      setData(null);
      setError(null);
      if (promise !== null) {
        promise.then((dt) => setData(dt)).catch((er) => setError(er));
      }
    },
    [promise]
  );

  return [data, error];
}
