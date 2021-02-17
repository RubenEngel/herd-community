import firebase from 'firebase/app'
import 'firebase/auth';
          
var firebaseConfig = {
  apiKey: "AIzaSyC8HICUNqd0MAp6_QDScvYgZn9Am9M9egA",
  authDomain: "herd-5776f.firebaseapp.com",
  projectId: "herd-5776f",
  storageBucket: "herd-5776f.appspot.com",
  messagingSenderId: "265429762582",
  appId: "1:265429762582:web:5ec363e50d805075842b37",
  measurementId: "G-R6C05JQ6BX"
};

{/* Initialize Firebase */}
firebase.initializeApp(firebaseConfig);
firebase.analytics();