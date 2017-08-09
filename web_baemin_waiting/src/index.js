import _ from "./util.js";

import "./style.css";
import "./style/main.css";

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

const header = document.querySelector("#header");
const headerHtml = Handlebars.templates["header"];
header.innerHTML = headerHtml(menu);

const main = document.querySelector("#main");
const mainHtml = Handlebars.templates["main"];
main.innerHTML = mainHtml();

const footer = document.querySelector("#footer");
const footerHtml = Handlebars.templates["footer"];
footer.innerHTML = footerHtml();

