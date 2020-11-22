import React from "react";
import RegisterView from "../views/RegisterView.js";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../redux/types.js";
import { firestore, auth } from "../firebase.js";

export default function Register() {
  const dispatch = useDispatch();

  function createrUser(name) {
    firestore.collection("users").doc(auth.currentUser.uid).set({
      uid: auth.currentUser.uid,
      name: name,
      balance: 1000,
    });
  }

  function setUser() {
    const ref = firestore.collection("users");
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data();
        if (doc.data().uid === auth.currentUser.uid) {
          dispatch({
            type: LOGIN,
            payload: {
              uid: auth.currentUser.uid,
              name: doc.data().name,
              balance: doc.data().balance,
            },
          });
        }
      });
    });
  }
  return (
    <RegisterView
      createUser={(name) => createrUser(name)}
      registerUser={setUser}
    />
  );
}

//.then(userCredential => firestore.collection('users').{userCredential}.user.uid, name)
