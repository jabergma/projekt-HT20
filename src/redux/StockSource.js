import {BASE_URL} from "../apiConfig.js"
import {API_KEY } from "../apiConfig.js"
//https://insomnia.rest/

export const StockSource = {
    apiCall(params) {
      return (
        fetch(BASE_URL + params + API_KEY, {
          method: "GET",
        })
          .then(response => response.status === 200 ? (response.json()) : (console.log("Error")))
      );
    },
    
    getStockDailyDetails(symbol) {
      return this.apiCall("function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + symbol + "&apikey=");
    },
    searchStock(keywords){
      return this.apiCall("function=SYMBOL_SEARCH&keywords=" + keywords + "&apikey=")
    }
  };