import _ from "./util.js";
import "./style.css";

import service from "./services/service.js";


const root = document.querySelector("#root");
root.innerHTML = `<p>Hello Waiting!!</p>`;
_.log(root.innerHTML);

// Register test
// (owner, title, store_tel, address, picture, description, is_opened)
service.registerRestaurant("lnTusrM4OIW7GOfhFiawb7GNSWC3", "Restaurant House", "02-1111-2222", "서울시 송파구", null, "This is test store", false);

service.getUserDataByUid("lnTusrM4OIW7GOfhFiawb7GNSWC3")
    .then((v) => console.log(v));