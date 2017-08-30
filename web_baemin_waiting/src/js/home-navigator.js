import util from "./util.js";
import service from "./services/service.js";

import { Auth } from "./auth.js";
import { Slide } from "./slide.js";
import { Statistic } from "./statistic.js";
import { StoreList } from "./storelist.js";
import { View } from "./view.js";
import { Manage } from "./manage.js";
import { Map } from "./map.js";
import { Menu } from "./menu.js";


export class HomeNavigator {

    constructor() {
        this.btnIntro = document.querySelector("#btn-intro");
        this.btnIntroClose = document.querySelector("#btn-intro-close");
        this.btnGoStore = document.querySelector("#btn-go-store");
        this.btnLogin = document.querySelector("#btn-login");
        this.btnLoginClose = document.querySelector("#btn-login-close");
        this.btnGoSignUp = document.querySelector("#btn-go-sign-up");
        this.btnSignUp = document.querySelector("#btn-sign-up");
        this.btnSignUpClose = document.querySelector("#btn-sign-close");
        this.navigator = document.querySelector(".navigator");
        this.dropdown = document.querySelector("#drop");
        this.dropdownList = document.querySelector(".dropdown-list");

        this.btnDuplication = document.querySelector("#btn-duplication");

        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");

        this.auth = new Auth();
        this.slide = new Slide("slide-box");
        this.view = new View(".view");
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

        this.btnLogin.addEventListener("click", this.signinHandler.bind(this));

        this.btnLoginClose.addEventListener("click", () => {
            this.view.hideElement("sign-in");
            this.view.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.view.showElement("sign-up");
        });

        this.btnSignUp.addEventListener("click", this.signupHandler.bind(this));

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
    
    showRegister() {
        util.setTemplateInHtml(".board", "no-store").then(() => {
            const btnGoRegister = document.getElementById("btn-go-register");
            btnGoRegister.addEventListener("click", () => {
                util.setTemplateInHtml(".board", "register");
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
                this.signoutHandler();
                break;

            default:
                this.view.showNaviPage(destination);
                break;
        }
    }

    signinHandler() {
        this.auth.signIn().then((result) => {
            console.log(result);
            if (result === "success") {
                this.view.showInitialBoard();
                this.manageHandler();
            } else {
                alert("아이디와 비밀번호를 확인해주세요");
            }
        })
    }

    signupHandler() {
        this.auth.signUp().then((result) => {
            if (result === "success") {
                this.view.hideElement("sign-up");
                document.querySelector("#check-dup").innerHTML = "아이디 중복확인을 해주세요";
                document.querySelector("#check-dup").style.color = "#FF6666";
            } else {
                alert("회원가입에 실패하였습니다")
            }
        })
    }

    signoutHandler() {
        const token = this.auth.currentToken();
        
        if (token.storeId !== 0) {
            service.getStoreInfo(token).then((info) => {
                if (info.opened !== 0) {
                    const answer = confirm("로그아웃 후에도 가게는 닫히지 않습니다. 가게를 오픈한 상태에서 로그아웃을 하시겠습니까?");
                    if (answer) {
                        this.auth.signOut();
                        this.view.goHome();
                    }
                } else {
                    this.auth.signOut();
                    this.view.goHome();
                }
            })
        } else {
            this.auth.signOut();
            this.view.goHome();
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

        const map = new Map("#regist-location");
        map.on();
        
        const btnRegister = document.getElementById("btn-reg-store");
        btnRegister.addEventListener("click", () => {
            this.auth.registerStore(map, menu).then(() => {
                this.afterRegister();
            })
        });
    }

    afterRegister() {
        const token = this.auth.currentToken();
        service.getStoreInfo(token).then((info) => {
            this.view.showNaviPage("manage", info);
            const manage = new Manage(token);
        });
    }

}
