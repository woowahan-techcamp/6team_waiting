import * as firebase from "firebase/app";
import 'firebase/storage';

import util from "../util.js";

import { MemberModel } from "../model/member.model.js";
import { StoreRegModel } from "../model/storereg.model.js";
import { TicketModel } from "../model/ticket.model.js";


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


    const checkIdDuplication = function(id) {
        return new Promise((resolve, reject) => {
            util.requestAjax("POST", `${baseUrl}/checkPK`, {"userId": id})
                .then((res) => resolve(res));
        })
    }

    const deleteWaitingTicket = function(num) {
        const ticket = new TicketModel(num);
        return new Promise((resolve, reject) => {
            util.requestAjax("POST", `${baseUrl}/deleteTicket`, ticket)
                .then((res) => resolve(res));
        })
    }

    const getStoreInfoById = function(id) {
        return new Promise((resolve, reject) => {
            util.requestAjax("POST", `${baseUrl}/storeInfo`, id)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    const getStoreList = function() {
        return new Promise((resolve, reject) => {
            util.requestAjax("GET", `${baseUrl}/stores`)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    const getImageDownloadUrl = function(url) {
        return new Promise((resolve, reject) => {
            fireStorageRef.child(url).getDownloadURL().then((url) => {
                resolve(url);
            })
        });
    }

    const getWaitingList = function(id) {
        return new Promise((resolve, reject) => {
            util.requestAjax("POST", `${baseUrl}/waitingList`, {"storeId":id})
                .then((res) => resolve(res));
        })
    }

    const registerStore = function(id, title, desc, tel, addr, x, y, menu, img) {
        const store = new StoreRegModel(title, desc, tel, addr, x, y, id, menu, img);
        
        return new Promise((resolve, reject) => {
            util.requestAjax("POST", `${baseUrl}/store`, store)
                .then((res) => resolve(res.storeId));
        })
    }

    const saveFileInStorage = function(id) {
        return new Promise((resolve, reject) => {
            const file = document.getElementById("regist-file").files[0];
            let storeFolder = `${id}/${file.name}`;
            var iref = fireStorageRef.child(storeFolder);
            iref.put(file)
                .then((snapshot) => resolve(iref.location.path))
                .catch((err) => console.log(err));
        });
    }

    const signUp = function(id, pwd, tel, name) {
        const member = new MemberModel(id, pwd, 0, tel, name);

        return new Promise((resolve, reject) => {
            util.requestAjax("POST",`${baseUrl}/signup`, member)
                .then((res) => resolve(res));
        });
    }

    const signIn = function(id, pwd) {
        const member = new MemberModel(id, pwd);

        return new Promise((resolve, reject) => {
            util.requestAjax("POST", `${baseUrl}/signin`, member)
                .then((res) => resolve(res));
        });
    }

    const signOut = function(token) {
        console.log(token);
    }

    return {
        // Public member 

        checkDuplication(id) {
            return checkIdDuplication(id);
        },

        deleteTicket(num) {
            return deleteWaitingTicket(num);
        },

        getStores() {
            return getStoreList();
        },

        getStoreImageUrl(url) {
            return getImageDownloadUrl(url);
        },

        getStoreInfoByid(id) {
            return getStoreInfo(id);
        },

        registerRestaurant(id, title, desc, tel, addr, x, y, menu, pic) {
            return registerStore(id, title, desc, tel, addr, x, y, menu, pic);
        },

        signUpUser(id, password, role, tel, name) {
            return signUp(id, password, role, tel, name);
        },

        signInUser(id, password) {
            return signIn(id, password);
        },

        signOutUser(token) {
            return signOut(token);
        },

        saveImageInStorage(id) {
            return saveFileInStorage(id);
        },

        waitingList(id) {
            return getWaitingList(id);
        }
    }

})();

export default service;


