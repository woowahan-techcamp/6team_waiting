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
            this.showIntro();
            this.inactivateRoot();
        });

        this.btnIntroClose.addEventListener("click", () => {
            this.hideIntro();
            this.activateRoot();
        });
        
        this.btnGoStore.addEventListener("click", () => {
            if (!service.isAuth())
                this.showSignIn();
            else {
                this.showBoard();
                this.showNavi();
            }

            this.inactivateRoot();
        });

        this.btnLogin.addEventListener("click", () => {
            const userId = document.getElementById("login-id").value;
            const userPwd = document.getElementById("login-pwd").value;

            service.signInUser(userId, userPwd)
                .then(() => {
                    this.hideSignIn();
                    this.showNavi();
                    this.showBoard();
                });
        });

        this.btnLoginClose.addEventListener("click", () => {
            this.hideSignIn();
            this.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.showSignUp();
        });

        this.btnSignUp.addEventListener("click", () => {
            const userId = document.getElementById("sign-id").value;
            const userPwd = document.getElementById("sign-pwd").value;
            const userName = document.getElementById("sign-name").value;
            const userTel = document.getElementById("sign-tel").value;
            
            service.signUpUser(userId, userPwd, userName, "owner", userTel)
                .then(this.hideSignUp());
        });

        this.btnSignUpClose.addEventListener("click", () => {
            this.hideSignUp();
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
                    const btnGoModify = document.getElementById("btn-go-modify");
                    btnGoModify.addEventListener("click", () => {
                        util.setTemplateInHtml(".board", "modify");
                    });
                });
        });
    }

    hideIntro() {
        this.removeClassOnElement(".intro", "show-intro");
    }

    hideSignIn() {
        this.removeClassOnElement(".sign-in", "show-sign-in");
    }

    hideSignUp() {
        this.removeClassOnElement(".sign-up", "show-sign-up");
    }

    hideBoard() {
        this.removeClassOnElement(".board", "show-board");
    }

    hideNavi() {
        this.removeClassOnElement(".nav", "show-nav");
    }

    inactivateRoot() {
        this.addClassOnElement(".view", "inactive");
    }

    activateRoot() {
        this.removeClassOnElement(".view", "inactive");
    }

    showIntro() {
        this.addClassOnElement(".intro", "show-intro");
    }

    showSignIn() {
        this.addClassOnElement(".sign-in", "show-sign-in");
    }

    showSignUp() {
        this.addClassOnElement(".sign-up", "show-sign-up");
    }

    showBoard() {
        this.addClassOnElement(".board", "show-board");
        this.showNaviPage("manage");
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
                this.hideNavi();
                this.hideBoard();
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
                this.hideNavi();
                this.hideBoard();
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
