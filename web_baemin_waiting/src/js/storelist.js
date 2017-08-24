import util from "./util.js";
import service from "./services/service.js";

import { Scroll } from "./scroll.js";


export class StoreList {

    constructor() {
        this.scroll = new Scroll();
        this.storelistPage();
        this.pageNow = 0;//현재 페이지
        this.howManyPerPage = 10; //페이지당 몇 개
        this.pageLIMIT = 0; //최대 식당 개수
        this.init();
        this.heightNow = 0;
        
    }

    init(){
        //리미트 페이지 받아오기
        service.getCountStores().then((result) => {
            this.pageLIMIT = result.count;
        });
        const elem = document.querySelector(".store-card-list");
        elem.addEventListener("scroll", () => {
            this.heightNow = this.elem.scrollTop;
            
        });

        //다른 페이지로 이동했을땐 페이지가 초기화될것
    }

    storeListHandler() {
        document.querySelector(".store-list").addEventListener("click", (e) => {
            if (e.target.nodeName === "DD" || e.target.nodeName === "IMG" || e.target.nodeName === "DT") {
                this.scroll.saveScrollPosition(".store-card-list");
                this.storedetailPage(e.target.id);
            }
        })
    }

    storelistPage() {
        // @TODO : haeun.kim 
        // 한 번에 가져오는 stores 의 갯수를 조절 페이지처리
        const firstNum = this.pageNow;
        const lastNum = (this.pageNow + this.howManyPerPage);
        service.getOtherStoreList(firstNum, lastNum).then((stores) => {
            util.setTemplateInHtml(".board", "store-list", stores)
                .then(() => {
                    this.scroll.setScrollPosition(".store-card-list");
                    this.storeListHandler();
                    this.scroll.scrollPositionReset();
                    this.pageNow = lastNum;
                });
        });

    }

    storedetailPage(id) {
        service.getOtherStoreDetail(id).then((storeInfo) => {
            util.setTemplateInHtml(".store-card-list", "store-detail", storeInfo)
                .then(() => {
                    const btnBack = document.querySelector("#btn-back");
                    btnBack.addEventListener("click", () => {
                        this.storelistPage();
                    });
                });
            });
    }
}