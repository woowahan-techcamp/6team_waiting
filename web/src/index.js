import * as firebase from "firebase";

import _ from "./util.js";
import "./index.css";

const root = document.querySelector("#root");
root.innerHTML = `<p>Hello Waiting!!</p>`;
_.log(root.innerHTML);

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCOh94raCe9z-r0QcOBCCU2CJmIKFcGdyk",
    authDomain: "baeminwaiting.firebaseapp.com",
    databaseURL: "https://baeminwaiting.firebaseio.com",
    projectId: "baeminwaiting",
    storageBucket: "baeminwaiting.appspot.com",
    messagingSenderId: "352546507957"
};
firebase.initializeApp(config);
console.log(firebase);