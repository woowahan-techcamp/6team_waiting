import util from "./js/util.js";

import "./style.css";
import "./style/home.css";
import "./style/register.css";
import "./style/no-store.css";
import "./style/manage.css";
import "./style/my-page.css";
import "./style/store-list.css";

import { HomeNavigator } from "./js/home-navigator.js"
import service from "./js/services/service.js";


const homeData = {
                "main-desc" : ["맛집의 손님들을 위한 자유롭고 편리한 대기 솔루션", "이제 배민웨이팅으로 고객들에게 더 우아한 서비스를 제공하세요"],
                "serv-desc": ["1번", "2번", "3번"],
                "navi-list": [
                            {"id": "navi-home", "dest": "home", "to":"홈"},
                            {"id": "navi-mypage", "dest": "my-page", "to":"마이페이지"},
                            {"id": "navi-manage", "dest": "manage", "to":"가게 관리"},
<<<<<<< HEAD
                            {"id": "navi-store-list", "dest": "store-list", "to":"둘러보기"},
=======
                            {"id": "navi-store-list", "dest": "store-list", "to":"가게 리스트"},
>>>>>>> 158af38c7cfa47f976ba7ea193833915429fec20
                            {"id": "navi-logout", "dest": "logout", "to": "로그아웃"}
                ]
            };

util.setTemplateInHtml("#root", "home", homeData)
    .then(() => {
        const homeNavigator = new HomeNavigator("#btn-intro","#btn-intro-close","#btn-go-store","#btn-login","#btn-login-close",
                                                "#btn-go-sign-up","#btn-sign-up","#btn-sign-close",".navigator");
        homeNavigator.on();
    })
    .catch((err) => {
        util.log(err);
    });






