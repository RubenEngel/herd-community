// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyC8HICUNqd0MAp6_QDScvYgZn9Am9M9egA",
    authDomain: "herd-5776f.firebaseapp.com",
    projectId: "herd-5776f",
    storageBucket: "herd-5776f.appspot.com",
    messagingSenderId: "265429762582",
    appId: "1:265429762582:web:5ec363e50d805075842b37",
    measurementId: "G-R6C05JQ6BX"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);