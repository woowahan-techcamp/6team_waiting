import util from "./util.js";
import service from "./services/service.js";


export class StoreList {

    constructor() {
        this.stores = [];
        this.pageNow = -1;//현재 페이지
        this.limit = 0; //최대 식당 개수
        this.PAGE_COUNT = 10;
        this.scrollPosition = 0;
        
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
                //document.querySelector(".store-card-list").removeEventListener("scroll", this.currentPosition);
                this.storedetailPage(e.target.id);
            }
        })
    }

    storelistPage() {
        util.setTemplateInHtml(".board", "store-list", this.stores)
            .then(() => {

                console.log("STORE_LIST_PAGE",this.scrollPosition);
                document.querySelector(".store-card-list").scrollTop += this.scrollPosition;
                this.storeListHandler();

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
        console.log("POSITION",this.scrollPosition);
        
        const dom = document.querySelector(".store-card-list");
        this.scrollPosition = dom.scrollTop;

        if ((dom.scrollHeight - this.scrollPosition) == dom.clientHeight) {
            this.getMoreStore();
        }
    }

    getMoreStore() {
        const firstNum = this.pageNow + 1;
        const lastNum = (this.pageNow + this.PAGE_COUNT);

        return service.getOtherStoreList(firstNum, lastNum)
            .then((stores) => {
                stores.forEach((store) => {
                    this.stores.push(store);
                })
            })
            .then(() => {
                this.pageNow += this.PAGE_COUNT;
                console.log("GET_MORE", this.scrollPosition);
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