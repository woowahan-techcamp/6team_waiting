

import { MemberModel } from "../model/member.model.js";
import { StoreRegModel } from "../model/storereg.model.js";
import { TicketModel } from "../model/ticket.model.js";


const service = (() => {
    // Private member

    const baseUrl = "http://demo3901264.mockable.io/";


    const checkIdDuplication = function(id) {
        return new Promise((res, rej) => {
            util.requestAjax("POST", `${baseUrl}/checkPK`, {"userId": id})
                .then((result) => res(result));
        })
    }

    const deleteWaitingTicket = function(num) {
        const ticket = new TicketModel(num);
        return new Promise((res, rej) => {
            util.requestAjax("POST", `${baseUrl}/deleteTicket`, ticket)
                .then((result) => res(res));
        })
    }

    const getStoreInfoById = function(id) {
        return new Promise((res, rej) => {
            util.requestAjax("POST", `${baseUrl}/storeInfo`, id)
                .then((result) => res(result))
                .catch((err) => console.log(err));
        })
    }

    const getStoreList = function() {
        return new Promise((res, rej) => {
            util.requestAjax("GET", `${baseUrl}/stores`)
                .then((result) => res(result))
                .catch((err) => console.log(err));
        })
    }

    const getImageDownloadUrl = function(url) {
        return new Promise((res, rej) => {
            fireStorageRef.child(url).getDownloadURL().then((url) => res(url));
        })
    }

    const getWaitingList = function(id) {
        return new Promise((res,rej) => {
            util.requestAjax("POST", `${baseUrl}/waitingList`, {"storeId":id})
                .then((result) => res(result));
        })
    }

    const registerStore = function(id, title, desc, tel, addr, x, y, menu, img) {
        const store = new StoreRegModel(title, desc, tel, addr, x, y, id, menu, img);
        
        return new Promise((res, rej) => {
            util.requestAjax("POST", `${baseUrl}/store`, store)
                .then((result) => res(result.storeId));
        });
    }

    const saveFileInStorage = function(id) {
        return new Promise((res, rej) => {
            const file = document.getElementById("regist-file").files[0];
            let storeFolder = `${id}/${file.name}`;
            var iref = fireStorageRef.child(storeFolder);
            iref.put(file)
                .then((snapshot) =>  res(iref.location.path))
                .catch((err) => console.log(err));
        })
    }

    const signUp = function(id, pwd, tel, name) {
        const member = new MemberModel(id, pwd, 0, tel, name);

        return new Promise((res, rej) => {
            util.requestAjax("POST",`${baseUrl}/signup`, member)
                .then((status) => res(status));
        })
    }

    const signIn = function(id, pwd) {
        const member = new MemberModel(id, pwd);

        return new Promise((res, rej) => {
            util.requestAjax("POST", `${baseUrl}/signin`, member)
                .then((token) =>  res(token) );
        })
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


