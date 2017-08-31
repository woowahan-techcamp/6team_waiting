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
        this.isNotDuplication = false; 
        this.regex = new Regex();
        this.view = new View(".view");
        this.isSaving = false;
    }

    signIn() {
        const id = document.getElementById("login-id");
        const pwd = document.getElementById("login-pwd");

        if (!this.regex.isID(id.value)) {
            alert("아이디가 잘못됨");
            return;
        }

        if (!this.regex.isPassword(pwd.value)) {
            alert("비밀번호가 잘못됨");
            return;
        }


        return service.signInUser(id.value, pwd.value)
            .then((token) => {
                id.value = "";
                pwd.value = "";

                if (token.token !== "fail") {
                    window.sessionStorage.setItem("token", JSON.stringify(token));
                    return "success";
                } 
            })
            .catch((err) => {
                alert(err);
            });
    }

    signUp() {
        const id = document.getElementById("sign-id");
        const pwd = document.getElementById("sign-pwd");
        const name = document.getElementById("sign-name");
        const tel = document.getElementById("sign-tel");

        if (!this.regex.isID(id.value)) {
            alert("아이디는 대소문자의 알파벳과 숫자로 4-15 글자만 가능합니다");
            return;
        }

        if (!this.regex.isPassword(pwd.value)) {
            alert("비밀번호는 문자와 숫자의 조합으로 6-16 자리로 입력해주세요");
            return;
        }

        if (!this.regex.isName(name.value)) {
            alert("이름은 공백과 숫자를 제외한 2-20 글자만 가능합니다");
            return;
        }

        if (!this.regex.isTel(tel.value)) {
            alert("전화번호는 0 으로 시작하는 7-12 글자 수 내로 입력해주세요");
            return;
        }
        
        if (!this.isNotDuplication || (this.authId !== id.value)) {
            alert("아이디 중복 확인을 해주세요");
            return;
        }

        return service.signUpUser(id.value, pwd.value, name.value, tel.value)
            .then(() => {
                id.value = "";
                pwd.value = "";
                name.value = "";
                tel.value = "";

                return "success";
            })
    }

    signOut() {
        sessionStorage.removeItem("token");
    }

    confirmPassword() {
        const token = this.currentToken();
        const pwd = document.querySelector("#pwd-confirm").value;  
        service.signInUser(token.memberId, pwd)
            .then((token) => {
                if (token.token === "fail") {
                    alert("잘못된 비밀번호입니다");
                } else if ( token.storeId === 0) { 
                    this.userInfoInMypage(token);
                } else {
                    this.storeInfoInMypage(token);        
                }
            });
    }

    userInfoInMypage(token) {
        service.getUserInfo(token)
            .then((userInfo) => {
                util.setTemplateInHtml(".my-page-area", "my-info", userInfo)
                this.myInfoHandler(userInfo);
            })
            .then(() => {
                document.querySelector(".my-store").innerHTML = "등록된 가게가 없습니다";
            });;
    }

    storeInfoInMypage(token) {
        service.getStoreInfo(token)
            .then((storeInfo) => {
                util.setTemplateInHtml(".my-page-area", "my-info", storeInfo)
                this.myInfoHandler(storeInfo);
            });
    }

    myInfoHandler(storeInfo) {
        const btnInfoMod = document.getElementById("btn-info-modify");
        const btnGoModify = document.getElementById("btn-go-modify");

        btnInfoMod.addEventListener("click", () => {
            this.myInfoModify();
        });
            
        btnGoModify.addEventListener("click", () => {
            this.goModify(storeInfo);
        });
    }
    
    myInfoModify() {
        const id = this.currentToken().memberId;
        const pwd = document.querySelector("#mod-pwd").value;
        const name = document.querySelector("#mod-name").value;
        const tel = document.querySelector("#mod-tel").value;
        
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

        service.updateMemberInfo(id, pwd, name, tel)
            .then(() => {
                alert("회원정보 수정이 완료되었습니다.");
            });
    }

    goModify(storeInfo){
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
    }

    registerStore(map, menu) {
        if (this.isSaving) {
            return alert("처리중입니다");
        }

        const token = this.currentToken();
        const storeid = token.storeId;
        const memberid = token.memberId;
        const menus = menu.getMenus();
        const title = document.getElementById("regist-name");
        const desc = document.getElementById("regist-desc");
        const tel = document.getElementById("regist-tel");
        const addr = document.getElementById("regist-location");
        const file = document.getElementById("regist-file").files[0];

        if (!menu.isOK) return;

        if (!this.regex.isTitle(title.value)) {
            alert("1 - 20 글자 수의 가게명을 입력해주세요");
            return;
        }

        if (!this.regex.isDescription(desc.value)) {
            alert("2 - 40 글자 수의 가게 설명을 입력해주세요");
            return;
        }

        if (!this.regex.isTel(tel.value)) {
            alert("잘못된 전화번호 형식입니다");
            return;
        }

        if (!this.regex.isAddrress(addr.value)) {
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

        return service.saveImageInStorage(file, memberid)
            .then((path) => {
                return service.getStoreImageUrl(path);
            })
            .then((url) => {
                return service.registerRestaurant(memberid, title.value, desc.value, tel.value, addr.value, map.addrX, map.addrY, menus, url, storeid);
            })
            .then((storeid) => {
                title.value = "";
                desc.value = "";
                tel.value = "";
                addr.value = "";

                const token = JSON.parse(window.sessionStorage.getItem("token"));
                token.storeId = storeid;
                window.sessionStorage.setItem("token", JSON.stringify(token));

                this.isSaving = false;
            });
    }

    currentToken() {
        const token = sessionStorage.getItem("token");
        if (!(token === "undefined")) {
            return JSON.parse(token);
        }
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

        if (!this.regex.isTitle(title)) {
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
            service.registerRestaurant(memberid, title, desc, tel, addr, map.addrX, map.addrY, menus, file, storeid)
                .then((storeid) => {
                    const token = JSON.parse(window.sessionStorage.getItem("token"));
                    token.storeId = storeid;
                    window.sessionStorage.setItem("token", JSON.stringify(token));
                    this.isSaving = false;
                    alert("가게 정보 수정이 완료되었습니다.");
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
                    this.isSaving = false;
                    alert("가게 정보 수정이 완료되었습니다.");
                });
        }
            

    }

}