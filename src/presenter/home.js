import React from "react";
import "../views/HomeView.js";
import "./useModelProp.js";

function Home({model}) {
    const usrMoney= useModelProp(model, "usrMoney");

  
    return (HomeView, {
      usrMoney: usrMoney
      
    });
  }