import _ from "./util.js";
import "./style.css";

import service from "./js/services/service.js";


const root = document.querySelector("#root");
const html = Handlebars.templates["home"];
root.innerHTML = html({"name": "home"});

// Get user data test
service.getUserDataByUid("lnTusrM4OIW7GOfhFiawb7GNSWC3")
    .then((v) => console.log(v));