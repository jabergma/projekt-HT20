import {createStore} from "redux";

const initialState = {
    balance:1000
}

export const store = createStore(stockReducer, initialState);

function stockReducer (state, {type, payload}){
    switch(type){
        case 'BUY' :
        return {balance: state.balance - payload}
        case 'SELL' :
        return {balance: state.balance + payload}
        default:
            return state
    }
}   