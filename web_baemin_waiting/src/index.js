import _ from "./util.js";
import "./style.css";

import service from "./js/services/service.js";


<<<<<<< Updated upstream
const root = document.querySelector("#root");
const html = Handlebars.templates["home"];
root.innerHTML = html({"name": "home"});
=======
const menu = [{
                "id": "navi-home",
                "content": "홈"
            },{
                "id": "navi-introduce",
                "content": "서비스소개"
            },{
                "id": "navi-manage",
                "content": "가게관리"
            },{
                "id": "auth",
                "content": "로그인"
            }];

const root = document.querySelector("#root");
// const headerHtml = Handlebars.templates["header"];
// header.innerHTML = headerHtml(menu);

>>>>>>> Stashed changes

// Get user data test
service.getUserDataByUid("lnTusrM4OIW7GOfhFiawb7GNSWC3")
    .then((v) => console.log(v));