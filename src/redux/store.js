import {createStore} from "redux";

const initialState = {

}

export const store = createStore(reducer, initialState);

function reducer (state, {type, payload}){
    switch(type)
}   