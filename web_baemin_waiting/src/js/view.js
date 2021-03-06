import util from "./util.js";


export class View {
    
    constructor(view) {
        this.root = document.querySelector(view);
    }

    hideElement(ele) {
        document.querySelector(`.${ele}`).classList.remove(`show-${ele}`);
    }

    showElement(ele) {
        document.querySelector(`.${ele}`).classList.add(`show-${ele}`);
    }

    toggleElement(ele, css) {
        document.querySelector(`.${ele}`).classList.toggle(`${css}`);
    }

    inactivateRoot() {
        this.root.classList.add("inactive");
    }

    activateRoot() {
        this.root.classList.remove("inactive");
    }

    goHome() {
        this.activateRoot();
        this.hideElement("nav");
        this.hideElement("board");
    }

    showInitialBoard() {
        this.hideElement("sign-in");
        this.showElement("nav");
        this.showElement("board");
    }

    showNaviPage(page, data) {
        return util.setTemplateInHtml(".board", page, data);
    }

}