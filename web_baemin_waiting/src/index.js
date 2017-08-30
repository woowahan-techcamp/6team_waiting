import util from "./js/util.js";

import "./style.css";
import "./style/waiting-style.css";

import { HomeNavigator } from "./js/home-navigator.js"


const homeData = {
                "main-desc" : ["맛집의 손님들을 위한 자유롭고 편리한 대기 솔루션", "이제 배민웨이팅으로 고객들에게 더 우아한 서비스를 제공하세요"],
                "serv-desc": [
                    {"img":"/dist/public/images/intro1.png", "content": "1. 가게 관리 하기 버튼을 클릭해서 회원가입을 해주세요"},
                    {"img":"/dist/public/images/intro2.png", "content": "2. 로그인 후 사장님의 가게 소개, 위치, 메뉴 등을 등록해주세요"}, 
                    {"img":"/dist/public/images/rose3.jpg", "content": "3. 가게관리 페이지에서 대기 손님을 효율적으로 관리하세요"},
                    {"img":"/dist/public/images/intro4.png", "content": "4. 가게 통계 페이지에서 가게 현황을 한 눈에 볼 수 있어요!"}
                ],
                "navi-list": [
                            {"id": "navi-home", "dest": "home", "to":"홈"},
                            {"id": "navi-mypage", "dest": "my-page", "to":"마이페이지"},
                            {"id": "navi-manage", "dest": "manage", "to":"가게 관리"},
                            {"id": "navi-stat", "dest": "statistic", "to":"가게 통계"},
                            {"id": "navi-store-list", "dest": "store-list", "to":"둘러보기"},
                            {"id": "navi-logout", "dest": "logout", "to": "로그아웃"}
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