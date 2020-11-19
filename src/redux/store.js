import {createStore} from "redux";
import {firestoreReducer, reduxFirestore, getFirestore} from "redux-firestore";
import fbConfig from "../firebase.js"

const initialState = {
    balance:1000
}

export const store = createStore(stockReducer, initialState);

function stockReducer (state, {type, payload}){
    switch(type){
        case 'BUY' :
        return {...state, balance: state.balance - payload}
        case 'SELL' :
        return {...state, balance: state.balance + payload}
        default:
            return state
    }
}