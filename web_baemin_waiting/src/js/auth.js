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
    
    signIn(id, pwd) {
        return new Promise((resolve, reject) => {
            if (!this.regex.isID(id)) {
                reject("아이디가 잘못됨");
            }

            if (!this.regex.isPassword(pwd)) {
                reject("비밀번호가 잘못됨");
            }

            service.signInUser(id,pwd)
                .then((res) => {
                    if (res.token === "fail")
                        reject(res);
                    else 
                        resolve(res);
                })
        })
    }

    signUp(id, pwd, name, tel) {
        return new Promise((resolve, reject) => {
            if (!this.regex.isID(id)) {
                reject("아이디 형식이 잘못됨");
            }

            if (!this.regex.isPassword(pwd)) {
                reject("비밀번호 형식이 잘못됨");
            }

            if (!this.regex.isName(name)) {
                reject("이름 형식이 잘못됨");
            }

            if (!this.regex.isTel(tel)) {
                reject("전화번호 형식이 잘못됨");
            }
            
            service.signUpUser(id, pwd, name, tel)
                .then((res) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                });
        })
    }

    registerStore(id, title, desc, tel, add, x, y, menu) {
        // 버튼 연타 처리(flag)
        service.saveImageInStorage(id).then((path) => {
            service.getStoreImageUrl(path).then((url) => {
                service.registerRestaurant(id, title, desc, tel, add, x, y, menu, url)
                    .then((storeid) => {
                        window.sessionStorage.setItem("storeId", storeid);
                    });
            });
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