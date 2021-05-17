import firebase from 'firebase/app';
import 'firebase/storage'; 
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyDvC2rHXM1GkA7frCy7lc7ynZLJbODoCFA",
    authDomain: "react-app-c264d.firebaseapp.com",
    projectId: "react-app-c264d",
    storageBucket: "react-app-c264d.appspot.com",
    messagingSenderId: "92175123464",
    appId: "1:92175123464:web:8eca94cbc37547df293dbd",
    measurementId: "G-0G0QBMC8GM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
