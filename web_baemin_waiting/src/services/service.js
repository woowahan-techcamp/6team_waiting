import * as firebase from "firebase/app";
import 'firebase/auth'; 
import 'firebase/database';
import 'firebase/storage';


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

    const signUp = function(email, password, callback) {
        fireAuth.createUserWithEmailAndPassword(email, password)
            .then(() => {
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

    return {
        // Public member 
        
        // Create account on firebase with email and password
        signUpUser(email, password, callback) {
            return signUp(email, password, callback);
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


