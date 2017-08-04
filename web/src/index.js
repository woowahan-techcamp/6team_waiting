import _ from "./util.js";
import "./style.css";

import service from "./services/service.js";


const root = document.querySelector("#root");
root.innerHTML = `<p>Hello Waiting!!</p>`;
_.log(root.innerHTML);

// Sign up test 
service.signUpUser("test@test.com", "123456", null);