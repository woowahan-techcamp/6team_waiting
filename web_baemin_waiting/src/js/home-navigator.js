import util from "./util.js";


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

        this.naviHome = document.querySelector("#navi-home");
        this.naviMyPage = document.querySelector("#navi-mypage");
        this.naviManage = document.querySelector("#navi-manage");
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
            // if ( 로그인이 안 되어 있으면)
                this.showSignIn();
            // else 
                // this.showBoard();

            this.inactivateRoot();
        });

        this.btnLogin.addEventListener("click", () => {
            this.hideSignIn();
            this.showNavi();
            this.showBoard();
        });

        this.btnLoginClose.addEventListener("click", () => {
            this.hideSignIn();
            this.activateRoot();
        })

        this.btnGoSignUp.addEventListener("click", () => {
            this.showSignUp();
        });

        this.btnSignUp.addEventListener("click", () => {
            this.hideSignUp();
        });

        this.btnSignUpClose.addEventListener("click", () => {
            this.hideSignUp();
        });

        this.naviHome.addEventListener("click", () => {
            this.activateRoot();
            this.hideBoard();
            this.hideNavi();
        });

        this.naviMyPage.addEventListener("click", () => {
            this.showMyPage();
        })

        this.naviManage.addEventListener("click", () => {
            this.showManage();
        })
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

        /** 
         * @TODO : haeun.kim
         * 로그인 성공 여부, 가게 등록 여부에 따라 다른 처리가 진행되어야 합니다. 
         * 현재는 로그인 성공 후, 가게가 등록되지 않았을 경우를 가정한 동작입니다. 
        */
        util.setTemplateInHtml(".board", "no-store")
            .then(() => {
                const btnGoRegister = document.querySelector("#btn-go-register");
                btnGoRegister.addEventListener("click", () => {
                    util.setTemplateInHtml(".board", "register");
                })
            });
    }

    showNavi() {
        this.addClassOnElement(".nav", "show-nav");
    }

    showManage() {
        util.setTemplateInHtml(".board", "manage");
    }

    showMyPage() {
        util.setTemplateInHtml(".board", "my-page");
    }

    addClassOnElement(ele, css) {
        document.querySelector(ele).classList.add(css);
    }

    removeClassOnElement(ele, css) {
        document.querySelector(ele).classList.remove(css);
    }
}
