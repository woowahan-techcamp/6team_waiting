import _ from "./util.js";
import "./style.css";

import service from "./js/services/service.js";


const menu = [{
                "id": "home",
                "content": "홈"
            },{
                "id": "introduce",
                "content": "서비스소개"
            },{
                "id": "manage",
                "content": "가게관리"
            },{
                "id": "auth",
                "content": "로그인"
            }];

const root = document.querySelector("#root");
const html = Handlebars.templates["main"];
root.innerHTML = html(menu);

const view = document.querySelector("#view");
view.innerHTML = "Hello!";
// Get user data test
service.getUserDataByUid("lnTusrM4OIW7GOfhFiawb7GNSWC3")
    .then((v) => console.log(v));