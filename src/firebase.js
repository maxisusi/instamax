import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDodNVX57OpoI-OB0hsm6M7X1GmEUhUZRc",
    authDomain: "instagra-clone.firebaseapp.com",
    databaseURL: "https://instagra-clone.firebaseio.com",
    projectId: "instagra-clone",
    storageBucket: "instagra-clone.appspot.com",
    messagingSenderId: "1064054047325",
    appId: "1:1064054047325:web:f0df99b29744720e1103b4",
    measurementId: "G-3D8LVKSWSJ"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };