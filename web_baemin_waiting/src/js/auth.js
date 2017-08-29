import util from "./util.js";
import service from "./services/service.js";

import { Regex } from "./regex.js";
import { Manage } from "./manage.js";
import { Map } from "./map.js";
import { Menu } from "./menu.js";
import { View } from "./view.js";


export class Auth {

    constructor(){
        this.authId = null;
        this.isNotDuplication = true; // @TODO : haeun.kim
        this.regex = new Regex();
        this.view = new View(".view");
        this.isSaving = false;
    }

    signIn() {
        const id = document.getElementById("login-id").value;
        const pwd = document.getElementById("login-pwd").value;

        if (!this.regex.isID(id)) {
            alert("아이디가 잘못됨");
            return;
        }

        if (!this.regex.isPassword(pwd)) {
            alert("비밀번호가 잘못됨");
            return;
        }

        service.signInUser(id, pwd)
            .then((token) => {
                if (!(token.token === "fail")) {
                    window.sessionStorage.setItem("token", JSON.stringify(token));
                    this.view.showInitialBoard();
                    this.checkMyStore();
                } else {
                    alert("아이디와 비밀번호를 확인해주세요");
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    signUp() {
        const id = document.getElementById("sign-id").value;
        const pwd = document.getElementById("sign-pwd").value;
        const name = document.getElementById("sign-name").value;
        const tel = document.getElementById("sign-tel").value;

        if (!this.regex.isID(id)) {
            alert("아이디 형식이 잘못됨");
            return;
        }

        if (!this.regex.isPassword(pwd)) {
            alert("비밀번호 형식이 잘못됨");
            return;
        }

        if (!this.regex.isName(name)) {
            alert("이름 형식이 잘못됨");
            return;
        }

        if (!this.regex.isTel(tel)) {
            alert("전화번호 형식이 잘못됨");
            return;
        }
        
        if (this.isNotDuplication && (this.authId === id)) {
            service.signUpUser(id, pwd, name, tel)
                .then(() => {
                    this.view.hideElement("sign-up");
                    document.querySelector("#check-dup").innerHTML = "아이디 중복확인을 해주세요";
                    document.querySelector("#check-dup").style.color = "#FF6666";
                })
                .catch(() => {
                    alert("회원가입 실패");
                });
        } else {
            alert("아이디 중복 확인을 해주세요");
        }
    }

    signOut() {

        const token = this.currentToken();
        service.changeStatus(token, "off")
            .then((res) => {
                //console.log(res);
                if(res.resultStatus == "off"){
                    sessionStorage.removeItem("token");
                    this.view.goHome();
                }  
            });        
    }

    confirmPassword() {
        const token = this.currentToken();
        const pwd = document.querySelector("#pwd-confirm").value;  
        service.signInUser(token.memberId, pwd)
            .then((token) => {
                if(token.token == "fail"){
                    alert("잘못된 비밀번호입니다");
                }else{
                    //jw
                    service.getStoreInfo(token)
                        .then((storeInfo) => {
                            console.log(storeInfo);
                            util.setTemplateInHtml(".board", "my-info", storeInfo)
                                .then(() => {
                                    this.myInfoHandler(storeInfo);
                                });
                        });             
                }
            });
    }

    //jw
    myInfoHandler(storeInfo) {
        const btnInfoMod = document.getElementById("btn-info-modify");
        const btnGoModify = document.getElementById("btn-go-modify");

        btnInfoMod.addEventListener("click", () => {
            // @TODO : haeun.kim
            // 사용자 정보 업데이트
        });
        btnGoModify.addEventListener("click", () => {
            util.setTemplateInHtml(".board", "register", storeInfo)
                .then(() => {
                    const map = new Map("#regist-location");
                    map.on();

                    const menu = new Menu(".menus");
                    const menuSize = storeInfo.menus.length;

                    for( var i = 0 ; i < menuSize; i++ ){                        
                        menu.addMenuInput();
                    }

                    const menuNameArr = document.querySelectorAll(".menu-name");                   
                    for( var i = 0; i < menuSize; i++ ){
                        menuNameArr[i].value = storeInfo.menus[i].name;
                    }

                    const menuPriceArr = document.querySelectorAll(".menu-price");
                    for( var i = 0; i < menuSize; i++ ){
                        menuPriceArr[i].value = storeInfo.menus[i].price;
                    }

                    const btnAddMenu = document.querySelector(".add-menu");
                    btnAddMenu.addEventListener("click", () => {
                        menu.addMenuInput();
                    });
                    
                    const btnModify = document.querySelector("#btn-reg-store");
                    btnModify.addEventListener("click", () => {
                        this.updateStore(map, menu);
                        
                    });
                });
        });
    }
    
    registerStore(map, menu) {
        if (this.isSaving) {
            return alert("처리중입니다");
        }

        const token = this.currentToken();
        const storeid = token.storeId;
        const memberid = token.memberId;
        const menus = menu.getMenus();
        const title = document.getElementById("regist-name").value;
        const desc = document.getElementById("regist-desc").value;
        const tel = document.getElementById("regist-tel").value;
        const addr = document.getElementById("regist-location").value;
        const file = document.getElementById("regist-file").files[0];

        if (!menu.isOK) return;

        if (!this.regex.isName(title)) {
            alert("2 - 20 글자 수의 가게명을 입력해주세요");
            return;
        }

        if (!this.regex.isDescription(desc)) {
            alert("2 - 40 글자 수의 가게 설명을 입력해주세요");
            return;
        }

        if (!this.regex.isTel(tel)) {
            alert("잘못된 전화번호 형식입니다");
            return;
        }

        if (!this.regex.isAddrress(addr)) {
            alert("2 - 40 글자 수의 가게 주소를 입력해주세요");
            return;
        }

        if (!(map.addrX && map.addrY)) {
            alert("가게 주소를 입력하고 지도확인을 해주세요");
            return;
        }

        if (!file) {
            alert("사진을 등록해주세요");
            return;
        }

        this.isSaving = true;
        service.saveImageInStorage(file, memberid)
            .then((path) => {
                return service.getStoreImageUrl(path);
            })
            .then((url) => {
                return service.registerRestaurant(memberid, title, desc, tel, addr, map.addrX, map.addrY, menus, url, storeid);
            })
            .then((storeid) => {
                const token = JSON.parse(window.sessionStorage.getItem("token"));
                token.storeId = storeid;
                window.sessionStorage.setItem("token", JSON.stringify(token));
                this.view.showNaviPage("manage");

                this.isSaving = false;
            });
    }

    currentToken() {
        const token = sessionStorage.getItem("token");
        if (!(token === "undefined")) {
            return JSON.parse(token);
        }
    }

    checkMyStore() {
        const token = this.currentToken();
        
        if (!token) {
            this.view.showElement("sign-in");
            this.view.inactivateRoot();
        } else if (token.storeId === 0) {
            this.hasNoStore();
        } else {
             const manage = new Manage(token);
        }
    }

    hasNoStore() {
        this.view.showNaviPage("no-store").then(() => {
            const btnGoRegister = document.getElementById("btn-go-register");
            btnGoRegister.addEventListener("click", () => {
                this.view.showNaviPage("register").then(() => { this.readyToRegister() });
            });
        });
    }

    readyToRegister() {
        const menu = new Menu(".menus");
        menu.addMenuInput();

        const btnAddMenu = document.querySelector(".add-menu");
        btnAddMenu.addEventListener("click", () => {
            menu.addMenuInput();
        });

        const map = new Map("#regist-location");
        map.on();
        
        const btnRegister = document.getElementById("btn-reg-store");
        btnRegister.addEventListener("click", () => this.registerStore(map, menu));
    }

    updateStore(map, menu) {
        if (this.isSaving) {
            return alert("처리중입니다");
        }

        const token = this.currentToken();
        const storeid = token.storeId;
        const memberid = token.memberId;
        const menus = menu.getMenus();
        const title = document.getElementById("regist-name").value;
        const desc = document.getElementById("regist-desc").value;
        const tel = document.getElementById("regist-tel").value;
        const addr = document.getElementById("regist-location").value;
        const file = document.getElementById("regist-file").files[0];

        if (!menu.isOK) return;

        if (!this.regex.isName(title)) {
            alert("2 - 20 글자 수의 가게명을 입력해주세요");
            return;
        }

        if (!this.regex.isDescription(desc)) {
            alert("2 - 40 글자 수의 가게 설명을 입력해주세요");
            return;
        }

        if (!this.regex.isTel(tel)) {
            alert("잘못된 전화번호 형식입니다");
            return;
        }

        if (!this.regex.isAddrress(addr)) {
            alert("2 - 40 글자 수의 가게 주소를 입력해주세요");
            return;
        }

        this.isSaving = true;

        if (file == null) {
            const url = null;
            service.registerRestaurant(memberid, title, desc, tel, addr, map.addrX, map.addrY, menus, url, storeid)
                .then((storeid) => {
                    const token = JSON.parse(window.sessionStorage.getItem("token"));
                    token.storeId = storeid;
                    window.sessionStorage.setItem("token", JSON.stringify(token));
                    this.view.showNaviPage("manage");

                    this.isSaving = false;
                });
        } else {
            service.saveImageInStorage(file, memberid)
                .then((path) => {
                    return service.getStoreImageUrl(path);
                })
                .then((url) => {
                    return service.registerRestaurant(memberid, title, desc, tel, addr, map.addrX, map.addrY, menus, url, storeid);
                })
                .then((storeid) => {
                    const token = JSON.parse(window.sessionStorage.getItem("token"));
                    token.storeId = storeid;
                    window.sessionStorage.setItem("token", JSON.stringify(token));
                    this.view.showNaviPage("manage");
    
                    this.isSaving = false;
                });
        }

    }

}