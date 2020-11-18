const BASE_URL="https://www.alphavantage.co/query?";
const API_KEY="9BK7T37KFC8J0NH2";

export const StockSource = {
    apiCall(params) {
      return (
        fetch(BASE_URL + params + API_KEY, {
          method: "GET",
          headers: {
            "X-Mashape-Key": API_KEY,
          },
        })
          // from headers to response data
          .then(response => response.status === 200 ? (response.json()) : (console.log("Error")))
      );
    }, // comma between object methods, like between any properties!
    
    getStockDailyDetails(symbol) {
      return this.apiCall("function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + symbol + "&apikey=");
    },
  }; 