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
        document.querySelector(".intro").classList.remove("show-intro");
    }

    hideSignIn() {
        document.querySelector(".sign-in").classList.remove("sign-in-show");
    }

    hideSignUp() {
        document.querySelector(".sign-up").classList.remove("sign-up-show");
    }

    hideBoard() {
        document.querySelector(".board").classList.remove("show-board");
    }

    hideNavi() {
        document.querySelector(".nav").classList.remove("show-nav");
    }

    inactivateRoot() {
        document.querySelector(".view").classList.add("inactive");
    }

    activateRoot() {
        document.querySelector(".view").classList.remove("inactive");
    }

    showIntro() {
        document.querySelector(".intro").classList.add("show-intro");
    }

    showSignIn() {
        document.querySelector(".sign-in").classList.add("sign-in-show");
    }

    showSignUp() {
        document.querySelector(".sign-up").classList.add("sign-up-show");
    }

    showBoard() {
        document.querySelector(".board").classList.add("show-board");
    }

    showNavi() {
        document.querySelector(".nav").classList.add("show-nav");
    }
}
