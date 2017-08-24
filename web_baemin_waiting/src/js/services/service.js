import * as firebase from "firebase/app";
import 'firebase/storage';

import { MemberModel } from "../model/member.model.js";
import { StoreRegModel } from "../model/storereg.model.js";
import { TicketModel } from "../model/ticket.model.js";
import { PushModel } from "../model/push.model.js";
import { StatusModel } from "../model/status.model.js";
import { TokenModel } from "../model/token.model.js";

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

    const baseUrl = "http://192.168.100.18:8080/baeminWaiting004";
    const pushUrl = "http://52.78.157.5:8080";


    const requestAjax = function(protocol, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(protocol, url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(data));
        });
    }

    return {
        // Public member 

        checkDuplication(id) {
            return requestAjax("POST", `${baseUrl}/checkPK`, {"userId": id})
                .then((result) => { return (result); })
                .catch((err) => { return (err) });
        },

        deleteTicket(num) {
            const ticket = new TicketModel(num);
            return requestAjax("POST", `${baseUrl}/deleteTicket`, ticket)
                .then((result) => { return (res); })
                .catch((err) => { return (err) });
        },

        getStores() {
            return requestAjax("GET", `${baseUrl}/stores`)
                .then((result) => { return (result); })
                .catch((err) => { return (err) });
        },

        getStoreImageUrl(url) {
            return fireStorageRef.child(url).getDownloadURL()
                .then((url) => { return (url); })
                .catch((err) => { return (err) });
        },

        getStoreByid(id) {
            return requestAjax("POST", `${baseUrl}/storeInfo`, id)
                .then((result) => { return (result); })
        },

        registerRestaurant(id, title, desc, tel, addr, x, y, menu, img) {
            const store = new StoreRegModel(title, desc, tel, addr, x, y, id, menu, img);
            return requestAjax("POST", `${baseUrl}/store`, store)
                .then((result) => { return (result.storeId); })
                .catch((err) => { return (err) });
        },

        signUpUser(id, pwd, name, tel) {
            const member = new MemberModel(id, pwd, name, tel);
            return requestAjax("POST",`${baseUrl}/signup`, member)
                .then((status) => { return (status); })
                .catch((err) => { return (err) });
        },

        signInUser(id, pwd) {
            const member = new MemberModel(id, pwd);
        
            return requestAjax("POST", `${baseUrl}/signin`, member)
                .then((token) =>  { return (token); } )
                .catch((err) => { return (err) });
        },

        signOutUser(token) {
            const status = new StatusModel(token, "off")
            return requestAjax("POST", `${baseUrl}/status`, status)
                .then((res) => { return(res); }); 
        },

        saveImageInStorage(id) {
            const file = document.getElementById("regist-file").files[0];
            const storeFolder = `${id}/${file.name}`;
            const iref = fireStorageRef.child(storeFolder);
            return iref.put(file)
                .then((snapshot) =>  { return (iref.location.path); })
                .catch((err) => console.log(err));
        },

        waitingList(id) {
            return requestAjax("POST", `${baseUrl}/waitingList`, {"storeId":id})
                .then((result) => { return (result) })
                .catch((err) => { return (err) });
        },

        push(ticket, msg) {
            const push = new PushModel(ticket, msg);
            return requestAjax("POST", `${baseUrl}/webpush`, push)
                .then((status) => { return (status); })
                .catch((err) => { return (err) });
        },

        getStoreInfo(currentToken){
            const token = new TokenModel(currentToken);
            return requestAjax("POST", `${baseUrl}/storeInfo`, token)
                .then((storeInfo) => { return (storeInfo);});
        }
    }

})();

export default service;


