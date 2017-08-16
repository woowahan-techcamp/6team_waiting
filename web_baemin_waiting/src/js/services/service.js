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
    const fireStorageRef = app.storage().ref();

    const getUserByUid = function(uid) {
        return new Promise((resolve, reject) => {
            fireDatabase.ref("users/" + uid).once("value")
                .then((snapShot) => {
                    resolve(snapShot.val());
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    const registerStore = function(title, desc, add, tel, pic, is_opened) {
        return new Promise((resolve, reject) => {
            const id = getCurrentUserId();
            const storeData = new StoreModel(id, title, desc, add, tel, pic, is_opened);
            fireDatabase.ref("stores/").push(storeData).then(resolve(true));
        })
    }

    const saveFileInStorage = function(storeid) {
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
        const currentUid = getCurrentUid();
        fireDatabase.ref("users/" + currentUid).set(userData);
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
        })
        
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

    const getCurrentUserId = function() {
        return fireAuth.currentUser.uid;
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
        
        getCurrentId(uid) {
            return getCurrentUserId();
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

        // @TODO : haeun.kim
        // 현재 로그인 된 계정에 등록된 가게가 있는지 없는지 확인
        hasStore() {
            return false;
        },

        saveImageInStorage(storeid) {
            return saveFileInStorage(storeid);
        }
    }

})();

export default service;


