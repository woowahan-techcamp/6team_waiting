import util from "./util.js";
import service from "./services/service.js";

import { Regex } from "./regex.js";
import { View } from "./view.js";


export class Auth {

    constructor(){
        this.authId = null;
        this.isNotDuplication = false;
        this.regex = new Regex();
        this.view = new View(".view");
        
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
                window.sessionStorage.setItem("token", JSON.stringify(token));
                this.view.showInitialBoard();
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
        
        if (this.auth.isNotDuplication && (this.auth.authId === id)) {
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
        service.signOutUser(token)
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
                    service.getStoreInfo(token)
                        .then((storeInfo) => {
                            console.log(storeInfo);
                            util.setTemplateInHtml(".board", "my-info", storeInfo);
                        });             
                }
            });
    }
    
    registerStore(id, title, desc, tel, add, x, y, menu) {
        // @TODO : haeun.kim
        // 사용자가 버튼을 여러번 누를 경우,
        // 서버에 요청이 여러번 날아가게 됨 
        service.saveImageInStorage(id)
            .then((path) => {
                return service.getStoreImageUrl(path);
            })
            .then((url) => {
                return service.registerRestaurant(id, title, desc, tel, add, x, y, menu, url);
            })
            .then((storeid) => {
                const token = JSON.parse(window.sessionStorage.getItem("token"));
                token.storeId = storeid;
                window.sessionStorage.setItem("token", JSON.stringify(token));
            });
    }

    currentToken() {
        const token = sessionStorage.getItem("token");
        if (!(token === "undefined")) {
            return JSON.parse(token);
        }
    }

}