import * as firebase from "firebase/app";
import 'firebase/auth'; 
import 'firebase/database';
import 'firebase/storage';

import { StoreModel } from "../model/store.model.js";
import { UserModel } from "../model/user.model.js";


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

    const fireAuth = app.auth();
    const fireDatabase = app.database();
    const fireStorage = app.storage();
    const fireStorageRef = app.storage().ref();


    const getCurrentUserId = function() {
        return fireAuth.currentUser.uid;
    }

    const getCurrentUserInfo = function() {
        const id = getCurrentUserId();
        return getUserInfoByUid(id);
    }

    const getCurrentStoreId = function() {
        return new Promise((resolve, reject) => {
            getCurrentUserInfo().then((info) => {
                resolve(info._storeid);
            })
            .catch((err) => {
                reject(Err(err));
            });
        })
    }

    const getCurrentStoreInfo = function() {
        return new Promise((resolve, reject) => {
            getCurrentStoreId().then((id) => {
                getStoreInfoById(id).then((info) => {
                    resolve(info);
                });
            });
        });
    }

    const getStoreInfoById = function(id) {
        return new Promise((resolve, reject) => {
            fireDatabase.ref(`stores/${id}`).once("value")
                .then((snapshot) => {
                    resolve(snapshot.val());
                })
                .catch((err) => {
                    reject(Error(err));
                });
        });
    }

    const getImageDownloadUrl = function(url) {
        return new Promise((resolve, reject) => {
            fireStorageRef.child(url).getDownloadURL().then((url) => {
                resolve(url);
            })
        });
    }

    const getUserInfoByUid = function(id) {
        return new Promise((resolve, reject) => {
            fireDatabase.ref(`users/${id}`).once("value")
                .then((snapshot) => {
                    resolve(snapshot.val());
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    const hasStore = function() {
        return new Promise((resolve, reject) => {
            if (isAuthenticated()) {
                const id = getCurrentUserId();
                fireDatabase.ref(`users/${id}`).once("value")
                    .then((snapshot) => {
                        resolve(snapshot.val()._storeid);
                    })
                    .catch((err) => {
                        reject(Error(err));
                    });
            } else {
                resolve(false);
            }
        });
    }

    const registerStore = function(title, desc, add, tel, pic, is_opened) {
        return new Promise((resolve, reject) => {
            const id = getCurrentUserId();
            const storeData = new StoreModel(id, title, desc, add, tel, pic, is_opened);
            fireDatabase.ref("stores/").push(storeData).then((snapshot) => {
                fireDatabase.ref(`users/${id}`).update({"_storeid": snapshot.key});
                resolve(true);
            });
        })
    }

    const saveFileInStorage = function() {
        return new Promise((resolve, reject) => {
            const id = getCurrentUserId();
            const file = document.getElementById("regist-file").files[0];
            let storeFolder = `${id}/${file.name}`;
            var iref = fireStorageRef.child(storeFolder);
            iref.put(file)
                .then((snapshot) => {
                    resolve(iref.location.path);
                })
                .catch((err) => {
                    reject(Error(err));
                });
        })
    }

    const saveUserData = function(email, name, role, tel) {
        const userData = new UserModel(email, name, role, tel);
        const id = getCurrentUserId();
        fireDatabase.ref(`users/${id}`).set(userData);
    }

    const signUp = function(email, password, name, role, tel, callback) {
        return new Promise((resolve, reject) => {
            fireAuth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    signIn(email, password);
                })
                .then(() => {
                    saveUserData(email, name, role, tel);
                    resolve(true);
                })
                .catch((err) => {
                    reject(Error(err));
                });
        });
    }

    const signIn = function(email, password) {
        return new Promise((resolve, reject) => {
            fireAuth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    resolve(true);
                })
                .catch((err) => {
                    reject(Error(err));
                })
        });
    }
    
    const signOut = function() {
        fireAuth.signOut();
    }

    const isAuthenticated = function() {
        const user = fireAuth.currentUser;

        if (user) 
            return true;
        else 
            return false;
    }

    return {
        // Public member 
        
        getStoreImageUrl(url) {
            return getImageDownloadUrl(url);
        },

        getUserInfo() {
            return getCurrentUserInfo();
        },

        getStoreInfo() {
            return getCurrentStoreInfo();
        },

        registerRestaurant(title, desc, add, tel, pic, is_opened) {
            return registerStore(title, desc, add, tel, pic, is_opened);
        },

        signUpUser(email, password, name, role, tel) {
            return signUp(email, password, name, role, tel);
        },

        signInUser(email, password) {
            return signIn(email, password);
        },

        signOutUser() {
            return signOut();
        },

        isAuth() {
            return isAuthenticated();
        },

        hasRestaurant() {
            return hasStore();
        },

        saveImageInStorage() {
            return saveFileInStorage();
        }
    }

})();

export default service;


