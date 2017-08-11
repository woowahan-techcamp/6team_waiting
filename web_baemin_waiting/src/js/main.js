document.addEventListener("DOMContentLoaded", () => {

    const btnIntro = document.querySelector("#btn-intro");
    const btnIntroClose = document.querySelector("#btn-intro-close");
    const btnGoLogin = document.querySelector("#btn-go-login");
    const btnLogin = document.querySelector("#btn-login");
    const btnLoginClose = document.querySelector("#btn-login-close");
    const btnGoSignUp = document.querySelector("#btn-go-sign-up");
    const btnSignUp = document.querySelector("#btn-sign-up");
    const btnSignUpClose = document.querySelector("#btn-sign-close");

    const naviHome = document.querySelector("#navi-home");


    btnIntro.addEventListener("click", () => {
        showIntro();
        inactivateRoot();
    });

    btnIntroClose.addEventListener("click", () => {
        hideIntro();
        activateRoot();
    });
    
    btnGoLogin.addEventListener("click", () => {
        showSignIn();
        inactivateRoot();
    });

    btnLogin.addEventListener("click", () => {
        hideSignIn();
        showNavi();
        showBoard();
    });

    btnLoginClose.addEventListener("click", () => {
        hideSignIn();
        activateRoot();
    })

    btnGoSignUp.addEventListener("click", () => {
        showSignUp();
    });

    btnSignUp.addEventListener("click", () => {
        hideSignUp();
    });

    btnSignUpClose.addEventListener("click", () => {
        hideSignUp();
    })

    naviHome.addEventListener("click", () => {
        activateRoot();
        hideBoard();
        hideNavi();
    });

})

const hideIntro = function() {
    document.querySelector(".intro").classList.remove("show-intro");
}

const hideSignIn = function() {
    document.querySelector(".sign-in").classList.remove("sign-in-show");
}

const hideSignUp = function() {
    document.querySelector(".sign-up").classList.remove("sign-up-show");
}

const hideBoard = function() {
    document.querySelector(".board").classList.remove("show-board");
}

const hideNavi = function() {
    document.querySelector(".nav").classList.remove("show-nav");
}

const inactivateRoot = function() {
    document.querySelector(".view").classList.add("inactive");
}

const activateRoot = function() {
    document.querySelector(".view").classList.remove("inactive");
}

const showIntro = function() {
    document.querySelector(".intro").classList.add("show-intro");
}

const showSignIn = function() {
    document.querySelector(".sign-in").classList.add("sign-in-show");
}

const showSignUp = function() {
    document.querySelector(".sign-up").classList.add("sign-up-show");
}

const showBoard = function() {
    document.querySelector(".board").classList.add("show-board");
}

const showNavi = function() {
    document.querySelector(".nav").classList.add("show-nav");
}
