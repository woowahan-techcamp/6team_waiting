import _ from "./util.js";

import "./style.css";
import "./style/home.css";

import service from "./js/services/service.js";


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
const homeHtml = Handlebars.templates["home"];
root.innerHTML = homeHtml();


