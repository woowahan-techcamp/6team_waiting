export class HomeNavigator {

    constructor() {
        this.btnIntro = document.querySelector("#btn-intro");
        this.btnIntroClose = document.querySelector("#btn-intro-close");
        this.btnGoLogin = document.querySelector("#btn-go-login");
        this.btnLogin = document.querySelector("#btn-login");
        this.btnLoginClose = document.querySelector("#btn-login-close");
        this.btnGoSignUp = document.querySelector("#btn-go-sign-up");
        this.btnSignUp = document.querySelector("#btn-sign-up");
        this.btnSignUpClose = document.querySelector("#btn-sign-close");
        this.naviHome = document.querySelector("#navi-home");
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
        
        this.btnGoLogin.addEventListener("click", () => {
            this.showSignIn();
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
    }

    showNavi() {
        this.addClassOnElement(".nav", "show-nav");
    }

    addClassOnElement(ele, css) {
        document.querySelector(ele).classList.add(css);
    }

    removeClassOnElement(ele, css) {
        document.querySelector(ele).classList.remove(css);
    }
}
