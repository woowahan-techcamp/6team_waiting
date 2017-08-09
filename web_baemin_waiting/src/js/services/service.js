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

    const registerStore = function(owner, title, tel, add, pic, desc, is_opened) {
        const storeData = new StoreModel(owner, title, tel, add, pic, desc, is_opened);
        const currentUid = getCurrentUid();
        storeData.owner(currentUid);
        fireDatabase.ref("stores/").push(storeData);
    }

    const saveUserData = function(email, name, role, tel) {
        const userData = new UserModel(email, name, role, tel);
        const currentUid = getCurrentUid();
        fireDatabase.ref("users/" + currentUid).set(userData);
    }

    const signUp = function(email, password, name, role, tel, callback) {
        fireAuth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                signIn(email, password);
            })
            .then(() => {
                saveUserData(email, name, role, tel);
                callback();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const signIn = function(email, password, callback) {
        fireAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                callback();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    const signOut = function() {
        fireAuth.signOut();
    }

    const getCurrentUid = function() {
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
        
        getUserDataByUid(uid) {
            return getUserByUid(uid);
        },

        registerRestaurant(owner, title, tel, add, pic, desc, is_opened) {
            return registerStore(owner, title, tel, add, pic, desc, is_opened);
        },

        // Create account on firebase with email and password
        signUpUser(email, password, name, role, tel, callback) {
            return signUp(email, password, name, role, tel, callback);
        },

        // Sign in with email and password
        signInUser(email, password, callback) {
            return signIn(email, password, callback);
        },

        // Log out
        signOutUser() {
            return signOut();
        }
    }

})();

export default service;


