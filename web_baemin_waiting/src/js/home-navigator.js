import util from "./util.js";
import service from "./services/service.js";

import { Auth } from "./auth.js";
import { Regex } from "./regex.js";
import { Slide } from "./slide.js";
import { Statistic } from "./statistic.js";
import { StoreList } from "./storelist.js";
import { View } from "./view.js";
import { Manage } from "./manage.js";



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

        this.btnDuplication = document.querySelector("#btn-duplication");

        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");

        this.regex = new Regex();
        this.auth = new Auth();
        this.slide = new Slide("slide-box");
        this.view = new View(".view");

        this.whichBtnIng = "";
    }

    on() {
        this.slide.showSlide(1);

        this.btnIntro.addEventListener("click", () => {
            this.view.showElement("intro");
            this.view.inactivateRoot();
        });

        this.btnIntroClose.addEventListener("click", () => {
            this.view.hideElement("intro")
            this.view.activateRoot();
        });
        
        this.btnGoStore.addEventListener("click", this.goStoreHandler.bind(this));

        this.btnLogin.addEventListener("click", () => {
            this.auth.signIn().then(() => {
                this.view.showInitialBoard();
                this.manageHandler();
            })
        });

        this.btnLoginClose.addEventListener("click", () => {
            this.view.hideElement("sign-in");
            this.view.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.view.showElement("sign-up");
        });

        this.btnSignUp.addEventListener("click", () => this.auth.signUp());

        this.btnSignUpClose.addEventListener("click", () => {
            this.view.hideElement("sign-up");
        });

        this.btnDuplication.addEventListener("click", this.checkDuplcation.bind(this));

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
    
    checkDuplcation() {
        const id = document.querySelector("#sign-id").value;
        service.checkDuplication(id).then((res) => {
            if (res === 0) {
                document.querySelector("#check-dup").innerHTML = "사용가능한 아이디 입니다.";
                document.querySelector("#check-dup").style.color = "green";
                
                this.auth.authId = id;
                this.auth.isNotDuplication = true;
            } else {
                alert("이미 사용 중인 아이디 입니다.");
            }
        })
    }

    confirmMyPage() {
        const btnConfirm = document.getElementById("btn-confirm");
        btnConfirm.addEventListener("click", () => {
            this.auth.confirmPassword();
        })
    }

    dropdownImg() {
        const drop = document.querySelector(".dropdown");
        if (drop.classList.contains("show-dropdown"))
            document.getElementById("drop").src = "/dist/public/images/close-white.png";
        else 
            document.getElementById("drop").src = "/dist/public/images/menu.png";
    }

    goStoreHandler() {
        const token = this.auth.currentToken();

        if (token) {
            this.view.showElement("board");
            this.view.showElement("nav")
            this.showNaviPage("manage");
        } else {
            this.view.showElement("sign-in");
        }

        this.view.inactivateRoot();
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
                util.setTemplateInHtml(".board", "register").then(() => this.registerPage());
            });
        });
    }

    showNaviPage(destination) {
        switch (destination) {
            case "home":
                this.view.goHome();
                break;

            case "my-page":
                this.view.showNaviPage(destination).then(() =>
                    this.confirmMyPage()
                );
                break;

            case "manage":
                this.manageHandler();
                break;

            case "statistic":
                const stat = new Statistic();
                break;

            case "store-list":
                const storelist = new StoreList();
                break;

            case "logout": 
                this.auth.signOut();
                break;

            default:
                this.view.showNaviPage(destination);
                break;
        }
    }

    manageHandler() {
        const token = this.auth.currentToken();
       
        if (!token) {
            this.view.showElement("sign-in");
            this.view.inactivateRoot();
        } else if (token.storeId === 0) {
            this.hasNoStore();
        } else {
            const manage = new Manage(token);
        };
    }

    hasNoStore() {
        this.view.showNaviPage("no-store").then(() => {
            const btnGoRegister = document.getElementById("btn-go-register");
            btnGoRegister.addEventListener("click", () => {
                this.view.showNaviPage("register").then(() => { this.readyToRegister() });
            });
        });
    }

    readyToRegister() {
        const menu = new Menu(".menus");
        menu.addMenuInput();

        const btnAddMenu = document.querySelector(".add-menu");
        btnAddMenu.addEventListener("click", () => {
            menu.addMenuInput();
        });

        const map = new Map();
        map.on();
        
        const btnRegister = document.getElementById("btn-reg-store");
        btnRegister.addEventListener("click", () => this.auth.registerStore(map, menu));
    }

}
