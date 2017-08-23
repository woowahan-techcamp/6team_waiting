import util from "./util.js";
import service from "./services/service.js";

import { Regex } from "./regex.js";


export class Auth {

    constructor(){
        this.authId = null;
        this.isNotDuplication = false;
        this.regex = new Regex();
    }

    confirmPassword(pwd) {
        const id = window.sessionStorage.getItem("loginId");
        this.signIn(id, pwd);
    }
    

    registerStore(id, title, desc, tel, add, x, y, menu) {
        // 버튼 연타 처리(flag)
        service.saveImageInStorage(id).then((path) => { 
            service.getStoreImageUrl(path).then((url) => {
                service.registerRestaurant(id, title, desc, tel, add, x, y, menu, url).then((storeid) => {
                    const token = JSON.parse(window.sessionStorage.getItem("token"));
                    token.storeId = storeid;
                    window.sessionStorage.setItem("token", JSON.stringify(token));
                })
            })
        });
    }

    getMyStore() {
        const id = window.sessionStorage.getItem("storeId");

        return new Promise((resolve, reject) => {
            util.requestAjax("GET", `${this.baseUrl}/stores`, id)
                .then((res) => {
                    console.log(res);
                })
        })
    }


}