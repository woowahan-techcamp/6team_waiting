import util from "./util.js";
import service from "./services/service.js";
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
            if (!service.isAuth())
                this.showElement("sign-in");
            else {
                this.showElement("board");
                this.showElement("nav");
            }

            this.inactivateRoot();
        });

        this.btnLogin.addEventListener("click", () => {
            const userId = document.getElementById("login-id").value;
            const userPwd = document.getElementById("login-pwd").value;

            service.signInUser(userId, userPwd)
                .then(() => {
                    this.hideElement("sign-in");
                    this.showElement("nav");
                    this.showElement("board");
                    this.showNaviPage("manage");
                });
        });

        this.btnLoginClose.addEventListener("click", () => {
            this.hideElement("sign-in");
            this.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.showElement("sign-up");
        });

        this.btnSignUp.addEventListener("click", () => {
            const userId = document.getElementById("sign-id").value;
            const userPwd = document.getElementById("sign-pwd").value;
            const userName = document.getElementById("sign-name").value;
            const userTel = document.getElementById("sign-tel").value;
            
            service.signUpUser(userId, userPwd, userName, "owner", userTel)
                .then(this.hideElement("sign-up"));
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
                    const btnInfoMod = document.getElementById("btn-info-modify");
                    const btnGoModify = document.getElementById("btn-go-modify");

                    btnInfoMod.addEventListener("click", () => {
                        // @TODO : haeun.kim
                        // 사용자 정보 업데이트
                    });
                    btnGoModify.addEventListener("click", () => {
                        util.setTemplateInHtml(".board", "modify");
                    });
                });
        });
    }

    hideElement(ele) {
        this.removeClassOnElement(`.${ele}`, `show-${ele}`);
    }

    showElement(ele) {
        this.addClassOnElement(`.${ele}`, `show-${ele}`);
    }

    inactivateRoot() {
        this.addClassOnElement(".view", "inactive");
    }

    activateRoot() {
        this.removeClassOnElement(".view", "inactive");
    }
    
    showRegister() {
        util.setTemplateInHtml(".board", "no-store")
            .then(() => {
                const btnGoRegister = document.querySelector("#btn-go-register");
                btnGoRegister.addEventListener("click", () => {
                    util.setTemplateInHtml(".board", "register")
                        .then(() => {
                            const menu = new Menu(".menus");
                            menu.addMenuInput();

                            const regTitle = document.getElementById("regis-title").value;
                            const regDesc = document.getElementById("regis-desc").value;
                        
                            const btnAddMenu = document.querySelector(".add-menu");
                            btnAddMenu.addEventListener("click", () => {
                                menu.addMenuInput();
                            });

                            const btnRegister = document.querySelector("#btn-reg-store");
                            btnRegister.addEventListener("click", () => {
                                // @TODO : haeun.kim 
                                // 입력된 가게 정보를 DB 에 저장
                                // service.registerRestaurant(regTitle, regDesc);
                            });
                        });
                });
            });
    }

    showNavi() {
        this.addClassOnElement(".nav", "show-nav");
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
                    util.setTemplateInHtml(".board", destination)
                } else {
                    this.showRegister();
                }
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

    addClassOnElement(ele, css) {
        document.querySelector(ele).classList.add(css);
    }

    removeClassOnElement(ele, css) {
        document.querySelector(ele).classList.remove(css);
    }
}
