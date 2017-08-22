import util from "./util.js";
import service from "./services/service.js";

import { Menu } from "./menu.js";
import { Slide } from "./slide.js";
import { StoreList } from "./storelist.js";
import { View } from "./view.js";
import { Manage } from "./manage.js";
import { Map } from "./map.js";

import { stat } from "./stat.data.js";
//jw
import { MemberModel } from "./model/member.model.js";
import { StoreRegModel } from "./model/storereg.model.js";

export class HomeNavigator {

    constructor(intro, introClose, goStore, login, loginClose, goSignUp, signUp, signUpClose, nav, drop, list) {
        this.btnIntro = document.querySelector(intro);
        this.btnIntroClose = document.querySelector(introClose);
        this.btnGoStore = document.querySelector(goStore);
        this.btnLogin = document.querySelector(login);
        this.btnLoginClose = document.querySelector(loginClose);
        this.btnGoSignUp = document.querySelector(goSignUp);
        this.btnSignUp = document.querySelector(signUp);
        this.btnSignUpClose = document.querySelector(signUpClose);
        this.navigator = document.querySelector(nav);
        this.dropdown = document.querySelector(drop);
        this.dropdownList = document.querySelector(list);

        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");

        this.slide = new Slide("slides");
        this.view = new View(".view");
    }

    on() {
        this.slide.plusSlide(1);

        this.btnIntro.addEventListener("click", () => {
            this.view.showElement("intro");
            this.view.inactivateRoot();
        });

        this.btnIntroClose.addEventListener("click", () => {
            this.view.hideElement("intro")
            this.view.activateRoot();
        });
        
        this.btnGoStore.addEventListener("click", this.goStoreHandler.bind(this));

        this.btnLogin.addEventListener("click", this.signInHandler.bind(this));

        this.btnLoginClose.addEventListener("click", () => {
            this.view.hideElement("sign-in");
            this.view.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.view.showElement("sign-up");
        });

        this.btnSignUp.addEventListener("click", this.signUpHandler.bind(this));

        this.btnSignUpClose.addEventListener("click", () => {
            this.view.hideElement("sign-up");
        });

        this.navigator.addEventListener("click", (e) => {
            if (e.target && e.target.nodeName === "LI") {
                this.showNaviPage(e.target.dataset.dest);
            }
        });

        this.dropdown.addEventListener("click", (e) => {
            this.view.toggleElement("dropdown", "show-dropdown");
            this.dropdownImg();
        });

        this.dropdownList.addEventListener("click", (e) => {
            if (e.target && e.target.nodeName === "LI") {
                const drop = document.querySelector(".dropdown");
                drop.classList.remove("show-dropdown");
                this.dropdownImg();
                this.showNaviPage(e.target.dataset.dest);
            }
        });

        this.prev.addEventListener("click", () => {
            this.slide.plusSlide(-1);
        })

        this.next.addEventListener("click", () => {
            this.slide.plusSlide(1);
        })
    }

    confirmMyPage() {
        const btnConfirm = document.getElementById("btn-confirm");
        btnConfirm.addEventListener("click", () => {
            // @TODO : haeun.kim 
            // 비밀번호가 일치할 때만, 개인 정보 확인 가능
            service.getUserInfo().then((user) => {
                service.getStoreInfo().then((store) => {
                    service.getMenus().then((menus) => {
                        util.setTemplateInHtml(".my-page-area", "my-info", {"user": user, "store": store, "menus": menus})
                            .then(() => {
                                if (!store) {
                                    document.querySelector(".my-store").innerHTML = "";
                                }
                                this.myInfoHandler();
                        });
                    })
                })
            });
        });
    }

    dropdownImg() {
        const drop = document.querySelector(".dropdown");
        if (drop.classList.contains("show-dropdown"))
            document.getElementById("drop").src = "/dist/public/images/close-white.png";
        else 
            document.getElementById("drop").src = "/dist/public/images/menu.png";
    }

    //jw 가게관리하기 버튼
    goStoreHandler() {
        if (!window.sessionStorage.getItem("loginId")) {//jw
            this.view.showElement("sign-in");
        } else {
            this.view.showElement("board");
            this.view.showElement("nav")
            this.showNaviPage("manage");
        }

        this.view.inactivateRoot();
    }
    //가게 등록
    registerHandler() {
        const menu = new Menu(".menus");
        menu.addMenuInput();

        const btnAddMenu = document.querySelector(".add-menu");
        btnAddMenu.addEventListener("click", () => {
            menu.addMenuInput();
        });

        const map = new Map();
        map.on();
        
        const btnRegister = document.getElementById("btn-reg-store");
        btnRegister.addEventListener("click", () => {
            const menus = menu.menusToJSON();
            service.registerMenu(menus);
            this.registerStore(map.addrX, map.addrY);
        });
    }
    //가게 등록버튼 refac 메뉴, 사진 추가 필요
    registerStore(x, y, menu) {
        const title = document.getElementById("regist-name").value;
        const desc = document.getElementById("regist-desc").value;
        const tel = document.getElementById("regist-tel").value;
        const addr = document.getElementById("regist-location").value;

        const id = window.sessionStorage.getItem("loginId");
        
        service.saveImageInStorage(id).then((path) => {
            service.getStoreImageUrl(path).then((url) => {
                const storeRegModel = new StoreRegModel(title, desc, tel, addr, x, y, id, img);
                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", () => {
                    var htData = oReq.responseText;
                    window.sessionStorage.removeItem("myaddrX");
                    window.sessionStorage.removeItem("myaddrY");                   
                });
                oReq.open("POST", "http://192.168.100.18:8080/baeminWaiting004"+"/addStore");
                oReq.send(JSON.stringify(storeRegModel));
            });
        });
    }

    myInfoHandler() {
        const btnInfoMod = document.getElementById("btn-info-modify");
        const btnGoModify = document.getElementById("btn-go-modify");

        btnInfoMod.addEventListener("click", () => {
            // @TODO : haeun.kim
            // 사용자 정보 업데이트
        });
        btnGoModify.addEventListener("click", () => {
            util.setTemplateInHtml(".board", "modify-store");
        });
    }
    
    showRegister() {
        util.setTemplateInHtml(".board", "no-store").then(() => {
            const btnGoRegister = document.getElementById("btn-go-register");
            btnGoRegister.addEventListener("click", () => {
                util.setTemplateInHtml(".board", "register").then(
                    this.registerHandler()
                );
            });
        });
    }

    showNaviPage(destination) {
        switch (destination) {
            case "home":
                this.view.activateRoot();
                this.view.hideElement("nav");
                this.view.hideElement("board");
                break;

            case "my-page":
                util.setTemplateInHtml(".board", destination).then(
                    this.confirmMyPage()
                );
                break;

            case "manage":
                service.hasRestaurant().then((hasStore) => {
                    // if (hasStore) {
                    //     const manage = new Manage();
                    // } else {
                        this.showRegister();
                    //}
                });
                break;

            case "statistic":
                util.setTemplateInHtml(".board", destination, stat);
                break;

            case "store-list":
                const storelist = new StoreList();
                break;

            case "logout": 
                //jw 로그아웃
                window.sessionStorage.removeItem("token");
                window.sessionStorage.removeItem("loginId");
                this.view.activateRoot();
                this.view.hideElement("nav");
                this.view.hideElement("board");
                break;

            default:
                util.setTemplateInHtml(".board", destination);
                break;
        }
    }

    showInitialBoard() {
        this.view.hideElement("sign-in");
        this.view.showElement("nav");
        this.view.showElement("board");
        this.showNaviPage("manage");
    }

    //로그인
    signInHandler() {
        const userId = document.getElementById("login-id").value;
        const userPwd = document.getElementById("login-pwd").value;

        //jw
        const memberModel = new MemberModel(userId, userPwd);
        
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load",() => {
             var htData = oReq.responseText;
             console.log(htData);
             this.afterSignIn(htData, userId);            
        });
        oReq.open("POST", "http://192.168.100.18:8080/baeminWaiting004"+"/signin");
        oReq.send(JSON.stringify(memberModel));
    }

    //jw
    afterSignIn(htData, userId) {
        if(htData == "fail"){
            document.querySelector(".sign-warning").style.visibility = "visible";
        }
        else{
            window.sessionStorage.setItem('token', htData);
            window.sessionStorage.setItem('loginId', userId);
            this.showInitialBoard();
        }        
    }

    //회원가입
    signUpHandler() {
        const userId = document.getElementById("sign-id").value;
        const userPwd = document.getElementById("sign-pwd").value;
        const userName = document.getElementById("sign-name").value;
        const userTel = document.getElementById("sign-tel").value;
        
        //jw
        const memberModel = new MemberModel(userId, userPwd, 0, userTel);
        
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", () => {
            var htData = oReq.responseText;
            console.log(htData);
            if(htData == "true"){
                this.view.hideElement("sign-up");
            }           
        });
        oReq.open("POST", "http://192.168.100.18:8080/baeminWaiting004"+"/signup");
        oReq.send(JSON.stringify(memberModel));
    }

}
