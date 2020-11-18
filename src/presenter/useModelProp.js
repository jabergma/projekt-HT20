import React, {useState,useEffect} from "react";
import "../StockModel.js";

export default function useModelProp(model, prop) {
  // ordinary func, not component!
  const [propValue, setPropValue] = useState(model[prop]);
  useEffect(
    function () {
      const obs = () => setPropValue(model[prop]);
      model.addObserver(obs);
      return() => {
        model.removeObserver(obs);
      }
    },
    [model, prop]
  );
  return propValue;
}
