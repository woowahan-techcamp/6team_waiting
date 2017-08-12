import util from "./js/util.js";

import "./style.css";
import "./style/home.css";
import "./style/register.css";
import "./style/no-store.css";
import "./style/manage.css";

import { HomeNavigator } from "./js/home-navigator.js"
import service from "./js/services/service.js";


const homeData = {
                "main-desc" : ["맛집의 손님들을 위한 대기 서비스", "이제 배민웨이팅으로 고객들에게 더 좋은 서비스로"],
                "serv-desc": ["1번", "2번", "3번"],
                "navi-list": [
                            {"id": "navi-home", "to":"홈"},
                            {"id": "navi-mypage", "to":"마이페이지"},
                            {"id": "navi-manage", "to":"가게 관리"}
                ]
            };

util.setTemplateInHtml("#root", "home", homeData)
    .then(() => {
        const homeNavigator = new HomeNavigator();
        homeNavigator.on();
    })
    .catch((err) => {
        util.log(err);
    });






