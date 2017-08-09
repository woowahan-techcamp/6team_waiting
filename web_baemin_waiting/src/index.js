import _ from "./util.js";
import "./style.css";
import "./style/main.css";

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

const header = document.querySelector("#header");
const headerHtml = Handlebars.templates["header"];
console.log(header);
header.innerHTML = headerHtml(menu);

