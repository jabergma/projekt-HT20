export default class StockModel {
    constructor() {
      this.usrMoney = 1000;
      this.subscribers = [];
    }

    setUsrMoney(x) {
      if (x < 0) {
        throw "PENGARNA ÄR SLUT!!!!!!!!!!!!!!";
      }
    }

    getUsrMoney() {
        return this.usrMoney;
      }
    

}

