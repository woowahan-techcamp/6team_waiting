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

const root = document.querySelector("#root");
const mainHtml = Handlebars.templates["main"];
root.innerHTML = mainHtml(menu);

const view = document.querySelector("#view");
const viewHtml = Handlebars.templates["view"];
view.innerHTML = viewHtml();

