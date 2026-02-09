import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCaTjO69GekgcGNj2tawqUcUbr_Ut9kWpU",
    authDomain: "tavari-6e91b.firebaseapp.com",
    projectId: "tavari-6e91b",
    storageBucket: "tavari-6e91b.firebasestorage.app",
    messagingSenderId: "556109560656",
    appId: "1:556109560656:web:5913f44295f90c18938a55",
    measurementId: "G-NY18L7R7MQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, storage, analytics };
