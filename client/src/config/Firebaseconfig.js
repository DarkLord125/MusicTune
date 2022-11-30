// importing these functions from these packages
import {getApp, getApps, initializeApp} from 'firebase/app';
import {getStorage} from "firebase/storage"

// Used env file for safe practice
// Connection with Firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEIN_ID,
    appId: process.env.REACT_APP_FIREBASE_APPI_ID
};
// If app is created , then get app information
// If not then initialize app
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// Instance of firebase storage
const storage = getStorage(app);

// To access information when needed
export {app, storage};