import React from "react";
import HomeView from "../views/HomeView.js";
import useModelProp from "./useModelProp.js";

export default function Home({model}) {
    const usrMoney= model.getUsrMoney();

  
    return <HomeView usrMoney={usrMoney}/>
  }
