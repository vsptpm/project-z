import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyDzFk-TfjP0b31mBK6xyJ1aCi5OQD3GnOQ",
    authDomain: "project-z-20.firebaseapp.com",
    databaseURL: "https://project-z-20.firebaseio.com",
    projectId: "project-z-20",
    storageBucket: "project-z-20.appspot.com",
    messagingSenderId: "935938488266",
    appId: "1:935938488266:web:6998d9fcfabd54fa774133",
    measurementId: "G-3W8GPX7HTC"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};
