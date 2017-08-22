import util from "./util.js";
import service from "./services/service.js";

import { Menu } from "./menu.js";
import { Scroll } from "./scroll.js";
import { Slide } from "./slide.js";
import { View } from "./view.js";
import { Manage } from "./manage.js";

import { stat } from "./stat.data.js";
//jw
import { MemberModel } from "./model/member.model.js";
import { StoreRegModel } from "./model/storereg.model.js";

export class HomeNavigator {

    constructor(intro, introClose, goStore, login, loginClose, goSignUp, signUp, signUpClose, nav, drop, list) {
        this.btnIntro = document.querySelector(intro);
        this.btnIntroClose = document.querySelector(introClose);
        this.btnGoStore = document.querySelector(goStore);
        this.btnLogin = document.querySelector(login);
        this.btnLoginClose = document.querySelector(loginClose);
        this.btnGoSignUp = document.querySelector(goSignUp);
        this.btnSignUp = document.querySelector(signUp);
        this.btnSignUpClose = document.querySelector(signUpClose);
        this.navigator = document.querySelector(nav);
        this.dropdown = document.querySelector(drop);
        this.dropdownList = document.querySelector(list);

        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");

        this.scroll = new Scroll();
        this.slide = new Slide("slides");
        this.view = new View(".view");
    }

    on() {
        this.slide.plusSlide(1);

        this.btnIntro.addEventListener("click", () => {
            this.view.showElement("intro");
            this.view.inactivateRoot();
        });

        this.btnIntroClose.addEventListener("click", () => {
            this.view.hideElement("intro")
            this.view.activateRoot();
        });
        
        this.btnGoStore.addEventListener("click", this.goStoreHandler.bind(this));

        this.btnLogin.addEventListener("click", this.signInHandler.bind(this));

        this.btnLoginClose.addEventListener("click", () => {
            this.view.hideElement("sign-in");
            this.view.activateRoot();
        });

        this.btnGoSignUp.addEventListener("click", () => {
            this.view.showElement("sign-up");
        });

        this.btnSignUp.addEventListener("click", this.signUpHandler.bind(this));

        this.btnSignUpClose.addEventListener("click", () => {
            this.view.hideElement("sign-up");
        });

        this.navigator.addEventListener("click", (e) => {
            if (e.target && e.target.nodeName === "LI") {
                this.showNaviPage(e.target.dataset.dest);
            }
        });

        this.dropdown.addEventListener("click", (e) => {
            this.view.toggleElement("dropdown", "show-dropdown");
            this.dropdownImg();
        });

        this.dropdownList.addEventListener("click", (e) => {
            if (e.target && e.target.nodeName === "LI") {
                const drop = document.querySelector(".dropdown");
                drop.classList.remove("show-dropdown");
                this.dropdownImg();
                this.showNaviPage(e.target.dataset.dest);
            }
        });

        this.prev.addEventListener("click", () => {
            this.slide.plusSlide(-1);
        })

        this.next.addEventListener("click", () => {
            this.slide.plusSlide(1);
        })
    }

    confirmMyPage() {
        const btnConfirm = document.getElementById("btn-confirm");
        btnConfirm.addEventListener("click", () => {
            // @TODO : haeun.kim 
            // 비밀번호가 일치할 때만, 개인 정보 확인 가능
            service.getUserInfo().then((user) => {
                service.getStoreInfo().then((store) => {
                    service.getMenus().then((menus) => {
                        util.setTemplateInHtml(".my-page-area", "my-info", {"user": user, "store": store, "menus": menus})
                            .then(() => {
                                if (!store) {
                                    document.querySelector(".my-store").innerHTML = "";
                                }
                                this.myInfoHandler();
                        });
                    })
                })
            });
        });
    }

    dropdownImg() {
        const drop = document.querySelector(".dropdown");
        if (drop.classList.contains("show-dropdown"))
            document.getElementById("drop").src = "/dist/public/images/close-white.png";
        else 
            document.getElementById("drop").src = "/dist/public/images/menu.png";
    }

    //jw 가게관리하기 버튼
    goStoreHandler() {
        if (!window.sessionStorage.getItem("loginId")) {//jw
            this.view.showElement("sign-in");
        } else {
            this.view.showElement("board");
            this.view.showElement("nav")
            this.showNaviPage("manage");
        }

        this.view.inactivateRoot();
    }
    //가게 등록
    registerHandler() {
        const menu = new Menu(".menus");
        menu.addMenuInput();

        const btnAddMenu = document.querySelector(".add-menu");
        btnAddMenu.addEventListener("click", () => {
            menu.addMenuInput();
        });
        //jw 지도검색
        const btnSearchLocation = document.querySelector("#btn-search-location");
        btnSearchLocation.addEventListener("click", () => {
            //좌표 받아오기
            const place = document.querySelector("#regist-location").value;
            this.searchAddrByMap(place);
        });

        const btnRegister = document.getElementById("btn-reg-store");
        btnRegister.addEventListener("click", () => {
            const menus = menu.menusToJSON();
            service.registerMenu(menus);
            this.registerStore();
        });
    }
    //가게 등록버튼 refac 메뉴, 사진 추가 필요
    registerStore(menu) {
        const title = document.getElementById("regist-name").value;
        const desc = document.getElementById("regist-desc").value;
        const tel = document.getElementById("regist-tel").value;
        const addr = document.getElementById("regist-location").value;
        //jw
        const addrX = window.sessionStorage.getItem("myaddrX");
        const addrY = window.sessionStorage.getItem("myaddrY");
        const id = window.sessionStorage.getItem("loginId");

        const storeRegModel = new StoreRegModel(title, desc, tel, addr, addrX, addrY, id);

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", () => {
            var htData = oReq.responseText;
            console.log(htData);
            window.sessionStorage.removeItem("myaddrX");
            window.sessionStorage.removeItem("myaddrY");                   
        });
        oReq.open("POST", "http://192.168.100.18:8080/baeminWaiting004"+"/addStore");
        oReq.send(JSON.stringify(storeRegModel));

        // service.saveImageInStorage().then((path) => {
        //     service.getStoreImageUrl(path).then((url) => {
        //         service.registerRestaurant(title, desc, "주소", tel, url, false, menu).then(
        //             util.setTemplateInHtml(".board", "manage")
        //         );
        //     });
        // });
    }

    myInfoHandler() {
        const btnInfoMod = document.getElementById("btn-info-modify");
        const btnGoModify = document.getElementById("btn-go-modify");

        btnInfoMod.addEventListener("click", () => {
            // @TODO : haeun.kim
            // 사용자 정보 업데이트
        });
        btnGoModify.addEventListener("click", () => {
            util.setTemplateInHtml(".board", "modify-store");
        });
    }
    
    showRegister() {
        util.setTemplateInHtml(".board", "no-store").then(() => {
            const btnGoRegister = document.getElementById("btn-go-register");
            btnGoRegister.addEventListener("click", () => {
                util.setTemplateInHtml(".board", "register").then(
                    this.registerHandler()
                );
            });
        });
    }

    showNaviPage(destination) {
        switch (destination) {
            case "home":
                this.view.activateRoot();
                this.view.hideElement("nav");
                this.view.hideElement("board");
                break;

            case "my-page":
                util.setTemplateInHtml(".board", destination).then(
                    this.confirmMyPage()
                );
                break;

            case "manage":
                service.hasRestaurant().then((hasStore) => {
                    if (hasStore) {
                        const manage = new Manage();
                    } else {
                        this.showRegister();
                    }
                });
                break;

            case "statistic":
                util.setTemplateInHtml(".board", destination, stat);
                break;

            case "store-list":
                service.getStores().then((stores) => {
                    util.setTemplateInHtml(".board", destination, stores)
                        .then(() => {
                            this.scroll.setScrollPosition(".store-card-list");
                            this.storeListHandler();
                            this.scroll.scrollPositionReset();
                        });
                });
                break;

            case "logout": 
                //jw 로그아웃
                window.sessionStorage.removeItem("token");
                window.sessionStorage.removeItem("loginId");
                this.view.activateRoot();
                this.view.hideElement("nav");
                this.view.hideElement("board");
                break;

            default:
                util.setTemplateInHtml(".board", destination);
                break;
        }
    }

    showInitialBoard() {
        this.view.hideElement("sign-in");
        this.view.showElement("nav");
        this.view.showElement("board");
        this.showNaviPage("manage");
    }

    //로그인
    signInHandler() {
        const userId = document.getElementById("login-id").value;
        const userPwd = document.getElementById("login-pwd").value;

        //jw
        const memberModel = new MemberModel(userId, userPwd);
        
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load",() => {
             var htData = oReq.responseText;
             console.log(htData);
             this.afterSignIn(htData, userId);            
        });
        oReq.open("POST", "http://192.168.100.18:8080/baeminWaiting004"+"/signin");
        oReq.send(JSON.stringify(memberModel));
    }

    //jw
    afterSignIn(htData, userId) {
        if(htData == "fail"){
            document.querySelector(".sign-warning").style.visibility = "visible";
        }
        else{
            window.sessionStorage.setItem('token', htData);
            window.sessionStorage.setItem('loginId', userId);
            this.showInitialBoard();
        }        
    }

    //회원가입
    signUpHandler() {
        const userId = document.getElementById("sign-id").value;
        const userPwd = document.getElementById("sign-pwd").value;
        const userName = document.getElementById("sign-name").value;
        const userTel = document.getElementById("sign-tel").value;
        
        //jw
        const memberModel = new MemberModel(userId, userPwd, 0, userTel);
        
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", () => {
            var htData = oReq.responseText;
            console.log(htData);
            if(htData == "true"){
                this.view.hideElement("sign-up");
            }           
        });
        oReq.open("POST", "http://192.168.100.18:8080/baeminWaiting004"+"/signup");
        oReq.send(JSON.stringify(memberModel));
    }

    storeListHandler() {
        document.querySelector(".store-list").addEventListener("click", (e) => {
            if (e.target.nodeName === "DD" || e.target.nodeName === "IMG" || e.target.nodeName === "DT") {
                this.scroll.saveScrollPosition(".store-card-list");
                util.setTemplateInHtml(".store-card-list", "store-detail")
                    .then(() => {
                        const btnBack = document.querySelector("#btn-back");
                        btnBack.addEventListener("click", () => {
                            this.showNaviPage("store-list");
                        });
                    });
            }
        })
    }

    //jw 네이버지도api
    searchAddrByMap(place){
        var map = new naver.maps.Map('map');
        var myaddress = place;// 도로명 주소나 지번 주소만 가능 (건물명 불가!!!!)
        naver.maps.Service.geocode({address: myaddress}, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
            }
            var result = response.result;
            // 검색 결과 갯수: result.total
            // 첫번째 결과 결과 주소: result.items[0].address
            // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
            var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
            
            //우선 로컬스토리지에 저장
            window.sessionStorage.setItem("myaddrX", myaddr.x);
            window.sessionStorage.setItem("myaddrY", myaddr.y);
            
            //console.log(myaddr);
            
            map.setCenter(myaddr); // 검색된 좌표로 지도 이동
            // 마커 표시
            var marker = new naver.maps.Marker({
                position: myaddr,
                map: map
            });
            // 마커 클릭 이벤트 처리
            naver.maps.Event.addListener(marker, "click", function(e) {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker);
                }
                });
            // 마크 클릭시 인포윈도우 오픈
            var infowindow = new naver.maps.InfoWindow({
                content: '<h4> [네이버 개발자센터]</h4><a href="https://developers.naver.com" target="_blank"><img src="https://developers.naver.com/inc/devcenter/images/nd_img.png"></a>'
            });       
        });
    }



}
