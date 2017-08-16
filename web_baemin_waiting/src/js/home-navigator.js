import util from "./util.js";
import service from "./services/service.js";
import { Menu } from "./menu.js";


export class HomeNavigator {

    constructor(intro, introClose, goStore, login, loginClose, goSignUp, signUp, signUpClose, nav) {
        this.btnIntro = document.querySelector(intro);
        this.btnIntroClose = document.querySelector(introClose);
        this.btnGoStore = document.querySelector(goStore);
        this.btnLogin = document.querySelector(login);
        this.btnLoginClose = document.querySelector(loginClose);
        this.btnGoSignUp = document.querySelector(goSignUp);
        this.btnSignUp = document.querySelector(signUp);
        this.btnSignUpClose = document.querySelector(signUpClose);
        this.navigator = document.querySelector(nav);
    }

    on() {
        this.btnIntro.addEventListener("click", () => {
            this.showElement("intro");
            this.inactivateRoot();
        });

        this.btnIntroClose.addEventListener("click", () => {
            this.hideElement("intro")
            this.activateRoot();
        });
        
        this.btnGoStore.addEventListener("click", () => {
            this.goStoreHangler();
        });

        this.btnLogin.addEventListener("click", () => {
            this.signInHandler();
        });

        this.btnLoginClose.addEventListener("click", () => {
            this.hideElement("sign-in");
            this.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.showElement("sign-up");
        });

        this.btnSignUp.addEventListener("click", () => {
            this.signUpHandler();
        });

        this.btnSignUpClose.addEventListener("click", () => {
            this.hideElement("sign-up");
        });

        this.navigator.addEventListener("click", (e) => {
            if (e.target && e.target.nodeName === "LI") {
                this.showNaviPage(e.target.dataset.dest);
            }
        });
    }

    confirmMyPage() {
        const btnConfirm = document.getElementById("btn-confirm");
        btnConfirm.addEventListener("click", () => {
            util.setTemplateInHtml(".my-page-area", "my-info")
                .then(() => {
                    this.myInfoHandler();
                });
        });
    }

    goStoreHangler() {
        if (!service.isAuth())
            this.showElement("sign-in");
        else {
            this.showElement("board");
            this.showElement("nav")
            this.showNaviPage("manage");
        }

        this.inactivateRoot();
    }

    hideElement(ele) {
        document.querySelector(`.${ele}`).classList.remove(`show-${ele}`);
    }

    showElement(ele) {
        document.querySelector(`.${ele}`).classList.add(`show-${ele}`);
    }

    inactivateRoot() {
        document.querySelector(".view").classList.add("inactive");
    }

    activateRoot() {
        document.querySelector(".view").classList.remove("inactive");
    }

    registerHandler() {
        const menu = new Menu(".menus");
        menu.addMenuInput();

        // const regTitle = document.getElementById("regist-title").value;
        // const regDesc = document.getElementById("regist-desc").value;
    
        const btnAddMenu = document.querySelector(".add-menu");
        btnAddMenu.addEventListener("click", () => {
            menu.addMenuInput();
        });

        const btnRegister = document.getElementById("btn-reg-store");
        btnRegister.addEventListener("click", () => {
            // @TODO : haeun.kim 
            // 입력된 가게 정보를 DB 에 저장
            // service.registerRestaurant(regTitle, regDesc);
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
        util.setTemplateInHtml(".board", "no-store")
            .then(() => {
                const btnGoRegister = document.getElementById("btn-go-register");
                btnGoRegister.addEventListener("click", () => {
                    util.setTemplateInHtml(".board", "register")
                        .then(() => {
                            this.registerHandler();
                        });
                });
            });
    }

    showNaviPage(destination) {
        switch (destination) {
            case "home":
                this.activateRoot();
                this.hideElement("nav");
                this.hideElement("board");
                break;

            case "my-page":
                util.setTemplateInHtml(".board", destination)
                    .then(() => {
                        this.confirmMyPage();
                    });
                break;

            case "manage":
                if (service.hasStore()) {
                    util.setTemplateInHtml(".board", destination);
                } else {
                    this.showRegister();
                }
                break;

            case "store-list":
                util.setTemplateInHtml(".board", destination);
                break;

            case "logout": 
                service.signOutUser();
                this.activateRoot();
                this.hideElement("nav");
                this.hideElement("board");
                break;

            default:
                util.setTemplateInHtml(".board", destination);
                break;
        }
    }

    signInHandler() {
        const userId = document.getElementById("login-id").value;
        const userPwd = document.getElementById("login-pwd").value;

        service.signInUser(userId, userPwd)
            .then(() => {
                this.hideElement("sign-in");
                this.showElement("nav");
                this.showElement("board");
                this.showNaviPage("manage");
            });
    }

    signUpHandler() {
        const userId = document.getElementById("sign-id").value;
        const userPwd = document.getElementById("sign-pwd").value;
        const userName = document.getElementById("sign-name").value;
        const userTel = document.getElementById("sign-tel").value;
        
        service.signUpUser(userId, userPwd, userName, "owner", userTel)
            .then(this.hideElement("sign-up"));
    }
}
