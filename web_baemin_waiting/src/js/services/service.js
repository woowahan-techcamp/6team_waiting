import * as firebase from "firebase/app";
import 'firebase/storage';

import { ClientModel } from "../model/client.model.js";
import { MemberModel } from "../model/member.model.js";
import { StoreModel } from "../model/store.model.js";
import { TicketModel } from "../model/ticket.model.js";
import { PushModel } from "../model/push.model.js";
import { StatusModel } from "../model/status.model.js";
import { TokenModel } from "../model/token.model.js";
import { PageModel } from "../model/page.model.js";

const service = (() => {
    // Private member

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyCOh94raCe9z-r0QcOBCCU2CJmIKFcGdyk",
        authDomain: "baeminwaiting.firebaseapp.com",
        databaseURL: "https://baeminwaiting.firebaseio.com",
        projectId: "baeminwaiting",
        storageBucket: "baeminwaiting.appspot.com",
        messagingSenderId: "352546507957"
    };

    const app = firebase.initializeApp(config);
    
    const fireStorage = app.storage();
    const fireStorageRef = app.storage().ref();

    //const baseUrl = "http://52.78.157.5:8080";
    const baseUrl = "http://192.168.100.18:8080/baeminWaiting004";
    

    const requestAjax = function(protocol, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(protocol, url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    // 백엔드 에러
                }
            };
            xhr.send(JSON.stringify(data));
        });
    }

    return {
        // Public member 

        addTicket(id, name, count, isStaying, tel) {
            const client = new ClientModel(id, name, count, isStaying, tel);
            return requestAjax("POST", `${baseUrl}/addWaitingTicket`, client)
                .then((result) => { return result })
                .catch((err) => { return err });
        },

        checkDuplication(id) {
            return requestAjax("POST", `${baseUrl}/checkPK`, {"userId": id})
                .then((result) => { return result })
                .catch((err) => { return err });
        },

        deleteTicket(num, status) {
            const ticket = new TicketModel(num, status);
            return requestAjax("POST", `${baseUrl}/deleteTicket`, ticket)
                .then((result) => { return res })
                .catch((err) => { return err });
        },

        getStores() { //사용 안함 (모든 가게정보 다 가져오는 기능)
            return requestAjax("GET", `${baseUrl}/stores`)
                .then((result) => { return result })
                .catch((err) => { return err });
        },

        getStoreImageUrl(url) {
            return fireStorageRef.child(url).getDownloadURL()
                .then((url) => { return url })
                .catch((err) => { return err });
        },

        getStoreByid(id) {
            return requestAjax("POST", `${baseUrl}/storeInfo`, id)
                .then((result) => { return result })
        },

        registerRestaurant(id, title, desc, tel, addr, x, y, menu, img, storeId) {
            const store = new StoreModel(title, desc, tel, addr, x, y, id, menu, img, storeId);
            return requestAjax("POST", `${baseUrl}/store`, store)
                .then((result) => { return result.storeId })
                .catch((err) => { return err });
        },

        signUpUser(id, pwd, name, tel) {
            const member = new MemberModel(id, pwd, name, tel);
            return requestAjax("POST",`${baseUrl}/signup`, member)
                .then((status) => { return status })
                .catch((err) => { return err });
        },

        signInUser(id, pwd) {
            const member = new MemberModel(id, pwd);
        
            return requestAjax("POST", `${baseUrl}/signin`, member)
                .then((token) =>  { return token })
                .catch((err) => { return err });
        },

        changeStatus(token, stat) {
            const status = new StatusModel(token, stat);
            return requestAjax("POST", `${baseUrl}/status`, status)
                .then((res) => { return res }); 
        },

        saveImageInStorage(file, id) {
            const storeFolder = `${id}/${file.name}`;
            const iref = fireStorageRef.child(storeFolder);
            return iref.put(file)
                .then((snapshot) =>  { return iref.location.path })
                .catch((err) => console.log(err));
        },

        waitingList(id) {
            return requestAjax("POST", `${baseUrl}/waitingList`, {"storeId":id})
                .then((result) => { return result })
                .catch((err) => { return err });
        },

        push(ticket, msg) {
            const push = new PushModel(ticket, msg);
            return requestAjax("POST", `${baseUrl}/push`, push)//url:: webpush(LOCAL), push(AWS) 
                .then((status) => { return status })
                .catch((err) => { return err });
        },

        getStoreInfo(currentToken){
            const token = new TokenModel(currentToken);
            return requestAjax("POST", `${baseUrl}/storeInfo`, token)
                .then((storeInfo) => { return storeInfo });

        },

        getOtherStoreDetail(storeId){
            const id = {"storeId" : storeId};
            return requestAjax("POST", `${baseUrl}/otherStoreDetail`, id)
                .then((storeInfo) => { return storeInfo });
        },

        getOtherStoreList(firstNum, lastNum){
            const page = new PageModel(firstNum, lastNum);
            return requestAjax("POST", `${baseUrl}/otherStores`, page)
                .then((result) => { return result });
        },

        getCountStores(){
            return requestAjax("POST", `${baseUrl}/countStores`)
                .then((result) => { return result });
        }
    }

})();

export default service;


