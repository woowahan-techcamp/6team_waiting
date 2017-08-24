import util from "./util.js";
import service from "./services/service.js";

import { Scroll } from "./scroll.js";


export class StoreList {

    constructor() {
        this.scroll = new Scroll();
        this.storelistPage();
    }

    storeListHandler() {
        document.querySelector(".store-list").addEventListener("click", (e) => {
            if (e.target.nodeName === "DD" || e.target.nodeName === "IMG" || e.target.nodeName === "DT") {
                this.scroll.saveScrollPosition(".store-card-list");
                this.storedetailPage();
            }
        })
    }

    storelistPage() {
        // @TODO : haeun.kim 
        // 한 번에 가져오는 stores 의 갯수를 조절
        service.getStores().then((stores) => {
            util.setTemplateInHtml(".board", "store-list", stores)
                .then(() => {
                    this.scroll.setScrollPosition(".store-card-list");
                    this.storeListHandler();
                    this.scroll.scrollPositionReset();
                });
        });

    }

    storedetailPage() {
        util.setTemplateInHtml(".store-card-list", "store-detail")
            .then(() => {
                const btnBack = document.querySelector("#btn-back");
                btnBack.addEventListener("click", () => {
                    this.storelistPage();
                });
            });
    }
}