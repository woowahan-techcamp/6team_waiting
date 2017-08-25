import util from "./util.js";
import service from "./services/service.js";

import { Scroll } from "./scroll.js";


export class StoreList {

    constructor() {
        this.scroll = new Scroll();

        this.stores = [];
        this.pageNow = 0;//현재 페이지
        this.limit = 0; //최대 식당 개수
        this.PAGE_COUNT = 10;
        this.position = 0;
        
        this.storelistPage();
        this.init();       
    }

    init(){
        service.getCountStores().then((result) => {
            this.pageLIMIT = result.count;
        });

        this.getMoreStore();
    }

    storeListHandler() {
        document.querySelector(".store-list").addEventListener("click", (e) => {
            if (e.target.nodeName === "DD" || e.target.nodeName === "IMG" || e.target.nodeName === "DT") {
                document.querySelector(".store-card-list").removeEventListener("scroll", this.currentPosition);
                this.storedetailPage(e.target.id);
            }
        })
    }

    storelistPage() {
        util.setTemplateInHtml(".board", "store-list", this.stores)
            .then(() => {
                console.log("POSITION",this.position);
                document.querySelector(".store-card-list").scrollTop += this.position;
                this.storeListHandler();
                this.scroll.scrollPositionReset();

                document.querySelector(".store-card-list").addEventListener("scroll", this.currentPosition.bind(this));
            });
    }

    storedetailPage(id) {
        service.getOtherStoreDetail(id)
            .then((info) => {
                return util.setTemplateInHtml(".store-card-list", "store-detail", info)
            })
            .then((re) => {
                const btnBack = document.querySelector("#btn-back");
                btnBack.addEventListener("click", () => {
                    this.storelistPage();
                })
            });
    }

    currentPosition() {
        const dom = document.querySelector(".store-card-list");
        this.position = dom.scrollTop;

        if ((dom.scrollHeight - this.position) == dom.clientHeight) {
            this.getMoreStore();
        }
    }

    getMoreStore() {

        const firstNum = this.pageNow;
        const lastNum = (this.pageNow + this.PAGE_COUNT);

        return service.getOtherStoreList(firstNum, lastNum)
            .then((stores) => {
                stores.forEach((store) => {
                    this.stores.push(store);
                })
            })
            .then(() => {
                this.pageNow += this.PAGE_COUNT;
                this.storelistPage();
            });
    }

    throttle(fn, wait) {
        var time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        }
    }
   

}